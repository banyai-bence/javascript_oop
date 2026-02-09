import { Manager } from "./manager.js";
/**
 * @callback Tablecallback
 * @param {HTMLTableSectionElement} tbody
 * @param {import("./functions").ColspanType | import("./functions").RowspanType} type
 * @returns {void}
 */

class Table{
    #tbody
    #manager
    /**
     * 
     * @param {import("./functions").HeaderArrayType} headerArry 
     * @param {Manager} manager 
     */
    constructor(headerArray, manager) {
        this.#manager = manager
        const table = document.createElement("table")
        document.body.appendChild(table)
        const thead = document.createElement("thead")
        table.appendChild(thead)
        const trh = document.createElement("tr")
        thead.appendChild(trh)

        for (const h of headerArray) {
            const th = document.createElement("th")
            th.innerText = h.name
            trh.appendChild(th)
            if (h.colSpan) {
                th.colSpan = 2
            }
        }
        const tbody = document.createElement("tbody")
        table.appendChild(tbody)
        this.#tbody = tbody
    }
    setAppendRow(callback) {
        this.#manager.addCallback = (elem) => {
            callback(this.#tbody, elem)
        }
    }
}

export { Table }