const axios = require("axios");

const getNearbyDestinations = async (location, radius, destinationType) => {
  const destinations = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${destinationType}&location=${location.latitude},${location.longitude}&radius=${radius}&type=${destinationType}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(destinations);
    if (response.data.results) {
      const placesDict = [];

      

      for (const place of response.data.results){ //response.data.results.forEach this for each wont work for asynchronous method
        let latitude = place.geometry.location.lat;
        let longitude = place.geometry.location.lng;
        getDescriptions(place.name)
        
        // Only add places that have a photo reference

        let photo_aaa =
          place.photos && place.photos.length ? await getPhoto(place) : false;

        placesDict.push({
          name: place.name,
          location: { latitude: latitude, longitude: longitude },
          rating: place.rating,
          photoRef: photo_aaa,
        });
       
      };

      return placesDict;
    }
    return [];
  } catch (err) {
    return [];
  }
};

const getDescriptions = async (placeName) => {
  try{
    const desc = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/Patan Darbar Square`)
    if(desc.data){
      return desc.data.extract;
      
    }
    else{
      return false
      
    }
  }catch(err){
    return false
  }
};

const getPhoto = async (place) => {
  const  photo_aaa = await axios.get(
    `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${place.photos[0].photo_reference}&maxwidth=400&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    { responseType: "arraybuffer" }
  );
  let imageData = photo_aaa !== false ? photo_aaa.data : false;
  if (imageData) {
    // Convert the binary image buffer to a base64 encoded string
    const base64Image = Buffer.from(imageData, "binary").toString("base64");
    return `data:image/jpeg;base64,${base64Image}`;
  }
  return false;
};

module.exports = { getNearbyDestinations };
