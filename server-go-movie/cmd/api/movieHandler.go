package main

import (
	"encoding/json"
	"log"
	"net/http"
	"server-go-movie/models"
	"strconv"
	"time"

	"github.com/julienschmidt/httprouter"
)

type MoviePayload struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Year        string `json:"year"`
	ReleaseDate string `json:"release_date"` // release_date => must same of name value in react form
	Runtime     string `json:"runtime"`
	Rating      string `json:"rating"`
	MPAARating  string `json:"mpaa_rating"`
}

func (app *application) getOneMovie(rw http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id, err := strconv.Atoi(params.ByName("id"))

	if err != nil {
		// app.logger.Print(errors.New("invalid id parameter"))
		app.errorJSON(rw, err)
		return
	}

	// app.logger.Println("the id is : ", id)

	// movie := models.Movie{
	// 	ID:          id,
	// 	Title:       "Some movie title",
	// 	Description: "Some movie description",
	// 	Year:        2024,
	// 	ReleaseDate: time.Date(1990, 01, 01, 01, 0, 0, 0, time.Local),
	// 	Runtime:     112,
	// 	Rating:      5,
	// 	MPAARating:  "PG-13",
	// 	CreatedAt:   time.Now(),
	// 	UpdatedAt:   time.Now(),
	// }

	movie, err := app.models.DB.GET(id)

	err = app.writeJSON(rw, http.StatusOK, movie, "movie")
	if err != nil {
		app.errorJSON(rw, err)
		return
	}
}

func (app *application) getAllMovies(rw http.ResponseWriter, r *http.Request) {
	movies, err := app.models.DB.All()
	if err != nil {
		app.errorJSON(rw, err)
		return
	}

	err = app.writeJSON(rw, http.StatusOK, movies, "movies")
	if err != nil {
		app.errorJSON(rw, err)
		return
	}
}

func (app *application) getAllGenres(rw http.ResponseWriter, r *http.Request) {
	genres, err := app.models.DB.GetAllGenre()
	if err != nil {
		app.errorJSON(rw, err)
		return
	}

	err = app.writeJSON(rw, http.StatusOK, genres, "genres")
	if err != nil {
		app.errorJSON(rw, err)
		return
	}
}

func (app *application) getAllMoviesByGenres(rw http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context()) // mengambil data param

	genreID, err := strconv.Atoi(params.ByName("this_genre_id")) // mengubah param dari STRING to INT
	if err != nil {
		app.errorJSON(rw, err)
		return
	}

	movies, err := app.models.DB.All(genreID)
	if err != nil {
		app.errorJSON(rw, err)
		return
	}

	err = app.writeJSON(rw, http.StatusOK, movies, "movies")
	if err != nil {
		app.errorJSON(rw, err)
		return
	}
}

func (app *application) addMovie(rw http.ResponseWriter, r *http.Request) {
	var payload MoviePayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		log.Println(err)
		app.errorJSON(rw, err)
		return
	}

	var movie models.Movie

	movie.ID, _ = strconv.Atoi(payload.ID)
	movie.Title = payload.Title
	movie.Description = payload.Description
	movie.ReleaseDate, _ = time.Parse("2006-01-02", payload.ReleaseDate)
	movie.Year = movie.ReleaseDate.Year()
	movie.Runtime, _ = strconv.Atoi(payload.Runtime)
	movie.Rating, _ = strconv.Atoi(payload.Rating)
	movie.MPAARating = payload.MPAARating
	movie.CreatedAt = time.Now()
	movie.UpdatedAt = time.Now()

	// insert movie query
	err = app.models.DB.InsertMovie(movie)
	if err != nil {
		log.Println(err)
		app.errorJSON(rw, err)
		return
	}

	type jsonRes struct {
		OK bool `json:"ok"`
	}

	ok := jsonRes{
		OK: true,
	}

	err = app.writeJSON(rw, http.StatusOK, ok, "response")
	if err != nil {
		app.errorJSON(rw, err)
		return
	}
}

func (app *application) editMovie(rw http.ResponseWriter, r *http.Request) {
	var payload MoviePayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		log.Println(err)
		app.errorJSON(rw, err)
		return
	}

	var movie models.Movie

	id, _ := strconv.Atoi(payload.ID)
	singleMovie, _ := app.models.DB.GET(id)
	movie = *singleMovie

	movie.ID, _ = strconv.Atoi(payload.ID)
	movie.Title = payload.Title
	movie.Description = payload.Description
	movie.ReleaseDate, _ = time.Parse("2006-01-02", payload.ReleaseDate)
	movie.Year = movie.ReleaseDate.Year()
	movie.Runtime, _ = strconv.Atoi(payload.Runtime)
	movie.Rating, _ = strconv.Atoi(payload.Rating)
	movie.MPAARating = payload.MPAARating
	movie.UpdatedAt = time.Now()

	// update movie query
	err = app.models.DB.UpdateMovie(movie)
	if err != nil {
		log.Println(err)
		app.errorJSON(rw, err)
		return
	}

	type jsonRes struct {
		OK bool `json:"ok"`
	}

	ok := jsonRes{
		OK: true,
	}

	err = app.writeJSON(rw, http.StatusOK, ok, "response")
	if err != nil {
		app.errorJSON(rw, err)
		return
	}
}

func (app *application) deleteMovie(rw http.ResponseWriter, r *http.Request) {
	var payload MoviePayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		app.errorJSON(rw, err)
		return
	}

	id, _ := strconv.Atoi(payload.ID)
	err = app.models.DB.DeleteMovie(id)
	if err != nil {
		app.errorJSON(rw, err)
		return
	}

	type jsonRes struct {
		OK bool `json:"ok"`
	}

	ok := jsonRes{
		OK: true,
	}

	err = app.writeJSON(rw, http.StatusOK, ok, "response")
	if err != nil {
		app.errorJSON(rw, err)
		return
	}
}
