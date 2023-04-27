import { LightningElement } from 'lwc';
import omniscriptPdfAction from 'omnistudio/omniscriptPdfAction';
import OmniscriptBaseAction from 'omnistudio/omniscriptBaseAction';
import template from './customPDF.html';

export default class CustomPDF extends OmniscriptBaseAction {

    rander() {
        return template;
    }
}