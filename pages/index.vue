<template>
  <div class="mt5 mw6 center">
    <div class="bg-near-white">
      <texteditor 
        class="pa2"
        :raw-content-handler="handlerRawContent"
        :operations-handler="handleOperation"></texteditor>
    </div>
    <div class="mt3 pt3 gray bt b--silver center lh-copy">
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
import TextEditor from '~/components/TextEditor.vue'

export default {
  components: {
    'texteditor': TextEditor,
  },
  data () {
    return {
      htmlData: "",
      operations: [],
    }
  },
  methods: {
    handlerRawContent (content) {
      this.htmlData = content
    },
    handleOperation (op) {
      this.operations.unshift(op)
    }
  }
}
</script>

<style>
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
