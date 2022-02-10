$(window).ready(function () {
    $.ajax({
        url: "http://localhost:3000/api/banner",

    }).done(function (data) {
        console.log(data);
    });
});