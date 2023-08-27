const DROPDOWN_OPTIONS = [
  {
    name: 'Home',
    link: 'https://www.realdevsquad.com/',
  },
  {
    name: 'Status',
    link: 'https://my.realdevsquad.com/',
  },
  {
    name: 'Profile',
    link: 'https://my.realdevsquad.com/profile',
  },
  {
    name: 'Tasks',
    link: 'https://my.realdevsquad.com/tasks',
  },
  {
    name: 'Identity',
    link: 'https://my.realdevsquad.com/identity',
  },
];

const generateDropDown = () => {
  const dropdown = document.getElementById('dropdown');
  const unorderedList = createElement({
    type: 'ul',
    classList: ['dropdown-list'],
  });
  DROPDOWN_OPTIONS.map((option) => {
    const listElement = createElement({
      type: 'li',
      classList: ['dropdown-item'],
    });
    const anchorElement = createElement({
      type: 'a',
      classList: ['dropdown-link'],
    });
    anchorElement.href = `${option.link}`;
    anchorElement.innerText = `${option.name}`;
    listElement.append(anchorElement);
    unorderedList.append(listElement);
  });

  const horizontalLine = createElement({
    type: 'hr',
    classList: ['line'],
  });
  const signOutElement = createElement({
    type: 'li',
    classList: ['dropdown-item', 'dropdown-link'],
    id: 'signout-option',
  });
  signOutElement.innerText = 'Sign Out';
  unorderedList.append(horizontalLine);
  unorderedList.append(signOutElement);
  dropdown.append(unorderedList);
};

generateDropDown();
