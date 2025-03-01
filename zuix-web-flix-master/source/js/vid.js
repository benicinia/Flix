// script.js
document.addEventListener('DOMContentLoaded', function() {
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
