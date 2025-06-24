//! Inheritance (passing Down Traits)
/**
 * ANALOGY: Think of a family . A parent passess down certain traits (like eye color or last name) to their children.The Children inherit these traits bit can also have their own unique characteristics.
 *
 * * Inheritance allows a new class (the "child" or "subclass") to inherit properties and methods from an existing class (the "parent" or "superclass"). This promotes code reuse in a powerful way.
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
//* The parent Class(superclass)
var DigitalItem = /** @class */ (function () {
    function DigitalItem(title, filesSize) {
        this.title = title;
        this.fileSize = filesSize;
    }
    DigitalItem.prototype.share = function (email) {
        console.log("Sharing '".concat(this.title, "' with ").concat(email));
    };
    return DigitalItem;
}());
//* The Child class (subclass) - It extends DigitalItem
var EBook = /** @class */ (function (_super) {
    __extends(EBook, _super);
    function EBook(title, fileSize, pageCount) {
        // 'super()' calls the constructor of the parent class (DigitalItem)
        var _this = _super.call(this, title, fileSize) || this;
        _this.pageCount = pageCount;
        return _this;
    }
    //This method is unique to EBook
    EBook.prototype.read = function () {
        console.log("Opening '".concat(this.title, "' to read"));
    };
    return EBook;
}(DigitalItem));
//* Another child class 
var MusicTrack = /** @class */ (function (_super) {
    __extends(MusicTrack, _super);
    function MusicTrack(title, fileSize, artist, duration) {
        var _this = _super.call(this, title, fileSize) || this;
        _this.artist = artist;
        _this.duration = duration;
        return _this;
    }
    MusicTrack.prototype.play = function () {
        console.log("Playing '".concat(this.title, "' by ").concat(this.artist, "."));
    };
    return MusicTrack;
}(DigitalItem));
var myBook = new EBook('The Hobbit', 5, 310);
var mySong = new MusicTrack("Bohemian Rhapsody", 15, "Queen", 355);
// Both objects can use the 'share' method inherited from DigitalItem
myBook.share("friend@example.com"); // Output: Sharing 'The Hobbit' with friend@example.com.
mySong.share("dj@example.com"); // Output: Sharing 'Bohemian Rhapsody' with dj@example.com.
// They can also use their own specific methods
myBook.read(); // Output: Opening 'The Hobbit' to read.
mySong.play(); // Output: Playing 'Bohemian Rhapsody' by Queen.
