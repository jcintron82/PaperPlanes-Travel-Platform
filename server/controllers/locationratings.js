var Amadeus = require("amadeus");
let latitude = "";
let longitude = "";
module.exports = {
  postToAPI: (req, res) => { 
    console.log("YOUR LOG")
    latitude = req.body.latitude;
    longitude = req.body.longitude;
    res.send('Post OK')
  },

  getResults:(req, res) => {
    console.log(latitude)
    console.log(longitude)
    var amadeus = new Amadeus({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
      });
    amadeus.safety.safetyRatedLocations
      .get({
        // latitude: parseFloat(latitude),
        // longitude: parseFloat(longitude),
        latitude:25.79334,
        longitude: -80.28999
        


      })
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

