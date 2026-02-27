import { Manager } from "./manager1.js";

/**
 * @callback Tablecallback
 * @param {HTMLTableSectionElement} tbody
 * @param {ColspanType | RowspanType} type
 * @return {void}
 */
class Table{
    #tbody
    #manager
    /**
     * 
     * @param {HeaderArrayType} headerArray 
     * @param {Manager} manager 
     */
    constructor(headerArray,manager){
        this.#manager=manager
        const table= document.createElement("table")
        document.body.appendChild(table)
        const thead=document.createElement("thead")
        table.appendChild(thead)
        const thr= document.createElement("tr")
        thead.appendChild(thr)

        for(const h of headerArray){
            const th = document.createElement("th")
            th.innerText=h.name
            thr.appendChild(th)
            if(h.colspan){
                th.colSpan=2
            }
        }
        const tbody= document.createElement("tbody")
        table.appendChild(tbody)
        this.#tbody=tbody
    }
    setAppendRow(callback){
        this.#manager.addCallback= (elem)=>{
            callback(this.#tbody,elem)
        }
    }
}

export {Table}