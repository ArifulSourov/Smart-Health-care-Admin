
function dataset1()
{
	var userDataRef = firebase.database().ref("users").orderByKey();
	
	userDataRef.once("value").then(function(snapshot) 
	{
		var alldata=[];
		//var spaceline = [];
	
		snapshot.forEach(function(childSnapshot) 
		{
		  var key = childSnapshot.key;
		  var childData = childSnapshot.val();              

		 
		  var name_val = childSnapshot.val().name;
		  var name_val1 = childSnapshot.val().age;
		  var name_val2 = childSnapshot.val().phone_number;


		  //var id_val = childSnapshot.val().AssignedID;
		  alldata.push(name_val, name_val1, name_val2);
		  //document.write(----);
		  //alldata.push(name_val1);
		 // alldata.push(name_val2);

		  
	  	});
	  	createTable(alldata);
	 // 	createTable(spaceline);
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
	  //  var space = document.createElement('td');
	    cell.appendChild(document.createTextNode(i+1));
	    cell.appendChild(document.createTextNode(alldata[i]));
	   // space.appendChild(document.createTextNode(spaceline[]));
	    //cell.appendChild(document.createTextNode(alldata[i]));
	    //cell.appendChild(document.createTextNode(alldata[i]));

	    row.appendChild(cell);
	    tableBody.appendChild(row);
	}

	  table.appendChild(tableBody);
	  body.appendChild(table);
}
