import { muvelet, muveletLetrehoz } from "./functions.js"

class Gomb {
    constructor(input1, input2, muveletString, eredmenyDiv) {
        const gomb = document.createElement("button")
        gomb.innerText = "nenyomdmeg"
        document.body.appendChild(gomb)

        gomb.addEventListener("click", this.#calculate(input1, input2, eredmenyDiv).bind(muveletString))
    }
    #calculate(input1, input2, eredmenydiv) {
        return function () {

            const elsoertek = Number(input1.value)
            const masodikertek = Number(input2.value)

            const { result } = muvelet(elsoertek, masodikertek, muveletLetrehoz(this))
            eredmenydiv.innerText = result
        }
    }
}

export{Gomb}
