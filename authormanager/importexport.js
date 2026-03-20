import { AuthorManager } from "./manager.js"
import { ViewElement } from "./viewElement.js";

class ImportView extends ViewElement {
    /**@type {AuthorManager} */
    #manager;

    /**
     * 
     * @param {string} id 
     * @param {AuthorManager} manager 
     */
    constructor(id, manager) {
        super(id)
        this.#manager = manager
        const fileInput = document.createElement("input")
        fileInput.type = "file"
        this.div.appendChild(fileInput)
        const resultDiv = document.createElement("div")
        this.div.appendChild(resultDiv)
        this.#manager.importResultCallback = (message) => {
            resultDiv.innerText = message
            setTimeout(() => {
                resultDiv.innerText = "";
            }, 1500)
        }
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = () => {
                /**@type {AuthorType[]} */
                const result = []
                const fileContent = reader.result;
                const fileContentLines = fileContent.split("\n")
                for (const line of fileContentLines) {
                    const data = line.split(";");

                    /** @type {import("./index.js").AuthorType} */
                    const authorType = {
                        author: data[0],
                        work: data[1],
                        concept: data[2]
                    }
                    result.push(authorType);
                }
                this.#manager.addElementList(result);
            }
        })
        const exportButton = document.createElement("button")
        exportButton.innerText = "Export"
        this.div.appendChild(exportButton)
        exportButton.addEventListener("click", () => {
            const a = document.createElement("a");
            const fileContent = this.#manager.getExportString();
            const file = new Blob([fileContent]);
            const fileUrl = URL.createObjectURL(file);
            a.href = fileUrl;
            a.download = "export.csv";
            a.click();
            URL.revokeObjectURL(a.href);
        })
    }
}

export { ImportView }