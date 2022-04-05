<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <label style="color: blue">{{label}}</label>
            </div>
            <div class="w-100"></div>
            <div class="col">
                <select class="form-control" v-model="option">
                    <option v-for="dt in data" v-bind:key="dt">{{dt}}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CostumSelection',
  props: {
    data: [],
    label: '',
    value: ''
  },
  data () {
    return {
      option: this.value
    }
  },
  watch: {
    option (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped>

</style>
