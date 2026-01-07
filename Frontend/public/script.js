// ================= ELEMENT SELECTORS =================
const loginbtn = document.querySelector('.loginBtn');
const signupbtn = document.querySelector('.signupBtn');

const signupform = document.querySelector('.signup-form');
const loginform = document.querySelector('.login-form');

const signsubmit = document.querySelector('#signup-submit');
const loginSubmit = document.querySelector('#login-submit');

const checkbox = document.querySelector('#check');

const username = document.querySelector("#signup-username");
const password = document.querySelector("#signup-password");
const email = document.querySelector("#signup-email");

const loginemail = document.querySelector('#login-email');
const loginpassword = document.querySelector('#login-password');


// ================= FORM TOGGLE =================
signupbtn.addEventListener('click', () => {
    signupform.style.display = 'block';
    loginform.style.display = 'none';
});

loginbtn.addEventListener('click', () => {
    signupform.style.display = 'none';
    loginform.style.display = 'block';
});


// ================= SIGNUP =================
signsubmit.addEventListener('click', async (e) => {
    e.preventDefault();

    const signusername = username.value.trim();
    const signemail = email.value.trim();
    const signpassword = password.value.trim();
    const role = checkbox.checked ? "admin" : "user";

    if (!signusername || !signemail || !signpassword) {
        alert("Please fill all the fields");
        return;
    }

    try {
        const res = await fetch("http://localhost:7000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: signusername,
                email: signemail,
                password: signpassword,
                role
            })
        });

        const data = await res.json();   // ✅ ONLY ONCE
        alert(data.message);

        if (res.ok) {
            username.value = "";
            email.value = "";
            password.value = "";
            checkbox.checked = false;

            signupform.style.display = "none";
            loginform.style.display = "block";
        }

    } catch (error) {
        console.error(error);
        alert("Signup failed");
    }
});



// ================= LOGIN =================
loginSubmit.addEventListener('click', async (e) => {
    e.preventDefault(); // 🔥 MOST IMPORTANT LINE

    const logemail = loginemail.value.trim();
    const logpassword = loginpassword.value.trim();

    if (!logemail || !logpassword) {
        alert("Please fill all the fields");
        return;
    }

    try {
        const res = await fetch("http://localhost:7000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: logemail,
                password: logpassword
            })
        });

        const data = await res.json();
        alert(data.message);

        if (!res.ok) return;

        // 🔁 Redirect based on role
        if (data.role === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "user.html";
        }

    } catch (error) {
        console.error(error);
        alert("Login failed");
    }
});
