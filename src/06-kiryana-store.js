/**
 * 🏪 Kiryana Store Bill - Array Transform
 *
 * Gupta ji ki kiryana (grocery) store hai. Monthly hisaab kitaab karna hai —
 * items ka total nikalna, sorting karna, bill format karna.
 * Array transform methods se Gupta ji ki dukaan digital banao!
 *
 * Data format: items = [
 *   { name: "Atta", price: 40, qty: 2 },
 *   { name: "Daal", price: 80, qty: 1 },
 *   ...
 * ]
 *
 * Methods to explore: .map(), .filter(), .reduce(), .sort(), .join()
 *
 * Functions:
 *
 *   1. getItemNames(items)
 *      - .map() se sirf names nikalo
 *      - Agar items array nahi hai, return []
 *      - Example: getItemNames([{name:"Atta",price:40,qty:2}]) => ["Atta"]
 *
 *   2. getAffordableItems(items, maxPrice)
 *      - .filter() se items nikalo jinka price <= maxPrice
 *      - Agar items array nahi hai ya maxPrice number nahi hai, return []
 *      - Example: getAffordableItems([{name:"Atta",price:40},{name:"Ghee",price:500}], 100)
 *                 => [{name:"Atta",price:40}]
 *
 *   3. calculateTotal(items)
 *      - .reduce() se (price * qty) ka sum nikalo
 *      - Agar items array nahi hai ya empty hai, return 0
 *      - Example: calculateTotal([{name:"Atta",price:40,qty:2},{name:"Daal",price:80,qty:1}])
 *                 => 160
 *
 *   4. sortByPrice(items, ascending)
 *      - [...items].sort() se NEW sorted array return karo (original mat badlo!)
 *      - ascending = true => low to high, false => high to low
 *      - Agar items array nahi hai, return []
 *      - Example: sortByPrice([{name:"Ghee",price:500},{name:"Atta",price:40}], true)
 *                 => [{name:"Atta",price:40},{name:"Ghee",price:500}]
 *
 *   5. formatBill(items)
 *      - .map() se har item ko "name x qty = Rs.total" format karo
 *      - Phir .join("\n") se multi-line bill banao
 *      - Agar items array nahi hai ya empty hai, return ""
 *      - Example: formatBill([{name:"Atta",price:40,qty:2}]) => "Atta x 2 = Rs.80"
 *
 * @example
 *   getItemNames([{name:"Atta",...}])         // => ["Atta"]
 *   calculateTotal([{price:40,qty:2},...])    // => 160
 *   formatBill([{name:"Atta",price:40,qty:2}]) // => "Atta x 2 = Rs.80"
 */
export function getItemNames(items) {
  // Your code here
  if ((items != null && items.length == 0) || Array.isArray(items) !== true) {
    return [];
  }

  let res = items.map((elem) => {
    return elem.name;
  });

  return res;
}

export function getAffordableItems(items, maxPrice) {
  // Your code here
  if (
    (items != null && items.length == 0) ||
    Array.isArray(items) !== true ||
    typeof maxPrice !== "number"
  ) {
    return [];
  }

  let res = items.filter((elem) => {
    if (elem.price <= maxPrice) {
      return true;
    } else {
      return false;
    }
  });

  return res;
}

export function calculateTotal(items) {
  //error possible here
  // Your code
  // items.length == 0 || this will not go into the condition because in tests input is "null" sometime instead of arrays so it will throw error that length property cannot read null so thats why we only checking array only here.
  if (Array.isArray(items) !== true || (items != null && items.length == 0)) {
    return 0;
  }

  let res = items.reduce((acc, elem) => {
    return (acc += elem.price * elem.qty);
  }, 0);
  //defult acc value is given 0 without it will not work bcz in js acc alwas start from arr[0] and elem set to arr[1] by default so we forcibly give 0 value to acc for our output.

  return res;
}

export function sortByPrice(items, ascending) {
  // Your code here
  if (Array.isArray(items) !== true) {
    return [];
  }
  let res;
  if (ascending == true) {
    res = [...items].sort(function (a, b) {
      //[..items] we spreading the elem of original items arr so now we have copy of it and we now can return copy instead of actual arr.
      return a.price - b.price;
    });
    return res;
  } else {
    res = [...items].sort(function (a, b) {
      return b.price - a.price;
    });
    return res;
  }
}

export function formatBill(items) {
  // Your code here
  if (Array.isArray(items) !== true) {
    return "";
  }

  let newArr = items.map((elem) => {
    let res = elem.price * elem.qty;
    let resStr = `${elem.name} x ${elem.qty} = Rs.${res}`;
    return resStr;
  });

  let finalRes = newArr.join("\n");
  return finalRes;
}
