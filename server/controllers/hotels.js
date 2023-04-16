var Amadeus = require('amadeus');

module.exports = {
    getHotels: (req, res) => {
    var amadeus = new Amadeus({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    });
    amadeus.referenceData.locations.hotels.byCity.get({
        cityCode: 'PHL',
        vinclude: 'ADDRESS',
        raidus:50
        
      })
      .then((response) => {
        res.send(response)
      })
      .catch((error) => {
        console.log(error)
      })
}};