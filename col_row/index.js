/**
 * @import {FormFieldType,HeaderArrayType,ColspanType,RowspanType} from './functions.js' 
 */

import { Manager } from "./manager.js"
import data from "./data.json" with{type: "json"}
import { Table } from "./table.js"

const manager = new Manager()
const table = new Table(data.colspanHeaderArray, manager)
table.setAppendRow((tbody, elem) => {
    const tr = document.createElement("tr")
    tbody.appendChild(tr)

    createTD(elem.neve, tr)
    createTD(elem.kor, tr)
    const td = createTD(elem.szerelme1, tr)
    if (elem.szerelme2) {
        createTD(elem.szerelme2, tr)
    }
    else {
        td.colSpan = 2
    }
})

for (const d of data.colspanDataArr) {
    manager.addElement(d)
}

function createTD(txt, parent) {
    const td = document.createElement("td")
    td.innerText = txt
    parent.appendChild(td)
    return td
}