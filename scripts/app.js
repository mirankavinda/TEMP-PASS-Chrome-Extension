const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const specials = ["!", "@", "#", "$", "%", "&", "*", "-", "_", "?", "~"];
const lettersLowerCase = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
const lettersUpperCase = lettersLowerCase.map(letter => letter.toUpperCase());
// generated password input
const generatedPasswordInput = document.getElementById('generatedPassword');

// range input (password length)
const passwordLength = document.querySelector('input[type=range');

// all checkbox inputs
const allCheckboxs = document.querySelectorAll('input[type=checkbox');

const generatePassword = (length) => {
    // update count in UI
    document.getElementById('charLengthSpan').textContent = passwordLength.value;

    // checked states?
    const includeDigits = document.getElementById('includeDigits').checked;
    const specialChar = document.getElementById('specialChar').checked;
    const letterMix = document.getElementById('letterMix').checked;

    // reset generated password input
    generatedPasswordInput.value = '';

    // reset possible characters each time function
    let possiblePasswordChars = [];
    // checks to add digits
    if (includeDigits) { digits.forEach(digit => { possiblePasswordChars.push(digit) }) }
    // checks to special char
    if (specialChar) { specials.forEach(special => { possiblePasswordChars.push(special) }) }
    // checks for mix uppercase and lowercase numbers
    if (letterMix) {
        lettersLowerCase.forEach(letter => possiblePasswordChars.push(letter));
        lettersUpperCase.forEach(letter => possiblePasswordChars.push(letter));
    } else {
        lettersLowerCase.forEach(letter => possiblePasswordChars.push(letter));
    }

    for (let i = 0; i <= length; i++) {
        generatedPasswordInput.value += possiblePasswordChars[Math.floor(Math.random() * possiblePasswordChars.length)];
    }
}

generatePassword(passwordLength.value);

passwordLength.addEventListener('change', e => {
    let value = e.target.value;
    generatePassword(value)
});

allCheckboxs.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        generatePassword(passwordLength.value);
    });
});

// copy password to clipboard
const copyPasswordBtn = document.getElementById('copyPassword');
const confirmation = document.getElementById('confirmation');
copyPasswordBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(generatedPasswordInput.value);
    confirmation.classList.add('active');
    setTimeout(() => {
        confirmation.classList.remove('active');
    }, 2000)
})