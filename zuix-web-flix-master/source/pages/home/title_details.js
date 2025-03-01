'use strict';
zuix.controller(function(cp) {
    let headerBar;
    let coverTitle;
    let headerTitle;
    let scrollHelper;
    let footer;
    cp.create = function() {
      function setSessionItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
        headerBar = cp.view('header');
            footer = cp.field('wah-btn');
        coverTitle = cp.view('main').find('h1');
        headerTitle = headerBar.find('h1');
        // register back button handler
        headerBar.find('button').on('click', hidePage);
       
  //  footer.on('click', msgPage.show());
        cp.field('edt-btn')
            .on('click', function()
            {
            profedPage.show();
            setSessionItem('coverm', cp.model().cover);
setSessionItem('titlem', cp.model().title)
setSessionItem('descm', cp.model().description)

           })
        cp.field('wah-btn')
            .on('click', function()
            {
              setSessionItem('coverm', cp.model().cover);
setSessionItem('titlem', cp.model().title)
setSessionItem('descm', cp.model().description)

        msgPage.show();    })
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
          .css('background//-image', backdropUrl);
        cp.field('title').html(titl);
       cp.field('overview').html(overview);
     //   cp.field('vote').html(item.vote_average);
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
