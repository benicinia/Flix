'use strict';
/*export async function fetchUserData(userId) {
 try {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) {
   throw new Error("Network response was not ok");
  }
  const userData = await response.json();
  console.log("User Data:", userData);
 } catch (error) {
  console.error("There was a problem with the fetch operation:", error);
 }
}*/

// Using the fetchUserData function


function setSessionItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
 function getSessionItem(key) {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

function setStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
  
export default function getStorageItem(key) {
 const value =  localStorage.getItem(key);
 return value ? JSON.parse(value) : null;
}

