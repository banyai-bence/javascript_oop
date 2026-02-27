import { Table } from "./table1.js";
import { Manager } from "./manager1.js";
import data from "./data.json" with { type: "json" };
import { tbodyRenderColspan, tbodyRenderRowspan } from "./function.js";
import { FormController } from "./form1.js";

const manager= new Manager()
const table= new Table(data.colspanHeaderArray, manager)
table.setAppendRow((tbody,elem) => {
    tbodyRenderColspan(tbody,elem)
})

for(const d of data.colspanDataArr){
    manager.addElement(d)
}

const form= new FormController(data.colspanFormFieldList, manager)

const manager2 = new Manager()
const table2 = new Table( data.rowspanHeaderArray,manager2)
table2.setAppendRow((tbody,elem)=> {
    tbodyRenderRowspan(tbody,elem)
})
for(const d of data.rowspanTableArray){
    manager2.addElement(d)
}
const form2 = new FormController( data.rowspanFormFieldList,manager2);

