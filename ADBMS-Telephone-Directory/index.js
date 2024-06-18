const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Person = require('./models/preson.model');
const app = express();

app.use(cors());

app.get('/',(req,res)=>{
    res.send('hello world!!');
});

//Databse connection
mongoose.connect("mongodb+srv://admin:admin@telephone-app.8fatyrt.mongodb.net/?retryWrites=true&w=majority&appName=Telephone-app")
.then(()=>{
    console.log('connected to the database!');

    app.listen(3000,()=>{
        console.log('server listening at port 3000');
    });

    })

.catch(()=>{
    console.log('connection failed');
});

app.use(express.json());
app.post('/add-person',async (req,res)=>{
    try{
         const person = new Person({
            name: req.body.name,
            address: {
                city: req.body.address.city,
                street: req.body.address.street
            },
            phone: {
                primaryContactNumber: req.body.phone.primaryContactNumber,
                secondaryContactNumber: req.body.phone.secondaryContactNumber
            },
            postalcode: req.body.postalcode

         });
         const savedPerson = await person.save();
         res.status(201).json(savedPerson);
    }
    catch(error)
    {
        res.status(400).json({message:error.message});
    }
});

app.get('/persons',async(req,res)=>{
    try{
       const person = await Person.find({})
       res.send(person);
    }
    catch(error)
    {
        res.status(400).json({message:error.message});
    }
})
app.get('/person/:id',async(req,res)=>{
    try{
        const {id} =req.params;
       const person = await Person.findById(id);
       res.send(person);
    }
    catch(error)
    {
        res.status(400).json({message:error.message});
    }
})

app.put('/person/edit/:id',async(req,res)=>{
    try{
    const{id} = req.params;
    const person = await Person.findByIdAndUpdate(id,req.body);

        if(!person)
            {
                return res.status(404).json({message:"Person not found"});
            }
            const updatedPerson = await Person.findById(id);
            return res.status(200).json(updatedPerson);
        }
        catch(error)
        {
            res.status(400).json({message:error.message});
        }
});


//delete a product
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
app.delete('/person/delete/:id',async(req,res)=>{

    try{
            const {id} = req.params;
            const person = await Person.findByIdAndUpdate(id);

            if(!person)
                {
                    return res.status(400).json({message:'no record found!'});
                }

                return res.status(200).json({message:'person deleted'});

    }
    catch(error)
    {
        res.status(400).json({'message':error.message});
    }


});
