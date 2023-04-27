import { LightningElement } from 'lwc';
import omniscriptblock from 'omnistudio/omniscriptBlock';
import template from "./customBlockComponent.html"
export default class CustomBlockComponent extends omniscriptblock {
	render()
    {    
        return template;
    }
}