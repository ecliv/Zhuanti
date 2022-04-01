$(window).ready(function () {
    const user = JSON.parse(localStorage.getItem('user'))
    $("#user_name").html(`${user.firstName || ""} ${user.lastName || ""}`)
})