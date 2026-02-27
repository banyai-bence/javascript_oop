/**
 * @callback addCallback
 * @param {import("./function").ColspanType | import("./function").RowspanType}
 * @returns {void}
 */
class Manager{
    #dataArray;
    #addCallBack    
    /**@param {addCallback} */
    set addCallback(value){
        return this.#addCallBack=value
    }
    constructor(){
        this.#dataArray=[]
    }
    addElement(colRowType){
        this.#dataArray.push(colRowType)
        if(this.#addCallBack)
            this.#addCallBack(colRowType)
    }
}

export {Manager}