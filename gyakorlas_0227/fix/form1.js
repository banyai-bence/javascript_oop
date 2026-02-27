import { createForm, createInputField } from "./function.js";
import { Manager } from "./manager1.js";

class FormField{
    /**
     * @type {HTMLInputElement}
     */
    #input;
    /**
     * @type {string}
     */
    #name;
    /**
     * @type {boolean}
     */
    #required;
    /**
     * @type {HTMLDivElement}
     */
    #errorDiv;
    get value(){
        return this.#input.value? this.#input.value : undefined
    }
    get name(){
        return this.#name
    }
    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} labelContent 
     * @param {boolean} required 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, name, labelContent, required, parent){
        // const div= document.createElement("div")
        // parent.appendChild(div)

        // const label=document.createElement("label")
        // div.appendChild(label)
        // label.innerText=labelContent
        // label.htmlFor=id

        // div.appendChild(document.createElement("br"))

        // const input=document.createElement("input")
        // div.appendChild(input)
        // input.id=id
        // input.name=name
        // this.#input=input
        // this.#name=name
        
        const {errorElement, input} = createInputField({
            id,
            name,
            labelContent,
            parent
        })
        this.#input = input;
        this.#errorDiv= errorElement
        this.#name = name;
        this.#required = required;

        // const errorDiv=document.createElement("div")
        // div.appendChild(errorDiv)
        // errorDiv.classList.add("error")

        //this.#errorDiv=errorDiv
        //this.#required=required
    }
    /**
     * @returns {boolean}
     */
    validate(){
        let result=true
        if(this.#required && !this.value){
            result=false
            this.#errorDiv.innerText="Kötelező"
        }
        else{
            this.#errorDiv.innerText=" "
        }
        return result
    }
}

class FormController{
    /**
     * @type {Manager}
     */
    #manager;
    /**
     * @type {FormField[]}
     */
    #formFieldElemList;
    /**
     * @type {HTMLFormElement}
     */
    #form;
    /**
     * 
     * @param {FormFieldType[]} formFieldList 
     * @param {Manager} Manager 
     */
    constructor(formFieldList, manager){
        this.#manager=manager
        this.#formFieldElemList=[]
        this.#form=createForm((form)=> {
            document.body.appendChild(form)

            for(const formField of formFieldList){
                const formFieldElem= new FormField(formField.id,formField.name, formField.label, formField.required, form)
                this.#formFieldElemList.push(formFieldElem)
            }
        },
        (e)=>{
            e.preventDefault()
            const elem= this.#createElement();
            if(elem){
                this.#manager.addElement(elem)
                const target=e.target
                target.reset();
            }
        })
    }
    #createElement(){
    let result= {}
    let valid= true
    for(const inputField of this.#formFieldElemList){
        if(inputField.validate()){
            result[inputField.name]=inputField.value
        }
        else{
            valid=false;
        }
    }
    if(valid){
        return result
    }
    else{
        return null
    }
}
}

export {FormController}

