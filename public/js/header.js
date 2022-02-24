$(window).ready(function () {
    $.ajax({
        url: "http://localhost:3000/api/banner",

    }).done(function (banners) {
        var html = '';

        banners.forEach((banner) => {
            console.log(banner.image_url)
            html += '<img src="' + banner.image_url + '" />'
        })

        html += '<div class="buttons">' +
            '<div class="prev"></div>' +
            '<div class="next"></div>' +
            '</div>';

        $("#banners").html(html)
        $("#banners img").first().addClass("shown")

        new Slider({
            images: '.slider-1 img',
            btnPrev: '.slider-1 .buttons .prev',
            btnNext: '.slider-1 .buttons .next',
            auto: true,
            rate: 10000
        });
    });
});