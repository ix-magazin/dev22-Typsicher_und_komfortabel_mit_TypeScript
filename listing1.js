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
