import { Manager } from "./manager3.js";
import { Table } from "./table3.js";
import data from "./data.json" with {type: "json"}
import { tbodyRenderColspan, tbodyRenderRowspan } from "./function.js";
import { FormController } from "./form3.js";

const manager= new Manager();
const table= new Table(data.colspanHeaderArray, manager)
table.setAppendRow(tbodyRenderColspan)
for(const d of data.colspanDataArr){
    manager.addElement(d)
}
const form= new FormController(data.colspanFormFieldList,manager)

const man2= new Manager();
const tab2= new Table(data.rowspanHeaderArray, man2)
tab2.setAppendRow(tbodyRenderRowspan)
for(const d of data.rowspanTableArray){
    man2.addElement(d)
}

const form2=new FormController(data.rowspanFormFieldList, man2)