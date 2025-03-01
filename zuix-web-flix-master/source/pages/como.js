'use strict';

zuix.controller(function(cp) {
 let coverItem;
 let mainCover;
 let headerOpacity = 0;
 let componentsLoaded;
 let componentsToLoad = 4;
 let el;

 //request for location

 cp.create = function() {
  // Load the component




  // since the component loads asynchronously
  // a callback is required to ensure the component is ready
  // Get the component context
  // Select the target node

  var loader = cp.field('loader');
  var targete = cp.field('homePageElements');
  // Track the number of components to load
  componentsToLoad = 4;
  //componentsLoaded = 0;

  // Function to hide the loader
  function checkAllComponentsLoaded() {
   if (componentsLoaded === componentsToLoad) {
    document.getElementById('lohader').style.display = 'none';
    targete.css('display', 'block');
    //  loader.css('display','none')
   }
  }

  // Initialize zuix.js
  zuix.controller(function(cp) {
   // Load the first component and listen for 'component:ready'
   cp.loadComponent('#component1', 'pages/home/title_detail', {
    ready: function() {
     console.log('Component 1 has finished loading!');
     componentsLoaded++;
     checkAllComponentsLoaded();
    }
   });

   // Load the second component and listen for 'component:ready'
   cp.loadComponent('#component2', 'pages/home/profed', {
    ready: function() {
     console.log('Component 2 has finished loading!');
     componentsLoaded++;
     checkAllComponentsLoaded();
    }
   });
   cp.loadComponent('#component3', 'pages/home/msg_Page', {
    ready: function() {
     console.log('Component 2 has finished loading!');
     componentsLoaded++;
     //  checkAllComponentsLoaded();
    }
   });
   cp.loadComponent('#component4', 'pages/home/title_details', {
    ready: function() {
     console.log('Component 2 has finished loading!');
     componentsLoaded++;
     checkAllComponentsLoaded();
    }
   });
  });

  // Select the target nodes
  var targetNodes = document.querySelectorAll('.component');

  // Create an observer instance
  var observer = new MutationObserver(function(mutationsList, observer) {
   for (var mutation of mutationsList) {
    if (mutation.type === 'childList') {
     console.log('A child node has been added or removed.');
     checkAllComponentsLoaded()
     // Your code here


    }
   }
  });

  // Configuration of the observer
  var config = { childList: true, subtree: true };

  // Start observing each target node for configured mutations using a for loop
  for (var i = 0; i < targetNodes.length; i++) {
   observer.observe(targetNodes[i], config);
  }

  function geo() {
   // Tab to edit
   if ("geolocation" in navigator) {
    // Prompt user for permission to access their location
    navigator.geolocation.getCurrentPosition(
     // Success callback function
     (position) => {
      // Get the user's latitude and longitude coordinates
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Do something with the location data, e.g. display on a map
      console.log(`Latitude: ${lat}, longitude: ${lng}`);
     },
     // Error callback function
     (error) => {
      // Handle errors, e.g. user denied location sharing permissions
      console.error("Error getting user location:", error);
     }
    );
   }
   else {
    // Geolocation is not supported by the browser
    console.error("Geolocation is not supported by this browser.");
   }
  }
  // Show the loader
  //document.getElementById('loader').style.display = 'block';

  // Check if the title detail page is loaded

  // Check if geolocation is supported by the browser
  //let loginPage;
  const user = localStorage.getItem('user');
  const list = cp.field('apnd');
  el = zuix.createComponent('pages/home/items_list/log', options).container();
  // loginPage = zuix.createComponent('pages/home/homePage', options).container();

  if (user) {
   // cp.view('.tt').css({
   //  'margin-top': '-23em'
   //      // window.location.href = 'index.html';

  } else {
   //  console.log(lat)
   //  list.append(homePage)
   list.append(el);
   zuix.componentize();

  }

  function getStoredItem(key) {
   const value = localStorage.getItem(key);
   return value ? JSON.parse(value) : null;
  }

  cp.field('details-btn').on('click', function() {
   detailsPage.show(coverItem);
  });
  cp.field('add-btn').on('click', function() {
   cp.field('post').css('display', 'flex')
  });
  // hide on startup
  cp.view().hide();
  zuix.context(cp.field('main-cover'), function() {
   if (user) {
    //  cp.field('main-cover').setAttribute('data-ui-load','pages/home/main_page').css('height','8em').css('width','100vw').css( 'margin-top','0em')

   } else {
    //  cp.field('main-cover').setAttribute('data-ui-load','pages/home/main_Page').css('height','90vh')
   }
   mainCover = this;
   // refresh cover pictures
   if (coverItem) setCoverItem(coverItem);
  });
  // expose public methods
  cp.expose('cover', setCoverItem);
  cp.expose('sync', syncWithScroll);
 };



 function setCoverItem(item) {
  coverItem = item;
  if (mainCover) {
   mainCover.pictures(
    coverItem.poster_path,
    coverItem.backdrop_path
   );
  }
  return cp.context;
 }

 function playVideo() {
  if (coverItem.trailer) window.location.href = coverItem.trailer;
 }

 function syncWithScroll(data) {
  if (data == null) {
   zuix.field('header-bar')
    .css('background-color', 'rgba(18,18,18,' + headerOpacity + ')');
   return;
  }
  let opacity = 1;
  if (data.event === 'hit-top') {
   opacity = 0;
  } else if (-data.info.viewport.y < data.info.viewport.height) {
   opacity = -data.info.viewport.y / (data.info.viewport.height);
  }
  if (opacity !== headerOpacity) {
   zuix.field('header-bar')
    .css('background-color', 'rgba(18,18,18,' + opacity + ')');
   // cover parallax effect
   if (mainCover) mainCover.translate(data.info);
   headerOpacity = opacity;
  }
  return cp.context;
 }

});