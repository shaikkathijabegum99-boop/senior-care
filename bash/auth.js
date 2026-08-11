document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       THEME TOGGLE
    ================================================== */

    const themeBtn = document.getElementById("themeToggle");
    const themeIcon = themeBtn?.querySelector("i");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {

        document.documentElement.setAttribute(
            "data-theme",
            savedTheme
        );

        updateThemeIcon(savedTheme);

    }


    themeBtn?.addEventListener("click", () => {

        const currentTheme =
            document.documentElement.getAttribute("data-theme") ||
            "light";

        const newTheme =
            currentTheme === "light"
                ? "dark"
                : "light";

        document.documentElement.setAttribute(
            "data-theme",
            newTheme
        );

        localStorage.setItem(
            "theme",
            newTheme
        );

        updateThemeIcon(newTheme);

    });


    function updateThemeIcon(theme) {

        if (!themeIcon) return;

        themeIcon.className =
            theme === "dark"
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";

    }



    /* ==================================================
       RTL TOGGLE
    ================================================== */

    const rtlBtn = document.getElementById("rtlToggle");

    const savedDirection =
        localStorage.getItem("direction");

    if (savedDirection) {

        document.documentElement.setAttribute(
            "dir",
            savedDirection
        );

    }


    rtlBtn?.addEventListener("click", () => {

        const html = document.documentElement;

        const currentDirection =
            html.getAttribute("dir") || "ltr";

        const newDirection =
            currentDirection === "ltr"
                ? "rtl"
                : "ltr";

        html.setAttribute(
            "dir",
            newDirection
        );

        localStorage.setItem(
            "direction",
            newDirection
        );

    });



    /* ==================================================
       PASSWORD EYE TOGGLE
       PASSWORD + CONFIRM PASSWORD
    ================================================== */

    const passwordBoxes =
        document.querySelectorAll(".password-box");


    passwordBoxes.forEach((box) => {

        const input =
            box.querySelector("input");

        const toggle =
            box.querySelector(".toggle-password");


        if (!input || !toggle) return;


        toggle.addEventListener("click", (event) => {

            event.preventDefault();


            if (input.type === "password") {

                input.type = "text";

                toggle.classList.remove(
                    "fa-eye"
                );

                toggle.classList.add(
                    "fa-eye-slash"
                );

                toggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                input.type = "password";

                toggle.classList.remove(
                    "fa-eye-slash"
                );

                toggle.classList.add(
                    "fa-eye"
                );

                toggle.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        });

    });



    /* ==================================================
       SIGNUP FORM
    ================================================== */

    const authForm =
        document.querySelector(".signup-form");

    const authButton =
        document.querySelector(".auth-btn");


    authForm?.addEventListener("submit", (event) => {

        event.preventDefault();


        const name =
            document.getElementById("name");

        const email =
            document.getElementById("email");

        const phone =
            document.getElementById("phone");

        const password =
            document.getElementById("password");

        const confirmPassword =
            document.getElementById("confirmPassword");


        /* ----------------------------------------------
           REQUIRED FIELDS
        ---------------------------------------------- */

        if (
            !name.value.trim() ||
            !email.value.trim() ||
            !phone.value.trim() ||
            !password.value.trim() ||
            !confirmPassword.value.trim()
        ) {

            showMessage(
                "Please fill in all required fields.",
                "error"
            );

            return;

        }


        /* ----------------------------------------------
           PASSWORD MATCH
        ---------------------------------------------- */

        if (
            password.value !==
            confirmPassword.value
        ) {

            showMessage(
                "Passwords do not match.",
                "error"
            );

            confirmPassword.focus();

            return;

        }


        /* ----------------------------------------------
           PASSWORD LENGTH
        ---------------------------------------------- */

        if (password.value.length < 8) {

            showMessage(
                "Password must contain at least 8 characters.",
                "error"
            );

            password.focus();

            return;

        }


        /* ----------------------------------------------
           BUTTON LOADING
        ---------------------------------------------- */

        const originalButtonText =
            authButton.innerHTML;

        authButton.disabled = true;

        authButton.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';


        /* ----------------------------------------------
           DEMO SUCCESS
        ---------------------------------------------- */

        setTimeout(() => {

            authButton.innerHTML =
                '<i class="fa-solid fa-check"></i> Account Created';

            showMessage(
                "Your account has been created successfully.",
                "success"
            );


            setTimeout(() => {

                authButton.disabled = false;

                authButton.innerHTML =
                    originalButtonText;

            }, 2000);

        }, 1500);

    });



    /* ==================================================
       SOCIAL LOGIN BUTTONS
    ================================================== */

    const socialButtons =
        document.querySelectorAll(".social-btn");


    socialButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const nameElement =
                button.querySelector("span");

            const name =
                nameElement
                    ? nameElement.textContent.trim()
                    : "Social";

            showMessage(
                `${name} signup selected.`,
                "success"
            );

        });

    });



    /* ==================================================
       MESSAGE
    ================================================== */

    function showMessage(message, type) {

        const oldAlert =
            document.querySelector(".auth-alert");

        oldAlert?.remove();


        const alert =
            document.createElement("div");

        alert.className =
            `auth-alert ${type}`;


        const icon =
            type === "success"
                ? "fa-circle-check"
                : "fa-circle-exclamation";


        alert.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        `;


        document.body.appendChild(alert);


        setTimeout(() => {

            alert.classList.add("hide");

            setTimeout(() => {

                alert.remove();

            }, 300);

        }, 3000);

    }

});