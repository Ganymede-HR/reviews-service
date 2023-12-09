const express = require('express');

// Creates a new router object
const reviewRouter = express.Router();
const {
  getReviewsHandler,
  getMetaHandler,
  addReviewHandler,
  helpfulnessHandler,
  reportHandler,
} = require('./reviewControllers');

// Get list of reviews
reviewRouter.get('/', getReviewsHandler);

// Get metadata for a given product
reviewRouter.get('/meta', getMetaHandler);

// Add a review
reviewRouter.post('/', addReviewHandler);

// Mark review as helpful
reviewRouter.put('/:review_id/helpful', helpfulnessHandler);

// Report review
reviewRouter.put('/:review_id/report', reportHandler);

module.exports = reviewRouter;
