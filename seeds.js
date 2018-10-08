const mongoose = require("mongoose");
const Places = require("./models/places");
const Comments = require("./models/comments");

const data = [
    {
        name: 'Shangshad Bhaban',
        image:'https://media.dhakatribune.com/uploads/2013/06/JS-5.jpg',
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: 'LalBagh Kella',
        image:'https://steemitimages.com/DQmZm9wc8BaawNs3SxiSNuVnqAepAo7mTVPo3taQoQ9f2LX/fort-lalbagh_raul-vibal-1000.jpg',
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: 'Bashundhara City',
        image:'http://amaryellowpages.com/wp-content/uploads/2013/12/AmarYellowPages-Bashundhara-City-1.jpg',
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
];

module.exports = function(){
Places.remove().then(()=>{
    console.log("Removed");
});

// Comments.remove((err)=>{
//     if(err) console.log(err);
//     else console.log("COmments removed");
// });


//add a few places

// data.forEach((data)=>{
//     Places.create(data)
//     .then((place)=>{
//         console.log(`added place`);
//         Comments.create({
//             text:"This is a great great place",
//             author:"Raiyan"
//         });
//     })
//     .then((comment)=>{
//        place.comments.push(comment);
//        place.save();
//        console.log("New comment created"); 
//     })
//     .catch((err)=>{
//         console.log("Pasa");
//     })
// });


data.forEach((data)=>{
    Places.create(data,(err,place)=>{
        if(err) throw err;
        console.log("place added");
        Comments.create({
            text:"This is a greate place",
            author:"raiyan"
        },(err,comment)=>{
            if(err) throw err;
           place.comments.push(comment);
            place.save();
            console.log("New comment made");
        })
    })
});

}
