# react-native-view-pager

A ListView backed ViewPager component for react-native apps. More flexible than ViewPagerAndroid.



## Install

`npm install --save @ldn0x7dc/react-native-view-pager` 

The private scope `@ldn0x7dc` exists because this name has already been taken.



## Documentation

Have a glance at first.

```
import ViewPager from '@ldn0x7dc/react-native-view-pager';
...
render() {
    return (
      <ViewPager
        style={{flex: 1}}
        renderPage={(pageData, pageId, layout) => {}}
        pageDataArray={['your', 'data', 'array']}
      />
    );
  }
```

#### Props

Most of the props mimics those of ViewPagerAndroid. But differences exist.

* `renderPage` : function

  (pageData, pageId, layout) => renderable

  For your convenience, The **layout** object ({width, height}) contains the width and height of this ViewPager. The renderable returned here will be overridden with ViewPager's width and height.


* `pageDataArray` : array

  Custom data array of your pages. Each array item will be passed to `renderPage(pageData, pageId, layout)` as the first argument.


* `initialPage` : number

  Index of initial page that should be selected. Use `setPage` method to update the page, and `onPageSelected` to monitor page changes


* `onPageScroll` : function

  (event) => {}. 

  The event object  will carry following data: 

  * *position*:  index of first page from the left that is currently visible 
  * *offset*: value from range [0,1) describing stage between page transitions. 
  * *fraction*: means that (1 - x) fraction of the page at "position" index is visible, and x fraction of the next page is visible.

* `onPageScrollStateChanged` : function

  (state) => {}. 

  Called when the page scrolling state has changed. The page scrolling state can be in 3 states: - 

  * idle, meaning there is no interaction with the page scroller happening at the time
  * dragging, meaning there is currently an interaction with the page scroller
  * settling, meaning that there was an interaction with the page scroller, and the page scroller is now finishing it's closing or opening animation 

* `onPageSelected` : function

  (page) => {}.

  Called with the index of page that has been selected.

* `pageMargin` : number

  Blank space to show between pages.

* `scrollEnabled` : bool

  When false, the content does not scroll. The default value is true.

#### Methods

* `setPage(page, immediate)`

  A helper function to scroll to a specific page in the ViewPager. The transition between pages will be animated if `immediate` is not provided or false.