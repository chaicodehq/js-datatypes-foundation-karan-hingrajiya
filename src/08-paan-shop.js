/**
 * 🍃 Paan Shop Menu - Object Transform
 *
 * Khalil Bhai ki paan shop hai jo purani Delhi mein famous hai.
 * Menu system banana hai jisme objects ko merge karna, freeze karna,
 * aur transform karna hai. Object transform ka tour!
 *
 * Methods to explore: Object.assign(), Object.freeze(),
 *   spread operator {...}, Object.entries(), Object.fromEntries()
 *
 * Functions:
 *
 *   1. createPaanOrder(basePaan, customizations)
 *      - Object.assign({}, basePaan, customizations) se NEW order object banao
 *      - Original basePaan ko mutate MAT karo!
 *      - Agar basePaan object nahi hai ya null hai, return {}
 *      - Agar customizations object nahi hai, sirf basePaan ki copy return karo
 *      - Example: createPaanOrder({type:"meetha",price:30}, {extra:"gulkand",price:50})
 *                 => {type:"meetha", price:50, extra:"gulkand"}
 *
 *   2. freezeMenu(menu)
 *      - Object.freeze() se menu ko immutable banao
 *      - Return: frozen object
 *      - Agar menu object nahi hai ya null hai, return {}
 *      - Frozen ke baad koi modification kaam nahi karegi!
 *      - Example: const frozen = freezeMenu({meetha:30}); frozen.meetha = 100; // still 30
 *
 *   3. updatePrices(menu, increase)
 *      - Object.entries() se [key, value] pairs lo
 *      - Har price mein increase add karo
 *      - Object.fromEntries() se wapas object banao
 *      - Return: NEW object (original mat badlo!)
 *      - Agar menu object nahi hai ya increase number nahi hai, return {}
 *      - Example: updatePrices({meetha:30, saada:20}, 10) => {meetha:40, saada:30}
 *
 *   4. mergeDailySpecials(regularMenu, specialsMenu)
 *      - Spread operator {...regularMenu, ...specialsMenu} se merge karo
 *      - specialsMenu ki values override karengi agar same key ho
 *      - Return: NEW merged object
 *      - Agar koi bhi object nahi hai, usse empty {} maan lo
 *      - Example: mergeDailySpecials({meetha:30}, {chocolate:60, meetha:40})
 *                 => {meetha:40, chocolate:60}
 *
 * @example
 *   createPaanOrder({type:"meetha"}, {extra:"gulkand"}) // => {type:"meetha",extra:"gulkand"}
 *   updatePrices({meetha:30, saada:20}, 10)              // => {meetha:40, saada:30}
 */
export function createPaanOrder(basePaan, customizations) {
  // Your code here
  if (basePaan == null || typeof basePaan !== "object") {
    return {};
  }

  if (typeof customizations !== "object") {
    return {...basePaan}; //spread also returns copy so not to write too long using obj.assign i used spread operator
  }
  let copyObj = Object.assign({}, basePaan, customizations);
  //assign property uses to add all the objects into one single object or source the source here is first we always assign source first here {} is the source.now in that {} object the basepaan and customiztion obj will added and this property only can add objects that can be enumerable (iteratable).
  return copyObj;
}

export function freezeMenu(menu) {
  // Your code here
  if (menu == null || typeof menu !== "object") {
    return {};
  }
  let forzenObj = Object.freeze(menu);
  return forzenObj;
}

export function updatePrices(menu, increase) {
  // Your code here
  if (
    menu == null ||
    typeof menu !== "object" ||
    typeof increase !== "number"
  ) {
    return {};
  }

  let keyValPairsArr = Object.entries(menu);
  // keyValPairsArr.forEach(([key, val]) => {});
  for (let i = 0; i < keyValPairsArr.length; i++) {
    keyValPairsArr[i][1] += increase;
    //expected error here bcz i didnt converted keyvalpairarr to number its string that we are accesing but thats not happening if we have obj = {name : "karan",age:20} here obj.entire convert this obj into like this [['name','karan'],['age',20]] so its already num by default in arr obj.entires smart enough to keep numeric val to be entact.
  }

  let resObj = Object.fromEntries(keyValPairsArr);
  return resObj;
}

export function mergeDailySpecials(regularMenu, specialsMenu) {
  // Your code here
  if (
    (typeof regularMenu !== "object" || regularMenu == null) &&
    (specialsMenu == null || typeof specialsMenu !== "object")
  ) {
    return {};
  }

  if(typeof regularMenu !== "object" && typeof specialsMenu === "object"){
    return specialsMenu;
  }else if(typeof regularMenu === "object" && typeof specialsMenu !== "object"){
    return regularMenu;
  }

  let resObj = {...regularMenu,...specialsMenu};
  return resObj;
}
