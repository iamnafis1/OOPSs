//! Abstraction (Hiding the complexity)
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
/**
 * ?This is a bonus pillar, often seen as a result of the others, but crucial for designing large systems.
 *
 * * ANALOGY: When you drive a car , you use a simple interface: a steering wheel , pedals,and a gear stick. you don't need to know the combustion engine, the transmission system, or the electronics. All that complexity is abstracted away. You just need to know the drive() interface.
 *
 * ! Abstraction means hiding the complex implementation details and only showing the essential features of the object. We can achieve this in typescript using anstract classes and interfaces.
 *
 **An abstract class is a special type of class that cannot be instantiated on its own. It serves as a blueprint for other classes. It can define methods that its children must implement.
 */
/**
 * TODO:Let's design a payment processing system:
 */
// The Abstract Class: A contract that other classes must follow.
var PaymentGateway = /** @class */ (function () {
    function PaymentGateway() {
    }
    //A normal method that children will inherit
    PaymentGateway.prototype.connect = function () {
        console.log("Connecting to the payment network...");
    };
    return PaymentGateway;
}());
var PayPalGateway = /** @class */ (function (_super) {
    __extends(PayPalGateway, _super);
    function PayPalGateway() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PayPalGateway.prototype.processPayment = function (amount) {
        this.connect();
        console.log("Processing payment of $".concat(amount, " through PayPal."));
        // ... complex PayPal-specific API calls would go here
        return true; //Assume it was successful
    };
    return PayPalGateway;
}(PaymentGateway));
var StripeGateway = /** @class */ (function (_super) {
    __extends(StripeGateway, _super);
    function StripeGateway() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StripeGateway.prototype.processPayment = function (amount) {
        this.connect();
        console.log("Processing payment of $".concat(amount, " through Stripe."));
        //... complex Stripe-Specific API Calls would go here
        return true; //Assume it was successful
    };
    return StripeGateway;
}(PaymentGateway));
/**
 * We can't do this! It will cause an error.
 * * const gateway = new PaymentGateway(); // Error : cannot create an instance of an abstract class.
 *
 * But we can use the  concrete classes that follows the contract... code below
 */
var payPal = new PayPalGateway();
payPal.processPayment(150);
// Output:
// Connecting to the payment network...
// Processing payment of $150 through PayPal.
var stripe = new StripeGateway();
stripe.processPayment(75);
// Output:
// Connecting to the payment network...
// Processing payment of $75 through Stripe.
/**
 *! With abstract class PaymentGateway, we have successfully defined a standard for what it means to be a payment gateway in our system, without worrying about the specific details of PayPal or Stripe. This allows us to easily swap payment providers or add new ones in the future without changing the code that uses them
 */
