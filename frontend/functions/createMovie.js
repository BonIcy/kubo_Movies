const categoriesSelect = document.getElementById("category");
const createMovieForm = document.getElementById("create-movie-form");
const API_URL = "http://localhost:6774/movies";
const token = localStorage.getItem("token"); 

const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error("Error al obtener las categorías");
        }
        
        const categoriesData = await response.json();
        const categories = categoriesData[0]; 
        
        categoriesSelect.innerHTML = "<option value=''>Seleccione una categoría</option>";
        
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            categoriesSelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
        alert("No se pudieron cargar las categorías");
    }
};

createMovieForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const releaseDate = document.getElementById("release-date").value;
    const categoryId = categoriesSelect.value;
    
    if (!title || !description || !releaseDate || !categoryId) {
        alert("Todos los campos son obligatorios");
        return;
    }
    
    const movieData = {
        tittle: title,
        description,
        release_date: releaseDate,
        category_id: parseInt(categoryId)
    };
    
    try {
        const response = await fetch(`${API_URL}/movies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(movieData)
        });
        
        if (!response.ok) {
            throw new Error("Error al crear la película");
        }
        
        alert("Película creada exitosamente");
        window.location.href = "index.html";
    } catch (error) {
        console.error(error);
        alert("No se pudo crear la película");
    }
});

document.addEventListener("DOMContentLoaded", fetchCategories);
