/**
 * @callback addCallback
 * @param {import("../gyak2/function").ColspanType | import("../gyak2/function").RowspanType}
 * @returns {void}
 */
class Manager{
    #dataArray;
    #addCallBack;
    set addCallback(value){
        return this.#addCallBack=value
    }
    constructor(){
        this.#dataArray=[]
    }
    addElement(colRowType){
        this.#dataArray.push(colRowType)
        if(this.#addCallBack){
            this.#addCallBack(colRowType)
        }
    }
}

export {Manager}

