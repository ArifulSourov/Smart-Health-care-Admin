
function dataInit()
{
	var userDataRef = firebase.database().ref("doctors").orderByKey();
	
	userDataRef.once("value").then(function(snapshot) 
	{
		var names=[];
		var isapp=[];
		var email=[];
		snapshot.forEach(function(childSnapshot) 
		{
		  var key = childSnapshot.key;
		  var childData = childSnapshot.val();              

		 
		  var app_val = childSnapshot.val().isApproved;
		  var name_val = childSnapshot.val().name;
		  var em=childSnapshot.val().doctor_email;
		  var dt=app_val;
		  //var id_val = childSnapshot.val().AssignedID;
		  
		  	if(dt!="true"&&dt!="True"){
			  names.push(name_val);
			  isapp.push(dt);
			  email.push(em);
			}
		  

		  

		//  $("#name").append(name_val);
		 // $("#id").append(id_val);

	  	});
	  	createTablel(names,isapp,email);
	});
	
}


function createTablel(names,isapp,email)
{

	//alert(isapp.length);
	
	var body = document.getElementById("baal"); 
	var table = document.createElement('table');
	table.setAttribute('class', 'table table-bordered table-hover');
	var header=  document.createElement('thead')
    var headingRow = document.createElement('tr')

    var headingCell1 = document.createElement('td')
    var headingText1 = document.createTextNode('SL')
    headingCell1.appendChild(headingText1)
    headingRow.appendChild(headingCell1)
    
    var headingCell2 = document.createElement('td')
    var headingText2 = document.createTextNode('Name')
    headingCell2.appendChild(headingText2)
    headingRow.appendChild(headingCell2)

    var headingCell22 = document.createElement('td')
    var headingText22 = document.createTextNode('Email')
    headingCell22.appendChild(headingText22)
    headingRow.appendChild(headingCell22)

    var headingCell3 = document.createElement('td')
    var headingText3 = document.createTextNode('Approve?')
    headingCell3.appendChild(headingText3)
    headingRow.appendChild(headingCell3)

    header.appendChild(headingRow)
    table.appendChild(header)
	var tableBody = document.createElement('tbody');
	var l=names.length,i;
	for(i=0;i<l;i++)
	{
		var row = document.createElement('tr');
	    var cell = document.createElement('td');
	    cell.appendChild(document.createTextNode(i+1));
	    row.appendChild(cell);
	    var cell2 = document.createElement('td');
	    cell2.appendChild(document.createTextNode(names[i]));
	    row.appendChild(cell2);
	    var cell22 = document.createElement('td');
	    cell22.appendChild(document.createTextNode(email[i]));
	    row.appendChild(cell22);
	    var cell3 = document.createElement('td');
	    var btn = document.createElement('input');
		btn.type = "button";
		btn.value="Approve";
		var tmp=email[i];
		btn.onclick = (function(tmp) {return function() {approveDoc(tmp);}})(tmp);
		cell3.appendChild(btn);
	    row.appendChild(cell3);
	    tableBody.appendChild(row);
	    
	}
	  table.appendChild(tableBody);
	  body.appendChild(table);
}

function approveDoc(tmp)
{
	var db = firebase.database();
	var query = db.ref("doctors").orderByChild("doctor_email").equalTo(tmp);

	query.once("child_added", function(snapshot) {
	  snapshot.ref.update({ isApproved: "True" })
	});
	alert("Doctor Approved");
	location.reload(); 
}
