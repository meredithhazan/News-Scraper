

$.getJSON("/saved", function(data) {
		console.log(data);
	var baseURL = "https://www.entrepreneur.com"; 	
	if (data.isSaved === true) {
		for (let i = 0; i < data.length; i++) {
			$("#articles").append("<h4 id='title'>" + data[i].title + "</h4>");
			$("#articles").append("<p id='topic'>Topic: " + data[i].topic + "</p>");
			$("#articles").append("<a href='" + baseURL + data[i].link + "' class='btn btn-outline-dark id='link'>Read Now</a> ");
			$("#articles").append("<button type='button' class='btn btn-outline-primary' data-id='" + data[i]._id + "' id='deleteArticle'>Delete It</button><hr />");
			$("#articles").append("<button type='button' class='btn btn-outline-primary' data-id='" + data[i]._id + "' id='createNote'>Take A Note</button><hr />");
	    }
	};
});
