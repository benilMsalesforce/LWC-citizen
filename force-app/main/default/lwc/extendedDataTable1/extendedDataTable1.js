import { LightningElement, track, api } from 'lwc';
import dataTable from 'omnistudio/dataTable';
import { FlexCardMixin } from "omnistudio/flexCardMixin";
import template from './extendedDataTable1.html';

export default class ExtendedDataTable1 extends dataTable {

	@track columns = [ 	{ 		"fieldName": "Id", 		"label": "Id", 		"searchable": false, 		"sortable": true, 		"type": "text" 	}, 	{ 		"fieldName": "Name", 		"label": "Name", 		"searchable": false, 		"sortable": true, 		"type": "text" 	} ];
	@track tableData = [{ 	"Id": "001Dn000006SsRiIAK", 	"Name": "Salesforce" }, { 	"Id": "001Dn000006SwmtIAC", 	"Name": "egtdffg" }, { 	"Id": "001Dn000006SxAqIAK", 	"Name": "sfdsdsf" }, { 	"Id": "001Dn000006SsbeIAC", 	"Name": "Salesforce" }, { 	"Id": "001Dn000006SwchIAC", 	"Name": "dsfgdfg" }];
	@track styles = {
  showGroupedHeaderAsAnchor: true, // used to show the group table header as anchor tag
  columnHeaderCaps: true // used to capitalize the table columns header fields
};

	tableDataUpdated() {
		super.tableDataUpdated();
	}
    render(){  
		return template;
    }	

}