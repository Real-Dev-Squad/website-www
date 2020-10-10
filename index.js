const userLogin = document.querySelector("#user-login");

function setNameIfFound(name){
    if (name) {
        userLogin.innerHTML = `Hello, ${name}!`;    
    }
};

const fetchData = () => {
    fetch('https://staging-api.realdevsquad.com/users/self')
    .then(res => res.json())
    .then(res => {
        setNameIfFound(res.first_name)
    });
};

fetchData();
