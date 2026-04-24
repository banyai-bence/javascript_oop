import { hide, show } from "./gomszab.min.js";
//ososzatallyal megjelenitendo view osztalyoknak
/**
 * @callback ActivateCallback
 * @returns {void}
 */
class ViewElement{
    /**@type {HTMLDivElement} */
    #div;  //peldanyositaskor letrehoznk egy divet az elemnek azt taroljuk el
    /**@type {string} */
    #id;
    /**@type {ActivateCallback} */
    #activateCallback; // akkor fut le amikor megjelenik au elem a kepernyon

    get div(){  // getter definialasa a divnek
        return this.#div
    }

    /**@param {ActivateCallback} value */
    set activateCallback(value){  // setter az activatecallbacknek
        this.#activateCallback=value    // beallitja az activatecallbacknek a bemeneti parametert
    }   

    get id(){
        return this.#id
    }

    /**
     * 
     * @param {string} id 
     */
    constructor(id){  // konstruckot bemeneti azonositoval
        this.#id=id // azonosito beallitasa
        this.#div=document.createElement("div") // div letrehoz, es privat tulajonsag beallitasa
        this.#div.id=id; // div azonositojanak beallitasa
    }

    /**
     * 
     * @param {HTMLElement} parent 
     */
    appendTo(parent){  // definialunk egy fuggvenyt a peldanynak egy bemeneti parameter egy html
        parent.appendChild(this.#div) // html elemhez hozzacsatoljuk a div tulajdonsagot
    }

    /**
     * 
     * @param {string} id 
     */
    activate(id){  // fuggvenyt definialunk a peldanyoknak
        if(this.#id === id){ // osszehasonlitjuk a bemeneti id parametert az id tulajdonsaggal
            show(this.#div) // a divtol elveszi a hidden css osztalyt
            if(this.#activateCallback){ // ha van activatecallback
                this.#activateCallback(); // akkor meghivjuk
            }
        }
        else{
            hide(this.#div) // hozzafuzzuk az elemhez a hidden css osztalyt
        }
    }
}

export {ViewElement}