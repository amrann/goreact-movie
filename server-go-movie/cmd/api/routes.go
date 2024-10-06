package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)
	router.HandlerFunc(http.MethodGet, "/movie/:id", app.getOneMovie)
	router.HandlerFunc(http.MethodGet, "/movies", app.getAllMovies)
	router.HandlerFunc(http.MethodGet, "/genres", app.getAllGenres)
	router.HandlerFunc(http.MethodGet, "/genre/:this_genre_id/movies", app.getAllMoviesByGenres)

	router.HandlerFunc(http.MethodPost, "/admin/movie/add", app.addMovie)
	router.HandlerFunc(http.MethodPost, "/admin/movie/edit", app.editMovie)

	return app.enableCORS(router)
}
