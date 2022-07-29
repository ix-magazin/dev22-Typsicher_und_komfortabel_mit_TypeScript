function greet(person: string) {
  return "Hello, " + person.toUpperCase()
}

greet("Susi"); // OK
greet(null); // Fehler: Argument of type 'null' is not assignable to parameter of type 'string'
