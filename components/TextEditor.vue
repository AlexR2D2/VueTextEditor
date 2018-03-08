<template>
  <div class="flex">
    <div class="flex-auto flex flex-column justify-center" @click="clicked">
      <div class="text-editor-container">
        <span
          @mousedown="mousedown"
          @mouseup="mouseup"
          @input="onContentChange"
          ref="txteditor"
          :id="editorID"
          contenteditable="true"
          spellcheck="false"
          class="no-outline text-editor">
        </span>
      </div>
    </div>
    <div class="pointer ph2 silver noselect">
      &#9998;
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rawContentHandler: {
      type: Function,
      default: null
    },
    operationsHandler: {
      type: Function,
      default: null
    }
  },
  mounted () {
    this.fireRawContent()
  },
  data () {
    return {
      editorID: 'dg8md8mfsxe773hsgd6x6h',
      selection: null,
      mouse: null,
      lastClick: 0,
    }
  },
  methods: {
    clicked (e) {
    },

    fireRawContent () {
      if (this.rawContentHandler) {
        this.rawContentHandler(this.$refs.txteditor.innerHTML)
      }
    },

    fireOperation (op) {
      if (this.operationsHandler) {
        this.operationsHandler(op)
      }
    },

    onContentChange (e) {
      if (e.inputType == 'insertParagraph') {
        this.runSplitting()
      }
      if (e.inputType == 'deleteContentBackward') {
        this.runMerge(this.$refs.txteditor)
      }
      this.$nextTick(this.fireRawContent)
    },

    runMerge (root) {
      let spans = root.childNodes
      for (let i = 1; i < spans.length; ++i) {
        if (spans[i].nodeName == 'SPAN' && spans[i - 1].nodeName == 'SPAN') {
          let unionSpan = this.mergeSpans(spans[i - 1], spans[i])
          this.removeInternalExtraSpans(unionSpan)
          //this.runMerge(unionSpan)
        }
      }
    },

    mergeSpans (leftSpan, rightSpan) {
      let unionRange = document.createRange();
      unionRange.setStartBefore(leftSpan);
      unionRange.setEndAfter(rightSpan);

      let { unionStyle, leftStyle, rightStyle } = this.unionStyle(this.scanStyle(leftSpan), this.scanStyle(rightSpan))
      let { unionClasses, leftClasses, rightClasses } = this.unionClass(leftSpan.classList, rightSpan.classList)

      var unionSpan = document.createElement('span');
      unionSpan.style.cssText = this.cssText(unionStyle)
      unionClasses.forEach(cl => unionSpan.classList.add(cl))

      leftSpan.style.cssText = this.cssText(leftStyle)
      rightSpan.style.cssText = this.cssText(rightStyle)
      leftSpan.classList.value = leftClasses.value
      rightSpan.classList.value = rightClasses.value

      unionRange.surroundContents(unionSpan)
      return unionSpan
    },

    removeInternalExtraSpans(span) {
      let innerHTML = ""
      for (let i = 0; span.childNodes && i < span.childNodes.length; ++i) {
        let inSpan = span.childNodes[i]
        if (inSpan.style.cssText === "" && inSpan.classList.length == 0) {
          innerHTML = innerHTML + inSpan.innerHTML
        } else {
          innerHTML = innerHTML + inSpan.outerHTML
        }
      }
      span.innerHTML = innerHTML
    },

    scanStyle (span) {
      let style = {}
      for(let pr of span.style) {
        style[pr] = span.style[pr]
      }
      return style
    },

    unionStyle(leftStyle, rightStyle) {
      let unionStyle = {}
      for (let lsp in leftStyle) {
        if (rightStyle.hasOwnProperty(lsp)){
          if (leftStyle[lsp] === rightStyle[lsp]) {
            unionStyle[lsp] = leftStyle[lsp]
          }
        }
      }
      for (let usp in unionStyle) {
        delete leftStyle[usp]
        delete rightStyle[usp]
      }
      return { unionStyle, leftStyle, rightStyle }
    },

    cssText (style) {
      let cssText = "" 
      for (let s in style) {
        cssText = cssText + ` ${s}:${style[s]};`
      }
      return cssText
    },

    unionClass(leftClasses, rightClasses) {
      let unionClasses = []
      for(let lc of leftClasses) {
        if (rightClasses.contains(lc)) {
          unionClasses.push(lc)
        }
      }
      for (let uc of unionClasses) {
        leftClasses.remove(uc)
        rightClasses.remove(uc)
      }
      return { unionClasses, leftClasses, rightClasses }
    },

    runSplitting() {
      let br = this.getFirstSplitable()
      if (br) {
        this.splitSpan(br, getClosest(br, "span"))
        this.$nextTick(this.runSplitting)
      } else {
        this.fireOperation({key: this.makeid(), description: `<span class="silver">span splitted</span>`})
      }
    },

    getFirstSplitable () {
      let brs = this.$refs.txteditor.getElementsByTagName("br");
      for (let i = 0; i < brs.length; ++i) {
        if (this.isSplitable(brs[i])) {
          return brs[i]
        }
      }
      return null 
    },

    isSplitable(br) {
      let parent = getClosest(br, "span")
      return !parent.hasAttribute('id') || parent.getAttribute('id') !== this.editorID
    },

    splitSpan(br, parent) {
      let targetRange = document.createRange();
      targetRange.setStartBefore(parent);
      targetRange.setEndBefore(parent);  
      //console.log(targetRange)

      let beforeRange = document.createRange();
      beforeRange.setStartBefore(parent);
      beforeRange.setEndBefore(br);  
      beforeRange = beforeRange.extractContents()
      //console.log(beforeRange)

      let afterRange = document.createRange();
      afterRange.setStartAfter(br);
      afterRange.setEndAfter(parent);
      afterRange = afterRange.extractContents()
      //console.log(afterRange)

      let brRange = document.createRange();
      brRange.setStartBefore(br);
      brRange.setEndAfter(br);
      brRange = brRange.extractContents()
      //console.log(brRange)

      let wholeRange = document.createRange();
      wholeRange.setStartBefore(parent);
      wholeRange.setEndAfter(parent);  
      wholeRange.deleteContents()
      //console.log(wholeRange)

      targetRange.insertNode(afterRange)
      targetRange.insertNode(brRange)
      targetRange.insertNode(beforeRange)
    },

    selectionClicked (selection, selectionRange) {
      let selectedText = this.getSelectionText(selection)

      this.fireOperation({key: this.makeid(), description: `<span class="silver">clicked:</span> '${selectedText}'`})

      // Создаем спан с синим фоном
      //var highlightDiv = document.createElement('span');
      //highlightDiv.style.backgroundColor = 'blue';
      //highlightDiv.innerHTML = selectedText.replace(/(?:\r\n|\r|\n)/g, '<br />')
      //selectionRange.deleteContents()
      //selectionRange.insertNode(highlightDiv)

      this.fireRawContent()
    },

    mousedown (e) {
      this.mouse = { mousedown: e }
    },

    mouseup (e) {
      const clickTime = this.lastClick
      this.lastClick = Date.now()
      const diff = this.lastClick - clickTime

      this.selection = this.currentSelection()

      if (!this.mouse) return
      this.mouse["mouseup"] = e

      if (this.isMouseMoved(this.mouse)) {
        // nothing to do
      } else if (diff > 500) {
        const selectionRange = this.getSelectionRange(this.selection)
        if (!selectionRange.collapsed) {
          const clickedRange = this.createSelectionRange()
          if (this.selection && this.isClickedOnSelection(selectionRange, clickedRange)) {
            this.selectionClicked(this.selection, selectionRange)
          } else {
            // nothing to do / or no selection / or clicked out selection
          }
        } else {
          // selection is collapsed
        }
      }
      this.mouse = null
      this.selection = null
    },
    
    isMouseMoved (mouseEvents) {
      return mouseEvents.mousedown.screenX != mouseEvents.mouseup.screenX 
        || mouseEvents.mousedown.screenY != mouseEvents.mouseup.screenY
    },
    
    isClickedOnSelection (selectedRange, clickedRange) {
      return selectedRange.isPointInRange(clickedRange.startContainer, clickedRange.startOffset)
    },

    currentSelection () {
      return window.getSelection ? window.getSelection() : document.selection
    },

    getSelectionRange (selection) {
      if (window.getSelection) { // not IE, use getSelection
        return selection.rangeCount > 0 ? selection.getRangeAt(0) : null 
      } else { // IE, do not use selection object
        return selection.createRange()
      }
    },

    createSelectionRange () {
      if (window.getSelection) { // not IE, use getSelection
        const sel = window.getSelection()
        return sel.rangeCount > 0 
          ? window.getSelection().getRangeAt(0)
          : null 
      } else { // IE, do not use selection object
        return document.selection.createRange()
      }
    },

    getSelectionText (selection) {
      if (window.getSelection) { // not IE, use getSelection
        return selection.toString();
      } else { // IE, do not use selection object
        return selection.text;
      }
    },

    makeid () {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    },
  }
}

var getClosest = function (elem, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
      };
  }
  // Get the closest matching element
  for ( ; elem && elem !== document; elem = elem.parentNode ) {
    if ( elem.matches( selector ) ) return elem;
  }
  return null;
};
</script>

<style>
.text-editor-container {
  min-height: 1.2em;
  overflow:hidden;
}
.text-editor {
  opacity: 1; 
  transform: rotate(0deg);
  letter-spacing: 0px; 
  text-decoration: none; 
  text-transform: initial; 
  font-style: normal; 
  line-height: normal;
}
.no-outline {
  outline: 0;
}
.flex{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex
}
.flex-column{
  -webkit-box-orient:vertical;
  -ms-flex-direction:column;
  flex-direction:column
}
.justify-center{
  -webkit-box-pack:center;
  -ms-flex-pack:center;
  justify-content:center
}
.flex-auto{
  -webkit-box-flex:1;
  -ms-flex:1 1 auto;
  flex:1 1 auto;
  min-width:0;
  min-height:0
}
.noselect {
  cursor: default;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
.pointer:hover,.shadow-hover{
  cursor:pointer
}
.pa0{padding:0}
.pa1{padding:4px;padding:.25rem}
.pa2{padding:8px;padding:.5rem}
.pa3{padding:16px;padding:1rem}
.pa4{padding:32px;padding:2rem}
.pa5{padding:64px;padding:4rem}
.pa6{padding:128px;padding:8rem}
.pa7{padding:256px;padding:16rem}
.silver{color:#999}
/* Popup container */
.popup {
    position: relative;
    display: inline-block;
    cursor: pointer;
}
/* The actual popup (appears on top) */
.popup .popuptext {
    visibility: hidden;
    width: 160px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -80px;
}
/* Popup arrow */
.popup .popuptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}
/* Toggle this class when clicking on the popup container (hide and show the popup) */
.popup .show {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s
}
/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
    from {opacity: 0;} 
    to {opacity: 1;}
}
@keyframes fadeIn {
    from {opacity: 0;}
    to {opacity:1 ;}
}
</style>
