document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    try {
        const response = await fetch("http://localhost:6774/movies/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "../index.html";
        } else {
            errorMessage.textContent = data.msg; 
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        errorMessage.textContent = "Error de conexión con el servidor.";
    }
});
