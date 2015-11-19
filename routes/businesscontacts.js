var express = require('express');
var passport = require('passport');
var router = express.Router();

var mongoose = require('mongoose');
var Businesscontact = require('../models/businesscontact');



/* Utility functin to check if businesscontact is authenticatd */
function requireAuth(req, res, next){

  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  next();
}

/* Render main page. */
router.get('/', requireAuth, function (req, res, next) {
    Businesscontact.find(function (err, businesscontacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('businesscontacts/index', {
                title: 'Business Contact',
                businesscontacts: businesscontacts,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});


/* Render the Add Page */
router.get('/add', requireAuth, function (req, res, next) {
    res.render('businesscontacts/add', {
        title: 'Add a contact',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* process of a new businesscontact */
router.post('/add', requireAuth, function (req, res, next) {
    var businesscontact = new Businesscontact(req.body);
    Businesscontact.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        created: Date.now(),
    }, function (err, businesscontacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesscontacts');
        }
    });
});

/* Render the Edit Page */
router.get('/:id', requireAuth, function (req, res, next) {
    // create id variable
    var id = req.params.id;
    Businesscontact.findById(id, function (err, businesscontacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
                res.render('businesscontacts/edit', {
                title: 'Edit a contact',
                businesscontacts: businesscontacts,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});


router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    var businesscontact = new Businesscontact(req.body);
    businesscontact._id = id;
    
    // use mongoose for the update
    Businesscontact.update({ _id: id }, businesscontact, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesscontacts');
        }
    });
});

/* run delete on the selected business */
router.get('/delete/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Businesscontact.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesscontacts');
        }
    });
});

module.exports = router;
