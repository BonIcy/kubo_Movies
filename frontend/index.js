import { markAsWatched } from "./functions/markAsWatched.js";

document.addEventListener("DOMContentLoaded", () => {
    const moviesContainer = document.getElementById("movies-container");
    const prevPageBtn = document.getElementById("prev-page");
    const nextPageBtn = document.getElementById("next-page");
    const pageNumberSpan = document.getElementById("page-number");
    const logoutButton = document.getElementById("logout-button");
    document.getElementById("create-movie-button").addEventListener("click", () => {
        window.location.href = "components/createMovie.html";
    });
    
    let currentPage = 1;
    const moviesPerPage = 6;
    let movies = [];

    const token = localStorage.getItem("token");
    if (!token) {
        alert("No has iniciado sesión");
        window.location.href = "login.html";
    }

    const fetchMovies = async () => {
        try {
            const response = await fetch("http://localhost:6774/movies/movies", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Error al obtener películas");
            }

            const data = await response.json();
        
            movies = data.flat().filter(movie => movie.id);

            renderMovies();
        } catch (error) {
            console.error("Error:", error);
            alert("Error al cargar películas");
        }
    };
    const fetchWatchedMovies = async () => {
        try {
            const response = await fetch("http://localhost:6774/movies/watched/list", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error("Error al obtener la lista de películas vistas");
            }
    
            const data = await response.json();
            const userWatchedMovies = data.find(user => user.user_id == parseInt(localStorage.getItem("userId")));
            return userWatchedMovies ? userWatchedMovies.watched_movies.map(movie => movie.movie_id) : [];
        } catch (error) {
            console.error("Error:", error);
            return [];
        }
    };
    
    const renderMovies = async () => {
        moviesContainer.innerHTML = "";
    
        const watchedMovies = await fetchWatchedMovies();
    
        const startIndex = (currentPage - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        const moviesToShow = movies.slice(startIndex, endIndex);
    
        moviesToShow.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
    
            const isWatched = watchedMovies.includes(movie.id);
    
            movieCard.innerHTML = `
                <h3>${movie.tittle}</h3>
                <p>${movie.description}</p>
                <p><strong>Fecha de estreno:</strong> ${movie.release_date}</p>
                <button class="watched-btn" data-id="${movie.id}" ${isWatched ? 'disabled' : ''}>
                    ${isWatched ? 'Vista' : 'Marcar como vista'}
                </button>
            `;
    
            moviesContainer.appendChild(movieCard);
        });
    
        document.querySelectorAll(".watched-btn").forEach(button => {
            button.addEventListener("click", async (event) => {
                const movieId = event.target.getAttribute("data-id");
    
                if (!event.target.disabled) {
                    event.target.disabled = true; 
                    event.target.textContent = "Vista"; 
    
                    const success = await markAsWatched(movieId, token);
    
                    if (success) {
                        setTimeout(async () => {
                            await fetchWatchedMovies(); 
                            renderMovies(); 
                        }, 500);
                    } else {
                        event.target.disabled = false; 
                        event.target.textContent = "Marcar como vista";
                    }
                }
            });
        });
    
        updatePaginationButtons();
    };
    

    const updatePaginationButtons = () => {
        pageNumberSpan.textContent = currentPage;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage * moviesPerPage >= movies.length;
    };

    prevPageBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderMovies();
        }
    });

    nextPageBtn.addEventListener("click", () => {
        if (currentPage * moviesPerPage < movies.length) {
            currentPage++;
            renderMovies();
        }
    });

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        alert("Sesión cerrada correctamente");
        window.location.href = "login.html";
    });

    fetchMovies();
});
