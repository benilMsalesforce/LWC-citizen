import { LightningElement, api } from 'lwc';
import pubsub from "omnistudio/pubsub";

export default class CustomFlexEditButton extends LightningElement {

	@api goToStep;

	handleClick(evt){
		console.log("gotostep", this.goToStep)
        pubsub.fire("switchstep", "data", {
            step: this.goToStep
        });
    }
}