const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Admin = require('../model/admin.model');

passport.use("localAuth", new localStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            req.flash('error', 'Admin not found with this email address.');
            console.log("Admin not found!!");
            return done(null, false);
        }
        if (password !== admin.password) {
            req.flash('error', 'Invalid password. Please try again.');
            console.log("Password is invalid..");
            return done(null, false);
        }

        req.flash('success', 'Login successful! Welcome back.');
        return done(null, admin);
    } catch (error) {
        req.flash('error', 'Login failed. Please try again.');
        return done(error);
    }
}));

passport.serializeUser((admin, done) => {
    console.log("Serialize admin: ", admin);
    return done(null, admin.id);
});

passport.deserializeUser(async (id, done) => {
    const admin = await Admin.findById(id);
    console.log("Deserialize admin: ", admin);
    return done(null, admin);
});

passport.checkAuthIsDone = (req, res, next) => {
    console.log("Authentication : ", req.isAuthenticated());

    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('warning', 'Please login to access this page.');
    return res.redirect('/');
}

passport.checkAuthIsNotDone = (req, res, next) => {
    console.log("Authentication : ", req.isAuthenticated());

    if (!req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/dashboard');
}

passport.currentAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.admin = req.user;
    }
    next();
};