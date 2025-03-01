'use strict';
zuix.controller(function(cp) {
    let headerBar;
    let coverTitle;
    let headerTitle;
    let scrollHelper;
    let footer;
    let nameText;
    let nameInput;
    cp.create = function() {
      function setSessionItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}


const nameText = cp.field('nameText');
const nameInput = cp.field('nameInput');
const editButton = cp.field('editName');

editButton.on('click', function() {
 if (nameText.css('display') === 'none') {
  nameText.css('display', 'block');
  nameInput.css('display', 'none');
 } else {
  nameText.css('display', 'none');
  nameInput.css('display', 'block');
  nameInput.focus();
 }
});

nameInput.on('blur', function() {
 nameText.text(nameInput.value);
 nameText.css('display', 'block');
 nameInput.css('display', 'none');
});
document.getElementById('profile-pic-input').addEventListener('change', function(event) {
 const file = event.target.files[0];
 if (file) {
  const reader = new FileReader();
  reader.onload = function(e) {
   document.getElementById('profile-pic-img').src = e.target.result;
  };
  reader.readAsDataURL(file);
 }
});

document.getElementById('profile-form').addEventListener('submit', function(event) {
 event.preventDefault();
 const name = document.getElementById('name').value;
 const bio = document.getElementById('bio').value;
 const interests = document.getElementById('interests').value;

 // Save the profile information (example: send it to a server or local storage)
 console.log('Profile saved:', { name, bio, interests });

 alert('Profile saved successfully!');
});
        headerBar = cp.view('header');
            footer = cp.field('wah-btn');
        coverTitle = cp.view('main').find('h1');
        headerTitle = headerBar.find('h1');
        // register back button handler
        headerBar.find('button').on('click', hidePage);
    //   footer.on('click', msgPage.show());
      
        cp.field('sve-btn')
            .on('click', function()
            {
              setSessionItem('coverm', cp.model().cover);
setSessionItem('titlem', cp.model().title)
setSessionItem('descm', cp.model().description)

        detailsPage.show();    })
          cp.field('edt-btn')
            .on('click', function()
            {
              setSessionItem('coverm', cp.model().cover);
setSessionItem('titlem', cp.model().title)
setSessionItem('descm', cp.model().description)

        profedPage.show();    })
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
        window.location.href = "#details";
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
