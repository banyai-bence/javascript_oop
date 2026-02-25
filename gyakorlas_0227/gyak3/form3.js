import { createForm } from "./function.js";
import { createInputField } from "./function.js";
import { Manager } from "./manager3.js";

class Formfield{
    /**@type {HTMLInputElement} */
    #input;
    /**@type {string} */
    #name;
    /**@type {boolean} */
    #required;
    /**@type {HTMLDivElement} */
    #errorDiv;
    get value(){
        return this.#input.value? this.#input.value : undefined
    }
    get name(){
        return this.#name
    }
    constructor(id,name,labelContent,required,parent){
        const {errorElement, input} = createInputField({
            id,
            name,
            labelContent,
            parent
        })
        this.#input=input
        this.#errorDiv=errorElement
        this.#name=name
        this.#required=required
    }
    validate(){
        let result= true
        if(this.#required && !this.value){
            result= false
            this.#errorDiv.innerText="Kötelező"
        }
        else{
            this.#errorDiv.innerText=""
        }
        return result
    }
}

class FormController{
    /**@type {Manager} */
    #manager;
    /**@type {FormField[]} */
    #formFieldElemList;
    /**@type {HTMLFormElement} */
    #form;
    /**
     * 
     * @param {import("./function.js").FormFieldType[]} formFieldList 
     * @param {Manager} manager 
     */
    constructor(formFieldList, manager){
        this.#manager=manager
        this.#formFieldElemList= []
        this.#form= createForm((form)=>{
            document.body.appendChild(form)

            for(const elem of formFieldList){
                const formFieldElem= new Formfield(elem.id,elem.name,elem.label,elem.required,form)
                this.#formFieldElemList.push(formFieldElem)
            }
        },(e)=>{
            e.preventDefault()
            const a =this.#createElement()
            if(a){
                this.#manager.addElement(a)
                e.target.reset();
            }
        })
    }
    #createElement(){
        let result= {}
        let valid= true
        for(const inputField of this.#formFieldElemList){
            if(inputField.validate()){
                result[inputField.name]= inputField.value
            }
            else{
                valid=false
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