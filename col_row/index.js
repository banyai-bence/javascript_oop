/**
 * @import {FormFieldType,HeaderArrayType,ColspanType,RowspanType} from './functions.js' 
 */

import { Manager } from "./manager.js"
import data from "./data.json" with{type: "json"}
import { Table } from "./table.js"
import { FormController } from "./form.js"

const renderTbodyColspan=(tbody,elemn)=>{
    const tr=document.createElement("tr")
    tbody.appendChild(tr)

    const td1=document.createElement("td")
    td1.innerText=elem.neve
    tr.appendChild(td1)
    const td2=document.createElement("td")
    td2.innerText=elem.kor
    tr.appendChild(td2)
    const td3=document.createElement("td")
    td3.innerText=elem.szerelme1
    tr.appendChild(td3)

    if(elem.szerelme2){
        const td4=document.createElement("td")
        td4.innerText=elem.szerelme2
        tr.appendChild(td4)
    }
    else{
        elem.colSpan=2
    }
}

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

const form=new FormController(data.colspanFormFieldList, manager)

function createTD(txt, parent) {
    const td = document.createElement("td")
    td.innerText = txt
    parent.appendChild(td)
    return td
}