import { getNearbyPlaces } from "../api/authService";

export const nearbyPlaces = async(radii)=>{

    const locationDetail = {location:{latitude:27.656426,longitude:85.337492},radius:radii,destinationType:"restaurant"};

    try{
        const places = [];
        const response = await getNearbyPlaces(locationDetail);
        if(response.status===200){
            const place=response.data.ref
            for(let i=0;i<place.length;i++){
                console.log(place[i].name);
                places.push(
                    {
                      id: `${place[i].location.latitude}-${place[i].location.longitude}`,
                      name: place[i].name,
                      rating: `⭐ (${place[i].rating}/5)`,
                      reviews: 0,
                      photo: place[i].photoRef
                    }
                )
            }

            return places;
        }else{
            return [];
        }
    }catch(e){
        return [];
   
    }
}