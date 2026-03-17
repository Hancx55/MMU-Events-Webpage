document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form")
    const firstname_input = document.getElementById("firstname-input")
    const email_input = document.getElementById("email-input")
    const password_input = document.getElementById("password-input")
    const repeat_password_input = document.getElementById("repeat-password-input")
    const error_message = document.getElementById("error-message")

    if (!form) return

    form.addEventListener("submit", (e) => {
        let errors = []

        if (firstname_input) {
            errors = getSignupFormErrors(
                firstname_input.value,
                email_input.value,
                password_input.value,
                repeat_password_input.value
            )
        } else {
        }

        if (errors.length > 0) {
            e.preventDefault()
            if (error_message) error_message.innerText = errors.join(". ")
        }
    })

    const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(Boolean)

    allInputs.forEach(input => {
        input.addEventListener("input", () => {
            if (!input.parentElement) return
            if (input.parentElement.classList.contains("incorrect")) {
                input.parentElement.classList.remove("incorrect")
                if (error_message) error_message.innerText = ""
            }
        })
    })

    function getLoginFormErrors(email, password) {
        let errors = []

        if (!email) {
            errors.push("Email is required")
            email_input?.parentElement?.classList.add("incorrect")
        }
        if (!password) {
            errors.push("Password is required")
            password_input?.parentElement?.classList.add("incorrect")
        }

        return errors
    }

    function getSignupFormErrors(firstname, email, password, repeatPassword) {
        const errors = []

        if (!firstname) {
            errors.push("Firstname is required")
            firstname_input?.parentElement?.classList.add("incorrect")
        }
        if (!email) {
            errors.push("Email is required")
            email_input?.parentElement?.classList.add("incorrect")
        }
        if (!password) {
            errors.push("Password is required")
            password_input?.parentElement?.classList.add("incorrect")
        }
        if(password.length < 8) {
            errors.push("Password must be at least 8 characters long")
            password_input?.parentElement?.classList.add("incorrect")
        }
        if (password !== repeatPassword) {
            errors.push("Passwords do not match")
            repeat_password_input?.parentElement?.classList.add("incorrect")
            password_input?.parentElement?.classList.add("incorrect")
        }

        return errors
    }
})

