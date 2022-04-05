<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <label style="color: blue">{{label}}</label>
                <div class="w-100"></div>
                <div class="input-group color-picker" ref="colorpicker" id="pickers">
                    <input type="text" class="form-control" v-model="colorValue" @focus="showPicker()" @input="updateFromInput"/>
                    <span class="input-group-addon color-picker-container">
                    <span class="current-color" :style="'background-color: ' + colorValue" @click="togglePicker()"></span>
                    <chrome-picker :value="colorsBorder" @input="updateFromPicker" v-if="displayPicker"/>
                </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Chrome} from 'vue-color'

export default {
  name: 'CostumColorPickerForm',
  components: {
    'chrome-picker': Chrome
  },
  props: {
    label: '',
    colorValue: ''
  },
  data () {
    return {
      colorsBorder: '#000000',
      displayPicker: false
    }
  },
  methods: {
    /**
       * method to set the color for the colorpicker input
       * @param color
       */
    setColor (color) {
      this.updateColors(color)
      this.colorValue = color
    },
    /**
       * update the color
       * @param color
       */
    updateColors (color) {
      if (color.slice(0, 1) === '#') {
        this.colors = {
          hex: color
        }
      } else if (color.slice(0, 4) === 'rgba') {
        let rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',')
        let hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)
        this.colors = {
          hex: hex,
          a: rgba[3]
        }
      }
    },
    /**
       * method for showing the color picker
       */
    showPicker () {
      document.addEventListener('click', this.documentClick)
      this.displayPicker = true
    },
    /**
       * method for hiding the picker
       */
    hidePicker () {
      document.removeEventListener('click', this.documentClick)
      this.displayPicker = false
    },
    /**
       * method that show the picker if input is clicked and hide it if it is visible and document is clicked
       */
    togglePicker () {
      this.displayPicker ? this.hidePicker() : this.showPicker()
    },
    /**
       * method to update the color from input
       */
    updateFromInput () {
      this.updateColors(this.colorValue)
    },
    /**
       * method to update the color from picker
       * @param color
       */
    updateFromPicker (color) {
      this.colors = color
      if (color.rgba.a === 1) {
        this.colorValue = color.hex
      } else {
        this.colorValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')'
      }
    },
    /**
       * method to listen when the document is clicked, it will hide the color picker
       * @param e
       */
    documentClick (e) {
      let el = this.$refs.colorpicker
      let target = e.target
      if (el !== target && !el.contains(target)) {
        this.hidePicker()
      }
    }
  },
  watch: {
    colorValue (val) {
      if (val) {
        this.updateColors(val)
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
