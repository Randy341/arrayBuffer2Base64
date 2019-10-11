const binary_to_b64_map = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
    'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1',
    '2', '3', '4', '5', '6', '7', '8', '9', '+',
    '/', '='
];
const b64_to_binary_map = {
    '0': 52,
    '1': 53,
    '2': 54,
    '3': 55,
    '4': 56,
    '5': 57,
    '6': 58,
    '7': 59,
    '8': 60,
    '9': 61,
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25,
    a: 26,
    b: 27,
    c: 28,
    d: 29,
    e: 30,
    f: 31,
    g: 32,
    h: 33,
    i: 34,
    j: 35,
    k: 36,
    l: 37,
    m: 38,
    n: 39,
    o: 40,
    p: 41,
    q: 42,
    r: 43,
    s: 44,
    t: 45,
    u: 46,
    v: 47,
    w: 48,
    x: 49,
    y: 50,
    z: 51,
    '+': 62,
    '/': 63,
    '=': 64
};

const generateTripleIterator = (arr) => {
    return {
        *[Symbol.iterator]() {
            for(let n = 0; n < arr.length; n+=3) {
                let result = [];
                result.push(arr[n]);

                if(n+1 < arr.length)
                    result.push(arr[n+1]);
                if(n+2 < arr.length)
                    result.push(arr[n+2]);

                yield result;
            }
        }
    };
};

const generateQuadrupleIterator = (arr) => {
    return {
        *[Symbol.iterator]() {
            for(let n = 0; n < arr.length; n+=4) {
                yield [...arr.slice(n, n+4)];
            }
        }
    };
};

const tripleConvert = (triple) => {
    let [first, second, third] = triple;
    let binary = null, a = null, b = null, c = null, d = null;
    if(triple.length === 1) {
        binary = (first << 4);
        a = ((binary & 4032) >>> 6);
        b = (binary & 63);
        c = 64;
        d = 64;
    } else if (triple.length === 2) {
        binary = ((first << 10) | (second << 2));
        a = ((binary & 258048) >>> 12);
        b = ((binary & 4032) >>> 6);
        c = (binary & 63);
        d = 64;
    } else {
        binary = ((first << 16) | (second << 8) | third);
        a = ((binary & 16515072) >>> 18);
        b = ((binary & 258048) >>> 12);
        c = ((binary & 4032) >>> 6);
        d = (binary & 63);
    }

    return [a, b, c, d];
};

const quadrupleConvert = (quadruple) => {
    let [a, b, c, d] = quadruple;
    let binary = null, first = 0, second = 0, third = 0;

    if(c === 64 && d === 64) {
        //two padding
        binary = ((a << 6) | b);
        first = (binary >> 4);   //shift off 4 bits, 2 bits per padding
    } else if(d === 64) {
        //one padding
        binary = ((a << 12) | (b << 6) | c );
        binary = (binary >> 2); //shift off 2 bits
        first = binary >> 8;
        second = ((binary << 24) >>> 24);
    } else {
        //no padding
        binary = ((a << 18) | (b << 12) | (c << 6) | d );
        first = (binary >>> 16);
        second = ((binary << 16) >>> 24);
        third = ((binary << 24) >>> 24);
    }

    return [first, second, third];
};

exports.ab2b64 = async (buffer) => {
    const b64strArray = [];
    const view = new Uint8Array(buffer);
    let iterator = generateTripleIterator(view);
    for(let triple of iterator) {
        b64strArray.push(...tripleConvert(triple));
    }
    return b64strArray.map(b64CharCodePoint => binary_to_b64_map[b64CharCodePoint]).join("");
};

exports.b642ab = async (b64str) => {
    let buffer = new ArrayBuffer((b64str.length / 4) * 3);
    const view = new Uint8Array(buffer);
    let iterator = generateQuadrupleIterator(b64str.split("").map(b64char => b64_to_binary_map[b64char]));
    let byteIndex = 0;
    for(let quadruple of iterator) {
        quadrupleConvert(quadruple).forEach(byte => {
            view[byteIndex] = byte;
            byteIndex++;
        });
    }
    return buffer;
};
