webpackJsonp([0],{"+ptz":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mt5 mw6 center"},[n("div",{staticClass:"bg-near-white"},[n("texteditor",{staticClass:"pa2",attrs:{"raw-content-handler":t.handlerRawContent,"operations-handler":t.handleOperation}})],1),n("div",{staticClass:"mt3 pt3 gray bt b--silver center lh-copy"},[t._v("\n    "+t._s(t.htmlData)+"\n  ")]),n("transition-group",{staticClass:"lh-copy mt3 pt3 bt b--silver mw7 center list pa0 ma0",attrs:{name:"flip-list",tag:"ul"}},t._l(t.operations,function(e,i){return n("li",{key:e.key,staticClass:"bb b--near-white pv2",class:[0==i?"appear":""]},[n("span",{domProps:{innerHTML:t._s(e.description)}},[t._v(t._s(i))])])}))],1)};i._withStripped=!0;var r={render:i,staticRenderFns:[]};e.a=r},"/3T2":function(t,e,n){"use strict";var i=n("DtzI"),r=n("pztP"),o=!1;var s=function(t){o||n("Nb7g")},a=n("VU/8")(i.a,r.a,!1,s,null,null);a.options.__file="components/TextEditor.vue",e.a=a.exports},"/TYz":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("1YH9"),r=n("+ptz"),o=!1;var s=function(t){o||n("8gtv")},a=n("VU/8")(i.a,r.a,!1,s,null,null);a.options.__file="pages/index.vue",e.default=a.exports},"1YH9":function(t,e,n){"use strict";var i=n("/3T2");e.a={components:{texteditor:i.a},data:function(){return{htmlData:"",operations:[]}},methods:{handlerRawContent:function(t){this.htmlData=t},handleOperation:function(t){this.operations.unshift(t)}}}},"8gtv":function(t,e,n){var i=n("C6mG");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("a6fb6a8c",i,!1,{sourceMap:!1})},C6mG:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,".flip-list-move{-webkit-transition:-webkit-transform .7s cubic-bezier(.415,.49,.02,.99);transition:-webkit-transform .7s cubic-bezier(.415,.49,.02,.99);transition:transform .7s cubic-bezier(.415,.49,.02,.99);transition:transform .7s cubic-bezier(.415,.49,.02,.99),-webkit-transform .7s cubic-bezier(.415,.49,.02,.99)}.appear{-webkit-animation:appear .7s infinite;animation:appear .7s infinite;-webkit-animation-iteration-count:1;animation-iteration-count:1}@-webkit-keyframes appear{0%{opacity:0}30%{opacity:0}to{opacity:1}}@keyframes appear{0%{opacity:0}30%{opacity:0}to{opacity:1}}",""])},DtzI:function(t,e,n){"use strict";var i=n("BO1k"),r=n.n(i);e.a={props:{rawContentHandler:{type:Function,default:null},operationsHandler:{type:Function,default:null}},mounted:function(){this.fireRawContent()},data:function(){return{editorID:"dg8md8mfsxe773hsgd6x6h",selection:null,mouse:null,lastClick:0}},methods:{clicked:function(t){},fireRawContent:function(){this.rawContentHandler&&this.rawContentHandler(this.$refs.txteditor.innerHTML)},fireOperation:function(t){this.operationsHandler&&this.operationsHandler(t)},onContentChange:function(t){"insertParagraph"==t.inputType&&this.runSplitting(),"deleteContentBackward"==t.inputType&&this.runMerge(this.$refs.txteditor),this.$nextTick(this.fireRawContent)},runMerge:function(t){for(var e=t.childNodes,n=1;n<e.length;++n)if("SPAN"==e[n].nodeName&&"SPAN"==e[n-1].nodeName){var i=this.mergeSpans(e[n-1],e[n]);this.removeInternalExtraSpans(i)}},mergeSpans:function(t,e){var n=document.createRange();n.setStartBefore(t),n.setEndAfter(e);var i=this.unionStyle(this.scanStyle(t),this.scanStyle(e)),r=i.unionStyle,o=i.leftStyle,s=i.rightStyle,a=this.unionClass(t.classList,e.classList),l=a.unionClasses,c=a.leftClasses,u=a.rightClasses,p=document.createElement("span");return p.style.cssText=this.cssText(r),l.forEach(function(t){return p.classList.add(t)}),t.style.cssText=this.cssText(o),e.style.cssText=this.cssText(s),t.classList.value=c.value,e.classList.value=u.value,n.surroundContents(p),p},removeInternalExtraSpans:function(t){for(var e="",n=0;t.childNodes&&n<t.childNodes.length;++n){var i=t.childNodes[n];""===i.style.cssText&&0==i.classList.length?e+=i.innerHTML:e+=i.outerHTML}t.innerHTML=e},scanStyle:function(t){var e={},n=!0,i=!1,o=void 0;try{for(var s,a=r()(t.style);!(n=(s=a.next()).done);n=!0){var l=s.value;e[l]=t.style[l]}}catch(t){i=!0,o=t}finally{try{!n&&a.return&&a.return()}finally{if(i)throw o}}return e},unionStyle:function(t,e){var n={};for(var i in t)e.hasOwnProperty(i)&&t[i]===e[i]&&(n[i]=t[i]);for(var r in n)delete t[r],delete e[r];return{unionStyle:n,leftStyle:t,rightStyle:e}},cssText:function(t){var e="";for(var n in t)e=e+" "+n+":"+t[n]+";";return e},unionClass:function(t,e){var n=[],i=!0,o=!1,s=void 0;try{for(var a,l=r()(t);!(i=(a=l.next()).done);i=!0){var c=a.value;e.contains(c)&&n.push(c)}}catch(t){o=!0,s=t}finally{try{!i&&l.return&&l.return()}finally{if(o)throw s}}var u=!0,p=!1,d=void 0;try{for(var f,h=r()(n);!(u=(f=h.next()).done);u=!0){var m=f.value;t.remove(m),e.remove(m)}}catch(t){p=!0,d=t}finally{try{!u&&h.return&&h.return()}finally{if(p)throw d}}return{unionClasses:n,leftClasses:t,rightClasses:e}},runSplitting:function(){var t=this.getFirstSplitable();t?(this.splitSpan(t,o(t,"span")),this.$nextTick(this.runSplitting)):this.fireOperation({key:this.makeid(),description:'<span class="silver">span splitted</span>'})},getFirstSplitable:function(){for(var t=this.$refs.txteditor.getElementsByTagName("br"),e=0;e<t.length;++e)if(this.isSplitable(t[e]))return t[e];return null},isSplitable:function(t){var e=o(t,"span");return!e.hasAttribute("id")||e.getAttribute("id")!==this.editorID},splitSpan:function(t,e){var n=document.createRange();n.setStartBefore(e),n.setEndBefore(e);var i=document.createRange();i.setStartBefore(e),i.setEndBefore(t),i=i.extractContents();var r=document.createRange();r.setStartAfter(t),r.setEndAfter(e),r=r.extractContents();var o=document.createRange();o.setStartBefore(t),o.setEndAfter(t),o=o.extractContents();var s=document.createRange();s.setStartBefore(e),s.setEndAfter(e),s.deleteContents(),n.insertNode(r),n.insertNode(o),n.insertNode(i)},selectionClicked:function(t,e){var n=this.getSelectionText(t);this.fireOperation({key:this.makeid(),description:'<span class="silver">clicked:</span> \''+n+"'"});var i=document.createElement("span");i.style.backgroundColor="yellow",i.innerHTML=n.replace(/(?:\r\n|\r|\n)/g,"<br />"),e.deleteContents(),e.insertNode(i),this.fireRawContent()},mousedown:function(t){this.mouse={mousedown:t}},mouseup:function(t){var e=this.lastClick;this.lastClick=Date.now();var n=this.lastClick-e;if(this.selection=this.currentSelection(),this.mouse){if(this.mouse.mouseup=t,this.isMouseMoved(this.mouse));else if(n>400){var i=this.getSelectionRange(this.selection);if(!i.collapsed){var r=this.createSelectionRange();this.selection&&this.isClickedOnSelection(i,r)&&this.selectionClicked(this.selection,i)}}this.mouse=null,this.selection=null}},isMouseMoved:function(t){return t.mousedown.screenX!=t.mouseup.screenX||t.mousedown.screenY!=t.mouseup.screenY},isClickedOnSelection:function(t,e){return t.isPointInRange(e.startContainer,e.startOffset)},currentSelection:function(){return window.getSelection?window.getSelection():document.selection},getSelectionRange:function(t){return window.getSelection?t.rangeCount>0?t.getRangeAt(0):null:t.createRange()},createSelectionRange:function(){return window.getSelection?window.getSelection().rangeCount>0?window.getSelection().getRangeAt(0):null:document.selection.createRange()},getSelectionText:function(t){return window.getSelection?t.toString():t.text},makeid:function(){for(var t="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;n<5;n++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}}};var o=function(t,e){for(Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(t){for(var e=(this.document||this.ownerDocument).querySelectorAll(t),n=e.length;--n>=0&&e.item(n)!==this;);return n>-1});t&&t!==document;t=t.parentNode)if(t.matches(e))return t;return null}},Nb7g:function(t,e,n){var i=n("r04f");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("5727f046",i,!1,{sourceMap:!1})},pztP:function(t,e,n){"use strict";var i=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex"},[e("div",{staticClass:"flex-auto flex flex-column justify-center",on:{click:this.clicked}},[e("div",{staticClass:"text-editor-container"},[e("span",{ref:"txteditor",staticClass:"no-outline text-editor",attrs:{id:this.editorID,contenteditable:"true",spellcheck:"false"},on:{mousedown:this.mousedown,mouseup:this.mouseup,input:this.onContentChange}})])]),e("div",{staticClass:"pointer ph2 silver noselect"},[this._v("\n    ✎\n  ")])])};i._withStripped=!0;var r={render:i,staticRenderFns:[]};e.a=r},r04f:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,'.text-editor-container{min-height:1.2em;overflow:hidden}.text-editor{opacity:1;-webkit-transform:rotate(0deg);transform:rotate(0deg);letter-spacing:0;text-decoration:none;text-transform:none;font-style:normal;line-height:normal}.no-outline{outline:0}.flex{display:-webkit-box;display:-ms-flexbox;display:flex}.flex-column{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column}.justify-center{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.flex-auto{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;min-height:0}.noselect{cursor:default;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pointer:hover,.shadow-hover{cursor:pointer}.pa0{padding:0}.pa1{padding:4px;padding:.25rem}.pa2{padding:8px;padding:.5rem}.pa3{padding:16px;padding:1rem}.pa4{padding:32px;padding:2rem}.pa5{padding:64px;padding:4rem}.pa6{padding:128px;padding:8rem}.pa7{padding:256px;padding:16rem}.silver{color:#999}.popup{position:relative;display:inline-block;cursor:pointer}.popup .popuptext{visibility:hidden;width:160px;background-color:#555;color:#fff;text-align:center;border-radius:6px;padding:8px 0;position:absolute;z-index:1;bottom:125%;left:50%;margin-left:-80px}.popup .popuptext:after{content:"";position:absolute;top:100%;left:50%;margin-left:-5px;border-width:5px;border-style:solid;border-color:#555 transparent transparent}.popup .show{visibility:visible;-webkit-animation:fadeIn 1s;animation:fadeIn 1s}@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}',""])}});