const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejsLint = require("ejs-lint");

const mongoose = require("mongoose");
const Places = require("./models/places");
const Comments = require("./models/comments");
const seedDB = require("./seeds");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const Users = require("./models/users");




app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost/winsome-canvas",{useNewUrlParser:true})
        .then(()=>{console.log(`Connected to database`)})
        .catch((err)=>{console.log(`Could not connect ${err}`)});

 seedDB();


 // Passport Config

 app.use(require('express-session')({
     secret:"mySecretKey",
     resave:false,
     saveUninitialized:false
 }));

 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new LocalStrategy(Users.authenticate()));
 passport.serializeUser(Users.serializeUser());
 passport.deserializeUser(Users.deserializeUser());






let places = [
    {
        name: 'Shangshad Bhaban',
        image:'https://media.dhakatribune.com/uploads/2013/06/JS-5.jpg'
    },
    {
        name: 'LalBagh Kella',
        image:'https://steemitimages.com/DQmZm9wc8BaawNs3SxiSNuVnqAepAo7mTVPo3taQoQ9f2LX/fort-lalbagh_raul-vibal-1000.jpg'
    },
    {
        name: 'Bashundhara City',
        image:'http://amaryellowpages.com/wp-content/uploads/2013/12/AmarYellowPages-Bashundhara-City-1.jpg'
    }
];


app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public"));

app.get('/',(req,res)=>{
    res.render("landing");
});

app.get("/places", async (req,res)=>{

    const places = await Places.find();

    res.render("places/index",{places:places});
});

app.get("/places/new",(req,res)=>{
    res.render("places/new");
});

app.post("/places",async (req,res)=>{
     const newPlace = new Places({
         name:req.body.name,
         image:req.body.image,
         description:req.body.description
     });

     await newPlace.save();
     
     res.redirect("/places");
});



//SHOW route

app.get("/places/:id",(req,res)=>{

    Places.findById(req.params.id).populate("comments")
    .exec((err,foundPlace)=>{
        if(err) console.log("error");
        else{
           res.render("places/show",{place:foundPlace});
          

        }
    });

});


// =========== comments routes=============

app.get("/places/:id/comments/new",isLoggedIn,(req,res)=>{
    Places.findById(req.params.id,(err,place)=>{
        if(err) throw err;
        else{
            res.render("comments/new",{place:place});
        }
    })
   
});

app.post("/places/:id/comments",isLoggedIn,(req,res)=>{
    Places.findById(req.params.id,(err,foundPlace)=>{
        if(err)
        {
            console.log(err);
            return res.send("no place found");
        }
        else
        {
            Comments.create(req.body.comment,(err,comment)=>{
                if(err) console.log(err);
                else{
                    foundPlace.comments.push(comment);
                    foundPlace.save();
                    console.log("SAVED PLACE==============");
                   
                    res.redirect(`/places/${foundPlace._id}`);
                }
            })
            

        }
    });
});



// AUTH Routes

app.get('/register',(req,res)=>{
    res.render("register");
});

//Handle register
app.post('/register',(req,res)=>{
    const newUser = new Users({username:req.body.username});
    Users.register(newUser,req.body.password,(err,user)=>{
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req,res,()=>{
            res.redirect("/places");
        });
    });
});



//Login Routes
app.get('/login',(req,res)=>{
    res.render("login");
});

app.post('/login', passport.authenticate('local',{
    successRedirect:'/places',
    failureRedirect:'/login'
}),
(req,res)=>{

});

//logout routes

app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/places');
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
}


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Winsome Canvas App listening on port: ${port}`);
});