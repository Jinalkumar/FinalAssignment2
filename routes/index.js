var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Businesscontact = require('../models/businesscontact');


/* Render home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
        successRedirect : '/users',
    failureRedirect : '/register',
    failureFlash : true
}));


/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});



/* Get Business page */
router.get('/businesscontact', function(req, res, next) {
   res.render('businesscontact'); 
});

/* Get about page */
router.get('/about', function(req, res, next) {
   res.render('about'); 
});

/*Get projects page*/

router.get('/projects', function(req, res, next) {
   res.render('projects'); 
});

/*Get services page*/

router.get('/services', function(req, res, next) {
   res.render('services'); 
});

/*Get contact me form*/

router.get('/contactMe', function(req, res, next) {
   res.render('contactMe'); 
});


module.exports = router;
