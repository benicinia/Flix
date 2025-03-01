<div data-ui-context="my-view-pager"
  data-ui-load="@lib/controllers/view_pager">
  <!-- ... -->
</div>
<script>
var viewPager;
zuix.context('my-view-pager', function(){
  viewPager = this;
});
</script>

 select page
 viewPager.page(2);
 // get element of a page (returns ZxQuery-wrapped element)
 const pageFour = viewPager.get(3);
 pageFour.find('a').attr('rel', 'no-opener');
 // select next page
 viewPager.next();
 // select previous page
 viewPager.prev();
 // get auto-slide mode (true/false)
 const slideMode = viewPager.slide();
 // enable or pause auto-slide mode
 viewPager.slide(true);
 // get current layout mode ('horizontal' or 'vertical')
 const layoutMode = viewPager.layout();
 // change current layout mode
 viewPager.layout('vertical');