var Amadeus = require('amadeus');

let originLocation = '';
let departureDate = '';
let returnDate = '';
// const formattedDate = new Date(departureDate);
let destinationLocation = '';
let adults = 1;


module.exports = {
  searchInput: (req, res) => {
    console.log(req.body)
    originLocation = req.body.departure;
    destinationLocation = req.body.arrival;
    departureDate = req.body.departureDate;
    adults = req.body.numOftravelers;
    req.body.returnDate === '' ? returnDate = departureDate 
      : returnDate = req.body.returnDate;
    res.send({message:"POST OK"})
  },
  getIndex: (req, res) => {
    var amadeus = new Amadeus({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    });
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: 'LAX',
        destinationLocationCode: 'JFK',
        departureDate: departureDate,
        adults: adults,
        currencyCode:'USD',
        max: 10,
        nonStop: true,
        returnDate: returnDate,

    }).then(function(response){
      response.data = response;
      const data = JSON.parse(response.data.body);
      // confirmFlightPrice(response.data.body.data)
      return res.json({message:data})
    }).catch(function(responseError){
      console.log(responseError.code + 'HMMMM');
      originLocation = 'LAX';
      departureDate = '2023-06-08';
      destinationLocation = 'JFK';
      adults = 1;

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
