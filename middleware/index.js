var Comment = require("../models/comment");
var Campground = require("../models/campground");
var flash = require("connect-flash");

var middlewareObj = {}; 

middlewareObj.checkCamgroundOwnerShip = function (req, res, next ) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                res.redirect("back")
            } else {
                // does own campground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You dont have permision to do that")
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "You have to be logged in to do that")
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}

middlewareObj.checkCommentOwnerShip = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("back")
            } else {
                // does own Comment
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("eror", "You do not have permision to do that")
                    res.redirect("back");
                }
            }
        })
    } else {
        res.redirect("back");
        req.flash("error", "You need to be logged in to do that")
    }
}


module.exports = middlewareObj;