$(function(){ 
	let form = $('#movie-search');
	form.submit(function(e){
		e.preventDefault();

		$.ajax({
			url: 'http://www.omdbapi.com/?',
			data: form.serialize()
		})
		.done(function(data){
			displayMovies(data);
		})
	});

	function displayMovies(data){
		let container = $("#movies");
		let htmlString = "";

		container.empty();

		if(data["Response"] == "False"){
			htmlString = `<div class="alert alert-danger text-center" role="alert">${data["Error"]}</div>`
		}
		else{
			data["Search"].forEach(function(movie){
				htmlString += `<img src = ${movie["Poster"] == "N/A" ? "/images/No-image-found.jpg" : movie["Poster"]} data-id = "${movie['imdbID']}" />
							   <p>${movie["Title"]}</p>
							   <p>${movie["Year"]}</p>`;
			});

		}
		container.append(htmlString);	
	}

	$('#movies').on('click','img',function(e){
		e.preventDefault();

		let id = $(e.target).data('id');

		$.ajax({
			url: `http://www.omdbapi.com/?`,
			data: {i: id}
		})

		.done(function(data){
			displayMovie(data)
		})
	});

	function displayMovie(data){
		let container = $("#movies")

		container.empty();
		console.log(data)

		let movieInfo = "";
		movieInfo += `<p><img src = ${data["Poster"]}</p>`;

	    $.each(data, function(key, value){
	    	if (key === "Poster")
	    		return true;
	    	movieInfo += `<p>${key}: ${value}</p>`;
	    })
		container.append(movieInfo)
	}
})