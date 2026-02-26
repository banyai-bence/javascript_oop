import { Manager } from "./manager4.js";
import { Table } from "./table4.js";
import data from "./data.json" with {type: "json"}
import { tbodyRenderColspan, tbodyRenderRowspan } from "./function.js";
import { FormController } from "./form4.js";

const man=new Manager();
const tab= new Table(data.colspanHeaderArray,man);
tab.setAppendRow(tbodyRenderColspan)
for(const d of data.colspanDataArr){
    man.addElement(d)
}
new FormController(data.colspanFormFieldList,man)

const man2=new Manager();
const tab2= new Table(data.rowspanHeaderArray,man2);
tab2.setAppendRow(tbodyRenderRowspan)
for(const d of data.rowspanTableArray){
    man2.addElement(d)
}
new FormController(data.rowspanFormFieldList,man2)