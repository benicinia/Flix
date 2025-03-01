'use strict';
zuix.controller(function(cp) {
    let headerBar;
    let coverTitle;
    let headerTitle;
    let scrollHelper;
    cp.create = function() {
     let url = '_data/news-main.rss.xml';
    // Use a proxy to prevent CORS policy restrictions errors
   // fetchList(url);
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
        
     //   refresh();
        
        const backdropUrls = getSessionItem('coverd')
        const titl = getSessionItem('title')
        const overview= getSessionItem('desc')
        
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
   

/*  function refresh() {
    const list = cp.field('vlst');
    if (itemsList != null) {
      zuix.$.each(itemsList, function(i, item) {
        const options = {
          lazyLoad: true,
          model: item
        };
        let el;
        if (i < 5) {
          // different layout for first 4 items (bigger)
          el = zuix.createComponent('pages/home/items_list/itemv', options).container();
      //    el.setAttribute('poster', cp.model().cover);
          // 2 columns layout
       //   el.setAttribute('class', 'gallery-item'); // <-- will this work?
        } 
        // center the list on wide screens
  //  el.setAttribute('poster', cp.model().cover);
        list.append(el);
      });
      zuix.componentize();
    }
  }

  // Download RSS feed
  function fetchList(rssUrl) {
    zuix.$.ajax({
      url: rssUrl,
      success: function(res) {
        itemsList = parseRss(res);
        refresh();
      },
      error: function(err) {
        // TODO: handle error
      }
    });
  }

  // Parse RSS feed and create a JSON object out of it
  function parseRss(rssText) {
    const items = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(rssText, "text/xml");
    let d = zuix.$(doc);
    d.find('channel > item').each(function(i, el){
      const title = getText(this.find('title'));
      const description = getText(this.find('description'));
      const pubDate = getText(this.find('pubDate'));
      const link = getText(this.find('link'));
      const id = getText(this.find('id'));
      const imageList = this.find('[medium="image"]');
      if (title !== '') {
        const images = [];
        // parse images to a json list
        imageList.each(function(i, el) {
          images.push({
            url: this.attr('url'),
            id: this.attr('id'),
            width:this.attr('width'),
            height: this.attr('height')
          });
        });
        let cover;
        let ihd;
        if (i < 6 && images[0] != null) 
     {   cover = images[0].url;
     ihd = images[0].width;}
        
//  ihd = images[1].width;
        else if (i > 3 && images[1] != null) cover = images[4].url;
        const date = pubDate; // TODO: format date
        items.push({
          title,
          id,
          link,
          cover,
          date,
            description,
          images
        });
      }
    });
    return items;
  }

  function getText(node) {
    let text;
    // if node is ZxQuery, then get underlying HTMLElement
    if (node.length() > 0) node = node.get();
    if (node != null && node.firstChild != null) {
      // get rid of CDATA wrapper eventually
      text = node.firstChild.wholeText;
    } else if (node != null) {
      // get value as is
      text = node.innerHTML;
    }
    return text;
  }*/
});