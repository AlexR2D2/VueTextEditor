<template>
  <div>
    <div class="mw7 center mt5 editor-container" @click="clicked">
      <span
        @mousedown="mousedown"
        @mouseup="mouseup"
        @input="onContentChange"
        ref="txteditor"
        :id="editorID"
        data-v-b326fca0="" 
        contenteditable="true" 
        spellcheck="false"
        class="w-100">
        <span class="text-inner-span txttextZlFohPVm" style="background-color: rgb(248, 187, 208); padding-left:3px; padding-right: 3px; border-radius: 4px;">
          <span>Ompa</span></span>
          <br />
        <span id="1" class="text-inner-span txttextZlFohPVm" style="background-color: rgb(248, 187, 208); padding-left:3px; padding-right: 3px; border-radius: 4px;">
          <span>Cool story text</span>
          SDSDSD
          <span class="" style="color: rgb(136, 14, 79) !important; font-size: 54px !important;">goes</span>
          <span id="2" class="" style="color: rgb(186, 104, 200) !important; background-color: rgb(248, 187, 0);">Here</span>
        </span>
      </span>
    </div>

    <div class="mw7 mt3 pt3 gray bt b--silver center lh-copy">
      {{htmlData}}
    </div>

    <transition-group name="flip-list" tag="ul" class="lh-copy mt3 pt3 bt b--silver mw7 center list pa0 ma0">
      <li v-for="(op, index) in operations" :key="op.key" class="bb b--near-white pv2" :class="[index == 0 ? 'appear' : '']">
        <span v-html="op.description">{{index}}</span>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  mounted () {
    this.htmlData = this.$refs.txteditor.innerHTML
  },
  data () {
    return {
      editorID: 'dg8md8mfsxe773hsgd6x6h',
      htmlData: "",
      operations: [],

      selection: null,
      mouse: null,
    }
  },
  methods: {
    clicked (e) {
    },

    onContentChange (e) {
      console.log(this.$refs.txteditor)
      console.log(e.inputType)
      if (e.inputType == 'insertParagraph') {
        this.runSplitting()
      }
      if (e.inputType == 'deleteContentBackward') {
        this.runMerge(this.$refs.txteditor)
      }
      this.$nextTick(() => this.htmlData = this.$refs.txteditor.innerHTML)
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
      console.log('merge', leftSpan, rightSpan)

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
        this.operations.unshift({key: this.makeid(), description: `<span class="silver">span splitted</span>`})
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

      this.operations.unshift({key: this.makeid(), description: `<span class="silver">clicked:</span> '${selectedText}'`})

      // Создаем спан с синим фоном
      var highlightDiv = document.createElement('span');
      highlightDiv.style.backgroundColor = 'blue';
      highlightDiv.innerHTML = selectedText.replace(/(?:\r\n|\r|\n)/g, '<br />')
      // Обернем наш Range в спан
      //let rangeCopy = selectionRange.cloneRange()
      //rangeCopy.surroundContents(document.createElement('div'));
      selectionRange.deleteContents()
      selectionRange.insertNode(highlightDiv)

      console.log(highlightDiv)

      this.htmlData = this.$refs.txteditor.innerHTML
    },

    mousedown (e) {
      this.selection = this.currentSelection()
      this.mouse = { mousedown: e }
    },

    mouseup (e) {
      if (!this.mouse) return
      this.mouse["mouseup"] = e

      if (this.isMouseMoved(this.mouse)) {
        // nothing to do
      } else {
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
  .editor-container {
    /*color: rgb(255, 255, 255);*/
    opacity: 1; 
    border-radius: 6px; 
    transform: rotate(0deg); 
    border: 0px solid rgb(70, 144, 247); 
    padding: 10px; 
    text-align: center; 
    letter-spacing: 0px; 
    font-size: 32px; 
    font-family: Aleo; 
    font-weight: 300; 
    text-decoration: none; 
    box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px; 
    text-transform: initial; 
    font-style: normal; 
    z-index: 2002; 
    text-shadow: rgba(0, 0, 0, 0.2) 2px 2px 0px; 
    line-height: 1.5em;
  }
  .flip-list-move {
    transition: transform 0.7s cubic-bezier(0.415, 0.490, 0.020, 0.990);
  }

  .appear {
    -webkit-animation: appear 0.7s infinite; /* Safari 4+ */
    -moz-animation:    appear 0.7s infinite; /* Fx 5+ */
    -o-animation:      appear 0.7s infinite; /* Opera 12+ */
    animation:         appear 0.7s infinite; /* IE 10+, Fx 29+ */
    animation-iteration-count: 1;
  }
  @-webkit-keyframes appear {
    0%   { opacity: 0; }
    30%  { opacity: 0; }
    100% { opacity: 1; }
  }
  @-moz-keyframes appear {
    0%   { opacity: 0; }
    30%  { opacity: 0; }
    100% { opacity: 1; }
  }
  @-o-keyframes appear {
    0%   { opacity: 0; }
    30%  { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes appear {
    0%   { opacity: 0; }
    30%  { opacity: 0; }
    100% { opacity: 1; }
  }
</style>
