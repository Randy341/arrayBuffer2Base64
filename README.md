## Array Buffer to Base64 Encoding [![Build Status](https://travis-ci.com/Randy341/arrayBuffer2Base64.svg?branch=master)](https://travis-ci.com/Randy341/arrayBuffer2Base64)
JavaScript Library to convert Array Buffer to Base64 encoded string and vice versa.  This library is an useful add-on for cryptographic project, network project, and more.  
There is no dependency for this project, and it works in both Node and Browser environment.  

## Node.js (Install)  
Requirements:
- Node.js (version 8 or above.  Need ES6 async/await and typed array)
- NPM
```bash
npm install ab2b64
````

## Usage
```javascript
    const ab2b64 = require("ab2b64");
    //Converting Array Buffer to Base64 String - Synchronous method
    let Base64String = ab2b64.ab2b64(buffer);
    
    //Converting Base64 String to Array Buffer - Synchronous method
    let buffer = ab2b64.b642ab(Base64String);
    
    //Converting Array Buffer to Base64 String - Asynchronous method
    let Base64String = await ab2b64.ab2b64Async(buffer);
        
    //Converting Base64 String to Array Buffer - Asynchronous method
    let buffer = await ab2b64.b642abAsync(Base64String);
```

## Q&A
#### Q: Why this library needs node version 8 or above?
A: Specifically, this library requires async/await and typed array feature from ES2015.  Any node or browser version supporting
these two will suffice.  Async/await is much less important as it only served as wrapper for 
async call.  You can fork your own on github and rewrite the async/await portion.  
However, the typed array feature is a must as typed array is used heavily.  

#### Q: Why not just use the Base64 conversion feature in more established library, like Crypto-JS?
A: As of the writing of this library, I can't find one on NPM that converts Array Buffer to Base64.  Crypto-JS 
converts specialized 'Word Array', not Array Buffer.

#### Q: Your library is garbage!  I don't like it!
A: Then you open PR and improve it! Or don't use it! Nobody is begging you here...   
Look, I get it.  This library isn't super optimized.  It is optimized enough for
my project, and I published this on NPM so others may take advantage of my works.  
I know some people (like those working in G-Company) 
love writing highly optimized but long and cryptic codes without documentation.   
I prefer codes that can be easily 
and quickly understood by teammate of different experience levels so they can contribute quickly.

    
    
    

