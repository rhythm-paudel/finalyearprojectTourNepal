const axios = require("axios");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const getNearbyDestinations = async (latitude,longitude, radius, destinationType) => {

  let lat = parseFloat(latitude)
  let lon = parseFloat(longitude)
  let rad = parseFloat(radius)
  let destinations = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${destinationType}&location=${lat},${lon}&radius=${rad}&type=${destinationType}&key=${process.env.GOOGLE_MAPS_API_KEY}`;


  
  try {
    if (isNaN(rad)) {

      destinations = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${radius}+in+Nepal&region=np&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    }

    const response = await axios.get(destinations);
    if (response.data.results) {
      const placesDict = [];

      for (const place of response.data.results) {
      
        
        //response.data.results.forEach this for each wont work for asynchronous method
        let latitude = place.geometry.location.lat;
        let longitude = place.geometry.location.lng;

        // Only add places that have a photo reference
        let photo_aaa =
          place.photos && place.photos.length ? await getPhoto(place) : false;

        placesDict.push({
          name: place.name,
          //description: descriptionOfPlace,
          location: { latitude: latitude, longitude: longitude },
          rating: place.rating,
          photoRef: photo_aaa,
        });
      }

      return placesDict;
    }

    return [];
  } catch (err) {
    console.log(err.message);
    return [];
  }
};

const getPhoto = async (place) => {
  const photo_aaa = await axios.get(
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

const getDescription = async (placeName) => {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-pro-exp-02-05",
  });
  
  const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result =
      await chatSession.sendMessage(`Provide me a short description in about 2 sentences about ${placeName}. If the place is unknown or you dont have
                                      enough information about it, reply with "Description for this place is unavailable." Note all the place  are in Nepal
                                      if you think otherwise just say "Description for this place is unavailable." If it is an tourist attraction stricly 
                                      reply with "SAARC NATIONAL FEE:NPRXXX FOREIGNER FEE:NPRXXX in separate lines". Directly give the description without mentioning anything
                                      like Okay, or here is the description. This response will be put in a description page for places that's why. Make sentences short 
                                      as possible. Directly start from description then prices nothing else. If unknown about the fees please no assumptions.
                                      Only give description or prices if known. If the place is veg or non-veg kindly mention that too, again if unknow just say nothing about
                                      veg or non-veg.

`);
    console.log(result.response.text());
    return result.response.text();
  }

  return await run();
};

module.exports = { getNearbyDestinations };
