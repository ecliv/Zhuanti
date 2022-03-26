function renderProduct(data) {
    let html = ''

    for (index in data) {
        const product = data[index]
        if (index % 3 == 0) {
            if (html.length > 0) {
                html += `</div></section>`
            }

            html += `<section class="container-fluid">
                        <div class="row justify-content-center content">`
        }

        html += `
            <div class="col-lg-4">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                    <img class="img-fluid" src="${product.image_url}" alt="" />
                    </div>
                    <div class="col-lg-6">
                    <h1 class="text-center">${product.name}</h1>
                    <p>${product.description}</p>
                    <p>HARGA: ${product.price}</p>
                    <p>quantity dropdown</p>
                    <button>Buy</button>
                    </div>
                </div>
            </div>
            `
    }

    html += `</div></section>`
    $("#products").html(html)
}

$(window).ready(function () {
    $.ajax({
        url: "api/product",
    }).done(function (data) {
        renderProduct(data)
    })
});

$('#selectionAll').on('click', function () {
    $.ajax({
        url: "api/product",
    }).done(function (data) {
        renderProduct(data)
    })
});

$('#selectionDrink').on('click', function () {
    $.ajax({
        url: "api/product?category_id=4",
    }).done(function (data) {
        renderProduct(data)
    })
});

$('#selectionBean').on('click', function () {
    $.ajax({
        url: "api/product?category_id=5",
    }).done(function (data) {
        renderProduct(data)
    })
});

$('#selectionMerch').on('click', function () {
    $.ajax({
        url: "api/product?category_id=3",
    }).done(function (data) {
        renderProduct(data)
    })
});

