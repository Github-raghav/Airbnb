import { useState } from "react";
import ReactMapGL, {Marker,Popup}from "react-map-gl";
import { getCenter } from "geolib";

function Map({searchResults}) {
    // transform searchresult object into the {latitude, longitude}object
    const[selectedLocation,setSelectedLocation]=useState({});
    const coordinates = searchResults.map((result)=>({
        longitude:result.long,
        latitude:result.lat,
    }));
    // console.log(coordinates);
    const center=getCenter(coordinates);
    const[ viewport,setViewport]=useState({
        width:"100%",
        height:"100%",
        latitude:center.latitude,
        longitude:center.longitude,
        zoom:11,
    });
// console.log(center);

    return( <ReactMapGL 
        mapStyle='mapbox://styles/raghavarora/cks5olg5a7cfi17qolqvc9e1e'
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport)=>setViewport(nextViewport)}
        >
                 {searchResults.map(result=>(
                     <div key={result.long}>
                         <Marker
                             longitude={result.long}
                             latitude={result.lat}
                             offsetLeft={-20}
                             offsetTop={-10}>
                                 <p onClick={()=>setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce"> 📌 </p>
                         </Marker>
                         {/* this  is pop up tht pops when clicked on marker */}
                         {selectedLocation.long == result.long ? (
                              <Popup
                              onClose={()=>setSelectedLocation({})}
                              closeOnClick={true}
                              latitude={result.lat}
                              longitude={result.long}
                              >
                                  {result.title}
                              </Popup>
                         ) : (false)}
                     </div>
                 ))}
        </ReactMapGL>
        
    )
}

export default Map
