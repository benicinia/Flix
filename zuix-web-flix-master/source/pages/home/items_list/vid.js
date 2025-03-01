/* global zuix */
'use strict';
zuix.controller(function(cp){
function setSessionItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

    cp.create = function() {
   
        cp.view('video')
      //  .setAttribute('poster',cp.model().cover)
  
           
        
            .on('click', function()
            
            {
                setSessionItem('cover',cp.model().cover);
                setSessionItem('title',cp.model().title)
                 setSessionItem('desc',cp.model().description)
            
               // cp.view().hide();
                const videos = document.querySelectorAll('video');

          for (const video of videos) {
           video.addEventListener('click', function() {
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
