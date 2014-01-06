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
      speed: 300,
	  interval: 4000,
      radios: true,
	  arrows: true
    }, options);
    return this.each(function(){
        var self = $(this),		
        now = 1,
        t = null,
		radios = null,
		slides = self.find('.simpleShow-slide'),
		ln = slides.length;
        if(ln < 2) return;
		if(set.arrows) 
		  self.find('.simpleShow-controls').append('<a class="simpleShow-toLeft" href="#"></a>').append('<a class="simpleShow-toRight" href="#"></a>');
		if(set.radios){
		  self.find('.simpleShow-controls').append('<div class="simpleShow-radios"></div>');
          for(var i=0; i<ln; i++) 
		     self.find('.simpleShow-radios').append('<a href="#" class="simpleShow-radio"></a>');
          self.find('.simpleShow-radio:first').addClass('simpleShow-active'); 
		  radios = self.find('.simpleShow-radio');
		}
        function setInterv(){
		   t = setInterval(function(){interv();}, set.interval);
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
            slides.eq(nowN).fadeIn(set.speed);
            slides.eq(nowP).fadeOut(set.speed);
            radios.eq(nowN).addClass('simpleShow-active');
            radios.eq(nowP).removeClass('simpleShow-active');
            now++;
        }
        setInterv();
        self.find('.simpleShow-toLeft').click(function(e){
            e.preventDefault();
            clearInterval(t); 
            now = now>2 ? now-2 : (now==1 ? ln-1 : ln);
            interv(true);
            setInterv();
        });
        self.find('.simpleShow-toRight').click(function(e){
            e.preventDefault();
            clearInterval(t);
            interv();
            setInterv();
        });
        self.find('.simpleShow-radio').click(function(e){
            e.preventDefault();
            if($(this).hasClass('simpleShow-active')) return;
            clearInterval(t);
            var ind = self.find('.simpleShow-radio').index($(this)),
                prev = now==1 ? 0 : now-1;
            now = ind;
            interv(false, prev);
            setInterv();
        });	
	});	
  };
})(jQuery);
