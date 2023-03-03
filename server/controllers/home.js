var Amadeus = require('amadeus');
module.exports = {
  getIndex: (req, res) => {
    var Amadeus = require('amadeus');
    var amadeus = new Amadeus({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    });
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: 'BKK',
        destinationLocationCode: 'LAX',
        departureDate: '2023-06-01',
        adults: '2',
        currencyCode:'USD',
        max: 3,
    }).then(function(response){
      response.data = response;
      const data = JSON.parse(response.data.body);
      console.log(response); 
      console.log(response.headers.date); 
      return res.json({message:data})
    }).catch(function(responseError){
      console.log(responseError.code);
    });


    // const flightQuery = async () => {
    //   amadeus.shopping.flightOffersSearch.get({
    //     originLocationCode: 'SYD',
    //     destinationLocationCode: 'BKK',
    //     departureDate: '2022-06-01',
    //     adults: '2'
    // }).then(function(response){
    //   console.log(response.data);
    // }).catch(function(responseError){
    //   console.log(responseError.code);
    // });
 
  }
}
