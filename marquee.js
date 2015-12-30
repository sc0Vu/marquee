/**
 * author: Peter Lai
 * email: alk03073135@gmail.com
 * Liscence: MIT
 */
(function (d,a,b) {
    var div = d.getElementById(a),
        ul = d.getElementById(b),
        ch = ul.children,
        chl = ch.length;
    if (chl === 0) {
        ul.style.display = 'none';
        return;
    }
    var ofX = ch[chl-1].offsetLeft,
        lW = ch[chl-1].offsetWidth,
        time = (ofX + lW) / (chl * 10),
        rule = [];
    if (ofX < ul.clientWidth) {
        var ww = (ul.clientWidth-10*chl) / chl;
        for (var i=0; i<ch.length && ch.length>=1; i++) {
            ch[i].style.width = ww+'px';
            ch[i].style.textAlign = 'center';
            ch[i].style.float = 'left';
        }
        if (chl === 1) {
            ofX = ww;
        } else {
           ofX = chl * (ww+10); 
        }
    }
    if ('animate' in ul) {
        var marquee = ul.animate([
            {
                transform:'translate(0px)'
            },
            {
                transform:'translate(-'+ofX+'px)'
            },
        ],{
            duration: time*1000,
            iterations: Infinity,
            easing: 'ease',
            direction: 'alternate',
        }),
        state = false;
        marquee.play();
        state = true
        function stopMarquee() {
            if (state === true) {
                marquee.pause();
                state = false
            }
        }
        function enableMarquee() {
            if (state === false) {
                marquee.play();
                state = true;
            }
        }
        ul.addEventListener('mouseenter', stopMarquee, false);
        ul.addEventListener('mouseleave', enableMarquee, false);
        return ;
    }
    function getRule() {
        var r,
            s = d.styleSheets,
            x = 0,
            tmp = [];
        for (var i=0; i<s.length; i++) {
            for (var j=0; j<s[i].cssRules.length; j++) {
                r = s[i].cssRules[j];
                if (r.name == 'marquee' && r.type == CSSRule.KEYFRAMES_RULE) {
                    tmp[x] = r;
                    x++;
                }
            }
        }
        return tmp;
    }
    ul.style.animationDuration = ul.style.webkitAnimationDuration = time+'s';
    rule = getRule();
    if (rule) {
        for (var x of rule) {
            x.appendRule("to {-ms-transform:translate("+(ofX)*-1+"px);-webkit-transform:translate("+(ofX)*-1+"px);transform:translate("+(ofX)*-1+"px);}");
        }
    }
})(document, 'marquee', 'marquee-content');