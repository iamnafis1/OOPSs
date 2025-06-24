//CLASSES are like blue print, for eg House
//It defines properties like, no of bedrooms,has a pool 
//and capabilities and methods like - openFrontDoor(), turnOnLights()
//-----------------------------------------------------------------

// OBJECT is the actual house built from the blueprint


/** The Blueprint : A Class */
class House{
  //properties: characteristic of the house 
  numberofBedrooms!:number;
  hasGarage!:boolean;
 //A special method called Constructor
 //It runs when we create a new house (OBJECT) from this class

 constructor(bedrooms:number,garage:boolean){
  console.log("Constructing a new House");

  this.numberofBedrooms=bedrooms;
  this.hasGarage=garage;
 }

 //Method : Actions the house can perform

 openFrontDoor(){
  console.log('The front door is now open');
 }

 getDetails():string{
  return  `This is a House with ${this.numberofBedrooms} bedrooms and ${this.hasGarage? 'a garage':'no garage'}.`;
 }

}

//Now lets build some actual House
let myHouse = new House(3,true);
let friendHouse = new House(2,false);

console.log(myHouse.getDetails());
myHouse.openFrontDoor();
console.log(friendHouse.getDetails())