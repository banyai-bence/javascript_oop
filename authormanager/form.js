import { createInputAndErrorDiv } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";

class FormView extends ViewElement { // leszarmazunk a viewelementbol es definialjuk a formview osztalyt

    /**
     * @type {formInput[]}
     */
    #formInputList; // letrehozzuk a privat tulajdonsagot
    /**
     * @type {AuthorManager}
     */
    #manager; // letrehozzuk a privat tulajdonsagot
    /**
     * @type {HTMLFormElement}
     */
    #form; // letrehozzuk a privat tulajdonsagot
    /**
     * 
     * @param {string} id 
     * @param {import("./index.js").FormFieldType[]} formFieldList 
     * @param {AuthorManager} manager 
     */
    constructor(id, formFieldList, manager) { // definialjuk a konstruktort
        super(id); // meghivjuk a szuloosztaly konstruktorat
        this.#manager = manager // erteket adunk a privat manager tulajdonsagnak
        this.#formInputList = [] // inicializaljuk a forminputlist tulajdonsagot
        const form = document.createElement("form") // letrehozunk egy formot
        for (const field of formFieldList) { // vegigiteralunk a bemeneti formfieldlist parameteren
            const formField = new FormField(field.id, field.label, field.name, form) // peldanyositjuk a forminputokat
            this.#formInputList.push(formField) // hozzaadjuk a forminputlist listahoz
        }
        const button = document.createElement("button") // letrehozunk egy gombot
        button.innerText = "Küldés" // a gomb szovege legyen kuldes
        form.appendChild(button) // a gombot hozzafuzzuk az urlaphoz

        const resultDiv = document.createElement("div") // letrehozunk egy resultdivet a megjelenitendo uzenetnek
        this.div.appendChild(resultDiv)  // hozzacsatoljuk a resultdivet a viewelementdivhez
        form.addEventListener("submit", (e) => { // feliratkozunk a form submit esemenyere
            e.preventDefault(); // megakadalyozzuk az urlap alapertelmezett mukodeset
            const elem= this.#createElement(); // meghivjuk a createelement metodust
            this.#manager.addElement(elem) // meghivjuk a manager addelement fuggvenyet ( lasd: authormanager.addelement)
        })
        this.div.appendChild(form)
        this.#manager.addElementResultCallback= (result)=>{ // definialjuk az addelementresultcallbacket
            resultDiv.innerText= result // beallitjuk a resultdiv ertekenek a kapott stringet
            setTimeout(()=>{ // meghivjuk a settimeoutot
                resultDiv.innerText="" // toroljuk a resultdiv tartalmat
            }, 1500) // masfel masodperc mulva
        }
    }
    /**
     * @returns {import("./index.js").AuthorType}
     */
    #createElement() { // createelement metodus definialasa
        /**
         * @type {import("./index.js").AuthorType}
         */
        let result = {} // letrehozunk egy authortype tipusu objektumot
        for (const field of this.#formInputList) { // vegigiteralunk a forminput list elemein
            if (field.validate()) { // meghivjuk minden forminputra a validate fuggvenyt
                result[field.name] = field.value // a result objektum forminputfield name ertekevel megegyezo nevu tulajdonsaganak megadjuk a forminput beviteli mezojenek az erteket
            }
        }
        return result; // visszaterunk az objektummal
    }
}

class FormField { // definialunk egy formfield osztalyt
    
    /**
     * @type {HTMLInputElement}
     */
    #inputElement; // definialunk egy privat tulajdonsagot
    /**
     * @type {HTMLDivElement}
     */
    #errorDiv; // definialunk egy privat tulajdonsagot
    /**
     * @type {string}
     */
    #name; // definialunk egy privat tulajdonsagot

    get name() { // definialunk gettert 
        return this.#name // visszter name tulajdonsag ertekevel
    }
    get value() { // definialunk gettert 
        return this.#inputElement.value ? this.#inputElement.value : undefined // amennyiben az input elementnek van beirt erteke akkor visszater a beirt ertekkel egyebkent undefineddal ter vissza
    }
    /**
     * 
     * @param {string} id 
     * @param {string} label 
     * @param {string} name 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, label, name, parent) { // definialunk egy konstruktort
        const { input, errorDiv } = createInputAndErrorDiv({ id, label, name, parent }) // letrehozunk gy divet ami tartalmaz egy labelt egy inutot es egy errordivet
        this.#name = name; // beallitjuk a name tulajdonsag erteket
        this.#errorDiv = errorDiv // a visszateresi ertek input tulajdonsaganak erteket allitjuk be
        this.#inputElement = input // a visszateresi ertek input tulajdonsaganak erteket allitjuk be
    }
    /**
     * @returns {boolean}
     */
    validate() { // definialjuk a validate fuggvenyt 
        let result = true; // letrehozunk egy result valtozot igaz ertekkel
        if (!this.value) { // ha a value getter visszateresi erteke undefined
            this.#errorDiv.innerText = "Mező kitöltése kötelező" // beallitjuk az errordiv erteket hibauzenetre
            result = false // result erteket falsera allitjuk
        }
        else { // egyebkent
            this.#errorDiv.innerText = "" // toroljuk az errordiv tartalmat
        }
        return result; // visszaterunk a result valtozo ertekevel
    }
}

export { FormView }