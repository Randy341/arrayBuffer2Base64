const ab2b64 = require("../");
const assert = require('assert');

const str2ab = (str) => {
    let buffer = new ArrayBuffer(str.length * 2);  //JS UTF-16 = 2 bytes each character
    let view = new Uint16Array(buffer);
    str.split("").forEach((char, index) => { view[index] = char.charCodeAt(0)});
    return buffer;
};

const ab2str = (buffer) => {
    //removing null terminator at the end
    return String.fromCodePoint.apply(null, new Uint16Array(buffer)).replace("\u0000","");
};

const main_test = async () => {
    const testBuffer1 = str2ab("Pickle Rick!!");
    const b64test1 = await ab2b64.ab2b64Async(testBuffer1);
    assert.equal(b64test1, "UABpAGMAawBsAGUAIABSAGkAYwBrACEAIQA=", "Array Buffer conversion to Base64 str failed!");    //UTF-16 LE

    const b64test2 = "UwBlAGEAbAAgAFQAZQBhAG0AIABSAGkAYwBrAHMAIABpAG4AIAB0AGgAZQAgAGgAbwB1AHMAZQAsACAAYgBhAGIAeQAhAA==";
    const testBuffer2 = await ab2b64.b642abAsync(b64test2);
    assert.equal(ab2str(testBuffer2), "Seal Team Ricks in the house, baby!", "Base64 str conversion to Array Buffer failed");

    const testBuffer3 = str2ab("I'm Mr. Meeseeks! Look at me!");
    const b64test3 = await ab2b64.ab2b64Async(testBuffer3);
    assert.equal(b64test3, "SQAnAG0AIABNAHIALgAgAE0AZQBlAHMAZQBlAGsAcwAhACAATABvAG8AawAgAGEAdAAgAG0AZQAhAA==", "Array Buffer conversion to Base64 str failed!");    //UTF-16 LE

    const b64test4 = "RABvAG8AZgB1AHMAIABSAGkAYwBrAA==";
    const testBuffer4 = await ab2b64.b642abAsync(b64test4);
    assert.equal(ab2str(testBuffer4), "Doofus Rick", "Base64 str conversion to Array Buffer failed");

};

main_test().then(() => console.log("All tests pass")).catch(err => console.log(err));