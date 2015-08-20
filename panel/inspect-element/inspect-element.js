/* global chrome */

import Vue from 'vue';
import _ from 'lodash';
import onecolor from 'onecolor';

const updateStates = _.throttle(function (id, states) {
  chrome.devtools.inspectedWindow.eval(
    `f1targets['${id}'].states = ${JSON.stringify(states)}`,
    (result, err) => {
      if (err) { console.warn(err); }
      else { console.log('state should be successfully set'); }
    }
  );
}, 100);

Vue.filter('f1ColorToHex', function (input, format='hex') {
  debugger
});

export default Vue.extend({
  id: 'inspect-element',
  props: {
    id: String,
    states: Object,
    transitions: Array
  },
  template: require('./inspect-element.vue'),
  data: function () {
    return {
    };
  },
  computed: {
    output: function () {
      return {
        [this.id]: {
          states: this.states
        }
      };
    }
  },
  watch: {
    states: {
      handler: function (states, previousStatesReference) {
        // ignore when this is triggered when the target we're inspecting switches
        if (previousStatesReference === states) {
          updateStates(this.id, states);
        }
      },
      deep: true
    }
  },
  methods: {
    gotoState (stateId) {
      chrome.devtools.inspectedWindow.eval(
        `f1targets['${this.id}'].$go('${stateId}')`,
        (result, err) => {
          if (err) { console.warn(err); }
          else { console.log('should be going to state', result); }
        }
      );
    },
    copyTextareaContents (textarea) {
      textarea.select();
      document.execCommand('copy');
    },
    copy (text) {
      var textarea = document.createElement('textarea');
      textarea.innerHTML = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
    },
    rgbaTupleToHex (rgbaTuple) {
      let [r, g, b, a] = rgbaTuple;
      return onecolor(`rgba(${r},${g},${b},${a})`).hex();
    }
  },
  ready: function () {
    window.iii = this;
  },
  components: [require('./output/output.js'), Vue.extend({
    id: 'colorpicker',
    props: {
      rgbaTuple: {
        type: Array,
        default: null
      }
    },
    // NOTE: native HTML5 colorpicker dow not support alpha
    template: `
      <input type="color" v-model="colorHex" v-on="change: colorChanged">
      alpha: 
      <input type="range" min=0 max=1 step="0.01" v-model="rgbaTuple[3]" number>
      <span style="display: inline-block; width: 10px; height: 10px;" v-style="background-color: cssa"></span>
      `,
    data: function () {
      return {
        colorHex: null
      };
    },
    computed: {
      cssa () {
        let [r, g, b, a] = this.rgbaTuple;
        return `rgba(${r},${g},${b},${a})`;
      }
    },
    watch: {
      rgbaTuple (tuple) {
        // let [r, g, b, a] = tuple;
        this.colorHex = onecolor(this.cssa).hex();
      }
    },
    compiled: function () {
      // let [r, g, b, a] = this.rgbaTuple;
      this.colorHex = onecolor(this.cssa).hex();
    },
    methods: {
      colorChanged () {
        var rgb = onecolor(this.colorHex).css();
        let [r, g, b] = rgb.substring(rgb.indexOf('(')+1, rgb.lastIndexOf(')')).split(',').map(Number);
        // need to mutate the existing array instead of replacing it with a new one
        this.$set('rgbaTuple[0]', r);
        this.$set('rgbaTuple[1]', g);
        this.$set('rgbaTuple[2]', b);
      }
    }
  })]
});