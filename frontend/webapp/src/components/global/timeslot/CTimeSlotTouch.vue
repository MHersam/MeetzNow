<!-- Component do basically the same as CTimeSlotPicked, but only have the editing menu for free timeslots -->
<template>
    <v-layout class="c-timeslot">
        <div class="c-timeslot" v-bind:style="{
        'z-index' : zIndexTouch,
        'height' : height + 'px',
        'margin-top' : marginTop + 'px'
        }"
             @touchend="touching()"></div>
        <v-dialog v-model="dialog" id="dialogEditingTouch" max-width="450">
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
                        <v-btn color="green darken-1" flat="flat" @touchend="dialog = false">
                            {{strings.toolbarDialogClose}}
                        </v-btn>
                        <v-btn color="green darken-1" flat="flat" @touchend="setTimeSlot()">
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
    import {Prop, Watch} from 'vue-property-decorator'
    import Vue from 'vue'

    import {
        FromTo, MomentDiv
    } from "../../../util/TimeSlotUtils";
    import {StateModule} from "../../../store/AppStore";
    import {VueStateField} from "../../../store/State";
    import {serverBus} from "../../../main";
    import * as moment from "moment";

    @Component
    export default class CTimeSlotTouch extends Vue {

        get height(){
            if(!this.fromTo || !this.momentDiv) return;
            const yPositions =  this.momentDiv.getStartEnd(this.fromTo);
            return yPositions.end - yPositions.start;
        }

        get marginTop(){
            if(!this.fromTo || !this.momentDiv) return;
            return this.momentDiv.getPositionFor(this.fromTo.from);
        }

        errorValidation : boolean = false;
        errorValidationTime : boolean = false;
        errorValidationMeeting : boolean = false;

        @VueStateField(StateModule.GENERAL)
        strings : any;

        dialog : boolean = false;

        sortedTimeSlots : Array<any> = [];

        editFrom : string = '';
        editTo : string = '';

        @Prop(MomentDiv)
        momentDiv : MomentDiv;

        @Prop(Object)
        fromTo : FromTo;

        @Prop(String)
        color : string;

        @Prop() darkening : boolean;

        @Prop() availableTimeslots : FromTo[];

        @Prop() slotIndex : number;

        @Prop() zIndexTouch : number;

        newTimeSlot : FromTo = FromTo.fromObject({from: moment(new Date()), to: moment(new Date())});

        editingDate : string = '';

        @VueStateField(StateModule.POLLCREATION)
        timeslot_min_duration : string;

        @Prop() colorFreeTimeSlots : string;

        @Watch("dialog")
        __watchDialog(){
            this.errorValidation = false;
            this.errorValidationTime = false;
            this.errorValidationMeeting = false;
        }

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
            if(this.newTimeSlot.from.toDate().getTime() > this.newTimeSlot.to.toDate().getTime()){
                this.errorValidationTime = true;
                return;
            }
            let newTimeSlotMin = (this.newTimeSlot.to.toDate().getTime() - this.newTimeSlot.from.toDate().getTime()) / 1000 / 60;
            let meetingLengthMin = parseInt(this.timeslot_min_duration.split(':')[0]) * 60 + parseInt(this.timeslot_min_duration.split(':')[1]) - 0.9999;
            if(newTimeSlotMin <= meetingLengthMin){
                this.errorValidationMeeting = true;
                return;
            }
            for(let i = 0; i < this.sortedTimeSlots.length; i++){
                if(this.sortedTimeSlots[i].from.toDate().getTime() <= this.newTimeSlot.from.toDate().getTime() && this.sortedTimeSlots[i].to.toDate().getTime() >= this.newTimeSlot.to.toDate().getTime()){
                    checker = true;
                }
            }
            if(checker){
                serverBus.$emit('editTimeSlotMergeTouch', this.newTimeSlot);
                this.dialog = false;
            }else{
                this.errorValidation = true;
            }
        }

        touching(){
            let vm = this;
            setTimeout(function () {
                if(vm.color === vm.colorFreeTimeSlots){
                    vm.dialog = true;
                    vm.correctSortedTimeSlots();
                    vm.editingDate = vm.sortedTimeSlots[0].from.format("DD.MM.YY");
                    vm.editFrom = vm.sortedTimeSlots[0].from.format("HH:mm");
                    vm.editTo = vm.sortedTimeSlots[0].to.format("HH:mm");
                }
            }, 200);
        }

        @Watch("dialog")
        __resetZIndex(){
            this.errorValidation = false;
            this.errorValidationTime = false;
            this.errorValidationMeeting = false;
        }
    }

</script>

<style scoped>
    .c-timeslot{
        position: absolute;
        width: 100%;
    }
    #dialogEditingTouch{
        cursor: default;
        z-index: 1150;
    }
    .errorMessage{
        color: red;
        font-size: 75%;
        margin-right: 1%;
    }
</style>
