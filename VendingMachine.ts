//! Design a Vending Machine
/**
 ** Clarify Requirements (The Scoping Phase)
*?Products: The machine will sell different types of products, like drinks and snacks. These might have unique properties (e.g., a drink's volume, a snack's weight). 

*?Inventory: The machine needs to track the quantity of each product and know when something is out of stock.

*?Payments: It should accept at least two forms of payment, say, cash and credit card, to demonstrate flexibility.

*?User Interaction: The user will select an item, pay for it, and then the machine will dispense it. We need to handle success and failure cases, like insufficient funds or an item being out of stock.
 */

//======================================================
// Step 1: Define the Producr Hierarchy using Inheritance
//=======================================================
/**
 * The base class for all products.
 * Demonstrates the base of our inheritance model.
 */

class Product {
  constructor(public name: string, public price: number) {}
  getDetails(): string {
    return `${this.name} - $${this.price.toFixed(2)}`;
  }
}
/**
 * A specific type of Product.
 * Demonstrates Inheritance.
 */

class Drink extends Product {
  constructor(name: string, price: number, public volume: number /* in ml */) {
    super(name, price);
  }
  /**
   * Overriding the parent's method to add specific details.
   * Demonstrates Polymorphism.
   */

  override getDetails(): string {
    return `${super.getDetails()}, ${this.volume}ml`;
  }
}
/**
 * Another specific type of Product.
 */
class Snack extends Product {
  constructor(
    name: string,
    price: number,
    public weight: number /* in grams */
  ) {
    super(name, price);
  }
  override getDetails(): string {
    return `${super.getDetails()}, ${this.weight}g`;
  }
}

// ===================================================================
// Step 2: Define the Payment Strategy using an Interface
// ===================================================================

/**
 * An interface for all payment methods.
 * This is our Abstraction. It defines a contract for any payment strategy.
 */
interface IPaymentMethod {
  executePayment(amount: number): boolean;
}
/**
 * A concrete implementation of the payment strategy.
 */

class CreditCardPayment implements IPaymentMethod {
  constructor(private cardNumber: string) {}
  executePayment(amount: number): boolean {
    console.log(`Contacting payment provider for card ${this.cardNumber}...`);
    console.log(`Charged $${amount.toFixed(2)} to credit card.`);
    // In a real app, this would involve async API calls.
    return true;
  }
}
/**
 * Another concrete implementation of the payment strategy.
 */
class CashPayment implements IPaymentMethod {
  executePayment(amount: number): boolean {
    console.log(`Please insert $${amount.toFixed(2)} in cash.`);
    // In a real app, this would involve hardware interaction.
    console.log(`Cash payment received.`);
    return true;
  }
}

// ===================================================================
// Step 3: Define the Slot using Composition and Encapsulation
// ===================================================================

/**
 * Represents a physical slot holding a product.
 * Demonstrates Composition (it "has-a" Product) and Encapsulation.
 */

class Slot {
  private quantity: number;
  constructor(public readonly product: Product, initialQuantity: number) {
    this.quantity = Math.max(0, initialQuantity); // Ensure quantity is not  negative
  }
  getQuantity(): number {
    return this.quantity;
  }
  /**
   * Safely dispenses one item, reducing the quantity.
   * This is the only way to modify the private quantity.
   */
  dispense(): boolean {
    if (this.quantity > 0) {
      this.quantity--;
      return true;
    }
    return false;
  }
}

// ===================================================================
// Step 4: The Main VendingMachine Class (Orchestrator)
// ===================================================================

class VendingMachine {
  private slots: Slot[];

  constructor(slots: Slot[]) {
    this.slots = slots;
  }

  displayInventory(): void {
    console.log("====================================");
    console.log("      WELCOME - AVAILABLE ITEMS     ");
    console.log("====================================");
    this.slots.forEach((slot, index) => {
      const stock =
        slot.getQuantity() > 0
          ? `(${slot.getQuantity()} left)`
          : "(OUT OF STOCK)";
      // Polymorphism in action! getDetails() calls the correct version.
      console.log(`[${index}] ${slot.product.getDetails()} ${stock}`);
    });
    console.log("====================================");
  }

  /**
   * The main purchase method.
   * It relies on the IPaymentMethod abstraction, not a concrete class.
   */
  purchase(slotIndex: number, paymentMethod: IPaymentMethod): void {
    console.log(`\nAttempting to purchase item in slot ${slotIndex}...`);

    if (slotIndex < 0 || slotIndex >= this.slots.length) {
      console.error("Error: Invalid selection. Please try again.");
      return;
    }

    const selectedSlot = this.slots[slotIndex];

    if (selectedSlot.getQuantity() === 0) {
      console.error(
        `Error: Sorry, ${selectedSlot.product.name} is out of stock.`
      );
      return;
    }

    const price = selectedSlot.product.price;
    const paymentSuccessful = paymentMethod.executePayment(price);

    if (paymentSuccessful) {
      if (selectedSlot.dispense()) {
        console.log(
          `Success! Dispensing your ${selectedSlot.product.name}. Enjoy!`
        );
      } else {
        // This case should theoretically not be hit if we check quantity first, but it's good practice.
        console.error("Error: Dispensing failed unexpectedly.");
      }
    } else {
      console.error("Error: Payment failed. Please try another method.");
    }
  }
}

// ===================================================================
// Step 5: The Driver Code (Simulation)
// ===================================================================

// 1. Create product instances
const cola = new Drink("Cola", 1.5, 500);
const chips = new Snack("Chips", 2.0, 150);
const water = new Drink("Water", 1.0, 750);

// 2. Create and stock slots
const machineSlots = [
  new Slot(cola, 10),
  new Slot(chips, 5),
  new Slot(water, 0), // This one is out of stock
];

// 3. Create the Vending Machine
const myVendingMachine = new VendingMachine(machineSlots);

// 4. Run the simulation
myVendingMachine.displayInventory();

// Customer 1 buys chips with a credit card
const myCard = new CreditCardPayment("1234-5678-9876-5432");
myVendingMachine.purchase(1, myCard);

// Customer 2 tries to buy the out-of-stock water
const cash = new CashPayment();
myVendingMachine.purchase(2, cash);

// Check the final inventory
myVendingMachine.displayInventory();

//EXPECTED OUTPUT
// ====================================
//       WELCOME - AVAILABLE ITEMS     
// ====================================
// [0] Cola - $1.50, 500ml (10 left)
// [1] Chips - $2.00, 150g (5 left)
// [2] Water - $1.00, 750ml (OUT OF STOCK)
// ====================================

// Attempting to purchase item in slot 1...
// Contacting payment provider for card 1234-5678-9876-5432...
// Charged $2.00 to credit card.
// Success! Dispensing your Chips. Enjoy!

// Attempting to purchase item in slot 2...
// Error: Sorry, Water is out of stock.
// ====================================
//       WELCOME - AVAILABLE ITEMS
// ====================================
// [0] Cola - $1.50, 500ml (10 left)
// [1] Chips - $2.00, 150g (4 left)
// [2] Water - $1.00, 750ml (OUT OF STOCK)
 