//////////////////////////////////////////////////
// Listing 3: Explizite Typangabe in TypeScript //
//////////////////////////////////////////////////

let person: string = "Susi";
console.log(person.toUpperCase()); // Ausgabe: SUSI
person = undefined; // Fehler: Type 'undefined' is not assignable to type 'string'


/////////////////////////////////////////
// Listing 4: Union Type in TypeScript //
/////////////////////////////////////////

let person: string | null | undefined = "Susi";

console.log(person.toUpperCase()); // Ausgabe: SUSI
person = undefined; // OK
person = null; OK
person = "Klaus"; // OK


///////////////////////////////////////////
// Listing 5: Typinferenz für Funktionen //
///////////////////////////////////////////

function greet() {
  return "Hello" 
}  

let g = greet(); 
g.toUpperCase(); // OK g ist ein String


///////////////////////////////////////////
// Listing 6: Typinferenz für Funktionen //
///////////////////////////////////////////

function greet(person: string) {
  return "Hello, " + person.toUpperCase()
}

greet("Susi"); // OK
greet(null); // Fehler: Argument of type 'null' is not assignable to parameter of type 'string'


////////////////////////////////////////////////
// Listing 7: Individuelle Objektdefinitionen //
////////////////////////////////////////////////

type Person = {
  firstname: string;
  lastname: string;
  age?: number;
} 

let klaus: Person = {
  firstname: "Klaus",
  lastname: "Müller",
  age: 32
} // OK

let susi = {
  firstname: "Susi",
  lastname: "Meier"
};

let p: Person = susi; // OK


///////////////////////////////////////////////////
// Listing 8: Union Types als Funktionsparameter //
///////////////////////////////////////////////////

function greet(person: string | Person) {
  // person ist hier string | Person

  console.log(person.toUpperCase()); 
  // Fehler: Property 'toUpperCase' does not exist
  // on type 'string | Person'.

  if (typeof person === "string") {
    // person ist hier string
    return "Hello, " + person.toUpperCase();
  }

  // Person ist hier Person
  return "Hello, " + person.lastname.toUpperCase()
}


//////////////////////////////////////////
// Listing 9: Erweiterte Parametertypen //
//////////////////////////////////////////

function greet(person: string | Person | null) {

  // person ist hier string | Person | null

  if (person === null) {
    // person ist hier null
    return "";
  }

  if (typeof person === "string") {
    // person ist hier string
    return "Hello, " + person.toUpperCase();
  }

  // person ist hier Person
  return "Hello, " + person.lastname.toUpperCase()
}


////////////////////////////////////
// Listing 10: Tagged Union Types //
////////////////////////////////////

type VerifyIbanAction = {
  name: "VerifyIban";
  iban: string;
}

type VerifyAgeAction = {
  name: "VerifyAge";
  age: number;
}

function handleAction(action: VerifyIbanAction 
                            | VerifyAgeAction) {
  switch (action.name) {
    case "VerifyIban":
      // action ist hier VerifyIbanAction
      return verifyIban(action.iban);
    case "VerifyAge":
      // action ist hier VerifyAgeAction
      return verifyAge(action.age);
  }
}

function verifyIban(iban: string) { /* ... */ }
  
function verifyAge(age: number) { /* ... */ }


//////////////////////////////////
// Listing 11: Fehlerbehandlung //
//////////////////////////////////

function handleAction(action: VerifyIbanAction 
                            | VerifyAgeAction) {
  switch (action.name) {
    // ... wie gesehen ...
  }

  // action ist hier never
  handleInvalidAction(action);
}

function handleInvalidAction(action: never) {
  // Implementierung ausgelassen
}


//////////////////////////////
// Listing 12 Utility-Typen //
//////////////////////////////

// wie oben gesehen
type Person = {
  firstname: string;
  lastname: string;
  age?: number;
}; 

function patch(person: Readonly<Partial<Person>>) {
  person.firstname = "Klaus"; 
  // Fehler: Cannot assign to 'firstname' 
  // because it is a read-only property.

  // Alle Eigenschaften aus Person sind hier optional,
  // deswegen führt folgener Aufruf zu einem Fehler,
  // obwohl lastname im Person-Type nicht als optional
  // gekennzeichnet ist
  person.lastname.toUpperCase(); 
  // Fehler: Object is possibly 'undefined'

  // weitere Implementierung ausgelassen
}

patch({
  firstname: "Klaus", // OK
  age: 32 // OK
}) // OK, auch ohne lastname, weil alle 
   // Eigenschaften optional gemacht wurden

patch({
  // Alle Eigenschaften im Objekt sind optional,
  // aber ihre ursprünglichen Typen bleiben
  // ansonsten erhalten
  lastname: null 
  // Fehler: Type 'null' is not assignable 
  // to type 'string | undefined'
})


//////////////////////////////////////////////////////
// Listing 13 Umsetzung eines Listener mit Generics //
//////////////////////////////////////////////////////

// Beispiel 1: keyof Operator
//   PersonKeys kann nur ein Key-Name aus dem Person-Objekt sein
type PersonKeys = keyof Person;
let lastname: PersonKeys = "lastname"; // OK
let city: PersonKeys = "city"; // Fehler: Type '"city"' is not assignable to type 'keyof Person'

// Beispiel 2: generische Funktion mit keyof-Operator
function addListener<O extends object>(o: O, propertyName: keyof O) {
  // Implementierung ausgelassen
}

const susi2 = {
  firstname: "Susi",
  lastname: "Meier",
};

addListener(susi2, "firstname"); // OK

addListener(susi2, "age"); 
// Fehler: Argument of type '"age"' is not assignable
// to parameter of type '"firstname" | "lastname"'


//////////////////////////////
// Listing 14: Mapped Types //
//////////////////////////////

type ValidatedObject<O> = {
  [Key in keyof O]: boolean
}

function validate<O extends object>(object: O): ValidatedObject<O> {
  // Implementierung ausgelassen
}


let validatedObject = validate({
  firstname: "Susi",
  lastname: "Meier",
});

let vF: boolean = validatedObject.firstname; 
// OK: firstname ist jetzt boolean
let vL: string = validatedObject.lastname; 
// Fehler: Type 'boolean' is not assignable to type 'string'
let vC: boolean = validatedObject.city; 