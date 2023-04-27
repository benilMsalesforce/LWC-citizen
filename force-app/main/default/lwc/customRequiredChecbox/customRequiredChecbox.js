import { LightningElement } from 'lwc';
import OmniscriptCheckbox from 'omnistudio/omniscriptDisclosure';
import template from "./customRequiredChecbox.html"

export default class CustomRequiredChecbox extends OmniscriptCheckbox {
	render()
    {
        return template;
    }
}