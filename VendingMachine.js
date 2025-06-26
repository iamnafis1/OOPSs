//! Design a Vending Machine
/**
 ** Clarify Requirements (The Scoping Phase)
*?Products: The machine will sell different types of products, like drinks and snacks. These might have unique properties (e.g., a drink's volume, a snack's weight).

*?Inventory: The machine needs to track the quantity of each product and know when something is out of stock.

*?Payments: It should accept at least two forms of payment, say, cash and credit card, to demonstrate flexibility.

*?User Interaction: The user will select an item, pay for it, and then the machine will dispense it. We need to handle success and failure cases, like insufficient funds or an item being out of stock.
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
//======================================================
// Step 1: Define the Producr Hierarchy using Inheritance
//=======================================================
/**
 * The base class for all products.
 * Demonstrates the base of our inheritance model.
 */
var Product = /** @class */ (function () {
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    Product.prototype.getDetails = function () {
        return "".concat(this.name, " - $").concat(this.price.toFixed(2));
    };
    return Product;
}());
/**
 * A specific type of Product.
 * Demonstrates Inheritance.
 */
var Drink = /** @class */ (function (_super) {
    __extends(Drink, _super);
    function Drink(name, price, volume /* in ml */) {
        var _this = _super.call(this, name, price) || this;
        _this.volume = volume;
        return _this;
    }
    /**
     * Overriding the parent's method to add specific details.
     * Demonstrates Polymorphism.
     */
    Drink.prototype.getDetails = function () {
        return "".concat(_super.prototype.getDetails.call(this), ", ").concat(this.volume, "ml");
    };
    return Drink;
}(Product));
/**
 * Another specific type of Product.
 */
var Snack = /** @class */ (function (_super) {
    __extends(Snack, _super);
    function Snack(name, price, weight /* in grams */) {
        var _this = _super.call(this, name, price) || this;
        _this.weight = weight;
        return _this;
    }
    Snack.prototype.getDetails = function () {
        return "".concat(_super.prototype.getDetails.call(this), ", ").concat(this.weight, "g");
    };
    return Snack;
}(Product));
/**
 * A concrete implementation of the payment strategy.
 */
var CreditCardPayment = /** @class */ (function () {
    function CreditCardPayment(cardNumber) {
        this.cardNumber = cardNumber;
    }
    CreditCardPayment.prototype.executePayment = function (amount) {
        console.log("Contacting payment provider for card ".concat(this.cardNumber, "..."));
        console.log("Charged $".concat(amount.toFixed(2), " to credit card."));
        // In a real app, this would involve async API calls.
        return true;
    };
    return CreditCardPayment;
}());
/**
 * Another concrete implementation of the payment strategy.
 */
var CashPayment = /** @class */ (function () {
    function CashPayment() {
    }
    CashPayment.prototype.executePayment = function (amount) {
        console.log("Please insert $".concat(amount.toFixed(2), " in cash."));
        // In a real app, this would involve hardware interaction.
        console.log("Cash payment received.");
        return true;
    };
    return CashPayment;
}());
// ===================================================================
// Step 3: Define the Slot using Composition and Encapsulation
// ===================================================================
/**
 * Represents a physical slot holding a product.
 * Demonstrates Composition (it "has-a" Product) and Encapsulation.
 */
var Slot = /** @class */ (function () {
    function Slot(product, initialQuantity) {
        this.product = product;
        this.quantity = Math.max(0, initialQuantity); // Ensure quantity is not  negative
    }
    Slot.prototype.getQuantity = function () {
        return this.quantity;
    };
    /**
    * Safely dispenses one item, reducing the quantity.
    * This is the only way to modify the private quantity.
    */
    Slot.prototype.dispense = function () {
        if (this.quantity > 0) {
            this.quantity--;
            return true;
        }
        return false;
    };
    return Slot;
}());
// ===================================================================
// Step 4: The Main VendingMachine Class (Orchestrator)
// ===================================================================
var VendingMachine = /** @class */ (function () {
    function VendingMachine(slots) {
        this.slots = slots;
    }
    VendingMachine.prototype.displayInventory = function () {
        console.log("====================================");
        console.log("      WELCOME - AVAILABLE ITEMS     ");
        console.log("====================================");
        this.slots.forEach(function (slot, index) {
            var stock = slot.getQuantity() > 0
                ? "(".concat(slot.getQuantity(), " left)")
                : "(OUT OF STOCK)";
            // Polymorphism in action! getDetails() calls the correct version.
            console.log("[".concat(index, "] ").concat(slot.product.getDetails(), " ").concat(stock));
        });
        console.log("====================================");
    };
    /**
      * The main purchase method.
      * It relies on the IPaymentMethod abstraction, not a concrete class.
      */
    VendingMachine.prototype.purchase = function (slotIndex, paymentMethod) {
        console.log("\nAttempting to purchase item in slot ".concat(slotIndex, "..."));
        if (slotIndex < 0 || slotIndex >= this.slots.length) {
            console.error("Error: Invalid selection. Please try again.");
            return;
        }
        var selectedSlot = this.slots[slotIndex];
        if (selectedSlot.getQuantity() === 0) {
            console.error("Error: Sorry, ".concat(selectedSlot.product.name, " is out of stock."));
            return;
        }
        var price = selectedSlot.product.price;
        var paymentSuccessful = paymentMethod.executePayment(price);
        if (paymentSuccessful) {
            if (selectedSlot.dispense()) {
                console.log("Success! Dispensing your ".concat(selectedSlot.product.name, ". Enjoy!"));
            }
            else {
                // This case should theoretically not be hit if we check quantity first, but it's good practice.
                console.error("Error: Dispensing failed unexpectedly.");
            }
        }
        else {
            console.error("Error: Payment failed. Please try another method.");
        }
    };
    return VendingMachine;
}());
// ===================================================================
// Step 5: The Driver Code (Simulation)
// ===================================================================
// 1. Create product instances
var cola = new Drink("Cola", 1.50, 500);
var chips = new Snack("Chips", 2.00, 150);
var water = new Drink("Water", 1.00, 750);
// 2. Create and stock slots
var machineSlots = [
    new Slot(cola, 10),
    new Slot(chips, 5),
    new Slot(water, 0) // This one is out of stock
];
// 3. Create the Vending Machine
var myVendingMachine = new VendingMachine(machineSlots);
// 4. Run the simulation
myVendingMachine.displayInventory();
// Customer 1 buys chips with a credit card
var myCard = new CreditCardPayment("1234-5678-9876-5432");
myVendingMachine.purchase(1, myCard);
// Customer 2 tries to buy the out-of-stock water
var cash = new CashPayment();
myVendingMachine.purchase(2, cash);
// Check the final inventory
myVendingMachine.displayInventory();
