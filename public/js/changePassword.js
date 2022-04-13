function changePassword() {
    const newPassword = $("#newPassword").val()
    const confirmPassword = $("#confirmPassword").val()
    const oldPassword = $("#currentPassword").val()

    if (newPassword !== confirmPassword) {
        alert("Your password does not match!")
        return
    }

    
}