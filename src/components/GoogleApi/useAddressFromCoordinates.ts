import { useEffect, useState } from "react";
import axios from "axios";
import { GOOGLE_API_KEY } from "./const";

export const useAddressFromCoordinates = (coords: Coordinates) => {
  const [data, setData] = useState("");
  useEffect(() => {
    const link = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords?.latitude},${coords?.longitude}&key=${GOOGLE_API_KEY}`;

    const fetchData = async () =>
      await axios
        .get(link)
        .then(function(response) {
          // handle success
          setData(response.data.results[0].formatted_address);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });

    if (coords) {
      fetchData();
    }
  }, [coords, GOOGLE_API_KEY]);
  return data;
};
