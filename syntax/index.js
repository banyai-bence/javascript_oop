import { muveletLetrehoz } from "./functions.js"
import { Gomb } from "./gomb.js";



// function muvelet(a,b){
//     return a+b
// }

const fv = muveletLetrehoz("+")
console.log(fv(1, 2))

const inpu1=document.createElement("input")
inpu1.type="text"
inpu1.id="egy"
document.body.appendChild(inpu1)

const inpu2=document.createElement("input")
inpu2.type="text"
inpu2.id="ketto"
document.body.appendChild(inpu2)

const div1=document.createElement("div")
document.body.appendChild(div1)

const osszeadas= new Gomb(inpu1,inpu2,"+",div1)
const kivonas= new Gomb(inpu1,inpu2,"-",div1)
const szorzas= new Gomb(inpu1,inpu2,"*",div1)

