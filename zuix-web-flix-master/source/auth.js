//import db from '_data/db.js';
// Function to check login status

function checkLoginStatus() {
  const user = localStorage.getItem('user');
  if (user) {
    // Redirect to dashboard if user is logged in
    window.location.href = 'index.html';
  } else {
    // Redirect to login page if user is not logged in
    window.location.href = 'login.html';
  }
}

// Function to handle user login

const uname = "benny";
const pwd = "p1234";
const prp = "/zuix-web-flix-master/source/images/su/4cb289ada52d267f42bff7bd4f387cbd~3.jpg"

function loginUser(username, password) {
  // Here, you would normally check the username and password against a database
  // For demonstration purposes, we'll assume any username/password combination is valid
  const user = {
    username: username,
    password: password,
    isLoggedIn: "true",
    prp: prp

    // You might want to include more user data here
  };
  if (user.password == pwd && user.username == uname) {
    localStorage.setItem('user', JSON.stringify(user));
    // Redirect to dashboard after login
    window.location.href = 'index.html';
  } else {
    window.location.href = 'dax.html';
  }

}

// Function to handle user logout
function logoutUser() {
  localStorage.removeItem('user');
  // Redirect to login page after logout
  window.location.href = 'login.html';
}

// Example usage:
// Call checkLoginStatus on page load
document.addEventListener('DOMContentLoaded', checkLoginStatus);

// Example login form submission handler
document.querySelector('#loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  loginUser(username, password);
});

// Example logout button handler
document.querySelector('#logoutButton').addEventListener('click', function() {
  logoutUser();
});