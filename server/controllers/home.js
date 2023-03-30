var Amadeus = require('amadeus');

let originLocation = '';
let destinationLocation = '';
let departureDate = '';
let returnDate = '';
let adults = 2;
let children = 1;
let maxPrice = 5000;
let flightClass = '';
const travelerCounts = {
  adults:1,
  children:0
};
const carriers = []
module.exports = {
  searchInput: (req, res) => {
    console.log(req.body)
    originLocation = req.body.departure;
    destinationLocation = req.body.arrival;
    departureDate = req.body.departureDate;
    adults = req.body.adults;
    children = req.body.children;
    maxPrice = req.body.maxPrice;
    flightClass = req.body.flightClass;
    returnDate = req.body.returnDate 
    travelerCounts.adults = req.body.adults;
    travelerCounts.children = req.body.children;
    res.send({message:"POST OK"})
  },
  getIndex: (req, res) => {
    var amadeus = new Amadeus({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    });
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: originLocation,
        destinationLocationCode: destinationLocation,
        departureDate: departureDate,
        returnDate: returnDate,
        adults: adults,
        children:children,
        currencyCode:'USD',
        max: 10,
        nonStop: true,
        travelClass: flightClass,
        maxPrice: maxPrice
        // originLocationCode: 'LAX',
        // destinationLocationCode: 'SFO',
        // departureDate: '2023-03-31',
        // returnDate:  '2023-06-15',
        // adults: 2,
        // children:0,
        // currencyCode:'USD',
        // max:5,
        // nonStop: true,
        // travelClass: 'ECONOMY',
        // maxPrice: 5000

    }).then(function(response){
      response.data = response;
      const offers = response.data
      const data = JSON.parse(response.data.body);
      return res.json({message:data, carriers: data.dictionaries.carriers, travelerCounts})
      } )

    .catch(function(responseError){
      console.log(responseError);

    });


 
}}
