var groupControl=function(e,t){this.id=e;var n=document;this.type="radio";this.onChange=function(){var e=this.root().getElementsByTagName("input");for(var t=0;t<e.length;t++){var n=e[t];if(n.checked){$(n.parentNode).addClass("checked")}else{$(n.parentNode).removeClass("checked")}}return};this.createElements=function(r){var i=n.createElement("div");i.id=e;var s=this;for(var o=0;o<r;o++){var u=n.createElement("label");u.id=e+"label_"+o;u.setAttribute("class","qradio");var a=n.createElement("input");a.type=this.type;a.id=e+"input_"+o;a.name=e;a.onchange=function(){return s.onChange()};u.appendChild(a);var f=n.createElement("div");f.id=e+"div_"+o;f.setAttribute("style","display: inline-block; padding-left: 10px; font-size: 18px;");u.appendChild(f);i.appendChild(u);i.onmousemove=function(){return s.onHover()};if(o==0){$(u).addClass("checked");$(a).focus()}}if(t){document.getElementById(t).appendChild(i)}return i};this.root=function(){return document.getElementById(e)};this.checkedElements=function(){var t=[];var n=document.getElementById(e).getElementsByTagName("input");for(var r=0;r<n.length;r++){if(n[r].checked){t.push(n[r])}}return t};this.checkedIndexs=function(){var t=[];var n=document.getElementById(e).getElementsByTagName("input");for(var r=0;r<n.length;r++){if(n[r].checked){t.push(r)}}return t};this.checkedValues=function(){var t=[];var n=document.getElementById(e).getElementsByTagName("input");for(var r=0;r<n.length;r++){if(n[r].checked){t.push(n[r].value)}}return t};this.checkedIds=function(){var t=[];var n=document.getElementById(e).getElementsByTagName("input");for(var r=0;r<n.length;r++){if(n[r].checked){t.push(n[r].id)}}return t};this.input=function(t){return n.getElementById(e+"input_"+t)};this.label=function(t){return n.getElementById(e+"label_"+t)};this.div=function(t){return n.getElementById(e+"div_"+t)};this.labels=function(){return n.getElementById(e).getElementsByTagName("label")};this.onHover=function(){};this.length=function(){return n.getElementById(e).getElementsByTagName("label").length};this.uncheckAll=function(){var t=document.getElementById(e).getElementsByTagName("input");for(var n=0;n<t;n++){t[n].checked=false}};this.checkAll=function(){var t=document.getElementById(e).getElementsByTagName("input");for(var n=0;n<t;n++){t[n].checked=true}};this.disable=function(){var t=document.getElementById(e).getElementsByTagName("input");for(var n=0;n<t.length;n++){t[n].disabled=true}};this.empty=function(){document.getElementById(e).innerHTML=""};this.height=function(t){var n=document.getElementById(e).getElementsByTagName("input");for(var r=0;r<n.length;r++){n[r].style.height=t+"px"}};this.createCanvas=function(t,r){var i=this.length();for(var s=0;s<i;s++){var o=n.createElement("canvas");o.width=t;o.height=r;o.id=e+"canvas_"+s;this.div(s).appendChild(o)}};this.canvasElement=function(t){return document.getElementById(e+"canvas_"+t)};this.canvasId=function(t){return e+"canvas_"+t};this.canvas=function(e){return document.getElementById(this.canvasId(e))};this.content=function(e,t){if(!t){return this.div(e).innerHTML}else{this.div(e).innerHTML=t}};this.value=function(e,t){if(t == undefined){return this.input(e).value}else{this.input(e).value=t}}}