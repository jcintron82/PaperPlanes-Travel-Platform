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
const carriers = [];
module.exports = {
  searchInput: (req, res) => {
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
        // destinationLocationCode: 'JFK',
        // departureDate: '2023-06-01',
        // // returnDate:  '2023-06-15',
        // adults: 1,
        // children:0,
        // currencyCode:'USD',
        // max:50,
        // nonStop: true,
        // travelClass: 'ECONOMY',
        // maxPrice: 2000

    }).then(function(response){
      response.data.splice(0, response.data - 1);
      carriers.push(response.result.dictionaries);
      console.log(response.data);
      response.data = response;
      const data = JSON.parse(response.data.body);
      return res.json({message:data, travelerCounts, carriers})
      // return amadeus.shopping.flightOffers.pricing.post(
      //   JSON.stringify({
      //     'data': {
      //       'type': 'flight-offers-pricing',
      //       'flightOffers': response.data
      //     }
      //   })
      // )
  // }).then(function(response){
     
  }).catch(function(responseError){
      console.log(responseError);
  });
}}
