const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
            trim: true,
        },
        film: {
            type: String,
            required: true,
            trim: true,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        text: {
            type: String,
            default: "",
            trim: true,
        },
        likes: [{
            type: String,
            required: true,
        }]
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

reviewSchema.index({ user: 1, film: 1 }); // Example index for faster querying

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
