import { LightningElement } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import template from "./customSaveForLater.html"
import SaveForLater  from 'omnistudio/omniscriptSaveForLaterAcknowledge';


export default class CustomSaveForLater extends  OmniscriptBaseMixin(SaveForLater) {
    render()
    {
        return template;
    }
}