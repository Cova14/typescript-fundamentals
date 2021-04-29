//== BASICS ==//

/**
 * (1) x is a string, b/c we’ve initialized it
 */
let x = "hello world"; 

/**
 * (2) reassignment is fine
 */
x = "hello mars";

/**
 * (3) but if we try to change type
 */
x = 42; // 🚨 ERROR

/**
 * (4) let's look at const. The type is literally 'hello world'
 */
const y = "hello world";

// function foo (arg: "hello mars") {

// }

// foo(y)

const yObj = {
    foo: 'hello'
};

/**
 * This is called a 'string literal type'. y can never be reassigned since it's a const,
 * so we can regard it as only ever holding a value that's literally the string 'hello world'
 * and no other possible value
 */

/**
 * (5) sometimes we need to declare a variable w/o initializing it
 */
let z;
z = 41;
z = "abc"; // (6) oh no! This isn't good

/**
 * If we look at the type of z, it's `any`. This is the most flexible type
 * in TypeScript (think of it like a JavaScript `let`)
 */

/**
 * (7) we could improve this situation by providing a type annotation
 * when we declare our variable
 */
let zz: number;
zz = 41;
zz = "abc"; // 🚨 ERROR Type '"abc"' is not assignable to type 'number'.

//== SIMPLE ARRAYS ==//

/**
 * (8) simple array types can be expressed using []
 */
// let aa = []; // Array of ¨never's¨???
let aa: number[] = [];
aa.push(33);
aa.push("abc"); // 🚨 ERROR: Argument of type '"abc"' is not assignable to parameter of type 'number'.

/**
 * (9) we can even define a tuple, which has a fixed length
 */
let bb: [number, string, string, number] = [
  123,
  "Fake Street",
  "Nowhere, USA",
  10110
];

// let bbb: [number, boolean] = [
//     1, true
// ]

bb = [1, 2, 3]; // 🚨 ERROR: Type 'number' is not assignable to type 'string'.

bb.push(1,1,1,1,1,1)
// bbb.push('a')

/**
 * (10) Tuple values often require type annotations (  : [number, number] )
 */
const xx = [32, 31]; // number[];
const yy: [number, number] = [32, 31];

// let xxxxx: "Mike" = "Mike"

//== OBJECTS ==//

/**
 * (11) object types can be expressed using {} and property names
 */
let cc: { houseNumber: number; streetName: string };
cc = {
  streetName: "Fake Street",
  houseNumber: 123
};

cc = {
  houseNumber: 33
};
/**
 * 🚨 Property 'streetName'
 * 🚨   is missing in type   '{ houseNumber: number; }'
 * 🚨   but required in type '{ houseNumber: number; streetName: string; }'.
 */

/**
 * (12) You can use the optional operator (?) to
 * indicate that something may or may not be there
 */
let dd: { houseNumber: number; streetName?: string };
dd = {
  houseNumber: 33,
  x: 'what is this??'
};

// (13) if we want to re-use this type, we can create an interface
interface Address {
  houseNumber: number;
  streetName?: string;
}
// and refer to it by name
let ee: Address = { houseNumber: 33 };

//== UNION & INTERSECTION ==//

/**
 * (14) Union types
 * Sometimes we have a type that can be one of several things
 */

export interface HasPhoneNumber {
  name: string;
  phone: number;
}

export interface HasEmail {
  name: string;
  email: string;
}

let contactInfo: HasEmail | HasPhoneNumber =
  Math.random() > 0.5
    ? {
        // we can assign it to a HasPhoneNumber
        name: "Mike",
        phone: 3215551212
      }
    : {
        // or a HasEmail
        name: "Mike",
        email: "mike@example.com"
      };

contactInfo.name; // NOTE: we can only access the .name property  (the stuff HasPhoneNumber and HasEmail have in common)

/**
 * (15) Intersection types
 */
let otherContactInfo: HasEmail & HasPhoneNumber = {
  // we _must_ initialize it to a shape that's asssignable to HasEmail _and_ HasPhoneNumber
  name: "Mike",
  email: "mike@example.com",
  phone: 3215551212 // Commenting this generates an error!
};

otherContactInfo.name; // NOTE: we can access anything on _either_ type
otherContactInfo.email;
otherContactInfo.phone;
// const zzz: any = {} as never;


// **************** SELF NOTES ***************

// Wider & Narrower:
// Describes the relavite differences in range of a type's allowed values

// WIDE TO NARROW

let wider: any; //Can be literally anything we want, string, array, obj, number, etc

wider = 1;
wider = '';
wider = {};
wider = [];

let array: any[] // Can only be an array but can have inside any value

array = 1;
array = '';
array = {};
array = [];

let stringArr: string[]; // Can only be an array and have only string values

stringArr = 1;
stringArr = '';
stringArr = {};
stringArr = ['hi!'];
stringArr = [1];

let arrOf3: [string, string, string]; // Can only be an array and have only 3 values which need to be strings

arrOf3 = 1;
arrOf3 = '';
arrOf3 = {};
arrOf3 = [1];
arrOf3 = ['hi!', 'hello!', 'hey!'];
arrOf3 = ['hi!', 'hello!', 'hey!', 'oh no!'];


let definedArrayOf3: ["abc", "def", string] // Can only be an array, needs to have the first to value equal to "abc" and "def", and the last value can only be a string

definedArrayOf3 = 1;
definedArrayOf3 = '';
definedArrayOf3 = {};
definedArrayOf3 = [1];
definedArrayOf3 = ['hi!', 'hello!', 'hey!'];
definedArrayOf3 = ['hi!', 'hello!', 'hey!', 'oh no!'];
definedArrayOf3 = ['abc', 'def', 'any string!'];
definedArrayOf3 = ['abc', 'def', 'any string!', 'NOOOOO'];

let nothing: never; // Can't have any value, it's literally nothing, can't hold a value

nothing = 1;
nothing = '';
nothing = {};
nothing = [];

export default {};
