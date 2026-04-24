/**
 * @typedef {{id: number, author?: string, work?: string, concept?: string}} AuthorType
 * @typedef {{id: string, label: string, name: string}} FormFieldType
 */

import { FormView } from "./form.js";
import { ImportView } from "./importexport.js";
import { AuthorManager } from "./manager.js";
import { NavigationBar } from "./navigationbar.js"
import { TableView } from "./table.js";

const formFields = [{ // letrehozunk egy formfield listat ami alapjan peldanyositja a formview a formfield osztalyt
    id: 'author',
    label: 'Név',
    name: 'author'
},
{
    id: 'work',
    label: 'Mű',
    name: 'work'
},
{
    id: 'concept',
    label: 'Fogalom',
    name: 'concept'
}]

const headerArray = ['Szerző', 'Mű', 'Fogalom'] // letrehozunk egy header listat
const manager= new AuthorManager(); // peldanyositjuk a managert


const navbar= new NavigationBar(); // peldanyositjuk a navbart
navbar.appendTo(document.body) // hozzafuzzuk a document.bodyhoz

const tableView= new TableView("table",headerArray, manager); // peldanyositjuk
tableView.appendTo(document.body) // hozzafuzzuk a document.bodyhoz
navbar.addViewElement("Táblázat", tableView) // hozzaadjuk a navigacios barhoz

const formView= new FormView("tableForm", formFields, manager) // peldanyositjuk
formView.appendTo(document.body) // hozzafuzzuk a document.bodyhoz
navbar.addViewElement("Form", formView) // hozzaadjuk a navigacios barhoz
const importExport= new ImportView("importexport", manager) // peldanyositjuk
importExport.appendTo(document.body) // hozzafuzzuk a document.bodyhoz
navbar.addViewElement("Import/Export", importExport) // hozzaadjuk a navigacios barhoz
navbar.activate("table") // meghivjuk a navbar activate metodusat a table azonositojaval
