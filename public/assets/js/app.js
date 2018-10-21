// scrape
$("#scrape-btn").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).then(function(data) {
        console.log(data)
        window.location = "/"
    })
});

$("#clear-button").on("click", function () {
    $.ajax({
        method: "GET",
        url: "/clear"
    }).done(function(data) {
        console.log("CLEAR")
        window.location = '/'
    })
})

$(".btn-save").on("click", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/posts/saved/" + thisId
    }).done(function(data) {
        window.location = "/"
    })
}) 

$("#view-saved-button").on("click", function () {
    $.ajax({
        method: "GET",
        url: "/saved"
    }).done(function(data) {
        console.log("clicked-saved")

        // for right now, this just takes you to the json
        window.location = "/saved";
    })
})