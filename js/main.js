function setUserGreeting(username, firstName){
    if (username) {
        const userLoginEl = document.querySelector('.btn-login');
        
        const greetingEl = document.querySelector('.user-greet');
        const msgGreetMsgEl = document.querySelector('.user-greet-msg');
        const userImgEl = document.querySelector('.user-profile-pic');

        const greetMsg = `Hello, ${firstName}!`;
        msgGreetMsgEl.innerText = greetMsg;
        const userImgURL = `https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members/${username}/img.png`
        userImgEl.src = userImgURL;

        greetingEl.style.display = 'block';
        userLoginEl.style.display = 'none';
    }
};

function fetchData () {
    fetch('https://api.realdevsquad.com/users/self', {
        headers: {'content-type': 'application/json'},
        credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
        if(res.incompleteUserDetails){
            return window.location.replace('https://my.realdevsquad.com/signup')
        }
        setUserGreeting(res.username, res.first_name);
    });
};

window.addEventListener('DOMContentLoaded', fetchData);
