Sure! Here is a JavaScript code to calculate the distance between two geolocations in kilometers:

```javascript
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

const lat1 = 37.7749; // Latitude of the first location
const lon1 = -122.4194; // Longitude of the first location
const lat2 = 34.0522; // Latitude of the second location
const lon2 = -118.2437; // Longitude of the second location

const distance = calculateDistance(lat1, lon1, lat2, lon2);
console.log(`The distance between the two locations is ${distance.toFixed(2)} km.`);
```

You can replace the latitude and longitude values of `lat1`, `lon1`, `lat2`, and `lon2` with the coordinates of the two geolocations you want to calculate the distance between. When you run this code, it will output the distance in kilometers between the two locations.