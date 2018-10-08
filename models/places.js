const mongoose = require("mongoose");
//Schema Set up

const placeSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comments"

        }
    ]
});

module.exports = mongoose.model("places",placeSchema);