var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds Rest",
        image: "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=76a6fe71178051755a01c265ede2f17b&auto=format&fit=crop&w=500&q=60",
        description: "Lorem Ipsum је једноставно модел текста који се користи у штампарској и словослагачкој индустрији. Lorem ipsum је био стандард за модел текста још од 1500. године, када је непознати штампар узео кутију са словима и сложио их како би направио узорак књиге. Не само што је овај модел опстао пет векова, него је чак почео да се користи и у електронским медијима, непроменивши се. Популаризован је шездесетих година двадесетог века заједно са листовима летерсета који су садржали Lorem Ipsum пасусе, а данас са софтверским пакетом за прелом као што је Aldus PageMaker који је садржао Lorem Ipsum верзије."
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbebfe204ad7e04d558d7e0cbc0d2eb&auto=format&fit=crop&w=500&q=60",
        description: "Lorem Ipsum је једноставно модел текста који се користи у штампарској и словослагачкој индустрији. Lorem ipsum је био стандард за модел текста још од 1500. године, када је непознати штампар узео кутију са словима и сложио их како би направио узорак књиге. Не само што је овај модел опстао пет векова, него је чак почео да се користи и у електронским медијима, непроменивши се. Популаризован је шездесетих година двадесетог века заједно са листовима летерсета који су садржали Lorem Ipsum пасусе, а данас са софтверским пакетом за прелом као што је Aldus PageMaker који је садржао Lorem Ipsum верзије."
    },
    {
        name: "Canyon Floor",
        image: "https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=806fc4197fbc5dc5f67c87e4284691fb&auto=format&fit=crop&w=500&q=60",
        description: "Lorem Ipsum је једноставно модел текста који се користи у штампарској и словослагачкој индустрији. Lorem ipsum је био стандард за модел текста још од 1500. године, када је непознати штампар узео кутију са словима и сложио их како би направио узорак књиге. Не само што је овај модел опстао пет векова, него је чак почео да се користи и у електронским медијима, непроменивши се. Популаризован је шездесетих година двадесетог века заједно са листовима летерсета који су садржали Lorem Ipsum пасусе, а данас са софтверским пакетом за прелом као што је Aldus PageMaker који је садржао Lorem Ipsum верзије."
    }
];

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function (err) {
        console.log("Removed all");
        // add a few campgrounds
        data.forEach(function (camp) {
            Campground.create(camp, function (err, campground) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Ddada");
                    /// 
                    Comment.create(
                        {
                            text: "random",
                            author: "Homer"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("new comment")
                                campground.comments.push(comment);
                                campground.save();
                            }
                        })
                }
            })
        })
    });
}

module.exports = seedDB;