import { muvelet,muveletLetrehoz } from "./functions.js"

const inp1 = document.createElement("input")
document.body.appendChild(inp1)
const inp2 = document.createElement("input")
document.body.appendChild(inp2)

const div = document.createElement("div")
document.body.appendChild(div)

const button = document.createElement("button")
div.appendChild(button)
button.innerText = "gomb"

button.addEventListener("click", function () {
    const sz1 = Number(inp1.value)
    const sz2 = Number(inp2.value)
    const {result}=muvelet(sz1, sz2, muveletLetrehoz("+"))
    div.innerText = result
    
})

// function muvelet(a,b){
//     return a+b
// }

const fv = muveletLetrehoz("+")
console.log(fv(1, 2))

