<template>
    <div class="container">
        <div class="row">
            <h1 id="text">
                Willkommen bei meetz2meet, dem effizientesten Tool zum Planen eines Meetings. <br />
                Möchten Sie ihr erstes Meeting <router-link class="link" to="/UmfrageErstellen">planen?</router-link>
            </h1>
        </div>
        <!--- TODO delete comment, after the needed icons are uploaded
        <div class="row">
            <div class="col-4">
                <img id="picture1"/>
            </div>
            <div class="col-4">
                <img id="picture2"/>
            </div>
            <div class="col-4">
                <img id="picture3" />
            </div>
        </div>
        <div class="row align-items-center">
            <div class="col-4 text-center">
                <h4>Neue Umfrage erstellen</h4>
            </div>
            <div class="col-4 text-center">
                <h4>Umfragenübersicht</h4>
            </div>
            <div class="col-4 text-center">
                <h4>Mein Profil</h4>
            </div>
        </div>
        -->
    </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
    .link{
        text-decoration: none;
        color: red;
    }
    .link:hover{
        color: blue;
    }
    #text{
        text-align: center;
        margin-top: 50px;
    }
    #picture1{
        margin-right: auto;
        margin-left: auto;
        width: 60px;
        border-radius: 50%;
        display: block;
        border: 1px solid gray;
    }
    #picture2{
        margin-right: auto;
        margin-left: auto;
        width: 60px;
        border-radius: 50%;
        display: block;
        border: 1px solid gray;
    }
    #picture3{
        margin-right: auto;
        margin-left: auto;
        width: 60px;
        border-radius: 50%;
        display: block;
        border: 1px solid gray;
    }
</style>
