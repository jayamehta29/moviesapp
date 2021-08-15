import React, { Component } from "react";
import Header from "./Components/Header/Header.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import Pagination from "./Components/Pagination/Pagination.jsx";
// import Favourite from "./Components/Favourite/Favourite.jsx";
import MoviePage from "./Components/MoviePage/MoviePage.jsx";

import axios from "axios";
import { API_KEY, API_URL, IMAGE_URL } from "./API/apis";

import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

class App extends Component {
  state = {
    moviesData: [],
    currentMovie: "avengers",
    pages: [],
    currPage: 1,
    // isLiked : false,
  };

  async componentDidMount() {
    // API call
    // params => api key , page , query
   
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: this.state.currentMovie },
    });
    let moviesData = data.data.results.slice(0,10);
    let pagesCount = data.data.total_pages; //3
    let pages = [];
    // let isLiked=;
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    this.setState({
      moviesData: moviesData,
      pages: pages,
      // isLiked : isLiked,
    });
  }

  setMovies = async (newMovieName) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: newMovieName },
    });
    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages; //3
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    this.setState({
      moviesData: moviesData,
      currentMovie: newMovieName,
      pages: pages,
    });
  };

  nextPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: this.state.currPage + 1,
        query: this.state.currentMovie,
      },
    });
    console.log(data);
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: this.state.currPage + 1,
    });
  };

  previousPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: this.state.currPage - 1,
        query: this.state.currentMovie,
      },
    });
    console.log(data);
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: this.state.currPage - 1,
    });
  };

  setPage = async (pageCount) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: pageCount,
        query: this.state.currentMovie,
      },
    });
    console.log(data);
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: pageCount,
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header setMovies={this.setMovies}></Header>

          <Switch>
            <Route path="/" exact>
              {this.state.moviesData.length ? (
                <React.Fragment>
                  <Movies movies={this.state.moviesData} ></Movies>
                  <Pagination
                    pages={this.state.pages}
                    currPage={this.state.currPage}
                    nextPage={this.nextPage}
                    previousPage={this.previousPage}
                    setPage={this.setPage}
                  ></Pagination>
                </React.Fragment>
              ) : (
                <h1>Oops No Movies Found !</h1>
              )}
            </Route>

            {/* <Route path="/fav" exact>
              <Favourite></Favourite>
            </Route> */}

            <Route path="/moviepage" exact component={MoviePage}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;