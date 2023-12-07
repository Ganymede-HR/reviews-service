CREATE DATABASE reviews;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR(60) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  recommended BOOLEAN NOT NULL,
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

CREATE characteristic_reviews (
  id SERIAL PRIMARY KEY,
  review_id INT REFERENCES reviews(id),
  characteristic_id INT REFERENCES characteristics(id),
  value INT VARCHAR NOT NULL
);