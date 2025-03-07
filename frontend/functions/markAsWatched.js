export const markAsWatched = async (movieId, token) => {
    try {
        const response = await fetch("http://localhost:6774/movies/movies/watched", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ movie_id: movieId })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al marcar la película como vista");
        }

        alert("Película marcada como vista");
        return true;
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo marcar la película como vista");
        return false;
    }
};
