const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Admin = require('../model/admin.model');

passport.use("localAuth", new localStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log("Admin not found!!");
            return done(null, false);
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            console.log("Invalid Password");
            return done(null, false);
        }

        return done(null, admin);
    } catch (error) {
        return done(error);
    }
}));

passport