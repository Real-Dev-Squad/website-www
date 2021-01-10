function changeCSS() {
  const elementToManipulate = document.getElementById("topNavBar");
  if (elementToManipulate.className === "topnav") {
    elementToManipulate.className += " " + "responsive";
  } else {
    elementToManipulate.className = "topnav";
  }
}
