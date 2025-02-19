const axios = require("axios");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const getNearbyDestinations = async (location, radius, destinationType) => {
  const destinations = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${destinationType}&location=${location.latitude},${location.longitude}&radius=${radius}&type=${destinationType}&key=${process.env.GOOGLE_MAPS_API_KEY}`;


  

  try {
    const response = await axios.get(destinations);
    if (response.data.results) {
      const placesDict = [];

      

      for (const place of response.data.results){ //response.data.results.forEach this for each wont work for asynchronous method
        let latitude = place.geometry.location.lat;
        let longitude = place.geometry.location.lng;
     
        
        // Only add places that have a photo reference
        let photo_aaa =
          place.photos && place.photos.length ? await getPhoto(place) : false;

        //declaring description variable
        let descriptionOfPlace = ""


        if(destinationType==="tourist_attraction"){  
          descriptionOfPlace = await getDescription(place.name);
        }else{
          descriptionOfPlace = "";
        }
        placesDict.push({
          name: place.name,
          location: { latitude: latitude, longitude: longitude },
          rating: place.rating,
          photoRef: photo_aaa,
          description: descriptionOfPlace
        });
       
      };

      return placesDict;
    }
    return [];
  } catch (err) {
    return [];
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


const getDescription = async (placeName)=>{
  
  
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(`Provide me a short description in about 4 sentences about ${placeName}. If nothing is found simple
                                                  return empty string as a message. The description should be short and concise`);
    console.log(result.response.text());
  }
  
  run();
}

module.exports = { getNearbyDestinations };
