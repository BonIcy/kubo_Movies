document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const userData = { name, email, password };

        try {
            const response = await fetch("http://localhost:6774/movies/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registro exitoso, redirigiendo al login...");
                window.location.href = "login.html";
            } else {
                alert(data.msg || "Error en el registro");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error al conectar con el servidor");
        }
    });
});
