
/**
 * @callback TableCallback
 * @param {Author[]} authorList
 * @returns {void}
 * 
 * @callback AddElementResultCallback
 * @param {string} message
 * @returns {void}
 * 
 * @callback ImportResultCallback
 * @param {string} message
 * @returns {void}
 */
class AuthorManager { // definialjuk az authormanager osztalyt
    /** @type {Author[]} */
    #authorList; // definialjuk egy privat authorlist tulajdonsagot

    /** @type {TableCallback}  */
    #tableCallback; // definialjuk egy privat tulajdonsagot


    /**
     * @type {addElementResultCallback}
     */
    #addElementResultCallback; // definialjuk egy privat tulajdonsagot
    /**@type {ImportResultCallback} */
    #importResultCallback; // definialjuk egy privat tulajdonsagot
    /**
     * @param {TableCallback} value
     */
    set tableCallback(value) { // definialunk egy settert 
        this.#tableCallback = value // erteket adunk a privat tulajdonsagnak
    }

    /**
     * @param {AddElementResultCallback} value
     */
    set addElementResultCallback(value) { // definialunk egy settert 
        this.#addElementResultCallback = value // erteket adunk a privat tulajdonsagnak
    }
    /**
     * @param {ImportResultCallback} value
     */
    set importResultCallback(value) { // definialunk egy settert 
        this.#importResultCallback = value // erteket adunk a privat tulajdonsagnak
    }

    constructor() {
        this.#authorList = []
    }

    /**
     * 
     * @param {import(".").AuthorType} element 
     */
    addElement(element) {
        const author = new Author();
        author.id = this.#authorList.length;
        author.name = element.author;
        author.work = element.work;
        author.concept = element.concept;
        if (author.validate()) {
            this.#authorList.push(author)
            this.#addElementResultCallback("Sikeres elemfelvetel")
        }
        else {
            this.#addElementResultCallback("Nem volt sikeres az elemfelvetel")
        }
    }
    /**
     * @param { import(".").AuthorType[]} elementList
     */
    addElementList(elementList) {
        for (const elem of elementList) {
            const author = new Author();
            author.id = this.#authorList.length
            author.name = elem.author
            author.work = elem.work
            author.concept = elem.concept
            if (author.validate()) {
                this.#authorList.push(author)
                this.#importResultCallback("Sikeres volt.")
            } else {
                this.#importResultCallback("Sikertelen muvelet")
                break;
            }
        }
    }


    /**
     * @returns {void}
     */
    getAllElement() {
        this.#tableCallback(this.#authorList);
    }
    /**
     * @returns {string}
     */
    getExportString() {
        const result = []
        for (const author of this.#authorList) {
            result.push(`${author.name};${author.work};${author.concept}`)
        }
        return result.join("\n");
    }

}

class Author { // definialunk egy author entitas osztalyt
    /**@type {string} */
    #id; // definialunk egy id privat tulajdonsagot
    /**@type {string} */
    #name;// definialunk egy name privat tulajdonsagot
    /**@type {string} */
    #work; // definialunk egy work privat tulajdonsagot
    /**@type {string} */
    #concept; // definialunk egy concept privat tulajdonsagot

    get id() { // definialunk gettert az azonositonak 
        return this.#id // visszaterunk a privat tulajdonsaggal
    }
    get name() { // definialunk gettert a namenek
        return this.#name // visszaterunk a privat tulajdonsaggal
    }
    get work() { // definialunk gettert a namenek
        return this.#work // visszaterunk a privat tulajdonsaggal
    }
    get concept() { // definialunk gettert a namenek
        return this.#concept // visszaterunk a privat tulajdonsaggal
    }

    set id(value) { // definialunk settert az azonositonak
        this.#id = value // beallitjuk 
    }
    set name(value) { // definialunk settert az azonositonak
        this.#name = value // beallitjuk 
    }
    set work(value) { // definialunk settert az azonositonak
        this.#work = value // beallitjuk 
    }
    set concept(value) { // definialunk settert az azonositonak
        this.#concept = value // beallitjuk 
    }
    /**
     * @returns {boolean}
     */
    validate() { // definialunk egy validate fuggvenyt a peldanynak 
        return this.#name && this.#concept && this.#work // ha mindennek heyes erteke van akkor igazzal ter vissza, egyebkent hamis
    }
}

export { AuthorManager }