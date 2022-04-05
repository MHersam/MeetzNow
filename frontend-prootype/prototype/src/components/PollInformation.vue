<template>
    <div class="container-fluid">
        <div class="row">
            <h3>{{information.theme}}</h3>
        </div>
        <div class="row">
            <div class="col-6">
                <label>Datum</label>
            </div>
            <div class="col">
                {{information.date}}
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <label>Uhrzeit</label>
            </div>
            <div class="col">
                {{information.time}}
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <label>Ort</label>
            </div>
            <div class="col">
                {{information.place}}
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <label>Teilnehmer</label>
            </div>
            <div class="col">
                {{information.participateNumber}}
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <label>Ersteller</label>
            </div>
            <div class="col">
                {{information.creator}}
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <label>Star</label>
            </div>
            <div class="col">
                <label>meine Einträge</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PollInformation',
  props: {
    information: {
      required: true,
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
