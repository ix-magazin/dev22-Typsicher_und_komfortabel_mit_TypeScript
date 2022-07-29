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
