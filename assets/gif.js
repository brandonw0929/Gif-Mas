var topics = ["Christmas", "Santa", "Reindeer", "Christmas Tree", 
"Snow", "All I Want for Christmas is You", "Winter", "The Grinch","A Christmas Story",
"Frosty the Snowman", "Eggnog", "Disney Christmas"];

function populateGIFContainer(xmas){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + xmas + 
		"&api_key=dc6zaTOxFJmzC&rating=pg&rating&limit=10",
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("singleGIF").append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gifPIC").attr("state", "still");
			newImage.attr("stillData", element.images.fixed_height_still.url);
			newImage.attr("animatedData", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gifContainer").append(newDiv);
		});
		
		$(".gifPIC").unbind("click");
		$(".gifPIC").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animatedData"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("stillData"));
			}
		});
	});
}

function renderBTN(){
	for(var i = 0; i < topics.length; i++) {
		var newBTN = $("<button>");
		newBTN.addClass("btn");
		newBTN.addClass("gifBTN");
		newBTN.text(topics[i]);
		$("#buttonContainer").append(newBTN);
	}
	$(".gifBTN").unbind("click");

	$(".gifBTN").on("click", function(){
		$(".gifPIC").unbind("click");
		$("#gifContainer").empty();
		populateGIFContainer($(this).text());
	});

}

function addBTN(xmas){
	if(topics.indexOf(xmas) === -1) {
		topics.push(xmas);
		$("#buttonContainer").empty();
		renderBTN();
	}
}

$(document).ready(function(){
	renderBTN();
	$("#submit").on("click", function(){
		event.preventDefault();
		addBTN($("#christmasJoy").val().trim());
		$("#christmasJoy").val("");
	});
});