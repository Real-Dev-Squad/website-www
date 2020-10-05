const userLogin = document.querySelector("#user-login");

const setName = (name) => {
    if (name) {
        userLogin.innerHTML = `Hello, ${name}!`;    
    }
}

const fetchData = () => {
    fetch('https://staging-api.realdevsquad.com/users/self')
    .then(res => res.json())
    .then(res => {
        setName(res.first_name)
    })
}

fetchData();


