//CLASSES are like blue print, for eg House
//It defines properties like, no of bedrooms,has a pool 
//and capabilities and methods like - openFrontDoor(), turnOnLights()
//-----------------------------------------------------------------
// OBJECT is the actual house built from the blueprint
/** The Blueprint : A Class */
var House = /** @class */ (function () {
    //A special method called Constructor
    //It runs when we create a new house (OBJECT) from this class
    function House(bedrooms, garage) {
        console.log("Constructing a new House");
        this.numberofBedrooms = bedrooms;
        this.hasGarage = garage;
    }
    //Method : Actions the house can perform
    House.prototype.openFrontDoor = function () {
        console.log('The front door is now open');
    };
    House.prototype.getDetails = function () {
        return "This is a House with ".concat(this.numberofBedrooms, " bedrooms and ").concat(this.hasGarage ? 'a garage' : 'no garage', ".");
    };
    return House;
}());
//Now lets build some actual House
var myHouse = new House(3, true);
var friendHouse = new House(2, false);
console.log(myHouse.getDetails());
myHouse.openFrontDoor();
console.log(friendHouse.getDetails());
