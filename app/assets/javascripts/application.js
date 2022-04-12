// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require bootstrap-sprockets
//= require jquery3
//= require jquery_ujs
//= require activestorage
//= require turbolinks
//= require_tree .

//var map;
//var service;
//var infowindow;

let map, infoWindow, service, locationInfo, addressInfo;

function initMap() {

  var guildford = new google.maps.LatLng(51.236455,-0.578332);

  infoWindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById('map'), {
      center: guildford,
      zoom: 15
    });

  const locationButton = document.createElement("button");

  locationButton.textContent = "Click Here to show Nearby Gym Facilities";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };


          //This piece of code shows pop up box of "location found" when the button is pressed
          /*
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          */
          map.setCenter(pos);



          // Three different search parameters as there are gyms
          // which has different names ie Surrey Sports Centre Which has
          // a gym.
          var request1 = {
            location: pos,
            keyword: ['gym'],
            radius: '5000',
            type: ['gym']
          };


          var request2 = {
            location: pos,
            keyword: ['sports'],
            radius: '5000',
            type: ['gym']
          };

          var request3 = {
            location: pos,
            keyword: ['fitness'],
            radius: '5000',
            type: ['gym']
          };


          // Creating three different nearby seaches for all of our
          // different search requests
          service1 = new google.maps.places.PlacesService(map);
          service1.nearbySearch(request1, callback);

          //service2 = new google.maps.places.PlacesService(map);
          service1.nearbySearch(request2, callback);

          //service3 = new google.maps.places.PlacesService(map);
          service1.nearbySearch(request3, callback);

        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
        // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}


function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results.length);
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}



function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  const requestInfo = {
    placeId: place.place_id,
    fields: ["name", "formatted_address"]
  };



  function callbackDetails(place){
    //console.log(addressInfo);

    if (status == google.maps.places.PlacesServiceStatus.OK); //return;
      if (place.formatted_address) {
        //address = place.formatted_address;
        addressInfo = place.formatted_address;
        console.log(`${place.formatted_address}.`);
        console.log(addressInfo);
        return addressInfo;
      }
  }


  service1.getDetails(requestInfo, callbackDetails)

  google.maps.event.addListener(marker, "click", () => {

    infoContent =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h3 id="firstHeading" class="firstHeading">' +
    place.name +
    '</h1>' +
    '<div id="bodyContent">' +
    "<p>" +
    addressInfo +
    ".</p>" +
    '<p>Google maps link to location, <a href="https://www.google.com/maps/place/?q=place_id:' +
    place.place_id +
    '">' +
    "Click here</a> " +
    ".</p>" +
    "</div>" +
    "</div>";

    locationInfo = new google.maps.InfoWindow();
    locationInfo.setPosition(place.geometry.location);
    locationInfo.setContent((infoContent));

    locationInfo.open(map);
  });
}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
