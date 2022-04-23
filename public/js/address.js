$("#setAddressForm").submit((e) => {
    e.preventDefault()

    const alias = $("#alias").val()
    const phone = $("#phoneNumber").val()
    const address = $("#addressLine").val()
    const postalCode = $("#postalCode").val()

    let userData = JSON.parse(localStorage.getItem('user'))

    $.ajax({
        type: 'post',
        url: 'api/address',
        headers: {"Authorization": `jwt ${userData.token}`},
        data: {
            "alias": alias,
            "phone_number": phone,
            "address_line": address,
            "postal_code": postalCode
        },
        success: function (response) {
            alert("Your address has been saved.")
            window.location.href = "account"
        }
    });
})