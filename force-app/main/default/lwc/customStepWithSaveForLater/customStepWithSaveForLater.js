import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import { LightningElement, api, track } from 'lwc';
import omniscriptStep from 'omnistudio/omniscriptStep';
import template from "./customStepWithSaveForLater.html"
import pubsub from 'omnistudio/pubsub';
import { saveForLater } from "omnistudio/omniscriptUtils";
import { AggregatesValidation, VALIDATION_EVENTS } from 'omnistudio/omniscriptValidation';

export default class CustomStepWithSaveForLater extends OmniscriptBaseMixin(AggregatesValidation(omniscriptStep)) {

	_showBack = false;
	_showNext = false;
	showmodal = false;
	_saveInProgress = false;
	connectedCallback() {
        super.connectedCallback();
        pubsub.register("saveforlatersuccess", {
            detail: this.handleSaveforLaterSuccess.bind(this)
        });

		this.jsonDef.propSetMap.isFirstStep? (this._showBack = false, this._showNext = true):this.jsonDef.propSetMap.isLastStep? (this._showBack = true, this._showNext = false):(this._showBack = true, this._showNext = true)
		
    }
	renderedCallBack(){
		super.renderedCallBack();
	}
	render()
    {  
		return template;
    }		
	validateStep(){
		this.omniValidate();
	}
	goNext(evt){
		if(this.jsonDef.bAccordionActive){
			this.omniNextStep();
		}
	}

	goBack(evt){
		this.omniPrevStep();
	}
    handleSaveforLaterSuccess = (detail) => {
        if(this.jsonDef.bAccordionActive){
			console.log("detail", detail)
			console.log("jsonData", JSON.parse(JSON.stringify(this.jsonData)));
			try{
				const inputObj = {
					"ContextId": this.jsonData.ContextId,
					"resumeURL": detail.resumeUrl,
					"instanceId": detail.instanceId
				}
				const params = {
					input: JSON.stringify(inputObj),
					sClassName: 'IntegrationProcedureService',
					sMethodName: 'cb_sendResumeURl',
					options: JSON.stringify({}),
				};
				this.omniRemoteCall(params, true).then(response => {
					this._saveInProgress = false;
					
				}).catch(error => {
					console.error('VIP Exception ',error);
				});
	
			}catch(e) {
				console.error('Error sending email ');
			}	
		}			
    };
	saveForLaterClick(evt){
		this.showmodal = true;
		this._saveInProgress = true;

		console.log("saveForlater");	
		pubsub.fire('saveforlaterfromstep', "detail", {
			saveforlater: true
		});

	}
	closeSaveModal(){
		this.showmodal = false;
		window.location.href = '/cbhome/s/';

	}
}