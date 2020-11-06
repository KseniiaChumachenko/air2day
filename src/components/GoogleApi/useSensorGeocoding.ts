import axios from "axios";
import { useEffect, useState } from "react";
import { Sensor } from "../../graphql/generated/graphql";
import { GOOGLE_API_KEY } from "./const";

const ADDRESS_MAP = new Map([
  ["ASUCA", "Nad Helmrovkou 261, 165 00 Praha-Lysolaje, Czechia"],
  ["ACHOA", " Vejvanovského 1613/2, 149 00 Praha 11-Chodov, Czechia"],
  ["APRUA", "Ke Kablu, 102 00 Praha 15, Czechia"],
  ["AVYNA", "Vysočanská, 190 00 Praha-Praha 9, Czechia"],
  ["AKOBA", "Wichterlova 2372/10, 182 00 Praha 8-Libeň, Czechia"],
  ["ASTOA", "Bronzová 2, 155 00 Praha 13, Czechia"],
  ["ABREA", "Šlikova 1, 169 00 Praha 6, Czechia"],
  ["ASMIA", "Kobrova 1399/4, Smíchov, 150 00 Praha-Praha 5, Czechia"],
  ["AKALA", "Rohanské nábř. 172, 186 00 Karlín, Czechia"],
  ["AREPA", "nám. Republiky 2090/3A, 110 00 Praha-Nové Město, Czechia"],
  ["ARIEA", "Vozová 953, 130 00 Praha 3-Žižkov, Czechia"],
  ["ALEGA", "Legerova 34/1843, 120 00 Praha 2-Nové Město, Czechia"],
  ["AVRSA", "Sámova 1529, 101 00 Praha 10-Vršovice, Czechia"]
]);

export const useSensorGeocoding = (activeSensor: Sensor | null) => {
  const [address, useSetAddress] = useState("");
  useEffect(() => {
    async function getAddress() {
      const link = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${activeSensor.latitude},${activeSensor.longitude}&key=${GOOGLE_API_KEY}`;
      await axios
        .get(link)
        .then(function(response) {
          // handle success
          useSetAddress(response.data.results[0].formatted_address);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }

    if (activeSensor) {
      const addressFromMap = ADDRESS_MAP.get(activeSensor.code);
      if (addressFromMap) {
        useSetAddress(addressFromMap);
      } else {
        getAddress();
      }
    }
  });

  return address;
};
