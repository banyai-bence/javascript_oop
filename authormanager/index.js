/**
 * @typedef {{id: number, author?: string, work?: string, concept?: string}} AuthorType
 * @typedef {{id: string, label: string, name: string}} FormFieldType
 */

import { FormView } from "./form.js";
import { ImportView } from "./importexport.js";
import { AuthorManager } from "./manager.js";
import { NavigationBar } from "./navigationbar.js"
import { TableView } from "./table.js";

const formFields = [{
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

const headerArray = ['Szerző', 'Mű', 'Fogalom']
const manager= new AuthorManager();


const navbar= new NavigationBar();
navbar.appendTo(document.body)

const tableView= new TableView("table",headerArray, manager);
tableView.appendTo(document.body)
navbar.addViewElement("Táblázat", tableView)

const formView= new FormView("tableForm", formFields, manager)
formView.appendTo(document.body)
navbar.addViewElement("Form", formView)
const importExport= new ImportView("importexport", manager)
importExport.appendTo(document.body)
navbar.addViewElement("Import/Export", importExport)
navbar.activate("table")
