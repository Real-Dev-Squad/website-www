var firebaseConfig = {
    apiKey: "AIzaSyDw-ey9ur4n2UGDrqORomNYkjsC_xShAyo",
    authDomain: "realdevsquad-ffd38.firebaseapp.com",
    databaseURL: "https://realdevsquad-ffd38.firebaseio.com",
    projectId: "realdevsquad-ffd38",
    storageBucket: "realdevsquad-ffd38.appspot.com",
    messagingSenderId: "782955653404",
    appId: "1:782955653404:web:d9703542121f51bc71f2d9",
    measurementId: "G-3H138QV9KE"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();

/** function for adding email to database
	1: check the users exits or not
	2: if not then add email to the database
	3: if yes, assign string to message
	var nextId is used for giving index to next entry.
 */
async function addEmail(email,callback){
	var message = null;
	await database.ref().child("users").orderByChild("email").equalTo(email).once("value").
		then(async function(snapshot) {
				console.log(`Exits: ${snapshot.exists()}`);
				if (snapshot.exists()) {
					message="You have already subscribed to our newsletter.";
				}else{
					let nextId = null;
					await database.ref('next/id').once('value',function(snapshot) {
						nextId  = snapshot.val(); 
						database.ref("next").set({
							id: nextId + 1
						});
						database.ref('users/'+nextId).set({
							email
						});
						message="You have subscribed to our newsletter.";
				});
			}
		}).catch((err)=>{
		message = "Something is wrong";
		console.log(`addEmail fn 
			Error : ${err}`);
	});
	return message;
}


var subscribe_button = document.getElementsByClassName("subscribe__button")[0]; //subscribe button Node
/** onClick Event Listener for subscribe button */
subscribe_button.addEventListener("click",async function(event){ 
	// Note: Async Await Function Callback
	let subscribe_email = document.getElementsByClassName("subscribe__input")[0].value;
	let subscribe_status_node = document.getElementsByClassName("subscribe_status")[0];
	let message = null;
	console.log(subscribe_email);
	if(ValidateEmail(subscribe_email)){
		message = await addEmail(subscribe_email);
		console.log(`Message : ${message}`);
		subscribe_status_node.innerText = message;
	}else{
		message = "Please enter valid email address";
		alert(message); //can be removed if not necessary
		subscribe_status_node.innerText = message;
	}
});

/** check email is valid or not */
function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return true;
  }else{
    return false;
  }
}




