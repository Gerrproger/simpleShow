/**
 * simpleShow
 * v1.2
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
	  blocks: 10,
      direction: 'bottom',
      normIndex: 10,
      maxIndex: 100
    }, options);
    return this.each(function(){
        var self = $(this),	
        pref = '.simpleShow-',
        act = 'simpleShow-active',	
        now = 1,
        t = null,
		radios = null,
		slides = self.find(pref+'slide'),
		ln = slides.length,
        dr = set.direction,
        n = set.blocks;
        if(ln < 2) return;
		if(set.arrows) 
		  self.find(pref+'controls').append('<a class="simpleShow-toLeft" href="#"></a>').append('<a class="simpleShow-toRight" href="#"></a>');
		if(set.radios){
		  self.find(pref+'controls').append('<div class="simpleShow-radios"></div>');
          for(var i=0; i<ln; i++) 
		     self.find(pref+'radios').append('<a href="#" class="simpleShow-radio"></a>');
          self.find(pref+'radio:first').addClass(act); 
		  radios = self.find(pref+'radio');
		}
        slides.css({'overflow':'hidden', 'z-index':set.normIndex});
        function setInterv(){
		   t = setInterval(function(){interv();}, set.interval+set.speed);
		}		
        function interv(reverse, prev){
            var nowN, nowP,
            w = self.width(),
            h = self.height(); 
            if(now == ln){
                now = nowN = 0;
                nowP = reverse ? 1 : ln-1;
            }
            else {
                nowN = now;
                nowP = reverse ? (now+1==ln ? 0 : now+1) : now-1;
            } 
            if(prev != undefined) nowP = prev;
            var elNnew = slides.eq(nowN),
            elPrev = slides.eq(nowP);
            switch(set.effect){
                case 'crossfade': {
                    var s = set.speed*0.5;
                    elNnew.fadeIn(s);
                    elPrev.fadeOut(s);
                } break;
                case 'fading': {
                    var s = set.speed*0.5;
                    elPrev.fadeOut(s, function(){
                        elNnew.fadeIn(s);
                    }); 
                } break;
                case 'sliding': {
                    var s = set.speed,
                    b = (dr=='left' || dr=='right') ? w : h,
                    rb = b*0.1;
                    lt = (dr=='left' || dr=='right') ? (dr=='left' ? ('+='+rb) : ('-='+rb)) : 'auto',
                    ltt = (dr=='left' || dr=='right') ? (dr=='left' ? ('-='+(b+rb)) : ('+='+(b+rb))) : 'auto',
                    tt = (dr=='top' || dr=='bottom') ? (dr=='top' ? ('+='+rb) : ('-='+rb)) : 'auto',
                    ttt = (dr=='top' || dr=='bottom') ? (dr=='top' ? ('-='+(b+rb)) : ('+='+(b+rb))) : 'auto';
                    elPrev.css({'z-index':set.maxIndex, 'height':h, 'width':w}).
                       animate({'left':lt, 'top':tt}, s*0.3).delay(s*0.1).
                       animate({'left':ltt, 'top':ttt}, s*0.6, function(){
                        $(this).css({'display':'none', 'z-index':set.normIndex, 'left':0, 'top':0, 'height':'auto', 'width':'auto'});
                       });
                    elNnew.css('display','block');
                } break;
                case 'blocks': {
                    var ow = Math.floor(w / n)+1,
                    w = w,
                    h = h,
                    oh = Math.floor(h / n)+1,
                    el = elPrev,
                    s = Math.floor(set.speed / n),
                    fl = (dr=='bottom' || dr=='top'),
                    drTop = fl ? ((dr=='top' ? -1 : 1) * h) : 'auto',
                    drLeft = (dr=='left'|| dr=='right') ? ((dr=='left' ? -1 : 1) * w) : 'auto';
                    for(var i=0; i<n; i++){
                        var block = $('<div>');
                        block.css({'position':'absolute',
                            'width': fl ? ow : w,
                            'height': fl ? h : oh,
                            'z-index': set.maxIndex, 
                            'top': fl ? 0 : (i*oh+'px'), 
                            'overflow': 'hidden', 
                            'left': fl ? (i*ow+'px') : 0 }).
                        html($(el).clone().css({'top': fl ? 0 : (-1*i*oh+'px'),
                            'width': w,
                            'height': h, 
                            'left': fl ? (-1*i*ow+'px') : 0 })
                        ).appendTo(self);
                        block.delay(s*i).animate({top:drTop, left:drLeft, opacity:0.2}, s*2, function(){
                                $(this).remove();
                        });
                    }
                    elNnew.css('display','block');
                    elPrev.css('display','none');   
                }
            }
            radios.eq(nowN).addClass(act);
            radios.eq(nowP).removeClass(act);
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
            if($(this).hasClass(act)) return;
            clearInterval(t);
            var ind = self.find(pref+'radio').index($(this)),
            prev = now==1 ? 0 : now-1,
            now = ind;
            interv(false, prev);
            setInterv();
        });	
	});	
  };
})(jQuery);
