import {AClass} from "./testModule.ts"; // do not import valueZero

let aClass: AClass;     // }
                        // } or shorter: let aClass = new AClass();
aClass = new AClass();  // }

aClass.test = "It works!"; // use setter

let testDiv = document.getElementById("test");
testDiv.innerHTML = "Just wait 2 seconds...";

setTimeout(() => testDiv.innerHTML = aClass.test, 2000);
