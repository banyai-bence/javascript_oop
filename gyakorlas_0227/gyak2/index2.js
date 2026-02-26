import { Table } from "./table2.js";
import { Manager } from "./manager2.js";
import data from "./data.json" with { type: "json" };
import { tbodyRenderColspan, tbodyRenderRowspan } from "./function.js";
import { FormController } from "./form2.js";

const m= new Manager();
const t= new Table(data.rowspanHeaderArray, m);
t.setAppendRow(tbodyRenderRowspan)
for(const d of data.rowspanTableArray){
    m.addElement(d)
}
new FormController(data.rowspanFormFieldList,m)