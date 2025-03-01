/* global zuix */
'use strict';
zuix.controller(function(cp){
function setSessionItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
const prp = "/zuix-web-flix-master/source/images/su/4cb289ada52d267f42bff7bd4f387cbd~3.jpg"
    cp.create = function() {
      const user = {
    username: username,
    password: password,
    isLoggedIn: "true",
    prp: prp

    // You might want to include more user data here
  };
   const pr = JSON.parse(localStorage.getItem('user'))
   localStorage.setItem('uer', JSON.stringify(pr));
        cp.view('button')
            .css('background-image', 'url('+user.prp+')')
             .css({
  'background-size': 'cover',
  'color': 'transparent',
  'background-position': 'center',
  'display':'none'
})
           
        
            .on('click', function()
            
            {
                setSessionItem('cover',cp.model().cover);
                setSessionItem('title',cp.model().title)
                 setSessionItem('desc',cp.model().description)
                detailsPage.show(cp.model().cover);
                 const videos = document.querySelectorAll('video');

      for (const video of videos) {
        video.addEventListener('click', function () {
          console.log('clicked');
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        });
      }
    
            });
          
                     cp.field('more').on('click', function() {
            // show context menu
            zuix.context('news-options-menu').show();
        });
    };

});
