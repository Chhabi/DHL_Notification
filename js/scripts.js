//Function that splits the text file to each line and further to each data field.
function split_function(contents_file){

	//array with number of days in month
	var daysinMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

	//we will push the order id in this array while looping through each line in DHL
	var order_list = [];

	//days difference calculator
	var difference_indays = [];

	//For the yy, mm and dd; as well as getting it as a whole string,
	var today = new Date();
	var yy = today.getFullYear();
	var yy_ = yy.toString();	//string type

	var mm = today.getMonth()+1;
		if (mm<10){
			mm = "0".concat(mm);
		}

	var mm_ = mm.toString();	//string type

	var dd = today.getDate();
	var dd_ = dd.toString();	//string type

	//date in String datatype
	var today_ = yy_.concat(mm_,dd_);






	var lines = contents_file.split("\n");

	//getting the number of lines
	var lines_count = lines.length;

	var i=0;
	for (i=1;i<lines_count-1;i++){
		//now we get the each data-value from the text file
		var words = lines[i].split(";");
		
		//Einlieferdatum
		var senddate = words[9];
		// alert(senddate);

		//Zustelldatum
		var receiveddate = words[10];
		// alert(receiveddate);

		if (receiveddate==""){
			
			//Extracting the date from 
			var _year = senddate.substr(0,4);
			var _year_ = Number(_year);		//year in number datatype

			var _day = senddate.substr(6,2);
			var _day_ = Number(_day);	//day in number datatype

			//its a bit different for month since we need to consider no. of days in old month and the fact that we have a string datatype
			var _month = senddate.substr(4,2);
			var _month_ = Number(_month);	//month in number data type
			

			//difference in month in between the sending date and the current date
			var diff = mm - _month_;
			var days_diff;


			//checking month differtence and the day difference later.
			if (diff == 0){
				days_diff = dd - _day_;

				if (days_diff >= 5){
					order_list.push(words[17]);
					difference_indays.push(days_diff);
				}

				// alert("The order was delivered " + days_diff + " days ago! Please check on this! " );
			}
			else if(diff==1){

				//calculating difference in number of days in between 2 months.
				days_diff = ( (daysinMonth[_month_] - _day_ ) + dd) 

				if (days_diff >= 5){
					order_list.push(words[17]);
					difference_indays.push(days_diff);
				}
			}
			else if(diff >= 2){
				order_list.push(words[17]);
				difference_indays.push(days_diff);

			}
			else{
				alert("Invalid");
			}

		}

	}

	for (i=0;i<order_list.length;i++){
		console.log(order_list[i]);
	}


	var message_content = [];
	for (var j=0;j<order_list.length;j++){
		var mc = "Order ID " .concat (order_list[j], "    |     Delivered around " ,difference_indays[j], " days ago.");
		message_content.push(mc);
	}

	for (i=0;i<order_list.length;i++){
		console.log(message_content[i]);
	}



	document.getElementById("email_content").innerHTML = message_content[0];

	for (i=1;i<order_list.length;i++){
		$("email_content").append(message_content[i]);
	}

	// This displays the contents of the email.
	// alert(document.getElementById("email_content").innerHTML);

}




// $('#upload').click(function() {
// $.ajax({
//   type: "POST",
//   url: "goo.gl/rDI6Qg",
//   data: {
//     'key': 'rmGq-MnWRKnKpCU0YGP75g',
//     'message': {
//       'from_email': 'YOUR@EMAIL.HERE',
//       'to': [
//           {
//             'email': 'btiwaree.groupesales@gmail.com',
//             'name': 'Bishesh Tiwaree',
//             'type': 'to'
//           },
//           {
//             'email': 'bisheshtiwaree@gmail.com',
//             'name': 'Bishesh Tiwaree',
//             'type': 'to'
//           }
//         ],
//       'autotext': 'true',
//       'subject': 'YOUR SUBJECT HERE!',
//       'html': "asddsaasad"
//     }
//   }
//  }).done(function(response) {
//    console.log(response); // if you're into that sorta thing
//  });

// });


// Deprecated!!!
function DateToday(){

var today = new Date();
var yy = today.getFullYear();
var yy_ = yy.toString();

var mm = today.getMonth()+1;
	if (mm<10){
		mm = "0".concat(mm);
		// alert(mm)
	}

var mm_ = mm.toString();

var dd = today.getDate();
var dd_ = dd.toString();

var today_ = yy_.concat(mm_,dd_);
console.log(today_);
return today_;

}



//		http://jsfiddle.net/0GiS0/nDVYd/
window.onload = function() {

    //Check File API support
    if (window.File && window.FileList && window.FileReader) {
        var filesInput = document.getElementById("files");

        filesInput.addEventListener("change", function(event) {

            var files = event.target.files; //FileList object
            var output = document.getElementById("result");

            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                //Only plain text
                if (!file.type.match('plain')) continue;

                var picReader = new FileReader();

                picReader.addEventListener("load", function(event) {

                    var textFile = event.target;

                    var contents_file = textFile.result;
                    split_function(contents_file);
                });

                //Read the text file
                picReader.readAsText(file);
            }

        });
    }
    else {
        alert("Your browser does not support File API");
    }
}



