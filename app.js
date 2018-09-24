const express = require('express');
const app = express();


//Places Array
const places = [
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
]


app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render("landing");
});

app.get("/places", (req,res)=>{
    res.render("places",{places:places});
});


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Winsome Canvas App listening on port: ${port}`);
});