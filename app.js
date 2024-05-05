const module = (() => {
    // Function to check the input fields with the word
    const _checkInputs = (inputFields, word, hcSwitch) => {
        const inputFieldsArray = Array.from(inputFields);
        const guessedWord = inputFieldsArray.map(inputField => inputField.value).join('');

        const wordObjectArray = [];
        const inputObjectArray = [];

        stringCharactersInArray(word, wordObjectArray);
        stringCharactersInArray(guessedWord, inputObjectArray);

        const allCorrectLettersIndex = [];
        const wrongOrIncorrectLettersIndex = [];

        for (let i = 0; i < word.length; i++) {
            if (word[i] === guessedWord[i]) {
                allCorrectLettersIndex.push(i);
            } else {
                wrongOrIncorrectLettersIndex.push(i);
            } 

            let correctPlace = '';
            let wrongPlace = '';
            let wrongLetter = '';

            if (hcSwitch.checked) {
                correctPlace = 'hcCorrectPlace';
                wrongPlace = 'hcWrongPlace';
                wrongLetter = 'hcWrongLetter';
            } else {
                correctPlace = 'CorrectPlace';
                wrongPlace = 'WrongPlace';
                wrongLetter = 'WrongLetter';
            }

            allCorrectLettersIndex.forEach(index => {
                const letterOfIndex = word[index];
                const letterObject = wordObjectArray.find(obj => obj.letter === letterOfIndex);
    
                inputFields[index].classList.add(correctPlace);
    
                letterObject.amount--;
            });
    
            wrongOrIncorrectLettersIndex.forEach(index => {
                const letterOfIndex = guessedWord[index];
                const letterObject = wordObjectArray.find(obj => obj.letter === letterOfIndex);
    
                if (letterObject.amount >= 1) {
                    inputFields[index].classList.add(wrongPlace);
    
                    letterObject.amount--;
                } else if (inputFields[index].classList.contains('className') && !(inputFields[index].classList.contains(correctPlace) || inputFields[index].classList.contains(wrongPlace))){
                    inputFields[index].classList.add(wrongLetter);
                }
            });
        }
    };

    // Function to put characters of a string into an array
    const stringCharactersInArray = (str, array) => {
        str.split('').forEach(character => {
            const index = array.findIndex(item => item.letter === character);
            if (index !== -1) {
                array[index].amount++;
            } else {
                array.push(
                    { letter: character, amount: 1 }
                );
            }
        });
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

    // Change colours depending on Hc or not
    const _changeToHcOrBack = (inputFields, howItWorksArray) => {
        inputFields.forEach(inputField => {
            inputField.forEach(actualInputField => {
                const classNames = actualInputField.classList.value.split(' ');
    
                // Iterate through each class
                classNames.forEach(className => {
                    switch (className) {
                        case 'hcCorrectPlace':
                            actualInputField.classList.remove('hcCorrectPlace');
                            actualInputField.classList.add('CorrectPlace');
                            break;
                        case 'CorrectPlace':
                            actualInputField.classList.remove('CorrectPlace');
                            actualInputField.classList.add('hcCorrectPlace');
                            break;
                        case 'hcWrongPlace':
                            actualInputField.classList.remove('hcWrongPlace');
                            actualInputField.classList.add('WrongPlace');
                            break;
                        case 'WrongPlace':
                            actualInputField.classList.remove('WrongPlace');
                            actualInputField.classList.add('hcWrongPlace');
                            break;
                        case 'hcWrongLetter':
                            actualInputField.classList.remove('hcWrongLetter');
                            actualInputField.classList.add('WrongLetter');
                            break;
                        case 'WrongLetter':
                            actualInputField.classList.remove('WrongLetter');
                            actualInputField.classList.add('hcWrongLetter');
                            break;
                    }
                });
            });
        });  
        
        howItWorksArray.forEach(element => {
            const classNames = element.classList.value.split(' ');
    
                // Iterate through each class
                classNames.forEach(className => {
                    switch (className) {
                        case 'hcCorrectPlace':
                            element.classList.remove('hcCorrectPlace');
                            element.classList.add('CorrectPlace');
                            break;
                        case 'CorrectPlace':
                            element.classList.remove('CorrectPlace');
                            element.classList.add('hcCorrectPlace');
                            break;
                        case 'hcWrongPlace':
                            element.classList.remove('hcWrongPlace');
                            element.classList.add('WrongPlace');
                            break;
                        case 'WrongPlace':
                            element.classList.remove('WrongPlace');
                            element.classList.add('hcWrongPlace');
                            break;
                        case 'hcWrongLetter':
                            element.classList.remove('hcWrongLetter');
                            element.classList.add('WrongLetter');
                            break;
                        case 'WrongLetter':
                            element.classList.remove('WrongLetter');
                            element.classList.add('hcWrongLetter');
                            break;
                    }
                });
        });
    }

    // Function to add listElements to an array
    const _listElementsToArray = (listElements, inputFields) => {
        listElements.forEach(element => {
            const listOfInputs = element.querySelectorAll('input');

            inputFields.push(listOfInputs);
        });
    }

    return {
        generate5Letters: _generate5Letters,
        checkInputs: _checkInputs,
        addInputFields: _addInputFields,
        disableInputFields: _disableInputFields,
        changeToHcOrBack: _changeToHcOrBack,
        listElementsToArray: _listElementsToArray,
        getCookie: _getCookie,
        setCookie: _setCookie
    };
})();

const formList1 = document.getElementById('formList1');
const formList2 = document.getElementById('formList2');
const word = document.getElementById('word');
const submitButton = document.getElementById('submitButton');
const dmSwitch = document.getElementById('dmSwitch');
const hcSwitch = document.getElementById('hcSwitch');
const hiwWrongL = document.getElementById('hiwWrongL');
const hiwWrongP = document.getElementById('hiwWrongP');
const hiwCorrectL = document.getElementById('hiwCorrectL');

// Array that contains the how it works divs
const howItWorksDiv = [hiwWrongL, hiwWrongP, hiwCorrectL];

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

// word.innerHTML = module.getCookie('dailyWord');
word.innerHTML = 'fazaa';

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
    module.checkInputs(inputFields, word.textContent, hcSwitch);  
    // amountOfTries++;

    // module.setCookie('amountOfTries', amountOfTries, 1);

    // for (let i = 0; i < allListElements.length; i++) {
    //     let listElement = allListElements[i];
    //     let formList = allFormLists[i];

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

document.addEventListener("click", (event) => {
    const settingsMenu = document.getElementById("settingsMenu");
    const settingsIcon = document.getElementById("settingsIcon");

    if (!settingsMenu.contains(event.target) && event.target !== settingsIcon) {
        settingsMenu.classList.remove("settingsShown");
    }
}); 

hcSwitch.addEventListener('change', () => {
    if (hcSwitch.checked) {
        const allInputFields = [];

        allListElements.forEach(listElement => {
            module.listElementsToArray(listElement, allInputFields);
        });

        module.changeToHcOrBack(allInputFields, howItWorksDiv);
    } else {
        const allInputFields = [];

        allListElements.forEach(listElement => {
            module.listElementsToArray(listElement, allInputFields);
        });

        module.changeToHcOrBack(allInputFields, howItWorksDiv);
    }
});

/* Class for light mode: "lightmode". I've set the background-color for the ids of some elements, so when I tried adding the lightmode class
to an element that had that, it didn't work, and idk how I can fix this.

Class for high-contrast mode: the names "WrongLetter", "WrongPlace" and "CorrectPlace" are the original names. Add a "hc" before that for high-contrast. */