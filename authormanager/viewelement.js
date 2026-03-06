import { hide, show } from "./gomszab.min.js";

/**
 * @callback ActivateCallback
 * @returns {void}
 */
class ViewElement{
    /**@type {HTMLDivElement} */
    #div;
    /**@type {string} */
    #id;
    /**@type {ActivateCallback} */
    #activateCallback;

    get div(){
        return this.#div
    }

    /**@param {ActivateCallback} value */
    set activateCallback(value){
        this.#activateCallback=value
    }

    get id(){
        return this.#id
    }

    /**
     * 
     * @param {string} id 
     */
    constructor(id){
        this.#id=id
        this.#div=document.createElement("div")
        this.#div.id=id;
    }

    /**
     * 
     * @param {HTMLElement} parent 
     */
    appendTo(parent){
        parent.appendChild(this.#div)
    }

    /**
     * 
     * @param {string} id 
     */
    activate(id){
        if(this.#id === id){
            show(this.#div)
            if(this.#activateCallback){
                this.#activateCallback();
            }
        }
        else{
            hide(this.#div)
        }
    }
}

export {ViewElement}