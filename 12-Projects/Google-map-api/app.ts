/**
 * DOCUMENTATION:
 *
 * packages: @types/googlemaps, axios
 *
 * Google Maps Pricing: https://cloud.google.com/maps-platform/pricing/sheet/
 *
 * Google Geocoding API: https://developers.google.com/maps/documentation/geocoding/start
 *
 * Google Maps JS SDK: https://developers.google.com/maps/documentation/javascript/tutorial
 *
 * NOTE - set google API_KEY here and also in index.html
 **/

import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "process.env.key";
const LINK = "https://maps.googleapis.com/maps/api/geocode/json?address=";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

const searchAddressHandler = (event: Event) => {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `${LINK}${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`
    )
    .then(response => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;

      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 16
      });

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch(err => {
      alert(err.message);
      console.log(err);
    });
};

form.addEventListener("submit", searchAddressHandler);
