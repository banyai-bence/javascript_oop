/**
 * @callback addCallback
 * @param {ColspanType | RowspanType} 
 * @returns {void}
 */ 
class Manager{
    #dataArray
    #addCallback
    /**@param {import("../col_row/manager").addCallback} */
    set addCallback(value){
        this.#addCallback=value
    }
    constructor(){
        this.#dataArray= []
    }
    addElement(colRowType){
        this.#dataArray.push(colRowType)
        if(this.#addCallback) {
            this.#addCallback(colRowType)
        }
    }
}

export {Manager}