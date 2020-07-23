// Creating a button Element
const div = document.createElement('div');
//Adding a input field and button into div Element
div.innerHTML =`
<div class="col-md-3 mx-auto">
<form>
<input type="text" class="form-control " id="email" placeholder="Please Enter Email ">
              <div class="invalid-feedback">
                Enter a valid email
              </div>        
              <br>
 <input type="submit" value="Subscribe" class="btn btn-primary "> 
           
</form>
</div>
 `;
const buttonDiv = document.getElementById('buttonDiv');
buttonDiv.style.padding="100px 100px";
//Append Element into the Html
buttonDiv.appendChild(div);

//Event listener over input field to validate after submiting
document.getElementById('email').addEventListener('blur', validateEmail);

// Performing E-mail Validation Over Input
function validateEmail() {
  const email = document.getElementById('email');
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  if(!re.test(email.value)){
    email.classList.add('is-invalid');
  } else {
    email.classList.remove('is-invalid');
  }
}