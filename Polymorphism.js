//! Ploymorphism (One Interface ,Many Forms)
/**
 * ? Analogy: Think of a USB port.You can plug in a mouse, a keyboard,a flash drive or a phone.They all are different devices, but they all connect through the same standard interface(the usb port).The port doesn't care what the specific device is; it just knows how to interact with it.
 *
 * *Polymorphism means 'many forms.' In OOP, it's the ability for different objects to respond to the same method call in their own unique way. It often goes hand-in-hand with inheritance.
 *
 * @param DigitalItems :array[]
 * we want to render DigitalItems on a webpage
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Parent Class with a method that will be overridden
var DigitalItem = /** @class */ (function () {
    function DigitalItem(title) {
        this.title = title;
    }
    //* A generic display method
    DigitalItem.prototype.display = function () {
        console.log("Display generic item :".concat(this.title));
    };
    return DigitalItem;
}());
var EBook = /** @class */ (function (_super) {
    __extends(EBook, _super);
    function EBook(title, author) {
        var _this = _super.call(this, title) || this;
        _this.author = author;
        return _this;
    }
    //* Override the display method for EBooks
    EBook.prototype.display = function () {
        console.log("[BOOK] Title: ".concat(this.title, ", Author: ").concat(this.author));
    };
    return EBook;
}(DigitalItem));
var MusicTrack = /** @class */ (function (_super) {
    __extends(MusicTrack, _super);
    function MusicTrack(title, artist) {
        var _this = _super.call(this, title) || this;
        _this.artist = artist;
        return _this;
    }
    //*Override the display method for MusicTracks
    MusicTrack.prototype.display = function () {
        console.log("\u266B Now Playing: ".concat(this.title, " by ").concat(this.artist));
    };
    return MusicTrack;
}(DigitalItem));
var Movie = /** @class */ (function (_super) {
    __extends(Movie, _super);
    function Movie(title, director) {
        var _this = _super.call(this, title) || this;
        _this.director = director;
        return _this;
    }
    //* Override the display method for Movies
    Movie.prototype.display = function () {
        console.log("\uD83C\uDFAC Movie: ".concat(this.title, ", Directed by: ").concat(this.director));
    };
    return Movie;
}(DigitalItem));
//! Here's the magic of Polymorphism!
var library = [
    new EBook("Dune", "Frank Herbert"),
    new MusicTrack("Stairway to Heaven", "Led Zeppelin"),
    new Movie("Inception", "Christopher Nolan")
];
// We can loop through this array of different objects
// and call the SAME method on each one.
library.forEach(function (item) {
    item.display(); // TypeScript knows to call the correct version of display() for each object
});
/*
Expected Output:
[BOOK] Title: Dune, Author: Frank Herbert
♫ Now Playing: Stairway to Heaven by Led Zeppelin
🎬 Movie: Inception, Directed by: Christopher Nolan
*/ 
