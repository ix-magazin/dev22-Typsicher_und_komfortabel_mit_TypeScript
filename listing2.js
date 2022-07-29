function sayHello(person) {
  return "Hello, " + person.toUpperCase(); 
} 

sayHello("Klaus"); // OK
sayHello(7); // Fehler in sayHello: 
             // TypeError: person.toUpperCase 
             // is not a function
