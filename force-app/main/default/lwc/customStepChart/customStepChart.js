import { LightningElement } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import omniscriptStepChart from 'omnistudio/omniscriptStepChart';
import template from "./customStepChart.html"
import { saveForLater } from "omnistudio/omniscriptUtils";
import pubsub from 'omnistudio/pubsub';
export default class CustomStepChart extends OmniscriptBaseMixin(omniscriptStepChart)  {
	showStep = "hideStep";

    connectedCallback() {

		console.log("jsonDef", JSON.parse(JSON.stringify(this.jsonDef)));

        super.connectedCallback();
        pubsub.register("saveforlaterfromstep", {
            detail: this.handleSaveforLaterClick.bind(this)
        });
        pubsub.register("switchstep", {
            data: this.handleMessage.bind(this)
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
    };
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
        
        this.omniNavigateTo(data.step);
    }

}