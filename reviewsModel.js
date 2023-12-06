const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reviews');

const reviewsSchema = new mongoose.Schema({
  // Mongoose creates a new id of type ObjectId to document
  // so I've decided not to create an id property
  product_id: { type: Number, required: true },
  rating: { type: Number, required: true },
  date: { type: Date, required: true },
  summary: { type: String, maxLength: 60 },
  body: { type: String, maxLength: 1000, required: true },
  recommeneded: { type: Boolean, required: true },
  reviewer_name: { type: String, maxLength: 60, required: true },
  response: { type: String },
  helpfulness: { type: Number, default: 0, required: true },
  reported: { type: Boolean, default: false, required: true },
  reviewer_email: { type: String, maxLength: 60, required: true },
  photos: [{
    // automatically creates an id
    url: String
  }],
  characteristics: {
    type: Map,
    of: new mongoose.Schema({
      // automatically creates an id
      value: { type: Number, required: true }
    })
  }
});

const Reviews = mongoose.model('Reviews', reviewsSchema);

module.exports = Reviews;