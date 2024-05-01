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

    // Function to generate a random 5 letter word
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

    // Function to set a cookie
    function _setCookie(cookieName, cookieValue, daysToExpire) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        const expires = "expires=" + expirationDate.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    }

    // Function to check if a cookie has expired
    function _isExpired(dateTimeValue) {
        const currentTime = new Date().getTime();
        const cookieTime = parseInt(dateTimeValue);
        return (currentTime - cookieTime) > (24 * 60 * 60 * 1000); 
    }

    // Function to add input fields to a list
    const _addInputFields = (listElements, list) => {
        listElements.forEach(listElement => {
            for (let i = 0; i < amountOfLetters; i++) {
                let inputField = document.createElement('input');
                inputField.setAttribute('id', `id${i}`);
                inputField.type = 'text';
                inputField.maxLength = 1;
                inputField.classList.add('className');
    
                listElement.appendChild(inputField);
            }

            list.appendChild(listElement);
        });
    }

    // Function to disable input fields
    const _disableInputFields = (listElements) => {
        listElements.forEach((listElement, index) => {
            if (index !== amountOfTries) {
                const inputFields = listElement.querySelectorAll('input');
                inputFields.forEach(inputField => {
                    inputField.disabled = true;
                });
            }
        });
    }

    return {
        generate5Letters: _generate5Letters,
        areAnagrams: _areAnagrams,
        addInputFields: _addInputFields,
        disableInputFields: _disableInputFields,
        getCookie: _getCookie,
        setCookie: _setCookie
    };
})();

const formList1 = document.getElementById('formList1');
const formList2 = document.getElementById('formList2');
const word = document.getElementById('word');

const amountOfLetters = 5;
const amountOfMaxTries = 4;
let amountOfTries = 0;
let dateTimeExists = false;

if(!module.getCookie('dateTime')) {
    module.setCookie('dateTime', true, 1);
    dateTimeExists = true;
} else {
    dateTimeExists = module.getCookie('dateTime');
}

if (!module.getCookie('amountOfTries')) {
    module.setCookie('amountOfTries', amountOfTries, 365);
} else {
    amountOfTries = module.getCookie('amountOfTries');
}

word.innerHTML = module.generate5Letters(amountOfLetters);

const listElements1 = [];
const listElements2 = [];

for (let i = 0; i <= amountOfMaxTries; i++) {
    let listElement = document.createElement('li');

    listElements1.push(listElement);
    listElements2.push(listElement);
}

module.addInputFields(listElements1, formList1);
module.addInputFields(listElements2, formList2);

module.disableInputFields(listElements1);
moduke.disableInputFields(listElements2);

const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', () => {
    amountOfTries++;
    module.setCookie('amountOfTries', amountOfTries, 365);
});

// Retrieve the datetime of a cookie
const dateTimeCookieValue = module.getCookie('dateTime');

// Check if the cookie exists and is not empty
if (dateTimeCookieValue) {
    // Parse the datetime value to a readable format
    const dateTime = new Date(parseInt(dateTimeCookieValue));
    console.log('Datetime of the cookie:', dateTime);
} else {
    console.log('Cookie not found or empty.');
}

console.log('Value of the dateTime cookie:', dateTimeCookieValue);
