function onOpen() {
  Logger.log("Creating session store");

  var options = {
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    createDatabaseTable: true,
    charset: 'utf8mb4_bin',
    schema: {
      tableName: 'sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
  };

  var sessionStore = new MySQLStore(options);

  var session_id = 'sample_session_id';
  var sessionData = sessionStore.get(session_id);
  Logger.log('Session data: ' + JSON.stringify(sessionData));
}

function MySQLStore(options) {
  this.state = 'INITIALIZING';
  this.setOptions(options);

  if (this.options.createDatabaseTable) {
    this.createDatabaseTable();
  }

  this.state = 'INITIALIZED';
  if (this.options.clearExpired) {
    this.setExpirationInterval();
  }
}

MySQLStore.prototype.setOptions = function(options) {
  this.options = Object.assign({}, this.defaultOptions, options || {});
  this.validateOptions(this.options);
};

MySQLStore.prototype.defaultOptions = {
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: 86400000,
  createDatabaseTable: true,
  charset: 'utf8mb4_bin',
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data',
    },
  },
};

MySQLStore.prototype.validateOptions = function(options) {
  var allowedColumnNames = Object.keys(this.defaultOptions.schema.columnNames);
  for (var userDefinedColumnName in options.schema.columnNames) {
    if (allowedColumnNames.indexOf(userDefinedColumnName) === -1) {
      throw new Error('Unknown column specified ("' + userDefinedColumnName + '").');
    }
  }
};

MySQLStore.prototype.createDatabaseTable = function() {
  Logger.log('Creating sessions database table');

  var tableCreated = true;

  if (!tableCreated) {
    Logger.log('Failed to create sessions database table.');
    throw new Error('Failed to create sessions database table.');
  }

  Logger.log('Successfully created sessions database table');
};

MySQLStore.prototype.get = function(session_id) {
  Logger.log('Getting session: ' + session_id);

  var sessionData = {
    session_id: session_id,
    expires: Math.round(Date.now() / 1000) + this.options.expiration,
    data: JSON.stringify({ key: 'value' })
  };

  var now = Math.round(Date.now() / 1000);
  if (sessionData.expires < now) {
    return null;
  }

  try {
    sessionData.data = JSON.parse(sessionData.data);
  } catch (error) {
    Logger.log('Failed to parse data for session (' + session_id + ')');
    throw error;
  }

  return sessionData.data;
};

MySQLStore.prototype.set = function(session_id, data) {
  Logger.log('Setting session: ' + session_id);
  var expires;

  if (data.cookie) {
    if (data.cookie.expires) {
      expires = data.cookie.expires;
    } else if (data.cookie._expires) {
      expires = data.cookie._expires;
    }
  }

  if (!expires) {
    expires = Date.now() + this.options.expiration;
  }

  if (!(expires instanceof Date)) {
    expires = new Date(expires);
  }

  expires = Math.round(expires.getTime() / 1000);
  data = JSON.stringify(data);

  Logger.log('Inserting/updating session data: ' + data);

  return true;
};

MySQLStore.prototype.touch = function(session_id, data) {
  if (this.options.disableTouch) return;

  Logger.log('Touching session: ' + session_id);
  var expires;

  if (data.cookie) {
    if (data.cookie.expires) {
      expires = data.cookie.expires;
    } else if (data.cookie._expires) {
      expires = data.cookie._expires;
    }
  }

  if (!expires) {
    expires = Date.now() + this.options.expiration;
  }

  if (!(expires instanceof Date)) {
    expires = new Date(expires);
  }

  expires = Math.round(expires.getTime() / 1000);

  Logger.log('Updating session expiration for: ' + session_id);

  return true;
};

MySQLStore.prototype.destroy = function(session_id) {
  Logger.log('Destroying session: ' + session_id);

  Logger.log('Deleting session data for: ' + session_id);

  return true;
};

MySQLStore.prototype.length = function() {
  Logger.log('Getting number of sessions');

  // Simulating getting number of sessions
  var sessionCount = 10; // Replace with actual count retrieval logic

  return sessionCount;
};

MySQLStore.prototype.all = function() {
  Logger.log('Getting all sessions');

  // Simulating retrieval of all sessions
  var sessions = {
    sample_session_id: { key: 'value' } // Replace with actual data retrieval logic
  };

  return sessions;
};

MySQLStore.prototype.clear = function() {
  Logger.log('Clearing all sessions');

  // Simulating clearing all sessions
  Logger.log('All sessions cleared');

  return true;
};

MySQLStore.prototype.clearExpiredSessions = function() {
  Logger.log('Clearing expired sessions');

  // Simulating clearing expired sessions
  Logger.log('Expired sessions cleared');

  return true;
};

MySQLStore.prototype.setExpirationInterval = function(interval) {
  interval || (interval = this.options.checkExpirationInterval);
  Logger.log('Setting expiration interval to', interval + 'ms');
  this.clearExpirationInterval();
  this._expirationInterval = setInterval(this.clearExpiredSessions.bind(this), interval);
};

MySQLStore.prototype.clearExpirationInterval = function() {
  Logger.log('Clearing expiration interval');
  clearInterval(this._expirationInterval);
  this._expirationInterval = null;
};

MySQLStore.prototype.close = function() {
  Logger.log('Closing session store');
  this.clearExpirationInterval();

  // Simulating closing connection
  Logger.log('Session store closed');

  return true;
};

// Provide support for optional callback.
['all', 'destroy', 'clear', 'length', 'get', 'set', 'touch', 'close'].forEach(function(method) {
  var fn = MySQLStore.prototype[method];
  MySQLStore.prototype[method] = function() {
    var args = Array.prototype.slice.call(arguments);
    var callback;

    if (typeof args[args.length - 1] === 'function') {
      callback = args[args.length - 1];
      args = args.slice(0, -1);
    }

    var result = fn.apply(this, args);

    if (callback) {
      callback(null, result);
    }

    return result;
  };
});

MySQLStore.promiseAllSeries = function(promiseFactories) {
  var result = Promise.resolve();

  promiseFactories.forEach(function(promiseFactory) {
    result = result.then(promiseFactory);
  });

  return result;
};

return MySQLStore;


want to use the session management functionality of the MySQLStore as a remote resource for your HTML/JS application. This can be achieved by creating an API that interacts with the MySQLStore and then calling this API from your front-end application.

Here’s how you can set this up:

Create an API using Google Apps Script: Google Apps Script can be used to create web apps that serve as your API. You will write the API endpoints that interact with your MySQLStore.

Deploy the API: Deploy the Google Apps Script project as a web app, which gives you a URL you can call from your HTML/JS application.

Call the API from your HTML/JS application: Use standard HTTP requests to interact with the API from your front-end.

Step-by-Step Example
1. Create and Deploy the API using Google Apps Script
Open Google Apps Script: Go to Google Apps Script and create a new project.

Add Your Code: Copy your MySQLStore code and add the necessary API endpoints.

Here's an example of how to set up your API endpoints:

function doGet(e) {
  var action = e.parameter.action;
  var session_id = e.parameter.session_id;
  var data = e.parameter.data ? JSON.parse(e.parameter.data) : null;
  var result;
  
  var options = {
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    createDatabaseTable: true,
    charset: 'utf8mb4_bin',
    schema: {
      tableName: 'sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
  };
  
  var sessionStore = new MySQLStore(options);
  
  switch (action) {
    case 'set':
      result = sessionStore.set(session_id, data);
      break;
    case 'get':
      result = sessionStore.get(session_id);
      break;
    case 'destroy':
      result = sessionStore.destroy(session_id);
      break;
    case 'length':
      result = sessionStore.length();
      break;
    case 'all':
      result = sessionStore.all();
      break;
    case 'clear':
      result = sessionStore.clear();
      break;
    case 'clearExpiredSessions':
      result = sessionStore.clearExpiredSessions();
      break;
    default:
      result = { status: 'error', message: 'Invalid action' };
  }
  
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

3. Deploy the Script: Go to Deploy > New deployment, select Web app, and configure it. Make sure to set "Who has access" to "Anyone".

2. Use the API in Your HTML/JS Application
In your HTML/JS application, you can use fetch or any HTTP library (like Axios) to call the API.

Example using fetch:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Session Management</title>
</head>
<body>
    <h1>Session Management with MySQLStore</h1>
    <script>
        const API_URL = 'YOUR_DEPLOYED_WEB_APP_URL';

        // Set session
        fetch(`${API_URL}?action=set&session_id=example_session_id&data=${JSON.stringify({ key: 'value' })}`)
            .then(response => response.json())
            .then(data => console.log('Set session:', data))
            .catch(error => console.error('Error setting session:', error));

        // Get session
        fetch(`${API_URL}?action=get&session_id=example_session_id`)
            .then(response => response.json())
            .then(data => console.log('Get session:', data))
            .catch(error => console.error('Error getting session:', error));

        // Clear all sessions
        fetch(`${API_URL}?action=clear`)
            .then(response => response.json())
            .then(data => console.log('Clear sessions:', data))
            .catch(error => console.error('Error clearing sessions:', error));
        
        // Get the number of sessions
        fetch(`${API_URL}?action=length`)
            .then(response => response.json())
            .then(data => console.log('Number of sessions:', data))
            .catch(error => console.error('Error getting number of sessions:', error));
        
        // Get all sessions
        fetch(`${API_URL}?action=all`)
            .then(response => response.json())
            .then(data => console.log('All sessions:', data))
            .catch(error => console.error('Error getting all sessions:', error));
    </script>
</body>
</html>


Summary
By following these steps, you can create an API that wraps your MySQLStore functionality and use it as a remote resource in your HTML/JS application. This setup allows your front-end to make HTTP requests to the API to manage sessions.

You can enhance your app's session management by using the browser's built-in session storage in conjunction with your remote MySQLStore API. This approach ensures that session data is stored locally in the browser, providing quick access, and can also be synced with your remote session management system for persistent storage.

Here's a step-by-step guide on how to integrate session storage with your app:

1. Save Session Data to Session Storage
When a session is created or updated, store the session data in the browser's session storage:

function saveSessionLocally(sessionId, data) {
  sessionStorage.setItem(sessionId, JSON.stringify(data));
}


2. Retrieve Session Data from Session Storage
When you need to access session data, first check if it's available in session storage. If not, retrieve it from the remote MySQLStore API:

function getSessionLocally(sessionId) {
  const sessionData = sessionStorage.getItem(sessionId);
  if (sessionData) {
    return JSON.parse(sessionData);
  }
  return null;
}

3 . Sync Session Data with Remote API
When the session data changes, update both the local session

async function setSession(sessionId, data) {
  // Save data locally
  saveSessionLocally(sessionId, data);
  
  // Update remote session
  const response = await fetch(`${API_URL}?action=set&session_id=${sessionId}&data=${JSON.stringify(data)}`);
  if (!response.ok) {
    throw new Error('Failed to update remote session');
  }
}

4. Example Integration
Here's a full example of how you can integrate session storage with your HTML/JS app, assuming you have your API_URL set up:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Session Management with Local Storage</title>
</head>
<body>
    <h1>Session Management with Local Storage</h1>
    <script>
        const API_URL = 'YOUR_DEPLOYED_WEB_APP_URL';

        // Save session locally and remotely
        async function setSession(sessionId, data) {
            // Save data locally
            sessionStorage.setItem(sessionId, JSON.stringify(data));

            // Update remote session
            const response = await fetch(`${API_URL}?action=set&session_id=${sessionId}&data=${JSON.stringify(data)}`);
            if (!response.ok) {
                throw new Error('Failed to update remote session');
            }
        }

        // Get session data from local storage or remotely if not found locally
        async function getSession(sessionId) {
            let sessionData = sessionStorage.getItem(sessionId);
            if (sessionData) {
                return JSON.parse(sessionData);
            }
            
            // Fetch remote session data
            const response = await fetch(`${API_URL}?action=get&session_id=${sessionId}`);
            if (response.ok) {
                sessionData = await response.json();
                // Save the remote session data locally
                sessionStorage.setItem(sessionId, JSON.stringify(sessionData));
                return sessionData;
            }

            throw new Error('Failed to retrieve session data');
        }

        // Example usage
        const sessionId = 'example_session_id';

        // Set session data
        setSession(sessionId, { key: 'value' }).then(() => {
            console.log('Session set successfully');
        }).catch(error => {
            console.error('Error setting session:', error);
        });

        // Get session data
        getSession(sessionId).then(sessionData => {
            console.log('Retrieved session data:', sessionData);
        }).catch(error => {
            console.error('Error getting session:', error);
        });
    </script>
</body>
</html>


In this example:

setSession saves session data both locally and remotely.

getSession retrieves session data from local storage first, and if not found, fetches it from the remote API.

Benefits of This Approach:
Performance: Local storage provides quick access to session data.

Persistence: Remote API ensures session data is stored persistently and can be shared across multiple devices or sessions.

Fallback: If the remote API is unreachable, the local storage can serve as a fallback.