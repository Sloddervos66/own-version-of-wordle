const module = (() => {
    // Function to check the input fields with the word
    const _checkInputs = (inputFields, word) => {
        const inputFieldsArray = Array.from(inputFields)
        const guessedWord = inputFieldsArray.map(inputField => inputField.value).join('');

        for (let i = 0; i < word.length; i++) {
            if (guessedWord[i] === word[i]) {
                inputFields[i].classList.add('CorrectPlace');
            } else if (word.includes(guessedWord[i])) {
                inputFields[i].classList.add('WrongPlace');
            } else {
                inputFields[i].classList.add('WrongLetter');
            }

            console.log(inputFields[i].classList);
        }
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

        // Hash cookie value
        //const hashValue = await hashCookieValue(cookieValue);

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
        checkInputs: _checkInputs,
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
    const inputFields = listElements1[amountOfTries].querySelectorAll('input');
    module.checkInputs(inputFields, word.textContent);  
    // amountOfTries++;

    // module.setCookie('amountOfTries', amountOfTries, 1);

    // for (let i = 0; i < allListElements.length; i++) {
    //     let listElement = allListElements[i];
    //     let formList = allFormLists[i];

    //     module.addInputFields(listElement, formList);
    //     module.disableInputFields(listElement, amountOfTries);
    // }

    // if (parseInt(amountOfTries) >= amountOfMaxTries) {
    //     submitButton.disabled = true;
    // }
});

//Make the settings button display the settings menu
function settingsMenu() {
    document.getElementById("settingsMenu").classList.toggle("settingsShown");
  }

  document.addEventListener("click", function(event) {
    var settingsMenu = document.getElementById("settingsMenu");
    var settingsIcon = document.getElementById("settingsIcon");

    if (!settingsMenu.contains(event.target) && event.target !== settingsIcon) {
        settingsMenu.classList.remove("settingsShown");
    }
});

/* Class for light mode: "lightmode". I've set the background-color for the ids of some elements, so when I tried adding the lightmode class
to an element that had that, it didn't work, and idk how I can fix this.

Class for high-contrast mode: the names "WrongLetter", "WrongPlace" and "CorrectPlace" are the original names. Add a "hc" before that for high-contrast. */
