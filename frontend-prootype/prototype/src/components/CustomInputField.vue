<template>
    <div class="container">
        <div class="row">
            <div class="col" style="color: blue">
                {{label}}
            </div>
            <div class="w-100"></div>
            <div class="col" style="padding-top: 8px">
                <input class="form-control" v-model="inputVal" :placeholder="placeholder"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CostumInputField',
  props: ['value', 'label', 'placeholder'],
  data () {
    return { inputVal: this.value }
  },
  watch: {
    inputVal (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped>

</style>
