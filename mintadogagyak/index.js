//1. Egészítsd ki az alábbi function konstruktort, hogy három paraméter alapján beállít a létrejövő 
//objektumnak, egy title, egy author, és egy content tulajdonsága. (2pont)

function BlogPost (title,author,content) {
    this.title=title
    this.author=author
    this.content=content
}

const a=new BlogPost("cim","iro","mu")
console.log(a)

//2. Egészítsd ki a következő constructor functiont. Az osztály leszármazik a BlogPost osztályból, 
//és az ősosztály 3 paraméterén kívül fogadjon el egy negyedik paramétert is sponsorName néven. 
//Az első 3 paraméter alapján történő tulajdonságbeállítást az ősosztály konstruktorának 
//meghívásával állítsd be, a negyediket pedig saját tulajdonságként tárold a példányban. Adj hozzá 
//egy display metódust a leszármazott osztály prototípusához, amely kiírja a title és a 
//sponsorName tulajdonság értékét szóközzel elválasztva. Figyelj arra, hogy a prototype lánc 
//helyesen legyen beállítva a leszármazás esetén. (3 pont)

function SponsoredPost(title,author,content,sponsorName) {
    BlogPost.call(this, title,author,content)
    this.sponsorName=sponsorName
}

Object.setPrototypeOf(SponsoredPost.prototype, BlogPost.prototype)

SponsoredPost.prototype.display= function(){
    console.log(this.title+ " " + this.sponsorName)
}

//3. Egészítsd ki a következő osztályt egy privát history tulajdonsággal, amit a konstruktorban üres 
//tömbként inicializálsz. A tulajdonságnak definiálj egy gettert, valamint az osztálynak definiálj egy 
//log(message) metódust, ami hozzáadja a privát tulajdonsághoz a bemeneti paramétert.  (2 pont)



//4. Egészítsd ki a következő osztályt, hogy a Logger osztályból származzon, valamint a 
//konstruktora fogadjon el egy maxSize paramétert, amit privát tulajdonságban tároljuk. Egészítsd ki 
//a processWithCallback metódusát az osztálynak, ami a bemeneti paraméterben átadott 
//függvényt meghívja az megörökölt history tömb minden elemén. (2 pont)




