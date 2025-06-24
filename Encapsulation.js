//! Encapsulation means bundling the data (properties) and the methods that operates on that data within a single unit (class) and controlling the access to it.
var BankAccount = /** @class */ (function () {
    function BankAccount(accNumber, holder, initialBalance) {
        this.accountNumber = accNumber;
        this.accountHolder = holder;
        this.balance = initialBalance;
    }
    // A public method to deposit money . This is a safe way to modify the balance
    BankAccount.prototype.deposit = function (amount) {
        if (amount <= 0) {
            console.error("Deposit amount must be positive");
            return;
        }
        this.balance += amount;
        console.log("Deposited ".concat(amount, " .New balance is $").concat(this.balance, "."));
    };
    //A Public method to Withdraw money
    BankAccount.prototype.withdraw = function (amount) {
        if (amount <= 0) {
            console.error("Withdrawal amount must be positive");
            return;
        }
        if (amount > this.balance) {
            console.log("Insufficient funds.");
        }
        this.balance -= amount;
        console.log("Withdraw $".concat(amount, ".New Balance is $").concat(this.balance, ". "));
    };
    //A Public method to check the balance
    BankAccount.prototype.getBalance = function () {
        // Here we can add security checks, logging, etc. before returning the value.
        return this.balance;
    };
    return BankAccount;
}());
var myAccount = new BankAccount('649845286', 'Nafish', 500);
// Here we can add security checks, logging, etc. before returning the value.
// Good Practice: Interacting through public methods
myAccount.deposit(100); // Output: Deposited $100. New balance is $600.
myAccount.withdraw(200); // Output: Withdrew $200. New balance is $400.
console.log("Current Balance: $".concat(myAccount.getBalance())); // Output: Current Balance: $400
// Bad Practice: Direct access is prevented by TypeScript
// myAccount.balance = 1000000; // This will cause a compile error: Property 'balance' is private and only accessible within class 'BankAccount'.
