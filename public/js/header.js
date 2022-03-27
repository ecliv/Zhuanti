//Banner's function
$(window).ready(function () {
    $.ajax({
        url: "/api/banner",

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

// Get the modal
var modal = document.getElementById("myModal");

var loginAcc = document.getElementById("account");

var span = document.getElementsByClassName("close")[0];

loginAcc.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

//login's function
function do_login() {
    var email = $("#exampleInputEmail").val();
    var pass = $("#exampleInputPassword").val();
    if (email != "" && pass != "") {
        $("#loading_spinner").css({ "display": "block" });
        $.ajax
            ({
                type: 'post',
                url: 'api/user/login',
                data: {
                    email: email,
                    password: pass
                },
                success: function (response) {
                    console.log(response)
                }
            });
    }

    else {
        alert("Please Fill All The Details");
    }

    return false;
}