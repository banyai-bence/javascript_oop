
import { createForm , createInputField} from "./function.js";
import { Manager } from "./manager2.js";

class FormField{
    /**@type {HTMLInputElement} */
    #input;
    /**@type {string}  */
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
    /**
     * @param {string} id 
     * @param {string} name 
     * @param {string} labelContent 
     * @param {boolean} required 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, name, labelContent, required, parent){
        const {errorElement, input} = createInputField({
            id,
            name,
            labelContent,
            parent
        })
        this.#name=name
        this.#input=input
        this.#errorDiv=errorElement
        this.#required=required
    }
    /**@returns {boolean} */
    validate(){
        let result= true
        if(this.#required && !this.value){
            result=false
            this.#errorDiv.innerText="Kötelező"
        }
        else{
            this.#errorDiv.innerText=""
        }
        return result
    }
}

class FormController{
    /**@type {FormField[]} */
    #formFieldElemList;
    /**@type {Manager} */
    #manager
    /**
     * 
     * @param {import("./function").FormFieldType[]} formFieldList 
     * @param {Manager} manager 
     */
    constructor(formFieldList, manager){
        this.#manager=manager
        this.#formFieldElemList= []
        createForm((form)=>{
            document.body.appendChild(form)
            for(const f of formFieldList){
                const formFieldElem= new FormField(f.id,f.name,f.label,f.required, form)
                this.#formFieldElemList.push(formFieldElem)
            }
        },(e)=>{
            e.preventDefault();
            const a = this.#createElement()
            if(a){
                this.#manager.addElement(a)
                e.target.reset();
            }
        })
    }
    /**@returns {import("./function").ColspanType | import("./function").RowspanType} */
    #createElement(){
        let result = {}
        let valid= true
        for(const inputField of this.#formFieldElemList){
            if(inputField.validate()){
                result[inputField.name] = inputField.value
            }
            else{
                valid= false
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