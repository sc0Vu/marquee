<h2>html5 marquee with <a href="https://w3c.github.io/web-animations/" target="_balnk">webanimation api</a></h2>
<p>
usage in HTML
</p>
<pre>
<div id='a'>
  <ul id='b'>
    <li>Hello world!</li>
    <li>Im running!#1</li>
    <li>Im running!#2</li>
    <li>Im running!#3</li>
    <li>Im running!#4</li>
    <li>Im running!#5</li>
  </ul>
</div>
</pre>
<p>
usage in CSS
</p>
<pre>
#a {
    border: 1px #ccc dashed;
    overflow: hidden;
    max-height: 20px;
    width: 100%;
    position: absolute;
}
#b {
    width: 100%;
    max-height: 20px;
    padding: 0;
    position: relative;
    white-space: nowrap;
    top: 0;
    margin: 0;
    transition: 2s all ease;
    /*-webkit-animation: 10s marquee ease infinite;*/
    /*animation: 10s marquee ease infinite;*/
}
#b > li {
    min-width: 10%;
    min-height: 20px;
    list-style: none;
    display: inline-block;
    position: relative;
    left: auto;
    padding: 1px 5px;
}
#b:hover {
    animation-play-state: paused;
}
/*@-webkit-keyframes marquee {
    from {text-indent:0;}
}*/
@keyframes marquee {
    from {left:0;}
}
</pre>
<p>
usage in javascript
</p>
<pre>
let marquee = new $marquee$(parentId, {marqueeContainer:marqueeContainerId});
	marquee.run();
</pre>
<p>For animation api information and broswer support<br>
<a href="https://w3c.github.io/web-animations/" target="_blank">w3c</a><br>
<a href="http://caniuse.com/#search=animate" target="_blank">caniuse</a><br>
<a href="https://developer.mozilla.org/zh-TW/docs/Web/API/Animation" target="_blank">MDN</a><br>
<a href="https://jsfiddle.net/PeterLai/cL65vey3/23/" target="_blank">live example</a>