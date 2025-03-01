/* global zuix */
'use strict';
zuix.controller(function(cp){
function setSessionItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

    cp.create = function() {
// const videoElement= cp.field('videoElement');
const vsrc="/zuix-web-flix-master/source/videos/Snapsave.app_-JPTXwMHjazWwi38ET4dj4PFpGglmEzETZ_noZALgQr_B5pgHqmFJmPROGn6gOFTY7DgjQy.mp4"
const vposter = "/zuix-web-flix-master/source/images/yu/1727038366723.jpg";

// videoElement.src = cp.model().src;
// JavaScript code to set the poster attribute
// JavaScript code to set the poster attribute

// JavaScript code to create and add a source element to the video

let video = document.createElement('Video');

let source = document.createElement('source');

video.setAttribute('poster', cp.model().cover); // Set the source file
video.setAttribute('class','video__player'); 
video.setAttribute('id','video'); 
source.setAttribute('src', cp.model().src); 
//source.setAttribute('type', 'video/mp4');   // Set the type

video.appendChild(source)
// Append the source element to the video

//document.getElementById('myVideo')

//videoElement.poster = poster
 /*
 const videop = document.getElementById('video');
 const playButton = document.createElement('button');
 const pauseButton = document.createElement('button');
 //const thumbnail = document.createElement('img');

 playButton.innerText = 'Play';
 pauseButton.innerText = 'Pause';
 //thumbnail.src = 'thumbnail.jpg';

 playButton.addEventListener('click', function() {
  videop.play();
 });

 pauseButton.addEventListener('click', function() {
  videop.pause();
 });


 document.querySelector('#video').appendChild(playButton);
 document.querySelector('#video').appendChild(pauseButton);
 //document.querySelector('.video-container').appendChild(thumbnail);
*/
        cp.field('container').append(video)
         
           
        
            .on('click', function()
            
            {
                setSessionItem('cover',cp.model().cover);
                setSessionItem('title',cp.model().title)
                 setSessionItem('desc',cp.model().description)
            shortsPage.show();
              //  cp.view().hide();
       
    
            });
          
                     cp.field('more').on('click', function() {
            // show context menu
            zuix.context('news-options-menu').show();
        });
    };

});
