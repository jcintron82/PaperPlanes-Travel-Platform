var Amadeus = require('amadeus');

let originLocation = '';
let destinationLocation = '';
let departureDate = '';
let returnDate = '';
let adults = 1;
let maxPrice = 5000;
let flightClass = '';


module.exports = {
  searchInput: (req, res) => {
    console.log(req.body)
    originLocation = req.body.departure;
    destinationLocation = req.body.arrival;
    departureDate = req.body.departureDate;
    adults = req.body.numOfTravelers;
    maxPrice = req.body.maxPrice;
    flightClass = req.body.flightClass;
    returnDate = departureDate 
  
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
        currencyCode:'USD',
        max: 10,
        nonStop: true,
        travelClass: flightClass,
        maxPrice: maxPrice
        // originLocationCode: 'JFK',
        // destinationLocationCode: 'LAX',
        // departureDate: '2023-06-01',
        // returnDate:  '2023-06-15',
        // adults: 1,
        // currencyCode:'USD',
        // max:5,
        // nonStop: true,
        // travelClass: 'BUSINESS',
        // maxPrice: 5000

    }).then(function(response){
      response.data = response;
      const data = JSON.parse(response.data.body);
      // confirmFlightPrice(response.data.body.data)
      // console.log(data.dictionaries.carriers)

      // for (let i = 0; i< response.data.body.length;i++){
      //   amadeus.referenceData.airlines.get({
      //     airlineCodes : data.data[i].itineraries[i].segments[i].carrierCode,
      //  }).then((response) => {
      //   console.log( response.data[0].businessName + 'HI')
      //   carrierCodes.push(response)
      //  });
      // }

  
        return res.json({message:data, carriers: data.dictionaries.carriers})
      } )
    
      
    //   for(let i = 0; i < response.length; i++) {      
        
    //     amadeus.referenceData.airlines.get({
    //     airlineCodes : data.data[0].itineraries[0].segments[0].carrierCode,
    //  }).then((response) => {
    //   console.log(response)
    //   code = response
    //  });}

    .catch(function(responseError){
      console.log(responseError.code + 'HMMMM');

    });

    // const confirmFlightPrice = async (data) => {
    //   console.log('confirmFlightPrice' + data)
    //   const pull = await fetch("https://test.api.amadeus.com/v1/shopping/flight-offers/pricing?include=credit-card-fees&forceClass=false", {
    //     body: data,
    //     headers: {
    //       Accept: "application/vnd.amadeus+json",
    //       Authorization: "Bearer r4ZGymi0BGQUApvopt3GwoHUipIl",
    //       "Content-Type": "application/vnd.amadeus+json"
    //     },
    //     method: "POST"
    //   });
    //   const result = await pull.json();
    //   console.log(result)
    // };
 
}}
