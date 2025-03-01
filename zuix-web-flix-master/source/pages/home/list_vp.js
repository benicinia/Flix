/* global zuix */
'use strict';
zuix.controller(function(cp) {
  const zx = zuix; // shorthand
  let itemsList;

  cp.create = function() {
    let url = cp.view().attr('data-o-rssR');
    // Use a proxy to prevent CORS policy restrictions errors
    fetchList(url);
  };

  function refresh() {
    const list = cp.field('listR');
    if (itemsList != null) {
      zx.$.each(itemsList, function(i, item) {
        const options = {
          lazyLoad: true,
          model: item
        };
        let el;
        if (i < 5) {
          // different layout for first 4 items (bigger)
          el = zx.createComponent('pages/home/items_list/itemvp', options).container();
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
      const id = getText(this.find('online'));
      const imageList = this.find('[medium="image"]');
      if (title !== '') {
        const images = [];
        // parse images to a json list
        imageList.each(function(i, el) {
          images.push({
            url: this.attr('url'),
            id: this.attr('online'),
            src: this.attr('src'),
            width:this.attr('width'),
            height: this.attr('height')
          });
        });
        let cover;
        let ihd;
        let src;
        if (i < 6 && images[0] != null) 
     {   cover = images[0].url;
     src =images[0].src;
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
          images,
          src
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
