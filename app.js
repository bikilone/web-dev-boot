var express = require("express"),
    methodOverride = require("method-override"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    flash = require("connect-flash");
    
    /// requiring routes
    var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
    
    app.use(methodOverride("_method"));
// seed the database
// seedDB();

// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://biki1992:elpaso1906@ds139883.mlab.com:39883/yelp_camp")


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"))
// passport confing

app.use(require("express-session")({
    secret: "Once again Rusty wins",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("home-page");
});

app.listen("3000", process.env.IP, function () {
        console.log("server has started")
    });