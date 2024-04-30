const module = (() => {
    // Function to check for anagrams
    const _areAnagrams = (str1, str2) => {
        // Convert strings to lowercase and remove spaces
        const processedStr1 = str1.toLowerCase().replace(/\s/g, '');
        const processedStr2 = str2.toLowerCase().replace(/\s/g, '');

        // Check if the lengths of the processed strings are equal
        if (processedStr1.length !== processedStr2.length) {
            return false;
        }

        // Sort the characters of both strings and compare them
        const sortedStr1 = processedStr1.split('').sort().join('');
        const sortedStr2 = processedStr2.split('').sort().join('');

        return sortedStr1 === sortedStr2;
    }

    const _generate5Letters = (n) => {
        // Alphabet turned into an array
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

        let output = '';

        for (let i = 0; i < n; i++) {
            // Get random letter from alphabet and add it to output string
            output += alphabet[Math.floor(Math.random() * alphabet.length)];
        }

        return output;
    }

    // Function to retrieve a specific cookie value
    function _getCookie(cookieName) {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for(let i = 0; i <cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    }

    function _setCookie(cookieName, cookieValue, daysToExpire) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        const expires = "expires=" + expirationDate.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    }

    return {
        generate5Letters: _generate5Letters,
        areAnagrams: _areAnagrams,
        getCookie: _getCookie,
        setCookie: _setCookie
    };
})();

const formList = document.getElementById('formList');
const word = document.getElementById('word');

const amountOfLetters = 5;
const amountOfMaxTries = 5;
let amountOfTries = 0;

if (!module.getCookie('amountOfTries')) {
    module.setCookie('amountOfTries', amountOfTries, 365);
} else {
    amountOfTries = module.getCookie('amountOfTries');
}

word.innerHTML = module.generate5Letters(amountOfLetters);

const listElements = [];

for (let i = 0; i <= amountOfMaxTries; i++) {
    let listElement = document.createElement('li');

    listElements.push(listElement);
}

listElements.forEach(listElement => {
    for (let i = 0; i < amountOfLetters; i++) {
        let inputField = document.createElement('input');
        inputField.setAttribute('id', `id${i}`);
        inputField.type = 'text';
        inputField.maxLength = 1;
        inputField.classList.add('className');

        listElement.appendChild(inputField);
    }

    formList.appendChild(listElement);
});

listElements.forEach((listElement, index) => {
    if (index !== amountOfTries) {
        const inputFields = listElement.querySelectorAll('input');
        inputFields.forEach(inputField => {
            inputField.disabled = true;
        });
    }
});

const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', () => {
    amountOfTries++;
    module.setCookie('amountOfTries', amountOfTries, 365);
});

