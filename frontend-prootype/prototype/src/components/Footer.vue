<template>
    <div class="Footer">
        <div class="row">
            <div class="col-3">
                <div class="row">
                    <div class="col-4">
                        <img id="calendarpicture" src="../../public/img/icons/Gruppe 2623.png"/>
                    </div>
                    <div class="col-8">
                        Gebe das Datum an, an dem das Treffen stattfinden soll. Du kanst natürlich auch mehrere Tage zur Auswahl stellen!
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="row">
                    <div class="col-4">
                        <img id="clockpicture" src="../../public/img/icons/Gruppe 2622.png">
                    </div>
                    <div class="col-8">
                        Bestimme die Zeitslots, welche den Teilnehmern zur Verfügung stehen sollen.
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="row">
                    <div class="col-4">
                        <img id="routepicture" src="../../public/img/icons/Gruppe 2624.png">
                    </div>
                    <div class="col-8">
                        Lege den Treffpunkt für euer Meeting fest. Dabei können die Teilnehmer auch ihre Wegdauer miteinplanen.
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="row">
                    <div class="col-4">
                        <img id="chatpicture" src="../../public/img/icons/Gruppe 2625.png">
                    </div>
                    <div class="col-8">
                        Lade alle Personen ein, die am Treffen teilnehmen sollen - mit Meetz könnt ihr euch ganz flexibel auf das perfekte Datum einigen!
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
    .Footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: snow;
        color: gray();
        text-align: center;
        font-size: smaller;
    }
    #calendarpicture{
        margin-right: auto;
        margin-left: auto;
        width: 60px;
        border-radius: 50%;
        display: block;
        border: 1px solid gray;
    }
    #clockpicture{
        margin-right: auto;
        margin-left: auto;
        width: 60px;
        border-radius: 50%;
        display: block;
        border: 1px solid gray;
    }
    #routepicture{
        margin-right: auto;
        margin-left: auto;
        width: 60px;
        border-radius: 50%;
        display: block;
        border: 1px solid gray;
    }
    #chatpicture{
        margin-right: auto;
        margin-left: auto;
        width: 60px;
        border-radius: 50%;
        display: block;
        border: 1px solid gray;
    }
</style>
