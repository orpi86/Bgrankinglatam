const mongoose = require('mongoose');

// --- USER SCHEMA ---
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    role: { type: String, default: 'user' },
    battleTag: { type: String },
    twitch: { type: String, default: null },
    banned: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: true },
    country: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'users_latam' });

// --- NEWS SCHEMA ---
const commentSchema = new mongoose.Schema({
    id: Number, // Preserving original ID type
    author: String,
    content: String,
    date: { type: Date, default: Date.now }
});

const newsSchema = new mongoose.Schema({
    id: Number, // Preserving original ID type
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: String,
    date: { type: Date, default: Date.now },
    lastEdit: Date,
    comments: { type: [commentSchema], default: [] }
}, { collection: 'news' });

// --- FORUM SCHEMA ---
const postSchema = new mongoose.Schema({
    id: Number,
    author: String,
    content: String,
    date: { type: Date, default: Date.now }
});

const topicSchema = new mongoose.Schema({
    id: Number,
    title: String,
    author: String,
    date: { type: Date, default: Date.now },
    posts: [postSchema]
});

const sectionSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    topics: [topicSchema]
});

const forumSchema = new mongoose.Schema({
    id: String,
    title: String,
    sections: [sectionSchema]
}, { collection: 'forums' });

// --- PLAYER SCHEMA ---
const playerSchema = new mongoose.Schema({
    battleTag: { type: String, required: true, unique: true },
    twitch: { type: String, default: null },
    country: { type: String, default: null }
}, { collection: 'players_latam' });

// --- RANKING SCHEMA (Seasonal Data) ---
const rankingSchema = new mongoose.Schema({
    seasonId: { type: Number, required: true },
    battleTag: { type: String, required: true },
    rank: Number,
    rating: mongoose.Schema.Types.Mixed, // Supports number or "Sin datos"
    found: Boolean,
    spainRank: Number,
    isLive: { type: Boolean, default: false },
    twitchUser: String,
    country: { type: String, default: null },
    updatedAt: { type: Date, default: Date.now }
}, { collection: 'rankings_latam' });

// Index for fast lookups and to ensure no duplicates for a player in a season
rankingSchema.index({ seasonId: 1, battleTag: 1 }, { unique: true });

module.exports = { 
    userSchema, 
    newsSchema, 
    forumSchema, 
    playerSchema, 
    rankingSchema 
};
