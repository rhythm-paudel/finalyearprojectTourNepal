const axios = require("axios");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const getNearbyDestinations = async (location, radius, destinationType) => {
  let destinations = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${destinationType}&location=${location.latitude},${location.longitude}&radius=${radius}&type=${destinationType}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  try {
    if (typeof radius !== "number") {
      destinations = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${radius}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
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

        //declaring description variable
        let descriptionOfPlace = "";

       
        descriptionOfPlace = await getDescription(place.name);
        
        placesDict.push({
          name: place.name,
          description: descriptionOfPlace,
          location: { latitude: latitude, longitude: longitude },
          rating: place.rating,
          photoRef: photo_aaa,
        });
      }

      return placesDict;
    }
    return [];
  } catch (err) {
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
      history: [],
    });

    const result =
      await chatSession.sendMessage(`Provide a 4-sentence description of ${placeName}. Only respond for verified famous locations/attractions - return empty string for unknown/unverified places or restaurants.

                                      For restaurants: Include 'Veg'/'Non-veg' type only if internationally recognized (e.g., Bhojan Griha).

                                      For tourist attractions:

                                      Add a separate pricing paragraph only if entry fees for foreigners exist.
                                      Format:
                                      ~ NPR X,XXX (Foreigners)
                                      Nepali citizens: Free/Not applicable
                                      Unavailable if data unknown
                                      Use NPR only. Never include national monuments/government bodies' fees.
                                      Structure:

                                      Concise 4-line description
                                      Pricing (if applicable): Bullet points with * symbols.
                                      Return empty string if place isn't notable/real. No apologies/assumptions."
                                      Key Improvements:

                                      Strict validation to prevent fictional/lesser-known places
                                      Clear veg/non-veg labeling only for iconic restaurants
                                      Standardized pricing format excluding restaurants
                                      Explicit foreigner-Nepali pricing distinction
                                      Removal of speculative content ("unknown" vs assumptions)
                                      Example Output:
                                      For "Swayambhunath Stupa":
                                      "Ancient Buddhist stupa atop a hill in Kathmandu. Known as Monkey Temple for its resident primates. UNESCO World Heritage Site with panoramic city views. Features iconic Buddha eyes and intricate architecture.

                                      Pricing:

                                      ~ NPR 200 (Foreigners)
                                      Nepali citizens: Free"
                                      For "Random Cafe123":

                                      If no response is to be sent return "Description is unavailable for  this place"
`);
    console.log(result.response.text());
    return result.response.text();
  }

  return await run();
};

module.exports = { getNearbyDestinations };
