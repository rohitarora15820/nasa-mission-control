# Nasa Mission Control

This project simulates a NASA Mission Control Dashboard. It's a full-stack app with its own API and database.

<img src="./home.png" alt="Snapshot of the app's landing page" style="display: block; width: 80%; margin: 24px auto;" />

## App Architecture

### Frontend

The frontend is a React.js app, built with [Create React App](https://create-react-app.dev) and [`arwes`](https://github.com/arwes/arwes), a futuristic, Sci-Fi UI Web Framework. It's a single page app that uses [React Router](https://reactrouter.com/) for navigation.

### Backend

Back-end logic lives on the `server` folder whereas the front-end code lives on the `client` folder.

I used `express` for back-end logic with the MVC pattern. Controllers lives alongside routes since they define how to respond to a specific route.
