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

module.exports = { Cipher };