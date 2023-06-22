require("dotenv").config();
const port = process.env.APP_PORT ?? 5000;
const app = express();
app.use(express.json());
const express = require("express");

const {validateMovie, validateUser} = require("./validators.js");
const {hashPassword, verifyPassword, verifyToken } = require("./auth.js");
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers.js");

//public routes :
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);
app.get("/api/users", userHandlers.getUsers);
app.post("/api/users", validateUser, hashPassword, userHandlers.postUser);
app.get("/api/users/:id", userHandlers.getUserById);


//protected routes :
app.use(verifyToken); //authentification wall : verifyToken est activé pour chaque route
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.put("/api/users/:id", validateUser, hashPassword, userHandlers.updateUser);
app.delete("/api.users/:id", userHandlers.deleteUser);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});