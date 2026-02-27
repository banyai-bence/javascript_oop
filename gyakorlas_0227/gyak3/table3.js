import { Manager } from "./manager3.js";
import { createTable, createTableCell } from "./function.js";

/**
 * @callback Tablecallback
 * @param {HTMLTableSectionElement} tbody
 * @param {import("./function").ColspanType | import("./function").RowspanType} type
 * @returns {void}
 */
class Table{
    /**@type {HTMLTableSectionElement} */
    #tbody;
    /**@type {Manager} */
    #manager;
    /**
     * 
     * @param {import("./function").HeaderArrayType} headerArray 
     * @param {Manager} manager 
     */
    constructor(headerArray, manager){
        this.#manager=manager
        this.#tbody=createTable(document.body, (tr)=>{
            for(const h of headerArray){
                const th= createTableCell("th",h.name,tr)
                if(h.colspan){
                    th.colSpan=2
                }
            }
        })
    }
    setAppendRow(callback){
        this.#manager.addCallback=(elem)=>{
            callback(this.#tbody,elem)
        }
    }
}

export {Table}