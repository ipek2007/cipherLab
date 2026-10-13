// Seçilmiş alqoritmə uyğun açar sahəsini tənzimləyir
function toggleKeyInput() {
    const algo = document.getElementById('algoSelect').value;
    const keySection = document.getElementById('keySection');
    const keyLabel = document.getElementById('keyLabel');
    const secretKey = document.getElementById('secretKey');
    const decryptBtn = document.getElementById('decryptBtn');

    if (algo === 'caesar') {
        keySection.style.display = 'block';
        keyLabel.innerText = 'Sürüşdürmə miqdarı (Key):';
        secretKey.value = '3';
        decryptBtn.style.display = 'inline-block';
    } else if (algo === 'aes') {
        keySection.style.display = 'block';
        keyLabel.innerText = 'Gizli Açar (Passphrase):';
        secretKey.value = 'my-secret-key';
        decryptBtn.style.display = 'inline-block';
    } else if (algo === 'sha256') {
        keySection.style.display = 'none';
        decryptBtn.style.display = 'none';
    }
}

// Sezar Şifrələmə və Şifrəaçma Funksiyası
function caesarCipher(str, shift) {
    shift = parseInt(shift) % 26;
    return str.replace(/[a-zA-Z]/g, function(c) {
        const base = c < 'a' ? 65 : 97;
        return String.fromCharCode((c.charCodeAt(0) - base + shift + 26) % 26 + base);
    });
}

// Şifrələmə və ya Hash Yarat
function processEncrypt() {
    const text = document.getElementById('inputText').value;
    const algo = document.getElementById('algoSelect').value;
    const key = document.getElementById('secretKey').value;
    let result = '';

    if (!text) {
        document.getElementById('outputText').innerText = 'Zəhmət olmasa mətn daxil edin!';
        return;
    }

    if (algo === 'caesar') {
        result = caesarCipher(text, parseInt(key) || 0);
    } else if (algo === 'aes') {
        result = CryptoJS.AES.encrypt(text, key).toString();
    } else if (algo === 'sha256') {
        result = CryptoJS.SHA256(text).toString();
    }

    document.getElementById('outputText').innerText = result;
}

// Şifrəni Aç
function processDecrypt() {
    const text = document.getElementById('inputText').value;
    const algo = document.getElementById('algoSelect').value;
    const key = document.getElementById('secretKey').value;
    let result = '';

    if (!text) {
        document.getElementById('outputText').innerText = 'Zəhmət olmasa şifrəli mətn daxil edin!';
        return;
    }

    try {
        if (algo === 'caesar') {
            result = caesarCipher(text, -parseInt(key) || 0);
        } else if (algo === 'aes') {
            const bytes = CryptoJS.AES.decrypt(text, key);
            result = bytes.toString(CryptoJS.enc.Utf8);
            if (!result) {
                result = 'Yanlış açar və ya zədələnmiş mətn!';
            }
        }
    } catch (e) {
        result = 'Şifrəni açmaq mümkün olmadı!';
    }

    document.getElementById('outputText').innerText = result;
}