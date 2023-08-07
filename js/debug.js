let dummyData = './dummyData.json';
let url = `http://localhost:3000/users/shubham-raj`;

let profilePic = document.querySelector('.profilePic');
let username = document.querySelector('.username');
let fullname = document.querySelector('.fullname');
let rdsId = document.querySelector('.id');
let discordJoinedAt = document.querySelector('.discordJoinedAt');
let github_display_name = document.querySelector('.github_display_name');
let incompleteUserDetails = document.querySelector('.incompleteUserDetails');
let all_roles = document.querySelector('.all-roles');
let twitter_id = document.querySelector('.twitter_id');
let github_id = document.querySelector('.github_id');
let linkedin_id = document.querySelector('.linkedin_id');
let discordId = document.querySelector('.discordId');
let toggleButton = document.querySelector('.toggle-button');
let toggle = document.querySelector('.toggle');

let feilds = [
  ,
  profilePic,
  username,
  fullname,
  rdsId,
  discordJoinedAt,
  github_display_name,
  incompleteUserDetails,
  all_roles,
  twitter_id,
  github_id,
  linkedin_id,
  discordId,
];

const fetchUserDetails = async () => {
  const res = await fetch(url);
  const result = await res.json();
  console.log(result);
  feilds.forEach((feild) => {
    switch (feild.className) {
      case 'fullname':
        feild.innerText = (
          result.user.first_name + result.user.last_name
        ).toUpperCase();
        break;
      case 'profilePic':
        console.log(result.user.picture.url);
        feild.src = result.user.picture.url;
      case 'all-roles':
        for (role in result.user.roles) {
          let content = `<p class="roles"><b>${role} :</b> ${result.user.roles[role]}</p>`;
          feild.innerHTML = feild.innerHTML + content;
          // insertAdjacentHTML('beforeend', '<li>third</li>')
        }
        break;
      default:
        feild.innerText = result.user[feild.className];
        break;
    }
  });
};
fetchUserDetails();

//TOGGLE

let currToggleState = false;

toggle.addEventListener('click', (e) => {
  if (!currToggleState) {
    currToggleState = !currToggleState;
    toggle.classList.toggle('applied');
    toggleButton.style.backgroundColor = 'rgb(0, 255, 8)';
  } else {
    currToggleState = !currToggleState;
    toggleButton.style.backgroundColor = 'rgb(255, 0, 43)';
    toggle.classList.toggle('applied');
  }
});
