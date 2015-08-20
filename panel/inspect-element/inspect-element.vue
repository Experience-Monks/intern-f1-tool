<div class="inspect-element main-pane">
  <h2>
    {{id}}
  </h2>
  <ul class="states">
    <li v-repeat="state in states">
      <button v-on="click: gotoState($key)">{{$key}}</button>
      <ul class="properties">
        <li v-repeat="property in state">
          <h4>{{$key}}</h4>
          <div v-if="$key === 'alpha'">
            <input type="range" min=0 max=1 v-model="property" step=0.01 number>
            <input type="number" min=0 max=1 v-model="property" number>
          </div>
          <div class="position" v-if="$key === 'position'">
            x:
            <input type="range" min="{{Math.min(-100, property[0] - 100)}}" max="{{Math.max(100, property[0] + 100)}}" v-model="property[0]" number>
            <input type="number" v-model="property[0]" number>
            y:
            <input type="range" min="{{Math.min(-100, property[1] - 100)}}" max="{{Math.max(100, property[1] + 100)}}" v-model="property[1]" number>
            <input type="number" v-model="property[1]" number>
            z:
            <input type="range" min="{{Math.min(-100, property[2] - 100)}}" max="{{Math.max(100, property[2] + 100)}}" v-model="property[2]" number>
            <input type="number" v-model="property[2]" number>
          </div>
          <div class="position" v-if="$key === 'color'">
            <colorpicker rgba-tuple="{{property}}"></colorpicker>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</div>
<output input="{{output}}"></output>