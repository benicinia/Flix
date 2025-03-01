Sure! Here is a code snippet in JavaScript that reads location information from a phone:

```javascript
// Check if geolocation is supported by the browser
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
```

When you run this code on a device that supports geolocation, it will retrieve the latitude and longitude of the device's current location and display it in the console. If geolocation is not supported, it will display a message indicating so.

I hope this helps! Let me know if you need any further assistance.