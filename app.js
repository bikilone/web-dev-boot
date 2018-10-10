var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite HIll",
//         image: "https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg",
//         description: "This is a huge hill, no bathrooms, no water"
//     }, function (err, success) {
//         if (err) {
//             console.log("There was an erro", err);
//         } else {
//             console.log(success);
//         }
//     })




app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("home-page");
});

app.get("/campgrounds", function (req, res) {

    Campground.find({}, function(err, success) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds", { campgrounds: success })
        }
    })
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};

    Campground.create(newCampground, function(err, success) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, success) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: success})
        }
    })
})

app.listen("3000", process.env.IP, function () {
    console.log("server has started");
});