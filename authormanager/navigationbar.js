import { ViewElement } from "./viewElement.js";
import { createRadioButton } from "./gomszab.min.js";

class NavigationBar extends ViewElement{
    /**@type {ViewElement[]} */
    #viewElementList;

    constructor(){
        super("navbar");
        this.#viewElementList=[];
        this.div.addEventListener("change", (e)=>{
            const radioButtonValue = e.target.value
            this.activate(radioButtonValue);
        })
    }

    /**
     * 
     * @param {string} label 
     * @param {ViewElement} viewElement 
     */
    addViewElement(label, viewElement){
        this.#viewElementList.push(viewElement);
        const div= createRadioButton({id: viewElement.id, name: this.id, label})
        this.div.appendChild(div);
    }

    /**
     * @override
     * @param {string} value 
     */
    activate(value){
        for(const viewElement of this.#viewElementList){
            viewElement.activate(value)         
        }
        this.div.querySelector(`#${value}`).checked = true;
    }
}

export {NavigationBar}