class Cipher {
    constructor(key) {
        this.key = key;
    }

    async encrypt(message) {
        return await cipher(message, this.key, true);
    }

    async decrypt(message) {
        return await cipher(message, this.key, false);
    }

    /**
     * 
     * @param {number} int 
     * @param {string} charset 
     * @returns {Promise<string>}
     */
    async toBase62(int, charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
        return await toBase62(int, charset);
    }

    /**
     * 
     * @param {string} str 
     * @param {string} charset 
     * @returns {Promise<number>}
     */
    async fromBase62(str, charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
        return await fromBase62(str, charset);
    }
}

async function cipher(message, key, isDecode) {
    let text = message;

    if (isDecode) {
        text = Buffer.from(message, 'utf8').toString('base64');
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9876543210qwertyuiopasdfghjklzxcvbnm';
    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const index = alphabet.indexOf(char);

        if (index === -1) {
            result += char;
        } else {
            const keyChar = key[keyIndex % key.length];
            const keyShift = alphabet.indexOf(keyChar);
            const shift = isDecode ? -keyShift : keyShift;
            const newIndex = (index + shift + alphabet.length) % alphabet.length;

            result += alphabet[newIndex];

            keyIndex++;
        }
    }

    if (!isDecode) {
        result = Buffer.from(result, 'base64').toString('utf8');
    }

    return result;
}

async function toBase62(int, charset) {
    if (typeof int !== 'number') throw new Error('Invalid data type.');

    charset = indexCharset(charset);

    let byCode = charset.byCode;

    if (int === 0) {
        return byCode[0];
    }

    var res = "",
        max = charset.length;
    while (int > 0) {
        res = byCode[int % max] + res;
        int = Math.floor(int / max);
    }

    return res;
}

async function fromBase62(str, charset) {
    charset = indexCharset(charset);

    var byChar = charset.byChar,
        res = 0,
        length = str.length,
        max = charset.length,
        i, char;
    for (i = 0; i < length; i++) {
        char = str[i];
        res += byChar[char] * Math.pow(max, (length - i - 1));
    }
    return res;
}

function indexCharset(str) {
    var byCode = {},
        byChar = {},
        length = str.length,
        i, char;

    for (i = 0; i < length; i++) {
        char = str[i];
        byCode[i] = char;
        byChar[char] = i;
    }

    return { byCode: byCode, byChar: byChar, length: length };
}

module.exports = { Cipher };