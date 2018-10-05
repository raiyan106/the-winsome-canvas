const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost/winsome-canvas",{useNewUrlParser:true})
        .then(()=>{console.log(`Connected to database`)})
        .catch((err)=>{console.log(`Could not connect ${err}`)});


//Schema Set up

const placeSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String
});

const Places = mongoose.model("places",placeSchema);





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

// Places.create({
//     name: 'Shangshad Bhaban',
//     image:'https://media.dhakatribune.com/uploads/2013/06/JS-5.jpg',
//     description:"Parliament house of bangladesh, everyone is immune here :D"
// });


app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render("landing");
});

app.get("/places", async (req,res)=>{

    const places = await Places.find();

    res.render("index",{places:places});
});

app.get("/places/new",(req,res)=>{
    res.render("new.ejs");
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

app.get("/places/:id", async (req,res)=>{
    const place = await Places.findById(req.params.id);
    res.render("show",{place:place});
});


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Winsome Canvas App listening on port: ${port}`);
});