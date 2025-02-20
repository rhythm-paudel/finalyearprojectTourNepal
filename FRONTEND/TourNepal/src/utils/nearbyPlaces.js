import { getNearbyPlaces } from "../api/authService";

export const nearbyPlaces = async(radii,currentSelection)=>{

    const locationDetail = {location:{latitude:27.656426,longitude:85.337492},radius:radii,destinationType:currentSelection};

    try{
        const places = [];
        const response = await getNearbyPlaces(locationDetail);
        if(response.status===200){
            const place=response.data.ref
            for(let i=0;i<place.length;i++){
                console.log(place[i].description);
                places.push(
                    {
                      id: `${place[i].location.latitude},${place[i].location.longitude}`,
                      name: place[i].name,
                      rating: `⭐ (${place[i].rating}/5)`,
                      reviews: 0,
                      photo: place[i].photoRef,
                      description: place[i].description
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


 //location function
 export const getLocation = async()=>{
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).catch(
      err=>{console.log(err)}
    )
    return granted===PermissionsAndroid.RESULTS.GRANTED;
  }

  //check permission
  export const checkPermission = async()=>{
    let granted = await getLocation();
    console.log(granted);
  }