const express = require("express");
const app = express();
const mongoose = require("mongoose");
 const Listing = require("./models/listing.js");
const path = require("path");

const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
.then(() => {
    console.log("Connected to DB");
})
.catch((err) =>{
    console.log(err);
});


async function main(){
    await mongoose.connect(Mongo_URL)
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.send("Hi, I am root");
});

//Index Route
app.get("/listings", async (req, res) => {
   const allListings =  await Listing.find({});
   res.render("listings/index.ejs",{ allListings });
});

//show ROute
app.get("/listings/:id", async (req, res) => {
    let {id} =req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

//Create Route
app.post("/listings", async (req, res) => {
    //let{title, description, image, price, country, location} = req.body;
    //let listing = req.body.listing;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// app.get("/testListing", async (req, res)=> {
//   let sampleListing = new Listing({
//      title: "My New Villa",
//      description: "By the beach",
//      price: 1200,
//      location: "Calangut, Goa",
//      country:"India",
// });

// await sampleListing.save();
// console.log("sample was saved");
// res.send("successful testing");
// });

app.listen(8080, ()=>{
    console.log("server is listening to port 8080");
});