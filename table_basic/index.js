/** 
 * @typedef {{author: string, title1: string, concepts1: string, title2?: string,  concepts2?: string}} RowspanRowType  
 * @typedef {{author: string, title: string, concepts: string, concepts2?: string}} ColspanRowType
 * @typedef {{name: string, colSpan?: number}} HeaderType
 * @callback visszahiv
 * @param {HTMLTableSectionElement}
*/

/** @type {HeaderType[]}  */
const rowspanHeaderArr = [{name: "Szerző"}, {name: "Mű"}, {name: "Fogalmak"}] 
/** @type {HeaderType[]}   */
const colspanHeaderArr = [{name: "Szerző"},{name: "Mű"} , {name: "Fogalmak" ,colSpan: 2}] 

/** @type {RowspanRowType[]}  */
const rowspanBodyArr = [
    {
        author: "Appolliniare",
        title1: "A megsebzett galamb és a szökőkút", 
        concepts1: "képvers", 
        title2: "Búcsú",
        concepts2: "avantgárd" 
    },
    {
        author: "Thomas Mann",
        title1: "Mario és a varázsló",
        concepts1: "kisregény" 
    },
    {
        author: "Franz Kafka",
        title1: "A per", 
        concepts1: "képvers", 
        title2: "Az átvlátozás", 
        concepts2: "kisregény" 
    }
]



/** @type {ColspanRowType[]} */
const colspanBodyArr = [ 
    {
        author: "Appolliniare", 
        title: "A megsebzett galamb és a szökőkút",
        concepts: "Képvers",  
        concepts2: "Emlékezés", 
    },
    {
        author: "Appolliniare", 
        title: "Búcsú", 
        concepts: "Avantgárd" 
    },
    {
        author: "Thomas Mann", 
        title: "Mario és a varázsló", 
        concepts: "Kisregény" 
    },
    {
        author: "Franz Kafka",
        title: "A per", 
        concepts: "regény" 
    },
    {
        author: "Franz Kafka", 
        title: "Az átváltozás",
        concepts: "kisregény", 
        concepts2: "groteszk" 
    }
]

//renderColspanBody(makeTableBodyWithHeader(colspanHeaderArr), colspanBodyArr)
//renderRowspanBody(makeTableBodyWithHeader(rowspanHeaderArr), rowspanBodyArr)

class Table{
    /**@type {HTMLTableSectionElement} */
    #tbody;

    get tbody(){
        return this.#tbody
    }

    /**@param {HeaderType} tableHeader */
    constructor(tableHeader){
        this.#tbody=makeTableBodyWithHeader(tableHeader)
    }

    /**@param {visszahiv} param */
    metodus(param){
        param(this.tbody)
    }
}

class ColspanTable extends Table{
    /**@param {HeaderType} tableHeader */
    constructor(tableHeader){
        super(tableHeader)
    }

    render(ColspanRowType){
        renderColspanBody(this.tbody,ColspanRowType)
    }
}

class RowspanTable extends Table{
    /**@param {HeaderType} tableHeader */
    constructor(tableHeader){
        super(tableHeader)
    }
    
    render(RowspanRowType){
        renderRowspanBody(this.tbody,RowspanRowType)
    }
}

const cspan= new ColspanTable(colspanHeaderArr)
cspan.render(colspanBodyArr)
const rspan= new RowspanTable(rowspanHeaderArr)
rspan.render(rowspanBodyArr)

const button = document.createElement("button")
document.body.appendChild(button)
button.innerText = "rowspan hozzaadas"
button.addEventListener("click", bowAdderButton.bind(rspan))

/**
 * @this {RowspanTable} 
 */
function bowAdderButton(){
     /**@type {RowspanRowType} */
    const obj = {
        author: "Franz Kafka",
        title1: "A per", 
        concepts1: "képvers", 
        title2: "Az átvlátozás", 
        concepts2: "kisregény" 
    }

    this.metodus(function(body){

        const tr= document.createElement("tr")
        body.appendChild(tr)

        const td= document.createElement("td")
        td.innerText=obj.author
        tr.appendChild(td)

        const td2= document.createElement("td")
        td2.innerText=obj.concepts1
        tr.appendChild(td2)

        const td3= document.createElement("td")
        td3.innerText=obj.title1
        tr.appendChild(td3)

        if(obj.title2 && obj.concepts2){
            td.rowSpan=2

            const tr2=document.createElement("tr")
            body.appendChild(tr2)

            const td4=document.createElement("td")
            td4.innerText=obj.concepts2
            tr2.appendChild(td4)

            const td5=document.createElement("td")
            td5.innerText=obj.title2
            tr2.appendChild(td5)
        }
    })
}