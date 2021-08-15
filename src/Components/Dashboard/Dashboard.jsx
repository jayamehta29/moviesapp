import React, { Component } from 'react';
import Movies from "../Movies/Movies";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
import { API_KEY, API_URL, IMAGE_URL } from "../../API/apis";

class Dashboard extends Component {
    // state = {}
    state = {
        moviesData: [],
        currentMovie: "avengers",
        pages: [],
        currPage: 1,
        isLoggedIn: false,
        user: null,
        // isLiked : false,
      };

    async componentDidMount() {
        // API call
        // params => api key , page , query
    
        let data = await axios.get(API_URL + "/search/movie", {
          params: { api_key: API_KEY, page: 1, query: this.state.currentMovie },
        });
        let moviesData = data.data.results.slice(0, 10);
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
            <>
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
                )
                }
            </>
        );
    }
}

export default Dashboard;