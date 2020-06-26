import React from 'react'  
const axios = require('axios');

import RenderSinglePost from './RenderSinglePost'

class RenderPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.cat_ID,
            page: 1,
            posts: [],
            totalPosts: 0
        }

        // This binding is necessary to make `this` work in the callback
        this.getNextPage = this.getNextPage.bind(this);
        this.getPrevPage = this.getPrevPage.bind(this);
    }

    componentDidMount() {
        let currentComponent = this;
        axios.get(`https://us.wp.jonknoll.dev/wp-json/wp/v2/posts`, {
            params:{
                categories: this.state.id,
                page: this.state.page,
                per_page:9
            }
        })
        .then(function (response) {
            console.log(response)
            currentComponent.setState({
                posts:response.data,
                totalPosts: response.headers["x-wp-total"]
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    getNextPage() {
        let currentComponent = this;
        axios.get(`https://us.wp.jonknoll.dev/wp-json/wp/v2/posts`, {
            params:{
                categories: this.state.id,
                page: this.state.page + 1,
                per_page:9
            }
        })
        .then(function (response) {
            currentComponent.setState(state => ({
                page: currentComponent.state.page + 1,
                posts: response.data
            }));
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    getPrevPage() {
        let currentComponent = this;
        axios.get(`https://us.wp.jonknoll.dev/wp-json/wp/v2/posts`, {
            params:{
                categories: this.state.id,
                page: this.state.page - 1,
                per_page:9
            }
        })
        .then(function (response) {
            currentComponent.setState(state => ({
                page: currentComponent.state.page - 1,
                posts: response.data
            }));
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    
    render() {
        const pageTotals = this.state.totalPosts;
        const currentPage = this.state.page;
        let pagination;

        if (pageTotals == 0) {
            pagination  = <div>
                <h1>Page {currentPage} of {Math.ceil(pageTotals / 9)}</h1>
                <button>Previous</button>
                <button>Next</button>
            </div>
        } else {
            pagination  = 
            <div>
                <h1>Page {currentPage} of {Math.ceil(pageTotals / 9)}</h1>
                <button onClick={this.getPrevPage}>Previous</button>
                <button onClick={this.getNextPage}>Next</button>
            </div>
        }

        return (
            <div>
                <div className="grid grid-cols-3 gap-8">
                    {this.state.posts.map((post) =>
                        <RenderSinglePost  key={post.id} post={post}/>
                    )}
                </div>
                <div className="pageInation">
                    {pagination}
                </div>
            </div>
        )
    }

  }
  export default RenderPosts;