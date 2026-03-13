import { createInputAndErrorDiv } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";

class FormView extends ViewElement {

    /**
     * @type {formInput[]}
     */
    #formInputList;
    /**
     * @type {AuthorManager}
     */
    #manager;
    /**
     * @type {HTMLFormElement}
     */
    #form;
    /**
     * 
     * @param {string} id 
     * @param {import("./index.js").FormFieldType[]} formFieldList 
     * @param {AuthorManager} manager 
     */
    constructor(id, formFieldList, manager) {
        super(id);
        this.#manager = manager
        this.#formInputList = []
        const form = document.createElement("form")
        for (const field of formFieldList) {
            const formField = new FormField(field.id, field.label, field.name, form)
            this.#formInputList.push(formField)
        }
        const button = document.createElement("button")
        button.innerText = "Küldés"
        form.appendChild(button)

        const resultDiv = document.createElement("div")
        this.div.appendChild(resultDiv)
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const elem= this.#createElement();
            this.#manager.addElement(elem)
        })
        this.div.appendChild(form)
        this.#manager.addElementResultCallback= (result)=>{
            resultDiv.innerText= result
            setTimeout(()=>{
                resultDiv.innerText=""
            }, 1500)
        }
    }
    /**
     * @returns {import("./index.js").AuthorType}
     */
    #createElement() {
        /**
         * @type {import("./index.js").AuthorType}
         */
        let result = {}
        for (const field of this.#formInputList) {
            if (field.validate()) {
                result[field.name] = field.value
            }
        }
        return result;
    }
}

class FormField {
    
    /**
     * @type {HTMLInputElement}
     */
    #inputElement;
    /**
     * @type {HTMLDivElement}
     */
    #errorDiv;
    /**
     * @type {string}
     */
    #name;

    get name() {
        return this.#name
    }
    get value() {
        return this.#inputElement.value ? this.#inputElement.value : undefined
    }
    /**
     * 
     * @param {string} id 
     * @param {string} label 
     * @param {string} name 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, label, name, parent) {
        const { input, errorDiv } = createInputAndErrorDiv({ id, label, name, parent })
        this.#name = name;
        this.#errorDiv = errorDiv
        this.#inputElement = input
    }
    /**
     * @returns {boolean}
     */
    validate() {
        let result = true;
        if (!this.value) {
            this.#errorDiv.innerText = "Mező kitöltése kötelező"
            result = false
        }
        else {
            this.#errorDiv.innerText = ""
        }
        return result;
    }
}

export { FormView }