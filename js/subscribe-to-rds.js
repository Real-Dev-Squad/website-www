
function SubscribeRDS(){
	this.firebase = null;
	
	this.srcArray  = [
	"https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js",
	"https://www.gstatic.com/firebasejs/7.17.1/firebase-database.js"];
	
	this.firebaseConfig = {
		apiKey: "AIzaSyDw-ey9ur4n2UGDrqORomNYkjsC_xShAyo",
		authDomain: "realdevsquad-ffd38.firebaseapp.com",
		databaseURL: "https://realdevsquad-ffd38.firebaseio.com",
		projectId: "realdevsquad-ffd38",
		storageBucket: "realdevsquad-ffd38.appspot.com",
		messagingSenderId: "782955653404",
		appId: "1:782955653404:web:d9703542121f51bc71f2d9",
		measurementId: "G-3H138QV9KE"
	};
	
	
	this.initialize = function(){
		document.addEventListener("DOMContentLoaded",function(e){
			this.addSubscribeLink();
			this.addFirebaseScripts(this.srcArray);
			this.addSubscribeElement();
			this.subscribeListener();
		}.bind(this));
	}
	
	
	this.addFirebaseScripts = function(srcArray){
		let scriptsNode = [];
		let headNode = document.getElementsByTagName("head")[0];
		let status = false;
		srcArray.forEach(function(valueOfSrc){
			let script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = valueOfSrc;
			scriptsNode.push(script);
			headNode.appendChild(script);
		});	
		
		scriptsNode[scriptsNode.length-1].onload = ()=>{
			this.firebaseInitialize();
		}
	}
	
	this.addSubscribeLink = function(){
		let headNode = document.getElementsByTagName("head")[0];
		let linkNode = document.createElement('link');
		linkNode.rel = "stylesheet";
		linkNode.href = "./css/subscribe.css";
		headNode.appendChild(linkNode);
	}
	
	this.firebaseDatabase = null;

	this.firebaseInitialize = function(){
		this.firebase = firebase.initializeApp(this.firebaseConfig);
		this.firebaseDatabase = this.firebase.database();
	}

	this.addSubscribeElement = function(){
		let footerNode = document.getElementsByTagName("footer")[0];
		let subscribeNode = document.createElement("div");
		subscribeNode.classList.add("subscribe");
		subscribeNode.innerHTML = 
		`<div class="subscribe__heading">
			<span>Want to stay updated?</span>
			<span>Subscribe to  our Newsletter</span>
		</div>
		<div class="subscribe__inner">
			<input class="subscribe__input" placeholder="Enter Email address" />
			<button class="subscribe__button">Subscribe</button>
		</div>
		<div class="subscribe_status"></div>`;

		footerNode.prepend(subscribeNode);
	}


	this.subscribeListener = function(){
		let subscribe_button = document.getElementsByClassName("subscribe__button")[0];
		subscribe_button.addEventListener("click",function(event){ 
			let subscribe_email = document.getElementsByClassName("subscribe__input")[0].value;
			var message = null;
			let fn_this = this;
			if(ValidateEmail(subscribe_email)){
				try{
					this.firebaseDatabase.ref().child("users").orderByChild("email").equalTo(subscribe_email).
					once("value",function(snapshot) {
								if (snapshot.exists()) {
									fn_this.message="You have already subscribed to our newsletter.";
									fn_this.showMessage();
								}else{
									let nextId = null;
									fn_this.firebaseDatabase.ref('next/id').once('value',function(snapshot) {
										nextId  = snapshot.val(); 
										fn_this.firebaseDatabase.ref("next").set({
											id: nextId + 1
										});
										fn_this.firebaseDatabase.ref('users/'+nextId).set({
											email: subscribe_email
										});
										fn_this.message="You have subscribed to our newsletter.";
										fn_this.showMessage();
									});
							}
						});
				}catch(err){
					this.message = "Something is wrong";
				}
				this.showMessage();
			}else{
				this.message = "Please enter valid email address";
				this.showMessage()
				alert(this.message); //can be removed if not necessary
				
			}


		}.bind(this));
	}

	this.message = null;
	
	this.showMessage = function(){
		let subscribe_status_node = document.getElementsByClassName("subscribe_status")[0];
		subscribe_status_node.innerText = this.message; 
	}



	this.initialize();
}



/** check email is valid or not */
function ValidateEmail(mail) 
{
	return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
}



new SubscribeRDS();



