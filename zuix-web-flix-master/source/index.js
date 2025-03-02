'use strict';
//import {getStorageItem} from './js/cont.js';

let currentPage;
let mainPage;
let detailsPage;
let detailPage;
let shortsPage;
let msgPage;
let proPage;
let profedPage;
let topicButtons;
let topicIndicator;
let viewPager;
let imgPage;
let main_Page;
let topicB;

zuix.store('config', {
 libraryPath: 'shared/lib/'

});
zuix.using('script', './service-worker.js');
zuix.using('script', './auth.js');
zuix.using('style', '/zuix-web-flix-master/source/shared/flex-layout-attribute.min.css');

zuix.using('style', './index.css');
zuix.$.find('.profile').on('click', function() {
 if (drawerLayout) drawerLayout.open();
});

// Function to check login status

//const user = localStorage.getItem('user');
window.options = {

 mainPage: {
  lazyLoad: false,
  ready: function() {

   mainPage = this.cover({
    "vote_average": 7.2,
    "title": "Total Recall",
    "poster_path": "\/zuix-web-flix-master\/source\/images\/yu\/1737660063606.jpg",
    "backdrop_path": "\/zuix-web-flix-master\/source\/images\/yu\/1727038366723.jpg",
    "overview": "Welcome to Rekall, the company that can turn your dreams into real memories. .",
    "release_date": "2012-08-02",
    "trailer": "https://youtube.com/watch?v=GljhR5rk5eY"
   });
   const view = zuix.$(this.view());
   // handle 'topic' buttons click (goto clicked topic page)
   topicButtons = view.find('.topics').children().each(function(i, el) {
    this.on('click', function(e) {
     if (viewPager) viewPager.page(i);
    });

   });



   showPage(0);



  },




 },

 headerBart: {
  ready: function() {
   const view = zuix.$(this.view());
   // handle 'topic' buttons click (goto clicked topic page)
   topicButtons = view.find('.topics').children().each(function(i, el) {
    this.on('click', function(e) {
     if (viewPager) viewPager.page(i);
    });
   });
   // open drawer when the profile icon is clicked

   showPage(0);
  }
 },
 detailsPage: {
  lazyLoad: false,
  on: {
   'page:show': function() { bodyScrollEnable(false); },
   'page:hide': function() { bodyScrollEnable(true); }
  },
  ready: function() {
   detailsPage = this;
  }
 },
 topicIndicator: {
  enablePaging: true,
  startGap: 36,
  ready: function() {
   topicIndicator = this;
  }
 },
 shortsPage: {
  lazyLoad: false,
  on: {
   'page:show': function() { bodyScrollEnable(false); },
   'page:hide': function() { bodyScrollEnable(true); }
  },
  ready: function() {
   shortsPage = this;
  }
 },
 detailPage: {
  lazyLoad: false,
  on: {
   'page:show': function() { bodyScrollEnable(false); },
   'page:hide': function() { bodyScrollEnable(true); }
  },
  ready: function() {
   detailPage = this;
  }
 },
 msgPage: {
  lazyLoad: false,
  on: {
   'page:show': function() { bodyScrollEnable(false); },
   'page:hide': function() { bodyScrollEnable(true); }
  },
  ready: function() {
   msgPage = this;
  }
 },
 autoHidingBars: {
  header: 'header-tools',
  footer: 'footer-bar',
  height: 56,
  on: {
   'page:scroll': function(e, data) {
    zuix.componentize();
   }
  }
 },
 imgPage: {
  lazyLoad: false,
  on: {
   'page:show': function() { bodyScrollEnable(false); },
   'page:hide': function() { bodyScrollEnable(true); }
  },
  ready: function() {
   imgPage = this;
  }
 },
 profedPage: {
  lazyLoad: false,
  on: {
   'page:show': function() { bodyScrollEnable(false); },
   'page:hide': function() { bodyScrollEnable(true); }
  },
  ready: function() {
   profedPage = this;
  }
 },
 /* drawerLayout: {
      autoHideWidth: -1,
      drawerWidth: 280,
      ready: function() { drawerLayout = this; this.close(); }
  },
  headerBar: {
      ready: function() {
          const view = zuix.$(this.view());
          
          view.find('.profile').on('click', function() {
              if (drawerLayout) drawerLayout.open();
          });
          showPage(0);
      }
  },*/

 topicB: {
  ready: function() {
   const view = zuix.$(this.view());

   view.find('.dating').on('click', function() {
    viewPager.get(1);
    //  if (drawerLayout) drawerLayout.open();
   });
   view.find('.reels').on('click', function() {
    viewPager.get(2);
    //  if (drawerLayout) drawerLayout.open();
   });
   showPage(0);
  }
 },




 footerBar: {
  ready: function() {
   const view = zuix.$(this.view());
   const buttons = view.find('button');
   const prp = JSON.parse(localStorage.getItem('user'))
   const prpt = "/zuix-web-flix-master/source/images/su/4cb289ada52d267f42bff7bd4f387cbd~3.jpg";

   function setSessionItem(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
   }
   if (prp) {
    view.find('span').css('background-image', 'url(' + prp.prp + ')')
   } else {
    view.find('span').css('background-image', 'url(' + prpt + ')')
   }

   buttons.each(function(i, el) {
    this.on('click', function() {
     buttons.removeClass('active');
     this.addClass('active');

     if (this.attr('ref') == 'about') {
      if (prp) {

       setSessionItem('coverp', prp.prp);

       setSessionItem('titlep', prp.username)
       //  setSessionItem('descp',cp.model().description)
       profedPage.show();
      } else

      {
       setSessionItem('coverp', prpt);

       //  setSessionItem('titlep',prp.username)
      }
     } else {


      window.location.href = '#' + this.attr('ref');
     }
    });
   });
  }
 },
 viewPager: {
  enablePaging: true,
  startGap: 36,
  on: {
   'page:change': function(e, page) {
    syncPageIndicator(page);
    // show header/footer
    if (viewPager) {
     const p = viewPager.get(page.in);
     zuix.context(p).show();
    }
   }
  },
  ready: function() {
   viewPager = this;
  }
 },
 pageScroll: {
  on: {
   'scroll:change': function(e, data) {
    // synchronize/animate main cover with scroll
    if (currentPage == 0 && mainPage) {
     mainPage.sync(data);
    }
   }
  }
 },
 content_no_css: {
  css: false
 }
};

function syncPageIndicator(page) {
 if (topicButtons) {
  topicButtons.eq(page.out).removeClass('active');
  topicButtons.eq(page.in).addClass('active');
 }
 if (topicIndicator) topicIndicator.page(page.in);
}

// site navigation
window.onhashchange = function() {
 if (window.location.hash.length > 0) {
  switch (window.location.hash) {
   case '#home':
    showPage(0);
    break;
   case '#search':
    showPage(1);
    break;
   case '#notifications':
    showPage(2);
    break;
   case '#about':
    showPage(3);
    break;
  }
 } else showPage(0);
};

function showPage(i) {
 currentPage = i;
 // sync header bar transparency

 if (currentPage == 0) {

  mainPage.sync();
  zuix.field('header-tools')
   .children().hide()
   .eq(i).show();

 } else {
  zuix.field('header-tools')
   .css('background-color', 'rgba(33,33,33,1)');
 }
 if (currentPage == 3) {

  // mainPage.sync();
  zuix.field('header-tools')
   .children().hide()
   .eq(i).show();
  window.location.href = 'indexv.html';
 } else {
  zuix.field('header-tools')
   .css('background-color', 'rgba(33,33,33,1)');
 }
 // hide details page if open
 if (detailsPage && detailsPage.view().style['display'] !== 'none') {
  detailsPage.hide();
  // footerBar.css('display','none');
 } else {
  // show page
  zuix.field('pages')
   .children().hide()
   .eq(i).show();
 }
 if (detailPage && detailPage.view().style['display'] !== 'none') {
  detailPage.hide();
 } else {
  // show page
  zuix.field('pages')
   .children().hide()
   .eq(i).show();
 }
 if (shortsPage && shortsPage.view().style['display'] !== 'none') {
  shortsPage.hide();
 } else {
  // show page
  zuix.field('pages')
   .children().hide()
   .eq(i).show();
 }
 if (msgPage && msgPage.view().style['display'] !== 'none') {
  msgPage.hide();
 } else {
  // show page
  zuix.field('pages')
   .children().hide()
   .eq(i).show();
 }
 if (imgPage && imgPage.view().style['display'] !== 'none') {
  imgPage.hide();
 } else {
  // show page
  zuix.field('pages')
   .children().hide()
   .eq(i).show();
 }
}


/*function showPaged(i) {
    currentPage = i;
    // sync header bar transparency
    if (currentPage == 0) {
        mainPage.sync();
    } else {
        zuix.field('header-bar')
            .css('background-color', 'rgba(33,33,33,1)');
    }
    // hide details page if open
    if (detailPage && detailPage.view().style['display'] !== 'none') {
        detailPage.hide();
    } else {
        // show page
        zuix.field('pages')
            .children().hide()
            .eq(i).show();
    }
}*/
function bodyScrollEnable(enable) {
 const body = zuix.$(document.body);
 if (enable === false) body.addClass('noscroll');
 else body.removeClass('noscroll');
}

// increase lazy-load hit area up to
// 300px off the viewport boundaries
// (circa 3 movie items ahead)
//zuix.lazyLoad(true, -500);

// Turn off debug output
window.zuixNoConsoleOutput = true;