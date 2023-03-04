var Amadeus = require('amadeus');

let originLocation = '';
let destinationLocation = '';

module.exports = {
  searchInput: (req, res) => {
    console.log(req.body)
    originLocation = req.body.departure;
    destinationLocation = req.body.arrival
    res.send({message:"OK"})
  },
  getIndex: (req, res) => {
    var amadeus = new Amadeus({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    });
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: originLocation,
        destinationLocationCode: destinationLocation,
        departureDate: '2023-06-01',
        adults: '2',
        currencyCode:'USD',
        max: 2,
        nonStop: true,
    }).then(function(response){
      response.data = response;
      const data = JSON.parse(response.data.body);
      console.log(response); 
      // confirmFlightPrice(response.data.body.data)
      return res.json({message:data})
    }).catch(function(responseError){
      console.log(responseError.code);
    });
    const confirmFlightPrice = async (data) => {
      console.log('confirmFlightPrice' + data)
      const pull = await fetch("https://test.api.amadeus.com/v1/shopping/flight-offers/pricing?include=credit-card-fees&forceClass=false", {
        body: data,
        headers: {
          Accept: "application/vnd.amadeus+json",
          Authorization: "Bearer r4ZGymi0BGQUApvopt3GwoHUipIl",
          "Content-Type": "application/vnd.amadeus+json"
        },
        method: "POST"
      });
      const result = await pull.json();
      console.log(result)
    };
 
  }
}
