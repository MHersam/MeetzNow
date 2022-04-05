import {PollListData} from "./PollListData";
import {ClassStateField, StateModule} from "../store/AppStore";

/**
 * this class will set the right color for the labels in the Label component which is viewed in the table for selecting which polls you want to view
 */
export class LabelPollParticipateTableData{

    @ClassStateField(StateModule.GENERAL)
    strings : any;

    selection : string;

    colorChips : Array<any> = [];

    selectionMenu : Array<string>;

    pollListData : any = new PollListData();


    constructor(){
        this.selectionMenu = [this.strings.labelTotal, this.strings.labelCreatedByMe, this.strings.labelCreatedByOthers];
        this.selection = this.strings.labelTotal;
        this.colorChips = [this.strings.colorPrimary, this.strings.colorGrey, this.strings.colorGrey];
    }

    /**
     * method set the primary color to the label that is clicked
     * @param ges
     * @param created
     * @param participated
     * @param pos
     */
    changeColor(ges, created, participated, pos){
        switch (pos){
            case 0:
                this.setColor(ges, created, participated, pos);
                break;
            case 1:
                this.setColor(created, ges, participated, pos);
                break;
            case 2:
                this.setColor(participated, ges, created, pos);
                break;
        }
        this.pollListData.setViewedData(this.selection)
    }

    /**
     * method set the right color to the clicked label and set the other label to secondary color
     * @param ref
     * @param otherRef
     * @param otherRefSec
     * @param pos
     */
    setColor(ref, otherRef, otherRefSec, pos){
        if (ref.color === this.strings.colorGrey) {
            let temp = [];
            temp[pos] = this.strings.colorPrimary;
            temp[(pos + 2) % this.colorChips.length] = this.strings.colorGrey;
            temp[(pos + 1) % this.colorChips.length] = this.strings.colorGrey;
            this.selection = this.selectionMenu[pos];
            for (let i = 0; i < 3; i++){
                this.colorChips.splice(0,i);
                this.colorChips.push(temp[i])
            }
        }
    }
}
