import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class PdfActionFromFlexcard extends NavigationMixin(LightningElement) {

	showModal = false
	handleClick(){
		//this.showModal = true;
		
		this[NavigationMixin.Navigate]({
			type: 'standard__component',
			attributes: {
				componentName: 'omnistudio__vlocityLWCOmniWrapper'
			},
			state: {
				c__target: 'c:citizensDynamicPDFEnglish',
				c__layout: 'lightning', // or can be 'newport'
				c__tabIcon: 'custom:custom18',
				c__tabLabel: 'cbDynamicPDF',
			}
		})		
		//window.location.href = '';
		window.open('https://ddn000002gtaemaw.lightning.force.com/lightning/page/omnistudio/omniscript?omniscript__type=citizens&omniscript__subType=dynamicPDF&omniscript__language=English&omniscript__theme=lightning&omniscript__tabIcon=custom:custom18&omniscript__tabLabel=cbDynamicPDF', '_blank');

	}
}