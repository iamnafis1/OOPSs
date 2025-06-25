//! Ploymorphism (One Interface ,Many Forms)
/**
 * ? Analogy: Think of a USB port.You can plug in a mouse, a keyboard,a flash drive or a phone.They all are different devices, but they all connect through the same standard interface(the usb port).The port doesn't care what the specific device is; it just knows how to interact with it.
 * 
 * *Polymorphism means 'many forms.' In OOP, it's the ability for different objects to respond to the same method call in their own unique way. It often goes hand-in-hand with inheritance.
 * 
 * @param DigitalItems :array[]
 * we want to render DigitalItems on a webpage
 */

// Parent Class with a method that will be overridden

class DigitalItem{
    title:string
    constructor(title:string){
        this.title=title
    }

    //* A generic display method
    display():void{
        console.log(`Display generic item :${this.title}`)
    }
}

class EBook extends DigitalItem {
    author: string;
    constructor(title: string, author: string) {
        super(title);
        this.author = author;
    }

    //* Override the display method for EBooks
    display(): void {
        console.log(`[BOOK] Title: ${this.title}, Author: ${this.author}`);
    }
}

class MusicTrack extends DigitalItem{
    artist:string
    constructor(title:string,artist:string){
        super(title)
        this.artist=artist
    }

    //*Override the display method for MusicTracks
    display(): void {
        console.log(`♫ Now Playing: ${this.title} by ${this.artist}`)
    }
}

class Movie extends DigitalItem{
    director:string
    constructor(title:string,director:string){
        super(title)
        this.director=director
    }
    //* Override the display method for Movies
    display(): void {
        console.log(`🎬 Movie: ${this.title}, Directed by: ${this.director}`);
    }
}

//! Here's the magic of Polymorphism!
const library: DigitalItem[] = [
    new EBook("Dune", "Frank Herbert"),
    new MusicTrack("Stairway to Heaven", "Led Zeppelin"),
    new Movie("Inception", "Christopher Nolan")
];

// We can loop through this array of different objects
// and call the SAME method on each one.
library.forEach(item => {
    item.display(); // TypeScript knows to call the correct version of display() for each object
});

/*
Expected Output:
[BOOK] Title: Dune, Author: Frank Herbert
♫ Now Playing: Stairway to Heaven by Led Zeppelin
🎬 Movie: Inception, Directed by: Christopher Nolan
*/