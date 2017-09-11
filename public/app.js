
$(document).on("click", "#scrape", function() {
	$("articles").empty();
	$.ajax({
		method: "GET",
		url: "/scrape/"
	});
	scrapeArticles();
});

function scrapeArticles() {
	$.getJSON("/articles", function(data) {
   	  //$("#articles").empty();	
   	var baseURL = "https://www.entrepreneur.com"; 	
	for (var i = 0; i < data.length; i++) {
		$("#articles").append("<h4 id='title'>" + data[i].title + "</h4>");
		$("#articles").append("<p id='topic'>Topic: " + data[i].topic + "</p>");
		$("#articles").append("<a href='" + baseURL + data[i].link + "' class='btn btn-outline-dark id='link'>Read now</a> ");
		$("#articles").append("<button type='button' class='btn btn-outline-primary' data-id='" + data[i]._id + "' id='saveArticle'>Save it for later</button><hr />");
	    }
    });	
}

$(document).on("click", "#saveArticle", function() {
	var thisId = $(this).attr("data-id");
	$.ajax({
		method: "POST",
		url: "/saved/" + thisId,
		data: {
			title: $("#title").val().trim(),
			topic: $("#topic").val().trim(),
			link: $("#link").val().trim()
		}
	})
	.done(function(data) {
		console.log(data);
	});
});





