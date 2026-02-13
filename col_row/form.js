class FormController {
    /**
     * @type {Manager}
     */
    #manager;
    /**
     * @type {FormField[]}
     */
    #formFieldElemList;

    /**
     * @param {FormFieldType[]} formFieldList
     * @param {Manager} manager
     */
    constructor(formFieldList, manager) {
        this.#manager = manager

        const form = document.createElement("form")
        document.body.appendChild(form)
        this.#formFieldElemList = [];

        for (const formField of formFieldList) {
            const formFieldElem = new FormField(formField.id, formField.name, formField.label, formField.required, form)
            this.#formFieldElemList.push(formFieldElem)
        }

        const submitButton = document.createElement("button")
        submitButton.innerText = "Küldés"
        form.appendChild(submitButton)
        form.addEventListener("submit", (e)=>{
            e.preventDefault();
            const elem=this.#createElement();
            if(elem){
                this.#manager.addElement(elem);
                e.target.reset();
            }
        })
    }
    /**
     * @returns {ColspanType | RowspanType | null}
     */
    #createElement(){
        let result={}
        let valid=true;
        for(const inputField of this.#formFieldElemList){
            if(inputField.validate()){
                result[inputField.name]=inputField.value;
            }
            else{
                valid=false;
            }
            // {neve: az input tartalma, kor: az input tartalma...}
        }
        if(valid){
            return result
        }
        else{
            return null;
        }
    }
}

class FormField {
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
    #errorDiv

    get value() {
        return this.#input.value ? this.#input.value : undefined
    }
    get name() {
        return this.#name;
    }

    /**
     * @param {string} id 
     * @param {string} name 
     * @param {string} labelContent 
     * @param {boolean} required 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, name, labelContent, required, parent) {
        const div = document.createElement("div")
        parent.appendChild(div)

        const label = document.createElement("label")
        label.innerText = labelContent
        label.htmlFor = id
        div.appendChild(label)

        div.appendChild(document.createElement("br"))

        const input = document.createElement("input")
        input.id = id
        input.name = name
        div.appendChild(input)
        this.#input = input
        this.#name = name

        const errorDiv = document.createElement("div")
        errorDiv.classList.add("error")
        div.appendChild(errorDiv)

        this.#required= required;
        this.#errorDiv=errorDiv;

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
            this.#errorDiv.innerText=""
        }
        return result
    }
}

export { FormController }