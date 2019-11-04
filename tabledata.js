
function dataset()
{
	var userDataRef = firebase.database().ref("doctors").orderByKey();
	
	userDataRef.once("value").then(function(snapshot) 
	{
		var alldata=[];
	
		snapshot.forEach(function(childSnapshot) 
		{
		  var key = childSnapshot.key;
		  var childData = childSnapshot.val();              

		 
		  var name_val = childSnapshot.val().doctor_email;
		  var name_val1 = childSnapshot.val().name;
		  //var id_val = childSnapshot.val().AssignedID;
		  alldata.push(name_val,name_val1);
		  //alldata.push(name_val1);

		  

		//  $("#name").append(name_val);
		 // $("#id").append(id_val);

	  	});
	  	createTable(alldata);
	});
	
}


function createTable(alldata)
{
	///alert(alldata[0]);
	var body = document.getElementsByTagName('body')[0];
	var table = document.createElement('table');
	var tableBody = document.createElement('tbody');
	var l=alldata.length,i;
	//alert(l);
	for(i=0;i<l;i++)
	{
		var row = document.createElement('tr');
	    var cell = document.createElement('td');
	    cell.appendChild(document.createTextNode(i+1));
	    cell.appendChild(document.createTextNode(alldata[i]));
	    //cell.appendChild(document.createTextNode(alldata[i]));
	    row.appendChild(cell);
	    tableBody.appendChild(row);
	}

	  table.appendChild(tableBody);
	  body.appendChild(table);
}
