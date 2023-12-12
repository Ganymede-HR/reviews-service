const express = require('express');

const reviewRouter = express.Router();
const {
  getReviews,
  getMeta,
  addReview,
  updateHelpfulCount,
  reportReview,
} = require('./reviewControllers');

// // Get list of reviews
reviewRouter.get('/', getReviews);

// // Get metadata for a given product
reviewRouter.get('/meta', getMeta);

// // Add a review
reviewRouter.post('/', addReview);

// Mark review as helpful
reviewRouter.put('/:review_id/helpful', updateHelpfulCount);

// // Report review
reviewRouter.put('/:review_id/report', reportReview);

module.exports = reviewRouter;
