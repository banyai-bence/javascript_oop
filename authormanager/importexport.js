import { AuthorManager } from "./manager.js"
import { ViewElement } from "./viewElement.js";

class ImportView extends ViewElement { // definialjuk importexport osztalyt leszarmazik a viewelementbol
    /**@type {AuthorManager} */
    #manager; // privat manager tulajdonsag definialasa

    /**
     * 
     * @param {string} id 
     * @param {AuthorManager} manager 
     */
    constructor(id, manager) { // konstruktor definialasa
        super(id) // szuloosztaly konstruktoranak meghivasa
        this.#manager = manager // manager tulajdonsagnak az ertekmegadas
        const fileInput = document.createElement("input") 
        fileInput.type = "file" // input tipusanak file-ra allitas
        this.div.appendChild(fileInput) // input hozzafuzese a divhez
        const resultDiv = document.createElement("div")
        this.div.appendChild(resultDiv) // resultdiv hozzacsatolasa a divhez
        this.#manager.importResultCallback = (message) => { // importresultcallback fuggveny definialasa
            resultDiv.innerText = message // resultdiv tartalmanak beallitasa 
            setTimeout(() => { // settimeout hivasa
                resultDiv.innerText = ""; // resultdiv tartalmanak torlese
            }, 1500) // masfel masodperc mulva
        }
        fileInput.addEventListener("change", (e) => { // input change esemenyere valo feliratkozas
            const file = e.target.files[0]; // elkerjuk az esemeny targetjenek a files tulajdonsagabol az elso elemet
            const reader = new FileReader(); // peldanyositjuk a filereader osztalyt
            reader.readAsText(file, "UTF-8"); // elkezdjuk beolvasni a filet a memoriaba ( ha sikeres akkor fut le az onloadban megadott callback)
            reader.onload = () => { // felirakozunk a reader load esemenyere a callbackkel
                /**@type {AuthorType[]} */
                const result = [] // letrehozunk egy result tombot ures tombkent
                const fileContent = reader.result; // elkerjuk a filereader peldany result tulajdonsagat
                const fileContentLines = fileContent.split("\n") // szetvalasztjuk a fajl tartalmat soronkent
                for (const line of fileContentLines) { // vegigiteralunk a sorokon 
                    const data = line.split(";"); // szetvalasztjuk a sorokat ; kent

                    /** @type {import("./index.js").AuthorType} */
                    const authorType = { // deklaralunk egy author tipusu objektumot
                        author: data[0], // ahol az author a sor elso pontosvesszojeig tarto string
                        work: data[1], // ahol az work a sor masodik pontosvesszojeig tarto string
                        concept: data[2] // ahol az concept a sor masodik pontosvesszo utani resz 
                    }
                    result.push(authorType); // hozzaadjuk az objektumot a result tombhoz
                }
                this.#manager.addElementList(result); // meghivjuk a tombbel az authormanager.addelementlist metodusat
            }
        })
        const exportButton = document.createElement("button") // letrehozunk egy gombot
        exportButton.innerText = "Export" // megadjuk a gomb szoveget
        this.div.appendChild(exportButton) // hozzafuzzuk a divhez a gombot
        exportButton.addEventListener("click", () => { // feliratkozunk a gomb klikk esemenyere
            const a = document.createElement("a"); // letrehozunk egy linket
            const fileContent = this.#manager.getExportString(); // elkerjuk az authorok string reprezentaciojat az authormanagertol
            const file = new Blob([fileContent]);  // peldanyositunk egy Blobot amelynek megadunk egy tombot ami tartalmazza az authorok string reprezentaciojat 
            const fileUrl = URL.createObjectURL(file); // letrehozunk egy url-t a blob alapjan
            a.href = fileUrl; // megadjuk a link href-jenek a letrehozott Blob url-jet
            a.download = "export.csv"; // megadjuk a letoltendo falj nevet
            a.click(); // clickelunk a linken
            URL.revokeObjectURL(a.href); // visszavonjuk a blob linkjenek az url-jet
        })
    }
}

export { ImportView } // exportaljuk az osztalyt