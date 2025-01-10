const mongoose = require("mongoose");
const { userModel: User } = require("../models/userModel"); // Import the model correctly
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

// Configure Google Strategy
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error('Google OAuth credentials missing in environment variables');
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ['profile', 'email']
},
async function (accessToken, refreshToken, profile, done) {
    try {
        console.log("Google Profile:", profile);
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
            user = await User.findOne({ email: profile.emails[0].value });
        }
        
        if (user) {
            if (!user.googleId) {
                user.googleId = profile.id;
                await user.save();
            }
            return done(null, user);
        }
        
        const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id
        });
        return done(null, newUser);
        
    } catch (error) {
        console.error("Google Auth Error:", error);
        return done(error, null);
    }
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (err) {
        console.error("Deserialize Error:", err);
        done(err, null);
    }
});

module.exports = passport;