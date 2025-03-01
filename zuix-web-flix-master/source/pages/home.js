'use strict';

zuix.controller(function(cp) {
 let coverItem;
 let mainCover;
 let headerOpacity = 0;
 let componentsLoaded;
 let componentsToLoad = 0;
 let el;
let user;
 //request for location

 cp.create = function() {
  // Load the component

function resetItem() {
  sessionStorage.setItem('cldd', 0);
}

function setSessionItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
  function getSessionItem(key) {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}
function getStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

  // since the component loads asynchronously
  // a callback is required to ensure the component is ready
  // Get the component context
  // Select the target node

  var loader = cp.field('loader');
  var targete = cp.field('homePageElements');
  // Track the number of components to load
  //componentsToLoad = 8;
  componentsLoaded = 0;
 const cplddi = getSessionItem('cldd');
 
  // Function to hide the loader
  const updateProgressBar = () => {
  const progress = Math.floor((cplddi/ componentsToLoad) * 100);
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${progress}%`;
  }
  
   function ldrhd() {
    // Tab to edit
    
   document.getElementById('loader').style.display = 'none';
   }
   ldrhd()
  
  function checkAllComponentsLoaded() {
  const cpldd = getSessionItem('cldd')+1;
   setSessionItem('cldd',cpldd);
   if (cpldd === componentsToLoad) {
  //  setTimeout(ldrhd,5000)
//  ldrhd();
cp.loadComponent('#component8', 'pages/home/items_list', {
 ready: function() {
  console.log('Component 2 has finished loading!');
  //  componentsLoaded++;
  checkAllComponentsLoaded();
 }
});
  //  loader.css('display','none');
    targete.css('display', 'block');
    resetItem();
    //  loader.css('display','none')
   }
  }

  // Initialize zuix.js
  zuix.controller(function(cp) {
   // Load the first component and listen for 'component:ready'
   cp.loadComponent('#component1', 'pages/home/title_detail', {
    ready: function() {
     console.log('Component 1 has finished loading!');
 
   //const cpldd = getSessionItem('cpldd')+1;
  // setSessionItem('cldd',cpldd);
     checkAllComponentsLoaded();
    }
   });

   // Load the second component and listen for 'component:ready'
   cp.loadComponent('#component2', 'pages/home/profed', {
    ready: function() {
     console.log('Component 2 has finished loading!');
     
  // const cpldd = getSessionItem('cpldd')+1;
 //  setSessionItem('cldd',cpldd);
     checkAllComponentsLoaded();
    }
   });
   cp.loadComponent('#component3', 'pages/home/msg_Page', {
    ready: function() {
     console.log('Component 3 has finished loading!');
    
  // const cpldd = getSessionItem('cpldd')+1;
 //  setSessionItem('cldd',cpldd);
      checkAllComponentsLoaded();
    }
   });
   cp.loadComponent('#component4', 'pages/home/title_details', {
    ready: function() {
     console.log('Component 4 has finished loading!');
   //  componentsLoaded++;
     checkAllComponentsLoaded();
    }
   });
    cp.loadComponent('#component5', 'pages/home/list_o', {
    ready: function() {
     console.log('Component 5 has finished loading!');
   //  componentsLoaded++;
     checkAllComponentsLoaded();
    }
   });
    cp.loadComponent('#component6', 'pages/home/list_v', {
  ready: function() {
   console.log('Component 6 has finished loading!');
   //  componentsLoaded++;
   checkAllComponentsLoaded();
  }
 });
  cp.loadComponent('#component7', 'pages/home/items_list', {
  ready: function() {
   console.log('Component 7 has finished loading!');
   //  componentsLoaded++;
   checkAllComponentsLoaded();
  }
 });
  cp.loadComponent('#component8', 'pages/home/items_list', {
  ready: function() {
   console.log('Component 2 has finished loading!');
   //  componentsLoaded++;
   checkAllComponentsLoaded();
  }
 });
 cp.loadComponent('#component9', 'pages/home/items_list', {
  ready: function() {
   console.log('Component 9 has finished loading!');
   //  componentsLoaded++;
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
//  loader.css('display','none');
//  document.getElementById('loader').style.display = 'none';
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
 user = getStorage('user');
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

  

  cp.field('details-btn').on('click', function() {
   detailsPage.show(coverItem);
  });
  cp.field('add-btn').on('click', function() {
   cp.field('post').css('display', 'flex')
  });
  // hide on startup
  cp.view().hide();
  zuix.context(cp.field('main-cover'), function() {
  
   mainCover = this;
   // refresh cover pictures
   if (coverItem)setCoverItem(coverItem);
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