import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import omniscriptDate from 'omnistudio/omniscriptDate';
import template from "./customDateComponent.html"

export default class CustomDateComponent extends OmniscriptBaseMixin(omniscriptDate) {
	customMax;

	currentDate;
	connectedCallback() {
        super.connectedCallback();

    }

	initCompVariables(){
		super.initCompVariables();
		this.currentDate = new Date();
		this.currentDate.setDate(this.currentDate.getDate()-6574);
		this.customMax = this.currentDate;
		this.elementValue = this.currentDate;
		
	}
    render()
    {  	
        return template;
    }	

}