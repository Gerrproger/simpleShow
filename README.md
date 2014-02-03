simpleShow
==========

SimpleShow is a responsive cross-browser slideshow plug-in. It's benefits are simplicity, convenience and lightness.

Now available only version for [jQuery](http://jquery.com/), pure JavaScript version is in progress.

#### Supports
* IE 7+
* All other popular browsers

#### Requires
* jQuery 1.4+

### [Live Demo](http://gerrproger.github.io/simpleShow/)


## Usage

Include the relevant files in the `<head>` of your document:
```html
<link type="text/css" href="style/simpleShow.css" rel="stylesheet" media="all" />
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript" src="js/simpleShow.min.js"></script>
```

Place the html code where needed:
```html
<div class="simpleShow-wrapper one-of-slider">
   <div class="simpleShow-controls"></div>
   <img class="simpleShow-zeroBg" src="zerobg.png" />
   <div class="simpleShow-slides">
      <a href="#" class="simpleShow-slide"><img src="img/1.jpg" alt="" /></a>
      <a href="#" class="simpleShow-slide"><img src="img/2.jpg" alt="" /></a>
      <a href="#" class="simpleShow-slide"><img src="img/3.jpg" alt="" /></a>
   </div>
</div>
```
**Note:** Each slide should have `simpleShow-slide` class and not necessary should be a link or an image


Then you just need to initialise simpleShow on `document.ready` using a selector:

```javascript
$(function(){
  $('.one-of-slider').simpleShow().show();
});
```

**Note:** Feel free to use chaining after calling simpleShow method

**Note:** SimpleShow can be initialised on any number of elements on a single page



## Methods


### init
Initializes plugin. Can receive option(s). Use shortcutted syntax
```javascript
$('#myslider').simpleShow({
  effect: 'fading'
});
$('#my2slider').simpleShow();
```


### update
Reinitializes plugin. Can be used for dynamically changing content and changing options
```javascript
$('#myslider').simpleShow('update');
$('#my2slider').simpleShow('update', {speed: 2000});
```
Or you can use shortcutted syntax for already initialized elements
```javascript
$('#myslider').simpleShow({speed: 2000, effect: 'sliding'});
$('#myslider').simpleShow({speed: 1000});
```


### destroy
Destroys plugin and returns the element in original condition
```javascript
$('#myslider').simpleShow('destroy');
```


### params
Returns parameters object for selected slider which consists of 
`item` - jQuery object of slider

`settings` - object with settings

`slides` - jQuery collection of slides

`active` - index of active slise

```javascript
var params = $('#myslider').simpleShow('params');
```


## Options


### effect
_Default:_ `crossfade`

Transition effects. Can be `blocks`, `sliding`, `fading`, `crossfade`
```javascript
$('#myslider').simpleShow({
  effect: 'fading'
});
```

**Note:** For `fading` effect you can setup "fading throw" color by defining `background-color` to `.simpleShow-wrapper` class


### blocks
_Default:_ `10`

Amount of blocks which would be used for `blocks` animation.
```javascript
$('#myslider').simpleShow({
  effect: 'blocks',
  blocks: 20
});
```

**Note:** Used only with `blocks` effect


### direction
_Default:_ `bottom`

Sets the direction for some effects. Can be `bottom`, `top`, `left` or `right`.
```javascript
$('#myslider').simpleShow({
  effect: 'sliding',
  direction: 'top'
});
```

**Note:** Used only with `blocks` and `sliding` effects


### interval
_Default:_ `4000`

An interval before showing next slide in milliseconds.
```javascript
$('#myslider').simpleShow({
	interval: 2500
});
```


### speed
_Default:_ `1000`

Speed of sliding effects in milliseconds.
```javascript
$('#myslider').simpleShow({
	speed: 3000
});
```


### arrows
_Default:_ `true`

Whether to show navigation arrows or not.
```javascript
$('#myslider').simpleShow({
	arrows: false
});
```


### radios
_Default:_ `true`

Whether to show navigation radios or not.
```javascript
$('#myslider').simpleShow({
	radios: false
});
```


### normIndex
_Default:_ `10`

Z-index property for slides.
```javascript
$('#myslider').simpleShow({
	normIndex: 50
});
```


### maxIndex
_Default:_ `10`

Z-index which would be set for active slide during some effects.
```javascript
$('#myslider').simpleShow({
	maxIndex: 70
});
```
