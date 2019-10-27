let DEBUG = false;
let API_KEY = "AIzaSyBhcFB0JFXy8hv4pyQqZh7isVbn3-Tfzxk";
const GOOGLE_API = "https://maps.google.com/maps/api/geocode/json";

function log(message: any, warn = false) {
  if (DEBUG) {
    if (warn) {
      console.warn(message);
    } else {
      console.log(message);
    }
  }
}

let addresses = new Array();

async function handleUrl(url: string) {
  const response = await fetch(url).catch(error =>
    Promise.reject(new Error("Error fetching data"))
  );

  const json = await response.json().catch(() => {
    log("Error parsing server response");
    return Promise.reject(new Error("Error parsing server response"));
  });

  if (json.status === "OK") {
    //log(json);
    return json;
  }
  log(`Server returned status code ${json.status}`, true);
  return Promise.reject(
    new Error(`Server returned status code ${json.status}`)
  );
}

export default {

  async fromLatLng(data: { id: string, lat: number; lng: number }[]) {
    data.map(({ id, lat, lng }: any) => {
      if (!lat || !lng) {
        log("Provided coordinates are invalid", true);
        return Promise.reject(new Error("Provided coordinates are invalid"));
      }

      const latLng = `${String(lat)},${String(lng)}`;
      let url = `${GOOGLE_API}?latlng=${encodeURI(latLng)}`;

      if (API_KEY) {
        url += `&key=${API_KEY}`;
      }

      const address = handleUrl(url);
      address.then(r => addresses.push( {id, address: r.results[0].formatted_address})
      ).catch(r => console.log(r));
    });

    return addresses;
  }
};
