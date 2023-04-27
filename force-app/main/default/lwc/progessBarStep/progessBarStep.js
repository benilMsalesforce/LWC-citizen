import { LightningElement } from 'lwc';

import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import omniscriptStep from 'omnistudio/omniscriptStep';
import template from "./progessBarStep.html"
import pubsub from 'omnistudio/pubsub';
import { saveForLater } from "omnistudio/omniscriptUtils";
import { AggregatesValidation, VALIDATION_EVENTS } from 'omnistudio/omniscriptValidation';
import { getDataHandler } from "omnistudio/utility";

export default class ProgessBarStep  extends OmniscriptBaseMixin(AggregatesValidation(omniscriptStep)) {

	_showBack = false;
	_showNext = false;
	showmodal = false;
	_saveInProgress = false;
	_checkEligibiltyToProceed = true;
	showRiskModal = false
	connectedCallback() {
        super.connectedCallback();
        pubsub.register("saveforlatersuccess", {
            detail: this.handleSaveforLaterSuccess.bind(this)
        });
		this.template.addEventListener(VALIDATION_EVENTS.INVALID, this.handleInvalidElementsFunc.bind(this));		
    
		this.jsonDef.propSetMap.isFirstStep && this.jsonDef.propSetMap.isLastStep? (this._showBack = false, this._showNext = false): this.jsonDef.propSetMap.isFirstStep? (this._showBack = false, this._showNext = true):this.jsonDef.propSetMap.isLastStep? (this._showBack = true, this._showNext = false):(this._showBack = true, this._showNext = true)
	
	}
	renderedCallBack(){
		super.renderedCallBack();
	}
	render(evt)
    {  
		if(this.jsonDef.bAccordionActive && this.jsonDef.propSetMap.isFirstStep && this.jsonDef.propSetMap.isLastStep){
			pubsub.fire('hideStepChart', "hideStepChart", {
				hideStepChar: true
			});
		}
		return template;
    }	
	
	firePubSub(){
		
	}
	validateStep(){
		this.omniValidate();
	}
	goNext(evt){
		if(this.jsonDef.bAccordionActive){

			if(!this.jsonDef.propSetMap.checkRiskCheck){
				this.omniNextStep();
				if(this.jsonDef.type == 'Step' && Object.keys(this.invalidElements).length == 0 ){
					pubsub.fire('goNext', "goNext", {
						index: this.jsonDef.indexInParent
					});
				}
			} else{
				this.checkEligibleForContinuation();
			}

		}
	}

	goBack(evt){
		if(this.jsonDef.bAccordionActive){
			this.omniPrevStep();
			if(this.jsonDef.type == 'Step'){
				pubsub.fire('goBack', "goBack", {
					index: this.jsonDef.indexInParent
				});
			}			
		}
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
					this._checkEligibiltyToProceed = false;
					
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
    handleInvalidElementsFunc(e) {
        console.log('capture', JSON.parse(JSON.stringify(this.invalidElements)));
    }	
	checkEligibleForContinuation(){

		this._checkEligibiltyToProceed = true;
		this.showRiskModal = true;
		console.log("dataJson", JSON.parse(JSON.stringify(this.jsonData)))
		try{
            let requestData = {
                "type": "dataraptor",
                "value": {
                    "bundleName": "DRGetRiskScore",
                    "inputMap": {
                        "caseId": this.jsonData.caseId
                    }
                }
            }
            getDataHandler(JSON.stringify(requestData)).then(response => {
				console.log('response', JSON.parse(JSON.stringify(response)));

				if(JSON.parse(response)[0].riskScore == 50){
					this._checkEligibiltyToProceed = false;
					pubsub.fire('saveforlaterfromstep', "detail", {
						saveforlater: true
					});

				} else{
					this.showRiskModal = false;
					this.omniNextStep();
					if(this.jsonDef.type == 'Step' && Object.keys(this.invalidElements).length == 0 ){
						pubsub.fire('goNext', "goNext", {
							index: this.jsonDef.indexInParent
						});
					}					
				}

            }).catch(error => {
                console.log('error from DR query ', error);
            });

		}catch(e) {
			console.error('Error calling DR ');
		}			
	}
}