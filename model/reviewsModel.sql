DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\c reviews;

DROP TABLE IF EXISTS characteristic_reviews CASCADE;
DROP TABLE IF EXISTS characteristics CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR(200) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  reviewer_name VARCHAR(60) NOT NULL,
  reviewer_email VARCHAR(60) NOT NULL,
  response VARCHAR,
  helpfulness INT NOT NULL DEFAULT 0
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  review_id INT REFERENCES reviews(id),
  url VARCHAR
);

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR NOT NULL
);

CREATE TABLE characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INT REFERENCES characteristics(id),
  review_id INT REFERENCES reviews(id),
  value INT NOT NULL
);

--ETL Code
COPY reviews FROM '/Users/hazel/RFP2310/ganymede/reviews-service/data/reviews.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/Users/hazel/RFP2310/ganymede/reviews-service/data/reviews_photos.csv' DELIMITER ',' CSV HEADER;
COPY characteristics FROM '/Users/hazel/RFP2310/ganymede/reviews-service/data/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY characteristic_reviews FROM '/Users/hazel/RFP2310/ganymede/reviews-service/data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

--Transform Date Format
ALTER TABLE reviews
ADD COLUMN new_date TIMESTAMP NOT NULL DEFAULT NOW();

UPDATE reviews
SET new_date = TO_TIMESTAMP(date / 1000);

ALTER TABLE reviews
DROP COLUMN date;

ALTER TABLE reviews
RENAME COLUMN new_date TO date;

--Correct out-of-sync sequence
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"photos"', 'id')), (SELECT (MAX("id") + 1) FROM "photos"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"characteristic_reviews"', 'id')), (SELECT (MAX("id") + 1) FROM "characteristic_reviews"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"reviews"', 'id')), (SELECT (MAX("id") + 1) FROM "reviews"), FALSE);