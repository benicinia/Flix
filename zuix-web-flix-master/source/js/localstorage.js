// Function to store data in session storage
function setSessionItem(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

// Function to retrieve data from session storage
function getSessionItem(key) {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// Function to remove specific data from session storage
function removeSessionItem(key) {
    sessionStorage.removeItem(key);
}

// Function to clear all data from session storage
function clearSessionStorage() {
    sessionStorage.clear();
}

// Example usage
// Storing data
setSessionItem('user', { name: 'John Doe', email: 'john.doe@example.com' });

// Retrieving data
const user = getSessionItem('user');
console.log(user); // Output: { name: 'John Doe', email: 'john.doe@example.com' }

// Removing data
removeSessionItem('user');

// Clearing all session storage
clearSessionStorage();
