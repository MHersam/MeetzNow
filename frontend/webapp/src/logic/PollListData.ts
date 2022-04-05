import {AppStore, ClassStateField, StateModule} from "../store/AppStore";
import * as meetz from "../../node_modules/meetznow-api-client";
import * as moment from "moment";

/**
 * class set the continued and past polls that should be viewed in the table in the RPollList component
 */
export class PollListData{

    @ClassStateField(StateModule.USER, "id")
    userID : string;

    @ClassStateField(StateModule.POLLLIST)
    continuedPollsTotal : any[] = AppStore.state.continuedPollsTotal;

    @ClassStateField(StateModule.GENERAL)
    error : string;

    @ClassStateField(StateModule.GENERAL)
    timeout : number;

    @ClassStateField(StateModule.GENERAL)
    disableElements : boolean;

    @ClassStateField(StateModule.POLLLIST)
    continuedPollsCreated : any[] = AppStore.state.continuedPollsCreated;

    @ClassStateField(StateModule.POLLLIST)
    continuedPollsParticipated : any[] = AppStore.state.continuedPollsParticipated;

    @ClassStateField(StateModule.POLLLIST)
    pastPollsTotal : any[] = AppStore.state.pastPollsTotal;

    @ClassStateField(StateModule.POLLLIST)
    pastPollsCreated : any[] = AppStore.state.pastPollsCreated;

    @ClassStateField(StateModule.POLLLIST)
    pastPollsParticipated : any[] = AppStore.state.pastPollsParticipated;

    tableHeader : any[] = [];

    @ClassStateField(StateModule.POLLLIST)
    search : string;

    @ClassStateField(StateModule.POLLLIST)
    tab : any;

    @ClassStateField(StateModule.POLLLIST)
    viewedDataContinued : any[] = AppStore.state.viewedDataContinued;

    @ClassStateField(StateModule.POLLLIST)
    viewedDataPast : any[] = AppStore.state.viewedDataPast;

    @ClassStateField(StateModule.GENERAL)
    strings : any;

    @ClassStateField(StateModule.GENERAL)
    loadData : boolean;

    @ClassStateField(StateModule.GENERAL)
    loadDataObjectPollList : any = AppStore.state.loadDataObjectPollList;

    formattedObject : Array<any> = [];

    constructor(){
    }

    /**
     * method call the sub methods that fill the data
     */
    public fillDataTable(){
        this.setTableHeader();
        this.tab = 0;
        this.pollsInit();
        this.setInitData();
    }

    /**
     * method set the initialized data, so the total continued polls and total past polls
     */
    public setInitData(){
        this.viewedDataContinued = this.continuedPollsTotal;
        this.viewedDataPast = this.pastPollsTotal;
    }


    /**
     * method initialize the poll list
     */
    async pollsInit(){
        this.loadData = true;
        try {
            let token = localStorage.getItem('securityToken');
            const participatedPolls = await new meetz.ParticipatedPollsCall({
                token: token, payload: {
                    user_id: this.userID
                }
            }).get();
            let callBack = participatedPolls.payload.polls;
            let formattedObject = [];
            for(let i = 0; i < callBack.length; i++){
                let creator = callBack[i].creator.name;
                //@ts-ignore
                if(callBack[i].creator.user_id === this.userID) creator = this.strings.creator;
                //@ts-ignore
                formattedObject.push({id: callBack[i].creator.poll_id, event: callBack[i].title, dateStart: moment(callBack[i].start_date_poll).format("DD.MM.YY"), dateEnd: moment(callBack[i].end_date_poll).format("DD.MM.YY"), dateEndDate: callBack[i].end_date_poll, place: callBack[i].location, creator: creator, creator_id: callBack[i].creator.user_id});
            }
            this.setUpContinuedPolls(formattedObject);
            this.setUpPastPolls(formattedObject);
            this.loadData = false;
        }catch (e) {
            this.error = e.message;
            let self = this;
            setTimeout(function(){
                self.error = '';
                self.disableElements = false;
            }, this.timeout);
        }
    }

    /**
     * method sets up the continued polls based on all polls
     * @param formattedObject
     */
    setUpContinuedPolls(formattedObject){
        let maxDay = new Date(new Date().setHours(0,0, 0));
        let continuedPollsTotal = formattedObject.filter(object => new Date(object.dateEndDate).getTime() >= maxDay.getTime());
        AppStore.commit('addContinuedPollsTotal', continuedPollsTotal);

        let continuedPollCreated = continuedPollsTotal.filter(object => object.creator_id === this.userID);
        AppStore.commit('addContinuedPollsCreated', continuedPollCreated);

        let continuedPollParticipated = continuedPollsTotal.filter(object => object.creator_id !== this.userID);
        AppStore.commit('addContinuedPollsParticipated', continuedPollParticipated);
    }

    /**
     * method sets up the past polls based on all polls
     * @param formattedObject
     */
    setUpPastPolls(formattedObject){
        let maxDay = new Date(new Date().setHours(0,0, 0));
        let pastPollsTotal = formattedObject.filter(object => new Date(object.dateEndDate).getTime() < maxDay.getTime());
        AppStore.commit('addPastPollsTotal', pastPollsTotal);

        let pastPollCreated = pastPollsTotal.filter(object => object.creator_id === this.userID);
        AppStore.commit('addPastPollsCreated', pastPollCreated);

        let pastPollParticipated = pastPollsTotal.filter(object => object.creator_id === this.userID);
        AppStore.commit('addPastPollsParticipated', pastPollParticipated);
    }

    /**
     * method set the table header data from the PollListTable component
     */
    public setTableHeader(){
        this.tableHeader.push({text: this.strings.pollListDataEvent, value: 'event', align: 'left', sortable: true, width: ''});
        this.tableHeader.push({text: this.strings.pollListDataPollStart, value: 'dateStart', align: 'left', sortable: true, width: ''});
        this.tableHeader.push({text: this.strings.pollListDataPollEnd, value: 'dateEnd', align: 'left', sortable: true, width: ''});
        this.tableHeader.push({text: this.strings.pollListDataLocation, value: 'place', align: 'left', sortable: true, width: ''});
        this.tableHeader.push({text: this.strings.pollListDataCreator, value: 'creator', align: 'left', sortable: true, width: ''});
    }

    /**
     * this method set the right data when you click on the tabs
     * @param tags
     */
    public setViewedData(tags : any){
        if (this.tab === 1){
            this.viewedDataPast = this.setData(this.viewedDataPast, this.pastPollsTotal, this.pastPollsCreated, this.pastPollsParticipated, tags)
        }
        else {
            this.viewedDataContinued = this.setData(this.viewedDataContinued, this.continuedPollsTotal, this.continuedPollsCreated, this.continuedPollsParticipated, tags)
        }
    }

    /**
     * once a label is clicked this method set the right data that should be viewed
     * @param viewedData
     * @param dataTotal
     * @param dataCreated
     * @param dataParticipated
     * @param tag
     */
    public setData(viewedData : any, dataTotal : any, dataCreated : any, dataParticipated : any, tag : any){
        if (tag === this.strings.createdByYou) viewedData = dataCreated;
        if (tag === this.strings.createdByOther) viewedData = dataParticipated;
        if (tag === this.strings.createdTotal) viewedData = dataTotal;
        return viewedData
    }
}
