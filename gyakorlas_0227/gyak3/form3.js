import { createInputField } from "./function";

class Formfield{
    #input;
    #name;
    #required;
    #errorDiv;
    get value(){
        return this.#input.value? this.#input.value : undefined
    }
    get name(){
        return this.#name
    }
    constructor(id,name,labelContent,required,parent){
        const {errorElement, input} = createInputField(){
            id,
            name,
            labelContent,
            required,
            parent
        }
    }
}