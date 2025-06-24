//! Inheritance (passing Down Traits)
/**
 * ANALOGY: Think of a family . A parent passess down certain traits (like eye color or last name) to their children.The Children inherit these traits bit can also have their own unique characteristics.
 * 
 * * Inheritance allows a new class (the "child" or "subclass") to inherit properties and methods from an existing class (the "parent" or "superclass"). This promotes code reuse in a powerful way.
 */

//* The parent Class(superclass)
class DigitalItem{
  title:string
  fileSize:number // in MB

  constructor(title:string,filesSize:number){
    this.title=title
    this.fileSize=filesSize
  }

  share(email:string){
    console.log(`Sharing '${this.title}' with ${email}`)
  }
}

//* The Child class (subclass) - It extends DigitalItem

class EBook extends DigitalItem{
    pageCount:number

    constructor(title:string, fileSize:number,pageCount:number){
        // 'super()' calls the constructor of the parent class (DigitalItem)
        super(title,fileSize)
        this.pageCount=pageCount
    }

    //This method is unique to EBook
    read(){
        console.log(`Opening '${this.title}' to read`)
    }
}

//* Another child class 
class MusicTrack extends DigitalItem{
    artist:string
    duration:number
    
    constructor(title:string,fileSize:number, artist:string,duration:number){
        super(title,fileSize)
        this.artist=artist
        this.duration=duration
    }
    
    play(){
        console.log(`Playing '${this.title}' by ${this.artist}.`)
    }
}

const myBook = new EBook('The Hobbit',5,310)
const mySong = new MusicTrack("Bohemian Rhapsody", 15, "Queen", 355)

// Both objects can use the 'share' method inherited from DigitalItem
myBook.share("friend@example.com"); // Output: Sharing 'The Hobbit' with friend@example.com.
mySong.share("dj@example.com");     // Output: Sharing 'Bohemian Rhapsody' with dj@example.com.

// They can also use their own specific methods
myBook.read(); // Output: Opening 'The Hobbit' to read.
mySong.play(); // Output: Playing 'Bohemian Rhapsody' by Queen.
