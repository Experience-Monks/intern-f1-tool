import Vue from 'vue';
import yaml from 'yamljs';
import _ from 'lodash';

// inlineDepth: depth to start using inline notation at
function toYaml (input, indentation=2, inlineDepth=4) {
  return yaml.stringify(input, inlineDepth, indentation);
}

function toJson (input, indentation=2) {
  return JSON.stringify(input, null, indentation);
}

export default Vue.extend({
  id: 'output',
  props: {
    input: {
      type: Object,
      required: true
    },
    format: {
      type: String,
      default: 'json'
    }
  },
  template: `
    <div class="output-container">
      <button class="copy-button" v-on="click: copy">copy</button>
      <button class="format-button" v-on="click: format = 'yaml'" v-if="format === 'json'">view yaml</button>
      <button class="format-button" v-on="click: format = 'json'" v-if="format === 'yaml'">view json</button>
      <pre class="output" v-el="output">{{input | format}}</pre>
      <textarea class="tucked-away" v-el="textarea">{{input | format}}</textarea>
    </div>
  `,
  methods: {
    copy: function () {
      this.$$.textarea.select();
      document.execCommand('copy');
    }
  },
  filters: {
    format: function (input, indentation=2) {
      return {
        json: toJson,
        yaml: toYaml
      }[this.format](input, indentation);
    }
  }
});