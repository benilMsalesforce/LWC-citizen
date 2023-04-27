import { LightningElement } from 'lwc';
import omniscriptStep from 'omnistudio/omniscriptStep';
import template from './pocCustomSTep.html';
import OmniscriptGroupElement from 'omnistudio/omniscriptGroupElement';

export default class PocCustomSTep extends omniscriptStep {
    render() {  
        return template;
    }	
}