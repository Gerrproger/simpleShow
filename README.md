simpleShow
==========

SimpleShow is a responsive cross-browser slideshow plug-in. It's benefits are simplicity, convenience and lightness.

Now available only version for [jQuery](http://jquery.com/), pure JavaScript version is in progress.

#### Supports
* IE 7+
* All other popular browsers

#### Requires
* jQuery 1.7+

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


## Options

### interval
_Default:_ `4000`

An interval before showing next slide in milliseconds.
```javascript
$('#myslider').simpleShow({
	interval: 2500
});
```


### speed
_Default:_ `300`

Speed of sliding effects in milliseconds.
```javascript
$('#myslider').simpleShow({
	speed: 600
});
```
**Note:** Currently, only crossfade effect available


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
