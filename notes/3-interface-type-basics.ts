import { HasPhoneNumber, HasEmail } from "./1-basics";

//== TYPE ALIAS ==//
/**
 * (1) Type aliases allow us to give a type a name
 */
type StringOrNumber = string | number;

let strnumb: StringOrNumber;
strnumb= 1;
strnumb= 'Hey';
strnumb= true;
strnumb= {};
strnumb= [];

// this is the ONLY time you'll see a type on the RHS of assignment
type HasName = { name: string };

let hasName: HasName = {
    name: 'Mike!',
    otherValue: 'NONONO'
}

// NEW in TS 3.7: Self-referencing types!
type NumVal = 1 | 2 | 3 | NumArr[];
type NumArr = NumVal[]

let numberArr: NumVal;
numberArr = 1;
numberArr = 2;
numberArr = 3;
numberArr = [[1, 2, 3,]];
numberArr = 4;
numberArr = [[1, 2, 3, 4]];
numberArr = [1];


// ***********************************
    // Type Alias is more flexible than an interface
    // You can use type to allow different types in a value
    // I.E: type StringOrNumber = string | number;
    // Can be either a string or a number, has more flexibility

    // Interfaces are used more as an structure of how a variable has to be (needs a name, phone, etc)
    // interface HasPhoneNumber {
    //   name: string;
    //   phone: number;
    // }
    // This one needs to have a name and a phone in order to compile.
    // Yes the name can be any string, but you still need to have a value "name" in your object
// ***********************************

// == INTERFACE == //
/**
 * (2) Interfaces can extend from other interfaces
 */

 export interface HasInternationalPhoneNumber extends HasPhoneNumber {
    countryCode: string;
  }

// ***********************************
    // extends is used for "alike" things
    // Interface extends from Interfaces
    // Class extends from Class
    // Interface extends from class???  That's a big NONO
// ***********************************


// ***********************************
  // Interfaces can describe objects, arrays, functions...
  // Or anything that extends from the JS Object Type (This that have prototypes?)
  // This is why interfaces cannot handle primitive types (string | number)
// ***********************************

/**
 * (3) they can also be used to describe call signatures
 */

interface ContactMessenger1 {
  (contact: HasEmail | HasPhoneNumber, message: string): void;
}

type ContactMessenger2 = (
  contact: HasEmail | HasPhoneNumber,
  message: string
) => void;

// type ContactMessenger3 = () {
    // Tried to create a type with a normal function sintaxis but seems that's not possible
    // Funcitons can only be created on types as arrow functions ??
// }

// // NOTE: we don't need type annotations for contact or message
const emailer: ContactMessenger1 = (_contact, _message) => {
  /** ... */
};

/**
 * (4) construct signatures can be described as well
 */

interface ContactConstructor {
  new (...args: any[]): HasEmail | HasPhoneNumber;
}

/**
 * (5) index signatures describe how a type will respond to property access
 */

/**
 * @example
 * {
 *    iPhone: { areaCode: 123, num: 4567890 },
 *    home:   { areaCode: 123, num: 8904567 },
 * }
 */

interface PhoneNumberDict {
  // arr[0],  foo['myProp']
  [numberName: string]: undefined | {
        areaCode: number;
        num: number;
      };
}

const d: PhoneNumberDict = {};
d.abc
if (d.abc) {
    d.abc // object above
}
if (typeof d.abc === 'object') {
    d.abc // object above
}
if (typeof d.abc === 'string') {
    d.abc // never??
}

const phoneDict: PhoneNumberDict = {
  office: { areaCode: 321, num: 5551212 },
  home: { areaCode: 321, num: 5550010 }, // try editing me
//   iphone: { areaCode: 321, num: 5550010 }
};

// at most, a type may have one string and one number index signature

/**
 * (6) they may be used in combination with other types
 */

// // augment the existing PhoneNumberDict
// // i.e., imported it from a library, adding stuff to it
interface PhoneNumberDict {
  home: {
    /**
     * (7) interfaces are "open", meaning any declarations of the
     * -   same name are merged
     */
    areaCode: number;
    num: number;
  };
  office: {
    areaCode: number;
    num: number;
  };
}

phoneDict.home;   // definitely present
phoneDict.office; // definitely present
phoneDict.mobile; // MAYBE present

// == TYPE ALIASES vs INTERFACES == //

/**
 * (7) Type aliases are initialized synchronously, but
 * -   can reference themselves
 */

// type NumberVal = 1 | 2 | 3 | NumberVal[];

/**
 * (8) Interfaces are initialized lazily, so combining it
 * -   w/ a type alias allows for recursive types!
 */

// type StringVal = "a" | "b" | "c" | StringArr;

// // type StringArr = StringVal[];
// interface StringArr {
//   // arr[0]
//   [k: number]: "a" | "b" | "c" | StringVal[];
// }

// const x: StringVal = Math.random() > 0.5 ? "b" : ["a"]; // ✅ ok!

export default {};
