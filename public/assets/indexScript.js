
let omdbIds = ["tt3896198", "tt2911666", "tt0076759", "tt1375666", "tt0120338", "tt0119217", "tt1190536", "tt0942385", "tt0800039", "tt0119094"];

let key = "8e4b0c73";

/**
 * event listeners
 */

$("#search-button").on("click", (event) => {
    event.preventDefault();
    let title = $("#title-input").val().trim();

    $.ajax({
        method: "GET",
        url: `https://www.omdbapi.com/?apikey=${key}&s=${title}`,
        success: function (response) {
            $("#search-list").empty();
            $("#search-title").show();

            for (let i = 0; i < 4; i++) {
                $("#search-list").append(`<div class="col-6"> 
                <a href="/movie/${response.Search[i].imdbID}"><h2>${response.Search[i].Title}</h2></a>
                <img src=${response.Search[i].Poster}></img> </div>
                <hr>`);
            }
        }

    });
});

/**
 * main
 */

 $("#search-title").hide();