const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");

app.listen(process.env.PORT || 3000,()=>{
    console.log("Connection Successful!");
});

app.use(express.json());

app.use(express.urlencoded({extended:true}));

require('dotenv').config();

async function main(){
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_URL}.mongodb.net/${process.env.DB_URL}`,{useNewUrlParser:true});
}

main().catch(err=>console.log(err));

app.use(express.static(path.join(__dirname,"./client/build")));

app.get('*',(req,res)=>{
    res.sendFile(
        path.join(__dirname,"./client/build/index.html"),(err)=>{
            if(err){
                res.status(500).json(err);
            }
        }
    );
});

const flightSchema = new mongoose.Schema({
    name: String,
    price: Number,
    total_seats: Number,
    available_seats: Number,
    route: String
});

const routeSchema = new mongoose.Schema({
    source_to_destination: String,
    flights: [flightSchema]
});

const Route= mongoose.model('Route', routeSchema);

app.post("/",(req,res)=>{

    const s=req.body.source;
    const d=req.body.destination;
    const dt=req.body.date;

    const s_to_d = s + "-" + d;

    Route.collection.findOne({source_to_destination:s_to_d},(err,foundItem)=>{
        if(err){
            console.log(err);
        }else{
            console.log("ROUTE FOUND for",s_to_d,"on",dt);
            return res.status(200).json({...foundItem});
        }
    });
});


// Used CHATGPT to generate dummy results and populate the database in MongoDb!
// The below code was used to over and over again to acheive the same.

// app.get("/",(req,res)=>{

//     const route=new Route({
//         source_to_destination: "Hyderabad-Delhi",
//         flights: arr
//     });

//     Route.collection.insertOne(route,(err)=>{
//         if(err){
//             return res.status(400).json({message:"ERROR"});
//         }else{
//             console.log("ROUTE INPUT SUCCESSFUL");
//             return res.status(200).json({message:"SUCCESSFUL"});
//         }
//     })
//   });

// const arr = [
//     {
//       "name": "Air India",
//       "price": 4500,
//       "total_seats": 150,
//       "available_seats": 73,
//       "route": "Hyderabad-Bengaluru-Delhi"
//     },
//     {
//       "name": "IndiGo",
//       "price": 3800,
//       "total_seats": 180,
//       "available_seats": 105,
//       "route": "Hyderabad-Pune-Delhi"
//     },
//     {
//       "name": "SpiceJet",
//       "price": 3200,
//       "total_seats": 200,
//       "available_seats": 57,
//       "route": "Hyderabad-Mumbai-Delhi"
//     },
//     {
//       "name": "Vistara",
//       "price": 5000,
//       "total_seats": 160,
//       "available_seats": 120,
//       "route": "Hyderabad-Chennai-Delhi"
//     },
//     {
//       "name": "GoAir",
//       "price": 2800,
//       "total_seats": 190,
//       "available_seats": 80,
//       "route": "Hyderabad-Kolkata-Delhi"
//     },
//     {
//       "name": "AirAsia India",
//       "price": 3500,
//       "total_seats": 175,
//       "available_seats": 65,
//       "route": "Hyderabad-Jaipur-Delhi"
//     },
//     {
//       "name": "Air India",
//       "price": 4200,
//       "total_seats": 170,
//       "available_seats": 60,
//       "route": "Hyderabad-Ahmedabad-Delhi"
//     },
//     {
//       "name": "IndiGo",
//       "price": 3900,
//       "total_seats": 185,
//       "available_seats": 95,
//       "route": "Hyderabad-Lucknow-Delhi"
//     },
//     {
//       "name": "SpiceJet",
//       "price": 3300,
//       "total_seats": 195,
//       "available_seats": 135,
//       "route": "Hyderabad-Varanasi-Delhi"
//     },
//     {
//       "name": "Vistara",
//       "price": 4800,
//       "total_seats": 165,
//       "available_seats": 50,
//       "route": "Hyderabad-Bhubaneswar-Delhi"
//     }
//   ]
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  