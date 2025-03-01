'use strict';
zuix.controller(function(cp) {
    let headerBar;
    let coverTitle;
    let headerTitle;
    let scrollHelper;
   
// JavaScript code (app.js)
function sendMessage() {
    var message = document.getElementById('messageInput').value;

    $.ajax({
        type: 'POST',
        url: 'sendMessage.php',
        data: { message: message },
        success: function(response) {
            console.log('Message sent successfully');
            getMessages();
        },
        error: function() {
            console.log('Error sending message');
        }
    });
}

function getMessages() {
    $.ajax({
        type: 'GET',
        url: 'getMessages.php',
        success: function(response) {
            document.getElementById('messages').innerHTML = response;
        },
        error: function() {
            console.log('Error getting messages');
        }
    });
}
function sndm(){
 const peerConnection = new RTCPeerConnection();
let dataChannel = null;

document.getElementById('sendButton').addEventListener('click', () => {
 const message = document.getElementById('messageInput').value;
 dataChannel.send(message);
 document.getElementById('chatLog').value += 'You: ' + message + '\n';
 document.getElementById('messageInput').value = '';
});

// Create a data channel
dataChannel = peerConnection.createDataChannel("chat");

// Listen for messages
dataChannel.addEventListener('message', event => {
 document.getElementById('chatLog').value += 'Peer: ' + event.data + '\n';
});

// Set up signaling to exchange offers/answers and ICE candidates
peerConnection.addEventListener('icecandidate', event => {
 if (event.candidate) {
  // Send the candidate to the other peer
  // This usually involves using a signaling server
 }
});

// Function to start the connection
async function startConnection() {
 const offer = await peerConnection.createOffer();
 await peerConnection.setLocalDescription(offer);
 // Send the offer to the other peer
}

startConnection();
}
// PHP code (sendMessage.php)

    function setSessionItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
 
    cp.create = function() {
      
        headerBar = cp.view('header');
        coverTitle = cp.view('main').find('h1');
        headerTitle = headerBar.find('h1');
        // register back button handler
        headerBar.find('button').on('click', hidePage);
      
        

  
        // load scroll helper used for the cross-fading title/header effect
        zuix.load('@lib/controllers/scroll_helper', {
            view: cp.view('main'),
            on: {
                'scroll:change': function(e, data) {
                    // make header transparent on top of page and cover title visible
                    switch (data.event) {
                        case 'hit-top':
                            headerBar.css('background-color', 'rgba(33,33,33,0)');
                            headerTitle.css('opacity', 0);
                            coverTitle.css('opacity', 1);
                            cp.field('cover')
                                .css('background-position-y', 0);
                            break;
                        case 'scroll':
                            const viewport = data.info.viewport;
                            if (viewport.y > -viewport.height / 2.5) {
                                cp.field('cover')
                                    .css('background-position-y', -(viewport.y/5)+'px');
                            }
                            break;
                    }
                }
            },
            ready: function() {
                scrollHelper = this;
                // watch elements with .watchable class (the title)
                this.watch('.watchable', function(el, data) {
                    // synchronize header opacity with cover title position
                    const opacity = (data.frame.dy/0.3);
                    if (data.frame.dy < 0.3) {
                        if (data.frame.dy > -0.3) {
                            coverTitle.css('opacity', opacity+0.5);
                        }
                        if (-opacity >= 0) {
                            headerBar.css('background-color', 'rgba(33,33,33,' + (-opacity) + ')');
                        }
                    }
                    if (data.frame.dy < 0.125) {
                        headerTitle.css('opacity', -opacity);
                    }
                });
            }
        });
        // hide on startup
        cp.view().hide();
        // expose public methods
        cp.expose('show', showPage);
        cp.expose('hide', hidePage);
    };
       function getSessionItem(key) {
     const value = sessionStorage.getItem(key);
     return value ? JSON.parse(value) : null;
   }
 
    function showPage(item) {
        // update location href
        window.location.href = "#detail";
        // show details page
        cp.view().show();
        // go to top of page
        scrollHelper.scrollStart();
        // this is a work-around otherwise animation would not start
        // any suggestion for a better solution is welcome =)
        setTimeout(function(){
            cp.view().css('left', 0);
        }, 10);
        const backdropUrls = getSessionItem('coverp')
        const titl = getSessionItem('titlep')
        const overview= getSessionItem('descp')
        
        const backdropUrl = 'url("'+backdropUrls+'")';
        cp.field('cover')
            .css('background-image', backdropUrl);
        cp.field('title').html(titl);
        cp.field('overview').html(overview);
        cp.field('vote').html(item.vote_average);
        cp.trigger('page:show');
    }
    function hidePage() {
        cp.view()
            .css('left', '100vw')
            .one('transitionend', function(){
                cp.view().hide();
            });
        // fire 'hide' event
        cp.trigger('page:hide');
    }
});
