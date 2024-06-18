const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,"The name is required"]
        },
        address:{
            city:
            {
                type:String,
            required:[true,"The city is required"]
            },
            street:
            {
                type:String,
                required:[true,"The streetrt is required"]
            }
        },
        phone:
        {
            primaryContactNumber:
            {
                type:Number,
                required:[true,"The primary contact number is required"]
            },
            secondaryContactNumber:
            {
                type:Number,
                required:[false]
            }
        },
        postalcode:{
            type:Number,
            required:[false],
            
        },

    },
    {
        timestamps:true
    }

);

const Person = mongoose.model("Person",PersonSchema);

module.exports =  Person;