import axios from "axios";

const form = document.querySelector("form") as HTMLFormElement;
const inputEl = document.getElementById("address") as HTMLInputElement;


const GOOGLE_MAP_API_KEY = "AIzaSyBPxD365rZocu5KOxcNAL9n7mcQMO3YwJQ";

const addressSubmitHandler = (event: Event) => {
  event.preventDefault();
  const address = inputEl.value;
  if (address.trim().length === 0) {
    return;
  }

  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        address
      )}&key=${GOOGLE_MAP_API_KEY}`
    )
    .then((response) => {
      
      if (response.data.status !== "OK") {
        throw new Error("Cannot resolve address. Please try again later.");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: coordinates,
          zoom: 14,
        }
      );
      new google.maps.Marker({
        position: coordinates,
        map: map,
      });
    })
    .catch((err) => {
      alert(err.message);
      console.log("====================================");
      console.log(err);
      console.log("====================================");
    });
};

form.addEventListener("submit", addressSubmitHandler);
