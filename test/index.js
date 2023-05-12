const { Cipher } = require('../index.js');
const cipher = new Cipher('MyKeyGoesHere');

//test alphanumeric
(async function () {
    const message = 'Hello World!!!11';

    const encoded = await cipher.encrypt(message);
    const decoded = await cipher.decrypt(encoded);

    console.log('Passed alphanumeric:', decoded === message);
})();

//test special characters
(async function () {
    const message = '你好!!!11 やあ！';

    const encoded = await cipher.encrypt(message);
    const decoded = await cipher.decrypt(encoded);

    console.log('Passed special characters:', decoded === message);
})();