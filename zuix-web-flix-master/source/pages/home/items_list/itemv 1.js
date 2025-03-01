/* global zuix */
'use strict';
zuix.controller(function(cp){
function setSessionItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
  
}

    cp.create = function() {
   
   // Update this path to the video file on your server
  
  
//document.getElementById('video').setAttribute.poster='('+cp.model().thumb+')';

  //const video = cn.createElement('video').setAttribute('id','video'); 
 
  //video.src = '('+cp.model().cover+')'; 
  
  //video.poster ='('+cp.model().thumb+')';
  /*video.addEventListener('loadedmetadata', () => { video.currentTime = video.duration * 0.5; // Capture thumbnail from the middle of the video 
  
  });*/

/*  video.addEventListener('seeked', () => { captureThumbnail(video).then(thumbnailDataUrl => { videoElement.poster = thumbnailDataUrl; }); });*
  
  async function captureThumbnail(video) { return new Promise((resolve) => { const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/png')); }); }
      //  cp.field('container')
        /*  .css('background-image', 'url('+cp.model().cover+')')
             .css({
  'background-size': 'cover',
  'background-position': 'center'
})*/
           
    //  cp.field('containerqr')
   
  //  const vd =
    //  cp.field('contxt')
    
  
    
    //const  elg = zuix.createComponent('pages/home/items_list/video');
  //  vd.append(elg);
 //   zuix.componentize(); 
    //in.  .setAttribute('poster', '('+cp.model().cover+')')
            // .css({
//  'background-size': 'cover',
//  'background-position': 'center'
//})
       /*const elx=new createComponent('video')
       elx.setAttribute('class','video__player')
       elx.setAttribute('poster','('+cp.model().cover+')')
        
            cp.field('containerqr').append(elx)
     
      zuix.componentize()*/
  cp.field('container')
            .on('click', function()
            
            {
                setSessionItem('coverd',cp.model().cover);
                setSessionItem('title',cp.model().title)
                 setSessionItem('desc',cp.model().description)
             imgPage.show(cp.model().cover);
             cp.view().hide();
                 const videos = document.querySelectorAll('video');
const video = document.getElementById('video');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const thumbnail = document.getElementById('thumbnail');

playButton.addEventListener('click', function() {
  video.play();
  thumbnail.style.display = 'block'; // Hide thumbnail when playing
});

pauseButton.addEventListener('click', function() {
  video.pause();
});

video.addEventListener('pause', function() {
  thumbnail.style.display = 'block'; // Show thumbnail when paused
});

video.addEventListener('play', function() {
  thumbnail.style.display = 'none'; // Hide thumbnail when playing
});
    
            });
          
                     cp.field('more').on('click', function() {
            // show context menu
            zuix.context('news-options-menu').show();
        });
    };

});
