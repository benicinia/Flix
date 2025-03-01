/* global zuix */
'use strict';
zuix.controller(function(cp){
function setSessionItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

    cp.create = function() {
    const  online = cp.view('span');
   if (cp.model().id == 0) {
     online.css({
   'display': 'none'
 })
   } else {
       cp.field('id').css({
    'display': 'block'
  })
   }
        cp.field('container')
            .css('background-image', 'url('+cp.model().cover+')')
             .css({
  'background-size': 'cover',
  'background-position': 'center'
})
           
        
            .on('click', function()
            
            {
                setSessionItem('coverp',cp.model().cover);
                setSessionItem('titlep',cp.model().title)
                 setSessionItem('descp',cp.model().description)
                detailsPage.show();
               cp.view().hide();
          const videos = document.querySelectorAll('video');

   for (const video of videos) {
    video.addEventListener('click', function() {
     console.log('clicked');;
     if (video.paused) {
      video.play();
     } else {
      video.pause();
     }
    });
    
   }
    
            })
          
                     cp.field('more').on('click', function() {
            // show context menu
            zuix.context('news-options-menu').show();
        });
    };

});
