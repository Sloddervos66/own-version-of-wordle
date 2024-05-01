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

    // Function to set a cookie with a hashed value
    async function _setCookie(cookieName, cookieValue, daysToExpire) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        const expires = "expires=" + expirationDate.toUTCString();
        const sameSite = "sameSite=True;"

        // Hash cookie value
        const hashValue = await hashCookieValue(cookieValue);

        document.cookie = cookieName + "=" + hashValue + ";" + expires + ";path=/";
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
    const _disableInputFields = (listElements, amountOfTries) => {
        if (amountOfTries < 5) {
            listElements.forEach((listElement, index) => {
                const inputFields = listElement.querySelectorAll('input');
                if (index !== parseInt(amountOfTries)) {
                    inputFields.forEach(inputField => {
                        inputField.disabled = true;
                    });
                } else {
                    inputFields.forEach(inputField => {
                        inputField.disabled = false;
                    });
                }
            });
        } else {
            let newNumber = amountOfTries - 5;
            listElements.forEach((listElement, index) => {
                const inputFields = listElement.querySelectorAll('input');
                if (index !== newNumber) {
                    inputFields.forEach(inputField => {
                        inputField.disabled = true;
                    });
                } else {
                    inputFields.forEach(inputField => {
                        inputField.disabled = false;
                    });
                }
            });
        }
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
const submitButton = document.getElementById('submitButton');

const amountOfLetters = 5;
const amountOfMaxTries = 10;
let amountOfTries = 0;

if (!module.getCookie('amountOfTries')) {
    module.setCookie('amountOfTries', amountOfTries, 1);
} else {
    amountOfTries = module.getCookie('amountOfTries');
}

if (!module.getCookie('dailyWord')) {
    module.setCookie('dailyWord', module.generate5Letters(amountOfLetters), 1);
} 

word.innerHTML = module.getCookie('dailyWord');

const listElements1 = [];
const listElements2 = [];

const allListElements = [listElements1, listElements2];
const allFormLists = [formList1, formList2];

for (let i = 0; i < amountOfMaxTries; i++) {
    let listElement = document.createElement('li');

    if (i < 5) {
        listElements1.push(listElement);
    } else {
        listElements2.push(listElement);
    }
}

for (let i = 0; i < allListElements.length; i++) {
    let listElement = allListElements[i];
    let formList = allFormLists[i];

    module.addInputFields(listElement, formList);
    module.disableInputFields(listElement, amountOfTries);
}

submitButton.addEventListener('click', () => {
    amountOfTries++;

    module.setCookie('amountOfTries', amountOfTries, 1);

    for (let i = 0; i < allListElements.length; i++) {
        let listElement = allListElements[i];
        let formList = allFormLists[i];

        module.addInputFields(listElement, formList);
        module.disableInputFields(listElement, amountOfTries);
    }

    if (parseInt(amountOfTries) >= amountOfMaxTries) {
        submitButton.disabled = true;
    }
});
