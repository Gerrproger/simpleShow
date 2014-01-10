/**
 * simpleShow
 * v1.0
 * Evgenii Dulikov
 * http://datatables.net/license_gpl2
 * Copyright 2014 Evgenii Dulikov, all rights reserved.
 */
 
(function( $ ) {
  $.fn.simpleShow = function(options){
	var set = $.extend({
      speed: 1000,
	  interval: 4000,
      radios: true,
	  arrows: true,
      effect: 'crossfade',
	  cols: 10
    }, options);
    return this.each(function(){
        var self = $(this),	
        pref = '.simpleShow-',	
        now = 1,
        t = null,
		radios = null,
		slides = self.find(pref+'slide'),
		ln = slides.length;
        if(ln < 2) return;
		if(set.arrows) 
		  self.find(pref+'controls').append('<a class="simpleShow-toLeft" href="#"></a>').append('<a class="simpleShow-toRight" href="#"></a>');
		if(set.radios){
		  self.find(pref+'controls').append('<div class="simpleShow-radios"></div>');
          for(var i=0; i<ln; i++) 
		     self.find(pref+'radios').append('<a href="#" class="simpleShow-radio"></a>');
          self.find(pref+'radio:first').addClass('simpleShow-active'); 
		  radios = self.find(pref+'radio');
		}
        function setInterv(){
		   t = setInterval(function(){interv();}, set.interval+set.speed);
		}		
        function interv(reverse, prev){
            var nowN, nowP; 
            if(now == ln){
                now = nowN = 0;
                nowP = reverse ? 1 : ln-1;
            }
            else {
                nowN = now;
                nowP = reverse ? (now+1==ln ? 0 : now+1) : now-1;
            } 
            if(prev != undefined) nowP = prev;
            switch(set.effect){
                case 'crossfade': {
                    var s = Math.floor(set.speed / 2);
                    slides.eq(nowN).fadeIn(s);
                    slides.eq(nowP).fadeOut(s);
                } break;
                case 'fading': {
                    var s = Math.floor(set.speed / 2);
                    slides.eq(nowP).fadeOut(s, function(){
                        slides.eq(nowN).fadeIn(s);
                    }); 
                } break;
                case 'blocks': {
                    var w = Math.floor(self.width() / set.cols)+1,
                    h = self.height(),
                    ow = self.width(),
                    el = slides.eq(nowP),
                    s = Math.floor(set.speed / set.cols);
                    for(var i=0; i<set.cols; i++){
                        var block = $('<div>');
                        block.width(w).height(h).
                        css({'position':'absolute',
                             'z-index': 100, 
                             'top': 0, 
                             'overflow': 'hidden', 
                             'left': i*w+'px' }).
                        html($(el).clone().css({'top': 0,
                            'width': ow,
                            'height': h, 
                            'left': -1*i*w+'px' })
                        ).appendTo(self); 
                        block.delay(s*i).animate({top:h, opacity:0}, s*2, function(){
                                $(this).remove();
                        });
                    }
                    slides.eq(nowN).css('display','block');
                    slides.eq(nowP).css('display','none');   
                } break;
            }
            radios.eq(nowN).addClass('simpleShow-active');
            radios.eq(nowP).removeClass('simpleShow-active');
            now++;
        }
        setInterv();
        self.find(pref+'toLeft').click(function(e){
            e.preventDefault();
            clearInterval(t); 
            now = now>2 ? now-2 : (now==1 ? ln-1 : ln);
            interv(true);
            setInterv();
        });
        self.find(pref+'toRight').click(function(e){
            e.preventDefault();
            clearInterval(t);
            interv();
            setInterv();
        });
        self.find(pref+'radio').click(function(e){
            e.preventDefault();
            if($(this).hasClass('simpleShow-active')) return;
            clearInterval(t);
            var ind = self.find(pref+'radio').index($(this)),
                prev = now==1 ? 0 : now-1;
            now = ind;
            interv(false, prev);
            setInterv();
        });	
	});	
  };
})(jQuery);
