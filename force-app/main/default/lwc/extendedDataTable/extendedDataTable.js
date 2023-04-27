import { LightningElement, track, api } from 'lwc';
import dataTable from 'omnistudio/dataTable';
import { FlexCardMixin } from "omnistudio/flexCardMixin";
import template from './extendedDataTable.html';

const dataColumns = [
	{
		"fieldName": "test",
		"label": "test1",
		"searchable": true,
		"sortable": true
	}
];

const columns = [
	{
		"fieldName": "test",
		"label": "test1",
		"searchable": true,
		"sortable": true
	}
];

export default class ExtendedDataTable extends FlexCardMixin(dataTable) {

    @track isLoaded = true;

    @api get columns() {
        return this.dataColumns;
    }
    set columns(dataColumnsValue) {
        super.initColumn(value);
    }

    connectedCallback() {
        super.connectedCallback();
    }

    renderedCallback() {
        super.renderedCallback();            
    }

//     @track columns = [
// 	{
// 		"fieldName": "test1",
// 		"label": "test1",
// 		"searchable": true,
// 		"sortable": true
// 	},
//     {
// 		"fieldName": "test2",
// 		"label": "test2",
// 		"searchable": true,
// 		"sortable": true
// 	},
//     {
// 		"fieldName": "test3",
// 		"label": "test3",
// 		"searchable": true,
// 		"sortable": true
// 	}
// ];

    @track dataColumnsValue = [
	{
		"fieldName": "test1",
		"label": "test1",
		"searchable": true,
		"sortable": true
	},
    {
		"fieldName": "test2",
		"label": "test2",
		"searchable": true,
		"sortable": true
	},
    {
		"fieldName": "test3",
		"label": "test3",
		"searchable": true,
		"sortable": true
	}
];


    render(){  
		return template;
    }	

}