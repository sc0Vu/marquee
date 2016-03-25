/**
 * author: Peter Lai
 * email: alk03073135@gmail.com
 * Liscence: MIT
 */
(function (i,s,d) {
    i[d] = function (id, opts) {
    this._opts = opts || {};
    this._marqueeParent = s.getElementById(id);
    this._marqueeContainer = s.getElementById(this._opts.marqueeContainer);
  }

  i[d].prototype.init = function () {
    if (this.checkCountEqual(0)) {
      this._marqueeParent.style.display = 'none';
      return false;
    }
    this._ch = this._marqueeContainer.children;
    this._chl = this._ch.length;
    this._liofX = this._ch[this._chl-1].offsetLeft;
    this._liofW = this._ch[this._chl-1].offsetWidth;
    this._cclW = this._marqueeContainer.clientWidth;
    this._time = (this._liofX + this._liofW) / (this._chl * 10);
    return true;
  }

  i[d].prototype.getScript = function () {
    var r,
        stys = s.styleSheets,
        tmp = [];
      
    for (var i=0; i<stys.length; i++) {
        for (var j=0; j<stys[i].cssRules.length; j++) {
            r = stys[i].cssRules[j];
            if (r.name === 'marquee' && r.type === CSSRule.KEYFRAMES_RULE) {
                tmp.push(r);
            }
        }
    }
    return tmp;
  }

  i[d].prototype.runMarqueeByAnimate = function () {
    var self = this;
    this._animation = this._marqueeContainer.animate([
          {
              transform:'translate(0px)'
          }, {
              transform:'translate(-'+this._liofX+'px)'
          },
      ], {
          duration: this._time * 1000,
          iterations: Infinity,
          easing: 'ease',
          direction: 'alternate',
      });
    this._marqueeContainer.onmouseenter = function () {
      return self.stopMarquee();
    }
    this._marqueeContainer.onmouseleave = function () {
      return self.resumeMarquee();
    }
    this.resumeMarquee();
  }

  i[d].prototype.stopMarquee = function () {
    if (this._playState === true) {
      this._animation.pause();
      this._playState = false;
    }
  }
  i[d].prototype.resumeMarquee = function () {
    if (this._playState === false) {
      this._animation.play();
      this._playState = true;
    }
  }

  i[d].prototype.runMarqueeByCSS = function () {
    this._marqueeContainer.style.animationDuration = this._marqueeContainer.style.webkitAnimationDuration = this._time+'s';
    var rule = this.getRule();
  
    if (rule) {
      rule.forEach( function (x) {
        x.appendRule("to {-ms-transform:translate("+(this._liofX)*-1+"px);-webkit-transform:translate("+(this._liofX)*-1+"px);transform:translate("+(this._liofX)*-1+"px);}");
      });
    }
  }

  i[d].prototype.countMarquee = function () {
    return this._marqueeContainer.children.length;
  }

  i[d].prototype.isAnimate = function () {
    return ('animate' in this._marqueeContainer);
  }

  i[d].prototype.checkCountEqual = function (num) {  
    return (this._marqueeContainer.children.length === num) ? true : false;
  }

  i[d].prototype.checkClientWidth = function () {
    if (this._liofX < this._cclW) {
      let ww = (this._cclW-10*this._chl) / this._chl;

      for (let i=0,l=this._ch.length; i<l && this._ch.length>=1; i++) {
        this._ch[i].style.width = ww+'px';
        this._ch[i].style.textAlign = 'center';
        this._ch[i].style.float = 'left';
      }

      if (this._chl === 1) {
        this._liofX = ww;
      } else {
        this._liofX = this._chl * (ww+10); 
      }
    }
  }

  i[d].prototype.run = function () {
    if (!this.init()) {
      return;
    }

    if (this.isAnimate()) {
      this._playState = false;
      this._animation = '';
      this.runMarqueeByAnimate();
    } else {
      this.runMarqueeByCSS();
    }
    console.log(this);
  }
})(window, document, '$marquee$');