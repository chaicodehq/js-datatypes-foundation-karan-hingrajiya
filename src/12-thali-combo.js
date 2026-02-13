/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  // Your code here
  if (typeof thali !== "object" || thali === null) {
    return "";
  }

  let checkVal = Object.keys(thali);

  if (
    checkVal[0] != "name" ||
    checkVal[1] != "items" ||
    checkVal[2] != "price" ||
    checkVal[3] != "isVeg"
  ) {
    return "";
  }
  //i implemented all the logic that i have in my mind but first one here is more readable and understandable for me.
  // if(checkVal.length !== 4){
  //   return "";
  // }

  //OR
  // if(Object.hasOwn(thali,'name') == false || Object.hasOwn(thali,'items') == false || Object.hasOwn(thali,'price') == false || Object.hasOwn(thali,'isVeg') == false){
  //   return "";
  // }
  let vegOrNot = "Non-Veg";
  if (thali.isVeg == true) {
    vegOrNot = "Veg";
  }

  let menu = thali.items;
  let thaliPrice = thali.price;

  let res = `${thali.name.toUpperCase()} (${vegOrNot}) - Items: ${menu.join(", ")} - Rs.${thaliPrice.toFixed(2)}`;

  return res;
}

export function getThaliStats(thalis) {
  // Your code here
  if (
    thalis == null ||
    thalis.length === 0 ||
    Array.isArray(thalis) === false
  ) {
    return null;
  }

  let totalThalis = thalis.length;
  let vegCount;
  let nonVegCount = 0;

  vegCount = thalis.filter((elem) => {
    if (elem.isVeg === true) {
      return true;
    }
    return false;
  }).length;

  nonVegCount = totalThalis - vegCount; //remaining thalis will be obviously non-veg

  let totalPrice = thalis.reduce(function (acc, elem) {
    return acc + elem.price;
  }, 0);

  let avgPrice = totalPrice / totalThalis;
  avgPrice = avgPrice.toFixed(2);

  let cheapest = Infinity; // my DSA logic is helping here
  let costliest = -Infinity;

  thalis.forEach((elem) => {
    cheapest = Math.min(cheapest, elem.price);
    costliest = Math.max(costliest, elem.price);
  });

  let names = thalis.map((elem) => {
    return elem.name;
  });

  let resObj = {
    totalThalis,
    vegCount,
    nonVegCount,
    avgPrice,
    cheapest,
    costliest,
    names,
  };

  return resObj;
}

export function searchThaliMenu(thalis, query) {
  // Your code here
  if (Array.isArray(thalis) !== true || typeof query !== "string") {
    return [];
  }

  let res = thalis.filter((elem) => {
    // return elem.includes(query); it will give error we cannot use it on object
    let str = JSON.stringify(elem).toLowerCase();

    if (str.includes(query.toLowerCase())) {
      return true;
    }
    //it converts the obj into json data now we can apply func into string which is json str
    return false;
    //we just need to put the logic if val is true or false it will handle by filter if val is true it will include curr elem or object
  });
  return res;
}

export function generateThaliReceipt(customerName, thalis) {
  // Your code here
  if (
    typeof customerName !== "string" ||
    Array.isArray(thalis) !== true ||
    thalis.length == 0
  ) {
    return "";
  }

  let totalPrice = 0;
  let totalThali = thalis.map((elem) => {
    totalPrice += elem.price; //we can do this using reduce too but dont need to scale up the code this version is simpler and better than using reduce
    return [`- ${elem.name} x Rs.${elem.price}`];
  });

  // let totPrice = thalis.reduce((acc, elem) => {
  //   return acc + elem.price;
  // });
  let lineItems = totalThali.join("\n");

  let resStr = `THALI RECEIPT\n---\nCustomer: ${customerName.toUpperCase()}\n${lineItems}\n---\nTotal: Rs.${totalPrice}\nItems: ${thalis.length}`;

  return resStr;
}
