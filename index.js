const userLogin = document.querySelector("#user-login");
const loginBtn = document.querySelector('.btn-login');

const setName = (name) => {
    userLogin.innerHTML = `Hello, ${name}!`;
}

const fetchData = () => {
    fetch('./data.json')
    .then(res => res.json())
    .then(res => { 
        setTimeout(() => { 
            setName(res.first_name) 
        }
        ,2000);
    })
}

fetchData();


