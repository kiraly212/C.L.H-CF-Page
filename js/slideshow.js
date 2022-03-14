$(window).on("load", function() {
    $("#thumbnail1 img").click(function() {
        let img_src = $(this).attr("src");
        $("#slideshow-image1 img").attr("src", img_src);
    });
});

$(window).on("load", function() {
    $("#thumbnail2 img").click(function() {
        let img_src = $(this).attr("src");
        $("#slideshow-image2 img").attr("src", img_src);
    });
});

$(window).on("load", function() {
    $("#thumbnail3 img").click(function() {
        let img_src = $(this).attr("src");
        $("#slideshow-image3 img").attr("src", img_src);
    });
});

$(window).on("load", function() {
    $("#thumbnail4 img").click(function() {
        let img_src = $(this).attr("src");
        $("#slideshow-image4 img").attr("src", img_src);
    });
});
