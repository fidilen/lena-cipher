# lena-cipher
A cryptography package that allows for encryption and decryption of messages using a customized key.

## Usage
```js
const { Cipher } = require('lena-cipher');

const cipher = new Cipher('MyCustomPrivateKey');

const message = 'Hello World!';

const encoded = await cipher.encrypt(message);
const decoded = await cipher.decrypt(encoded);

console.log(encoded);   //G8TFM7phGxppN7ty
console.log(decoded);   //Hello World!
```

## Author
Made with ♥ by [fidilen](https://fidilen.com).