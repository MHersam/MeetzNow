<!-- Component cover a picked timeslot, it can resize, edit and delete a picked timeslot -->
<template>
    <v-layout class="c-timeslotParticipants">
        <context-menu id="context-menu" ref="ctxMenu">
            <li @click="deleteTimeSlot()" class="ctxMenuSubPoints">{{strings.buttonDelete}}</li>
            <li @click="openEdit()" class="ctxMenuSubPoints">{{strings.buttonEditing}}</li>
        </context-menu>
        <div class="c-timeslotParticipants timeslotresize" v-bind:style="{
        'z-index' : zIndex,
        'height' : height + 'px',
        'margin-top' : marginTop + 'px',
        }"
             @contextmenu.prevent="$refs.ctxMenu.open"
             @contextmenu="handler($event)">
        </div>
        <div class="c-timeslotParticipants timeslotresize" ref="resizable" v-bind:style="{
        'z-index' : zIndex,
        'height' : 20 + 'px',
        'margin-top' : marginTop + height - 20 + 'px',
        }"
        @mousedown="startResize(slotIndex)"
             @contextmenu.prevent="$refs.ctxMenu.open"
             @contextmenu="handler($event)">
        </div>
        <div class="c-timeslotParticipants timeslotresize" ref="resizableTop" v-bind:style="{
        'z-index' : zIndex,
        'height' : 20 + 'px',
        'margin-top' : marginTop + 'px',
        }"
             @mousedown="startResize(slotIndex)"
             @contextmenu.prevent="$refs.ctxMenu.open"
             @contextmenu="handler($event)">
        </div>
        <v-dialog v-model="dialog" id="dialogEditing" max-width="450">
            <v-card :dark="darkening">
                <v-card-title class="headline" :dark="darkening">
                    <v-layout row wrap align-center justify-center>
                        {{strings.timeslotEditHeader}}
                    </v-layout>
                </v-card-title>
                <v-card-text :dark="darkening">
                    <v-layout row wrap>
                        <v-flex xs6>{{strings.timeslotStart}} </v-flex>
                        <v-flex xs6>
                            <input type="time" required v-model="editFrom" />
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs6>{{strings.timeslotEnd}} </v-flex>
                        <v-flex xs6>
                            <input type="time"  required v-model="editTo"/>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs6><p>{{strings.timeslotDate}} </p></v-flex>
                        <v-flex xs6>
                            <p>{{editingDate}}</p>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <p>{{strings.timeslotsDateSlots}} </p>
                    </v-layout>
                    <v-layout row wrap v-for="(slot, index) in sortedTimeSlots" :key="index">
                        <p>{{strings.timeslot}} {{index}}: {{slot.from.format("HH:mm")}} - {{slot.to.format("HH:mm")}} <br /></p>
                    </v-layout>
                </v-card-text>

                <v-card-actions>
                    <v-layout row wrap>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat="flat" @click="dialog = false">
                            {{strings.toolbarDialogClose}}
                        </v-btn>
                        <v-btn color="green darken-1" flat="flat" @click="setTimeSlot()">
                            {{strings.meetingSetButton}}
                        </v-btn>
                    </v-layout>
                </v-card-actions>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex>
                            <v-layout row wrap v-if="errorValidation">
                                <v-spacer></v-spacer>
                                <p class="errorMessage">{{strings.timeSlotValidation}}</p>
                            </v-layout>
                            <v-layout row wrap v-if="errorValidationTime">
                                <v-spacer></v-spacer>
                                <p class="errorMessage">{{strings.timeSlotStartEnd}}</p>
                            </v-layout>
                            <v-layout row wrap v-if="errorValidationMeeting">
                                <v-spacer></v-spacer>
                                <p class="errorMessage">{{strings.timeSlotMeeting}}</p>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-layout>
</template>


<script lang="ts">
    import Component from "vue-class-component";
    import {Model, Prop, Watch} from 'vue-property-decorator'
    import Vue from 'vue'
    import * as interact from 'interactjs'
    import contextMenu from '../../../../node_modules/vue-context-menu'

    import {
        FromTo, FromToArray, MomentDiv
    } from "../../../util/TimeSlotUtils";
    import {serverBus} from "../../../main";
    import {StateModule} from "../../../store/AppStore";
    import {VueStateField} from "../../../store/State";
    import * as moment from "moment";

    @Component({
        components: {
            contextMenu
        }
    })
    export default class CTimeSlotPicked extends Vue {

        @VueStateField(StateModule.GENERAL)
        strings : any;

        dialog : boolean = false;

        sortedTimeSlots : Array<any> = [];

        editingDate : string = '';

        minTime : string = '';
        maxTime : string = '';

        editFrom : string = '';
        editTo : string = '';

        oldTimeSlot : FromTo = FromTo.fromObject({from: moment(new Date()), to: moment(new Date())});
        newTimeSlot : FromTo = FromTo.fromObject({from: moment(new Date()), to: moment(new Date())});

        errorValidation : boolean = false;
        errorValidationTime : boolean = false;
        errorValidationMeeting : boolean = false;

        resizeTop : boolean = false;

        @Prop() resizeMoment : any;

        //initialise interact for resizing
        mounted(){
            interact(this.$refs.resizable)
                .resizable({
                    // resize from all edges and corners
                    edges: { left: false, right: false, bottom: true, top: false },

                    inertia: true,
                })
                .on('resizemove', this.listenerMove)
                .on('resizeend', this.listenerEnd);
            interact(this.$refs.resizableTop)
                .resizable({
                    // resize from all edges and corners
                    edges: { left: false, right: false, bottom: false, top: true },

                    inertia: true,
                })
                .on('resizemove', this.listenerMove)
                .on('resizeend', this.listenerEnd)
                .on('resizestart',  this.resizeStartTop)
        }

        /**
         * if we are resizing at the top we have to recognize it
         */
        resizeStartTop(){
            this.resizeTop = true;
        }

        /**
         * once the resizing ends we want to reset the zIndex to make the timeslot right clickable
         * and merge it with the other timeslots
         */
        listenerEnd(){
            serverBus.$emit('zIndexReset');
            let resultObject = {old: this.newTimeSlot, new: this.newTimeSlot};
            serverBus.$emit('editTimeSlotMerge', resultObject);
            this.resizeTop = false;
        }

        /**
         * method creates a new timeslot based on the indicator and check if it is valid. Then it kick out the old timeslot before resizing and put in the new one after resizing
         */
        listenerMove(){
            serverBus.$emit('zIndex');
            this.correctSortedTimeSlots();
            let checker = false;
            let newTimeSlotMin;
            //calculate the time of the new Timeslot
            if(!this.resizeTop){
                newTimeSlotMin = (this.resizeMoment.toDate().getTime() - this.oldTimeSlot.from.toDate().getTime()) / 1000 / 60;
            }
            else{
                newTimeSlotMin = (this.oldTimeSlot.to.toDate().getTime() - this.resizeMoment.toDate().getTime()) / 1000 / 60;
            }
            let meetingLengthMin = parseInt(this.timeslot_min_duration.split(':')[0]) * 60 + parseInt(this.timeslot_min_duration.split(':')[1]) - 0.9999;
            //check if the new timeslot fulfill the meeting min length
            if(newTimeSlotMin <= meetingLengthMin){
                serverBus.$emit('zIndexReset');
                return;
            }
            //check if the new timeslot is in a available timeslot
            for(let i = 0; i < this.sortedTimeSlots.length; i++){
                if(!this.resizeTop){
                    if(this.sortedTimeSlots[i].from.toDate().getTime() <= this.oldTimeSlot.from.toDate().getTime() && this.sortedTimeSlots[i].to.toDate().getTime() >= this.resizeMoment.toDate().getTime()){
                        checker = true;
                    }
                }else{
                    if(this.sortedTimeSlots[i].from.toDate().getTime() <= this.resizeMoment.toDate().getTime() && this.sortedTimeSlots[i].to.toDate().getTime() >= this.oldTimeSlot.to.toDate().getTime()){
                        checker = true;
                    }
                }
            }
            //send message to the parent CPollTimeSlotPickerCard to kick out the old timeslot and put in the new one
            if(checker){
                if(!this.resizeTop){
                    this.newTimeSlot.from = this.oldTimeSlot.from;
                    this.newTimeSlot.to = this.resizeMoment;
                }
                else{
                    this.newTimeSlot.from = this.resizeMoment;
                    this.newTimeSlot.to = this.oldTimeSlot.to;
                }
                let resultObject = {old: this.oldTimeSlot, new: this.newTimeSlot};
                serverBus.$emit('editTimeSlot', resultObject);
                this.oldTimeSlot = this.newTimeSlot;
            }
        }

        //check out the right timeslot that should be edited
        startResize(index){
            serverBus.$emit('zIndex');
            this.oldTimeSlot = this.pickedTimeSlots.value[index];
        }

        get height(){
            if(!this.fromTo || !this.momentDiv) return;
            const yPositions =  this.momentDiv.getStartEnd(this.fromTo);
            return yPositions.end - yPositions.start;
        }

        get marginTop(){
            if(!this.fromTo || !this.momentDiv) return;
            return this.momentDiv.getPositionFor(this.fromTo.from);
        }

        /**
         * method is a helping method for the pop up to set custom meeting length
         * @param event
         */
        public handler(event){
            event.preventDefault()
        }

        /**
         * method send a message to the parent CPollTable to delete a timeslot from the picked Timeslot array
         */
        deleteTimeSlot(){
            serverBus.$emit('deleteTimeSlot', this.pickedTimeSlots.value[this.slotIndex])
        }

        /**
         * metod open the editing menu of a timeslot
         */
        openEdit(){
            this.correctSortedTimeSlots();
            this.editingDate = this.sortedTimeSlots[0].from.format("DD.MM.YY");
            this.minTime = this.sortedTimeSlots[0].from.format("HH:mm");
            this.maxTime = this.sortedTimeSlots[this.sortedTimeSlots.length - 1].to.format("HH:mm");
            this.editFrom = this.pickedTimeSlots.value[this.slotIndex].from.format("HH:mm");
            this.editTo = this.pickedTimeSlots.value[this.slotIndex].to.format("HH:mm");
            this.oldTimeSlot = this.pickedTimeSlots.value[this.slotIndex];
            this.dialog = true;
        }

        /**
         * method put out the balancing of the available timeslots
         */
        correctSortedTimeSlots(){
            this.sortedTimeSlots = this.availableTimeslots.slice(0);
            this.sortedTimeSlots.sort(function (a, b) {
                return a.from.toDate().getTime() - b.from.toDate().getTime();
            });
            for(let i = 0; i < this.sortedTimeSlots.length; i++){
                if(this.sortedTimeSlots[i].from.format("DD.MM.YY HH:mm") === this.sortedTimeSlots[i].to.format("DD.MM.YY HH:mm")){
                    this.sortedTimeSlots.splice(i, 1);
                    i--;
                }
            }
            //cut all useless timeslots, which was tricks for balacing
            for(let i = 0; i < this.sortedTimeSlots.length; i++){
                for(let j = i + 1; j < this.sortedTimeSlots.length; j++){
                    if(this.sortedTimeSlots[i].from.format("DD.MM.YY HH:mm") === this.sortedTimeSlots[j].from.format("DD.MM.YY HH:mm")){
                        this.sortedTimeSlots.splice(j, 1);
                        j = i;
                    }
                }
            }
        }

        /**
         * method sets the new edited timeslot through the menu. It checks if the new timeslot is valid and if so then it kick out the old timeslot before editing
         * and put in and merge the new one
         */
        setTimeSlot(){
            this.errorValidationTime = false;
            this.errorValidation = false;
            this.errorValidationMeeting = false;
            let checker = false;
            let tempTimeSlotFrom = new Date(this.sortedTimeSlots[0].from);
            let tempTimeSlotTo = new Date(this.sortedTimeSlots[0].from);
            tempTimeSlotFrom = new Date(tempTimeSlotFrom.setHours(parseInt(this.editFrom.split(":")[0]), parseInt(this.editFrom.split(":")[1]), 59));
            tempTimeSlotTo = new Date(tempTimeSlotTo.setHours(parseInt(this.editTo.split(":")[0]), parseInt(this.editTo.split(":")[1]), 0));
            this.newTimeSlot.from = moment(tempTimeSlotFrom);
            this.newTimeSlot.to = moment(tempTimeSlotTo);
            //check if the starting time is before the end time
            if(this.newTimeSlot.from.toDate().getTime() > this.newTimeSlot.to.toDate().getTime()){
                this.errorValidationTime = true;
                return;
            }
            //check if the meeting length is fulfilled
            let newTimeSlotMin = (this.newTimeSlot.to.toDate().getTime() - this.newTimeSlot.from.toDate().getTime()) / 1000 / 60;
            let meetingLengthMin = parseInt(this.timeslot_min_duration.split(':')[0]) * 60 + parseInt(this.timeslot_min_duration.split(':')[1]) - 0.9999;
            if(newTimeSlotMin <= meetingLengthMin){
                this.errorValidationMeeting = true;
                return;
            }
            //check if the new timeslot is in the available dates
            for(let i = 0; i < this.sortedTimeSlots.length; i++){
                if(this.sortedTimeSlots[i].from.toDate().getTime() <= this.newTimeSlot.from.toDate().getTime() && this.sortedTimeSlots[i].to.toDate().getTime() >= this.newTimeSlot.to.toDate().getTime()){
                    checker = true;
                }
            }
            if(checker){
                let resultObject = {old: this.oldTimeSlot, new: this.newTimeSlot};
                serverBus.$emit('editTimeSlotMerge', resultObject);
                this.dialog = false;
            }else{
                this.errorValidation = true;
            }
        }

        @Prop(MomentDiv)
        momentDiv : MomentDiv;

        @Prop(Object)
        fromTo : FromTo;

        @Prop(String)
        color : string;

        @Prop() zIndex : number;

        @Prop() slotIndex : number;

        @Prop() availableTimeslots : FromTo[];

        @Model("change", {type : FromToArray, default : function (){return new FromToArray()}})
        pickedTimeSlots : FromToArray;

        @Prop() darkening : boolean;

        @VueStateField(StateModule.POLLCREATION)
        timeslot_min_duration : string;

        @Watch("dialog")
        __watchDialog(){
            this.errorValidation = false;
            this.errorValidationTime = false;
            this.errorValidationMeeting = false;
        }
    }

</script>

<style scoped>
    .c-timeslotParticipants{
        position: absolute;
        width: 100%;
    }
    .timeslotresize{
        resize: vertical;
    }
    .ctxMenuSubPoints{
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .ctxMenuSubPoints:hover{
        background-color: #999999;
    }
    #dialogEditing{
        cursor: default;
        z-index: 1060;
    }
    .errorMessage{
        color: red;
        font-size: 75%;
        margin-right: 1%;
    }
</style>
