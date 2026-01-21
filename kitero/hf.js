//HF.: Az elméleti példákból 1 tetszőleges példa megvalósítása konstruktor 
// functionos megoldással, és classos szintaxissal. Lehetséges különböző 
// példákat is megcsinálni (1-et function, 1-et classal). Munkádat a 
// hf.js-ben csináld meg.


function Tanyer(szin,meret){
        this.szin=szin
        this.meret=meret
    }


function Pohar(szin){
    this.szin=szin
}

const tanyer1=new Tanyer("kek","kicsi")
console.log(tanyer1)
const tanyer2=new Tanyer("lila","nagy")
console.log(tanyer2)
const tanyer3=new Tanyer("turkiz","nagy")
console.log(tanyer3)

const pohar1=new Pohar("bezs")
console.log(pohar1)

//-------------------------------------------------

class Tanyer2{
    constructor(szin,meret){
        this.szin=szin
        this.meret=meret
    }
}

class Pohar2{
    constructor(szin){
        this.szin=szin
    }
}

const t1 =new Tanyer2("barna","kicsi")
console.log(t1)
const t2=new Tanyer("zold","nagy")
console.log(t2)
const t3=new Tanyer("piros","kicsi")
console.log(t2)

const p1=new Pohar2("fekete")
console.log(p1)

class KisTanyer extends Tanyer2{
    constructor(szin,meret){
        super(szin,meret)
    }
}

const kistanyer=new KisTanyer("kek","kicsi")
console.log(kistanyer)