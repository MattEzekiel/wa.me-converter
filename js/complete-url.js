const phone = document.querySelector('#phone');
const message = document.querySelector('#message');

const completeUrl = () => {
    const phoneValue = phone.value;
    const messageValue = message.value;

    clearErrors();

    if (!phoneValue && messageValue) {
        displayErrors('message');
        return;
    }

    if (Number.isNaN(parseInt(phoneValue))) {
        displayErrors('phone');
        return;
    }

    if (phone.classList.contains('error')) {
        phone.classList.remove('error');
    }

    let url = `https://wa.me/${phoneValue.replace(/[^\w\s]/gi, "").replace(/\s+/g, "")}`;
    if (messageValue) {
        url += `?text=${encodeURIComponent(messageValue)}`;
    }

    document.querySelector('#code p').innerText = 'Copy this link to your browser:';

    implementCode(url);
}

function implementCode(code) {
    const codeElementDOM = document.querySelector('code');

    if (!codeElementDOM) {
        const codeElement = document.createElement('code');
        codeElement.textContent = code;
        document.querySelector('#code').insertAdjacentHTML('beforeend', codeElement.outerHTML);
        init();
        return;
    }

    codeElementDOM.innerText = code;
    init();
}

function init() {
    document.querySelector('code').addEventListener('click', copyCode);
}

function copyCode() {
    const url = this.innerText;
    navigator.clipboard.writeText(url).then(() => {
        if (!document.querySelector('.copied')) {
            this.insertAdjacentHTML('afterend', '<small class="copied">Copied in your clipboard!</small>');
        }
    }).then(() => {
       setTimeout(() => {
           if (document.querySelector('.copied')) {
               document.querySelector('.copied').remove();
           }
       }, 6000);
    });
}

function displayErrors(target) {
    if (target === 'phone') {
        phone.classList.add('error');
        phone.insertAdjacentHTML('afterend', '<small class="error-message">Please enter a valid phone number, only numbers</small>');
    }

    if (target === 'message') {
        message.classList.add('error');
        message.insertAdjacentHTML('afterend', '<small class="error-message">Please enter a message phone number first</small>');
    }
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => {
        error.remove();
    });
}

phone.addEventListener('input', completeUrl);
message.addEventListener('input', completeUrl);
