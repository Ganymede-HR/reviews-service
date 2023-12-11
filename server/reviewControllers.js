require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
});

module.exports = {
  getReviews: async (req, res) => {
    if (!req.query.product_id) {
      res.status(422).send('Invalid product_id');
    } else {
      const page = req.query.page || 1;
      const count = req.query.count || 5;
      const sort = req.query.sort || 'relevance';
      const { product_id } = req.query;

      let sortQuery;
      if (sort === 'newest') {
        sortQuery = 'date DESC';
      }
      if (sort === 'helpful') {
        sortQuery = 'helpfulness DESC';
      }
      if (sort === 'relevance') {
        sortQuery = 'date DESC, helpfulness DESC';
      }

      const queryText = `
        SELECT r.id AS review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness,
          (
            SELECT COALESCE(json_agg(json_build_object('id', p.id, 'url', p.url)), '[]')
            FROM photos AS p
            WHERE r.id = p.review_id
          ) AS photos
        FROM reviews AS r
        WHERE product_id = $1
        AND reported = false
        ORDER BY $2
        LIMIT $3
        OFFSET $4
      `;

      const offset = count * (page - 1);

      try {
        const result = await pool.query(queryText, [product_id, sortQuery, count, offset]);
        const response = {
          product_id,
          page,
          count,
          result: result.rows.length ? result.rows : [],
        };
        res.status(200).json(response);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    }
  },

  getMeta: async (req, res) => {
    if (!req.query.product_id) {
      res.status(422).send('Invalid product_id');
    } else {
      const { product_id } = req.query;

      const queryText = `
        SELECT
          ${product_id} AS product_id,
          (SELECT json_object_agg(rating::TEXT, ratingCount)
            FROM
              (SELECT rating, COUNT(*) AS ratingCount
                FROM reviews
                WHERE product_id = ${product_id}
                GROUP BY rating
              ) AS rc
          ) AS ratings,
          (SELECT json_object_agg(recommend::TEXT, recCount)
            FROM
              (SELECT recommend, COUNT (*) AS recCount
                FROM reviews
                WHERE product_id = ${product_id}
                GROUP BY recommend
              ) AS rec
          ) AS recommended,
          (SELECT json_object_agg(name, json_build_object('id', characteristic_id, 'value', avg))
            FROM
            (SELECT name, characteristic_id, AVG(value) AS avg
              FROM characteristics
              INNER JOIN characteristic_reviews
              ON characteristics.id = characteristic_reviews.characteristic_id
              WHERE product_id = ${product_id}
              GROUP BY name, characteristic_id
            ) AS char
          ) AS characteristics
      `;

      try {
        const result = await pool.query(queryText);
        res.status(200).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    }
  },

  addReview: async (req, res) => {

  },

  updateHelpfulCount: async (req, res) => {
    const { review_id } = req.params;
    const queryText = 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1';

    try {
      const results = await pool.query(queryText, [review_id]);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  reportReview: async (req, res) => {
    const { review_id } = req.params;
    const queryText = 'UPDATE reviews SET reported = true WHERE id = $1';

    try {
      await pool.query(queryText, [review_id]);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
};
