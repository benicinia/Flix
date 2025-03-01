/* global zuix */
'use strict';
zuix.controller(function(cp) {
  const zx = zuix; // shorthand
  let itemsList;
  const rssx = true;
  const dbx = false;
  const urlcom = '_data/news-main.rss.xml';
const urltv = '_data/news-main2.rss.xml';
  cp.create = function() {
    let url = cp.view().attr('data-o-rss');
    // Use a proxy to prevent CORS policy restrictions errors
    fetchList(url);
  };

  function refresh() {
    const list = cp.field('list');
    if (itemsList != null) {
      zx.$.each(itemsList, function(i, item) {
        const options = {
          lazyLoad: true,
          model: item
        };
        let el;
        if( url == urlcom) {
          // different layout for first 4 items (bigger)
          el = zx.createComponent('pages/home/list_comedy/item', options).container();
          // 2 columns layout
       //   el.setAttribute('class', 'gallery-item'); // <-- will this work?
        } 
       else  if (url == urltv) {
    // different layout for first 4 items (bigger)
    el = zx.createComponent('pages/home/list_tv_series/item', options).container();
    // 2 columns layout
    //   el.setAttribute('class', 'gallery-item'); // <-- will this work?
  }
        // center the list on wide screens
    // el.setAttribute('layout', 'row');
        list.append(el);
      });
      zuix.componentize();
    }
  }

  // Download RSS feed
  if (rssx == true) {
     function fetchList(rssUrl) {
    zx.$.ajax({
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

 
  } else if (dbx == true) {
     function fetchList(rssUrl) {
   zx.$.ajax({
  url: 'https://api.themoviedb.org/3/search/multi?api_key=' + tmdbKey + '&query=' + title,
  success: function(json) {
    const data = JSON.parse(json);
    if (data.total_results < 2) {
      const item = data.results[0];
      const posterUrl = 'https://image.tmdb.org/t/p/w154' + item.poster_path;
      cp.view().css('background-image', 'url("' + posterUrl + '")');
      // set absolute urls for images
      item.poster_path = 'https://image.tmdb.org/t/p/w780' + item.poster_path;
      item.backdrop_path = 'https://image.tmdb.org/t/p/w1280' + item.backdrop_path;
      // add on click listener to open the details page
      cp.view().on('click', function() {
        if (detailsPage) detailsPage.show(item);
      });
    }
  }
});
  }

 
    
  }
 
  // Parse RSS feed and create a JSON object out of it
  function parseRss(rssText) {
    const items = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(rssText, "text/xml");
    let d = zx.$(doc);
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
  }
});
