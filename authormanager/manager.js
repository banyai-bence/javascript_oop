
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
class AuthorManager {
    /** @type {Author[]} */
    #authorList;

    /** @type {TableCallback}  */
    #tableCallback;


    /**
     * @type {addElementResultCallback}
     */
    #addElementResultCallback;
    /**@type {ImportResultCallback} */
    #importResultCallback;
    /**
     * @param {TableCallback} value
     */
    set tableCallback(value) {
        this.#tableCallback = value
    }

    /**
     * @param {AddElementResultCallback} value
     */
    set addElementResultCallback(value) {
        this.#addElementResultCallback = value
    }
    /**
     * @param {ImportResultCallback} value
     */
    set importResultCallback(value) {
        this.#importResultCallback = value
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

class Author {
    /**@type {string} */
    #id;
    /**@type {string} */
    #name;
    /**@type {string} */
    #work;
    /**@type {string} */
    #concept;

    get id() {
        return this.#id
    }
    get name() {
        return this.#name
    }
    get work() {
        return this.#work
    }
    get concept() {
        return this.#concept
    }

    set id(value) {
        this.#id = value
    }
    set name(value) {
        this.#name = value
    }
    set work(value) {
        this.#work = value
    }
    set concept(value) {
        this.#concept = value
    }
    /**
     * @returns {boolean}
     */
    validate() {
        return this.#name && this.#concept && this.#work
    }
}

export { AuthorManager }