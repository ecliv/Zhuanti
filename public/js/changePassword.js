$("#changePasswordForm").submit((e) => {
    e.preventDefault()
    const newPassword = $("#newPassword").val()
    const confirmPassword = $("#confirmPassword").val()
    const oldPassword = $("#currentPassword").val()

    if (newPassword !== confirmPassword) {
        alert("Your password does not match!")
        return
    }

    const userData = JSON.parse(localStorage.getItem('user'))
    $.ajax({
        type: 'post',
        url: 'api/me/change-password',
        headers: {"Authorization": `jwt ${userData.token}`},
        data: {
            current_password: oldPassword,
            new_password: newPassword,
        },
        success: function (response) {
            if (response.is_success) {
                alert("Your password has been changed.")
                $("#changePasswordForm").trigger("reset")
            } else {
                alert(response.error_message)
            }
        }
    });
})