var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

 

/// index route
router.get("/", function (req, res) {

    Campground.find({}, function (err, success) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/campgrounds", { campgrounds: success })
        }
    })
});

// create route
router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var newCampground = {
        name: name, 
        image: image,
        description: description,
        price: price,
        author:
        {
            id: req.user._id,
            username: req.user.username
        }
    };
    Campground.create(newCampground, function (err, success) {
        if (err) {
            console.log(err);
        } else {
            console.log(success)
            res.redirect("/campgrounds");
        }
    })
});

/// new route
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
}); 
// show route
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, success) {
        if (err) {
            console.log(err);
        } else {
            console.log(success)
            res.render("campgrounds/show", { campground: success })
        }
    })
});

// edit
router.get("/:id/edit",middleware.checkCamgroundOwnerShip, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            req.flash("error", "Campground not found")
        }
        res.render("campgrounds/edit", { campground: foundCampground });
    })
})


// update

router.put("/:id",middleware.checkCamgroundOwnerShip,function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, update) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

// delete

router.delete("/:id",middleware.checkCamgroundOwnerShip,function (req, res) {
    Campground.findByIdAndDelete(req.params.id, function (err, success) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})




module.exports = router; 