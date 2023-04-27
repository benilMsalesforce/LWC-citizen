import { LightningElement, api, track } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import omniscriptStepChart from 'omnistudio/omniscriptStepChart';
import template from "./progressBar.html"
import { saveForLater } from "omnistudio/omniscriptUtils";
import pubsub from 'omnistudio/pubsub';

export default class ProgressBar extends OmniscriptBaseMixin(omniscriptStepChart)  {
	showStep = "hideStep";
	_activeSteps = 0;
	_totalStep = 0;
	_inactiveSteps = 0;
	_jsonDefCopy = {}
	hideStepChart = false;
	@track _currentSTep = 1;
    connectedCallback() {

		console.log("jsonDef", JSON.parse(JSON.stringify(this.jsonDef)));
		this._jsonDefCopy = {...JSON.parse(JSON.stringify(this.jsonDef))}

		for(let i = 0 ;i<=this._jsonDefCopy.children.length;i++){
			console.log("type::"+this._jsonDefCopy.children[i].type) 
			if(this._jsonDefCopy.children[i].type == 'Step'){
				this._jsonDefCopy.children[i]["progressWidth"] = "18%";
				this._jsonDefCopy.children[i].currentStepProgress = this._currentSTep;
				console.log("progressWidth", JSON.parse(JSON.stringify(this._jsonDefCopy.children[i])));
				break;
			}
		}

        this.jsonDef.children.forEach( childrenElements => {
            //console.log('proceed with loop ',!this.resumePageLoad);
            if(childrenElements.type == 'Step'){
				let stepCheck = childrenElements.propSetMap.hideThisStep.split(" ")[0]
				console.log(childrenElements.propSetMap.hideThisStep.split(" ")[0]);

				if(stepCheck=='show-step'){
					this._activeSteps++;
				} else{
					this._inactiveSteps++;
				}
                 this._totalStep++;           
            }
        })
        super.connectedCallback();
        pubsub.register("saveforlaterfromstep", {
            detail: this.handleSaveforLaterClick.bind(this)
        });
        pubsub.register("goNext", {
            goNext: this.handlegoNext.bind(this)
        });
        pubsub.register("goBack", {
            goBack: this.handlegoBack.bind(this)
        });				
        pubsub.register("switchstep", {
            data: this.handleMessage.bind(this)
        });
        pubsub.register("hideStepChart", {
            hideStepChart: this.handleHideStepChart.bind(this)
        });		
        //console.log("Current Step",JSON.parse(JSON.stringify(this.jsonDef))['propSetmap']['currenStep'] )
    }
    renderedCallback(){
        super.renderedCallback();     
        //console.log("jsonDef", JSON.parse(JSON.stringify(this.jsonDef)));
    }
    render()
    {
        
        return template;
    }
    handleSaveforLaterClick = (detail) => {
        console.log("detail", detail)

        if(detail.saveforlater){
            this.saveForLaterClick()
        }
    }
    handlegoNext = (goNext) => {
		let currentProgess = parseFloat(this.template.querySelector(".slds-progress-bar__value").style.width);

        //console.log("currentProgess"+currentProgess);
		let prevStepIndex = goNext.index;
		let currentStepIndex;
		let jsonDefChildren = this._jsonDefCopy.children.length;

		for(let i = prevStepIndex+1 ;i<=jsonDefChildren;i++){
			//console.log("type::"+this._jsonDefCopy.children[i].type) 
			if(this._jsonDefCopy.children[i].type == 'Step'){
				currentStepIndex = i;
				let nextProgress = currentProgess+7+"%"
				this.template.querySelector(".slds-progress-bar__value").style.width = nextProgress;
				this._jsonDefCopy.children[i]["progressWidth"] = nextProgress;
				console.log("progressWidth", JSON.parse(JSON.stringify(this._jsonDefCopy.children[i])));
				break;
			}
		}
		console.log("currentStepIndex:::"+currentStepIndex);

		let stepCheck = this._jsonDefCopy.children[currentStepIndex].propSetMap.hideThisStep.split(" ")[0]

		if(stepCheck=='show-step'){
			this._currentSTep++;
			let nextProgress = currentProgess+18+"%";
			this.template.querySelector(".slds-progress-bar__value").style.width = nextProgress;
			this._jsonDefCopy.children[currentStepIndex].progressWidth = nextProgress;
			this._jsonDefCopy.children[currentStepIndex].currentStepProgress = this._currentSTep;
			console.log("this.this._jsonDefCopy.children[currentStepIndex]", JSON.parse(JSON.stringify(this._jsonDefCopy.children[currentStepIndex])));
		}else {
			this._jsonDefCopy.children[currentStepIndex].currentStepProgress = this._currentSTep;
		}     		
    }

    handlegoBack = (goBack) => {
		let currentProgess = parseFloat(this.template.querySelector(".slds-progress-bar__value").style.width);
        //console.log("goBack", JSON.parse(JSON.stringify(goBack)));
		let prevStepIndex = goBack.index;
		let currentStepIndex;
		let jsonDefChildren = this._jsonDefCopy.children.length;

		for(let i = prevStepIndex-1 ;i<=jsonDefChildren;i--){
			//console.log("type::"+this._jsonDefCopy.children[i].type) 
			if(this._jsonDefCopy.children[i].type == 'Step'){
				currentStepIndex = i;
				let nextProgress = currentProgess-7+"%"
				this.template.querySelector(".slds-progress-bar__value").style.width = nextProgress;
				this._jsonDefCopy.children[i]["progressWidth"] = nextProgress;
				console.log("progressWidth", JSON.parse(JSON.stringify(this._jsonDefCopy.children[i])));								
				break;
			}
		}
		console.log("currentStepIndex:::"+currentStepIndex);

		let stepCheck = this._jsonDefCopy.children[currentStepIndex].propSetMap.hideThisStep.split(" ")[0]

		if(stepCheck =='show-step'){
			this._currentSTep--;
			let nextProgress = currentProgess-18+"%"
			this.template.querySelector(".slds-progress-bar__value").style.width = nextProgress;
			this._jsonDefCopy.children[currentStepIndex].progressWidth = nextProgress;
			this._jsonDefCopy.children[currentStepIndex].currentStepProgress = this._currentSTep;
			console.log("this.this._jsonDefCopy.children[currentStepIndex]", JSON.parse(JSON.stringify(this._jsonDefCopy.children[currentStepIndex])));					
		} else{
			this._jsonDefCopy.children[currentStepIndex].currentStepProgress = this._currentSTep;
		}
    }

	saveForLaterClick(){
		saveForLater(this,this.jsonDef,this.scriptHeaderDef.filesMap,"lightning", false, true, "English", true).then(saveResult => {
			this.savedOmniId =
			saveResult.instanceId;
			this.spinerdisplay = false;
			console.log("saveURL & Instance Id",saveResult.saveUrl,saveResult.instanceId);
            pubsub.fire('saveforlatersuccess', "detail", {
                saveforlatersuccess: true,
                instanceId: saveResult.instanceId,
                resumeUrl: saveResult.saveUrl+"&c__instanceId="+saveResult.instanceId
            });
		});         
    }  
    disconnectedCallback(){
		super.disconnectedCallback();
		console.log("Disconnected call back in Stepchart")
	}  
    handleMessage(data) {
        console.log("data", data.step);
        this.checkCurrentJSONDef(data.step);
        this.omniNavigateTo(data.step);
    }

	checkCurrentJSONDef(currentStep){
		console.log("_jsonDefCopy", JSON.parse(JSON.stringify(this._jsonDefCopy)));
		console.log("currentStep", currentStep);

		for(let i = 0 ;i<this._jsonDefCopy.children.length;i++){
			if(this._jsonDefCopy.children[i].name == currentStep){
				console.log("this._jsonDefCopy.children[i]", this._jsonDefCopy.children[i]);
				this._currentSTep = this._jsonDefCopy.children[i].currentStepProgress;
				let nextProgress = this._jsonDefCopy.children[i].progressWidth;
				this.template.querySelector(".slds-progress-bar__value").style.width = nextProgress;
				break;
			}
		}

	}
	handleHideStepChart(hide){
		console.log("hide step", hide);
		this.hideStepChart = true;
	}

}