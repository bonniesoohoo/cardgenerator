var fs = require('fs'),
    filedata = fs.read('doc.tsv').split(/\n/);

var MAP = [
	"firstname",
	"lastname",
	"creds",
	"name",
	"position",
	"bio",
	"biolength",
	"email",
	"phone",
	"internalphone",
	"homeoffice",
	"birthday",
	"hiredate"
]

function generateCard(i) {
	var row = filedata[i].split(/\t/);
	var args = "?";
	for(var a=0; a<row.length; a++) {
		//console.log(MAP[a] + "   " + row[a])
		args += (MAP[a] + "=" + (row[a] || "%20") + "&");
	}
	var page = require('webpage').create();
	page.open('http://localhost:8000/card.html' + args, function() {
		var file = row[MAP.indexOf("name")].replace(/\s/g, "").toLowerCase();
		console.log("Saving " + file + ".png")
	    page.render("output/" + file + '.png');
	    if( i + 1 < filedata.length ) { 
	    	generateCard(i + 1);
	    } else {
	    	phantom.exit();
	    }
	});	
}

generateCard(1)