/**
 * @callback addCallback
 * @param {import("./function").ColspanType | import("./function").RowspanType}
 * @returns {void}
 */
class Manager{
    #dataArray;
    #addCallback;
    /**
     * @param {import("../fix/manager1").addCallback}
     */
    set addCallback(value){
        this.#addCallback=value
    }
    constructor(){
        this.#dataArray=[]
    }
    addElement(colRowType){
        this.#dataArray.push(colRowType)
        if(this.#addCallback){
            this.#addCallback(colRowType)
        } 
    }
}

export {Manager}