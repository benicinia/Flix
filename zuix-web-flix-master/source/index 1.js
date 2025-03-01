if ("geolocation" in navigator) {
  // Get the current position of the device
  navigator.geolocation.getCurrentPosition(function(position) {
    // Get the latitude and longitude
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Display the location information
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}