
    var config = {
        apiKey: "AIzaSyAFnq-YrY7MYOHrIKm5LR3IHl-8lFPSWpI",
        authDomain: "cse499healthmanagement.firebaseapp.com",
        databaseURL: "https://cse499healthmanagement.firebaseio.com",
        projectId: "cse499healthmanagement",
        storageBucket: "cse499healthmanagement.appspot.com",
        messagingSenderId: "638987735704"
    };
    firebase.initializeApp(config);


var database;
firebase.auth().onAuthStateChanged(function(user){
     if(user){
         document.getElementById("user_div").style.display = "block";
         document.getElementById("skin-black").style.display = "none";


         var user = firebase.auth().currentUser;

         if (user != null) {

             var email_id = user.email;
             var email_verified = user.emailVerified;

             if (email_verified){

                 document.getElementById("verify_btn").style.display = "none";
             }
             document.getElementById("user_para").innerHTML = "Welcome User : " + email_id + "<br/> Verified :" + email_verified;
         }


     }
     else {
         document.getElementById("skin-black").style.display = "none";
         document.getElementById("login_div").style.display = "block";

     }
 });

function login() {

    var userEmail = document.getElementById("email_field").value;
    var userpass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userpass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        window.alert("Error : " + errorMessage);
    });
    database = firebase.database();
    var userDataRef = firebase.database().ref("doctors").orderByKey();
	userDataRef.once("value").then(function(snapshot) {
	var alldata=[];
	snapshot.forEach(function(childSnapshot) 
	{
		  var key = childSnapshot.key;
		  var childData = childSnapshot.val();              

		  var name_val = childSnapshot.val().name;
		  var name_val1 = childSnapshot.val().doctor_email;
		  alldata.push(name_val);
		  alldata.push(name_val1);


		//  $("#name").append(name_val);
		 // $("#id").append(id_val);

	  });
	});
    var user = firebase.auth().currentUser;
    if(user)
        window.location.replace("index.html");


 }



 function create_account(){
     var userEmail = document.getElementById("email_field").value;
     var userpass = document.getElementById("password_field").value;


     firebase.auth().createUserWithEmailAndPassword(userEmail, userpass).catch(function(error) {
         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
         // ...
         window.alert("Error : " + errorMessage);
     });

 }



function send_varification() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        // Email sent.
        window.alert("verification sent")
    }).catch(function(error) {
        // An error happened.
        window.alert("error:" + error.message);
    });

}