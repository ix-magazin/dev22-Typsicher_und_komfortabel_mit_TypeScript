///////////////////////////////////////////////
// Listing 1: Dynamische Typen in JavaScript //
///////////////////////////////////////////////

let person = "Susi";      
console.log(typeof person); // Ausgabe: "string"
console.log(person.toUpperCase()); // Ausgabe: SUSI

person = 32;              
console.log(typeof person); // Ausgabe: "number"
console.log(person + 1); // Ausgabe: 33

person = function() { return "Kate" } 
console.log(typeof person); // Ausgabe: "function"
console.log(person()); // Ausgabe: Kate

person = undefined;
console.log(typeof person); // Ausgabe: "undefined"


////////////////////////////////////////
// Listing 2: Typfehler in JavaScript //
////////////////////////////////////////

function sayHello(person) {
  return "Hello, " + person.toUpperCase(); 
} 

sayHello("Klaus"); // OK
sayHello(7); // Fehler in sayHello: 
             // TypeError: person.toUpperCase 
             // is not a function

