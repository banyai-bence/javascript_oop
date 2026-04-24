import { createTableCell, createTableHeader } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";


class TableView extends ViewElement { 
    /** @type {AuthorManager} */
    #manager; 
    /** @type {HTMLTableSectionElement} */
    #tbody; //privat tulajdonsag a tablazat torzsenek

    /**
     * 
     * @param {string[]} headerArray
     * @param {string} id 
     * @param {AuthorManager} manager
     */
    constructor(id, headerArray, manager) {
        super(id); // szuloosztaly konstruktoranak meghivasa
        this.#manager = manager // a manager erteke a bemeneti manager peldany
        const table = document.createElement("table") // letrehozunk egy tablazatot
        this.div.appendChild(table) // hozzacsatoljuk a tablazatot a divhez
        const thead = createTableHeader(headerArray) 
        table.appendChild(thead);
        this.#tbody = document.createElement("tbody")
        table.appendChild(this.#tbody)
        this.#manager.tableCallback = (authorList) => {  // definialjuk a manager tablecallback jet a setter meghivasaval lasd: authormanager.tablecallback
            if (authorList.length == 0) { // ha a lista ures 
                const tr = document.createElement("tr")// letrehozunk egy sor elemet
                this.#tbody.appendChild(tr)
                const td = createTableCell(tr, "Nincs megjelenitendo sor") 
                td.colSpan = 3
            }
            for (const author of authorList) {
                const tr = document.createElement("tr")
                this.#tbody.appendChild(tr)

                createTableCell(tr, author.name)
                createTableCell(tr, author.work)
                createTableCell(tr, author.concept)
            }

        }
        this.activateCallback = () => {
            this.#tbody.innerHTML = "" // toroljuk a tbody tartalmat
            this.#manager.getAllElement() // meghibjuk a manager getallelementjet (ami meghivja a tablecallbackjet lasd authormanager.getallelement)
        }
    }
}

export { TableView } // exportaljuk a table-t