import { ViewElement } from "./viewElement.js";
import { createRadioButton } from "./gomszab.min.js";

class NavigationBar extends ViewElement{
    /**@type {ViewElement[]} */
    #viewElementList; // privat tulajdonsag ami tartalmazza a megjelenitendo viewelement leszarmazottakat

    constructor(){
        super("navbar"); // meghivjuk a szuloosztaly konstruktorat
        this.#viewElementList=[];
        this.div.addEventListener("change", (e)=>{ // feliratkozunk a div change esemenyere ( mivel a div radiogombokat fog tartalmazni ezert tudjuk figyelni a divnel hogy melyik radiogomb lesz kijelolve)
            const radioButtonValue = e.target.value // elkerjuk a target value erteket
            this.activate(radioButtonValue); // meghivjuk az activate fuggvenyt a kivalasztott radiogomb ertekevel (a viewelement azonositoi lehetnek lasd: addviewelement)
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
    activate(value){ // a szuloosztaly definial egy activate fuggvenyt lasd: viewelement.activate , de a navigacios bar mas logikat kell tartalmazzon
        for(const viewElement of this.#viewElementList){
            viewElement.activate(value)       // meghivjuk az activate fuggvenyet minden viewelementnek  
        }
        this.div.querySelector(`#${value}`).checked = true; // a diven belul lekerjuk a bemeneti parameterrel megegyezo id-ju element es kijeloltre allittjuk
    }
}

export {NavigationBar}