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
        const pageTotals = Math.ceil(this.state.totalPosts / 9);
        const currentPage = this.state.page;
        let pagination;

        if ((this.state.page == 1) && (this.state.page != pageTotals)) {
            pagination  = 
            <div>
                <strong className="font-bold my-4 block">Page {currentPage} of {pageTotals}</strong>
                <div>
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed mr-4" onClick={this.getPrevPage}>Previous</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={this.getNextPage}>Next</button>
                </div>
            </div>
        } else if ((this.state.page == pageTotals) && (this.state.page != 1)) {
            pagination  = 
            <div>
                <strong className="font-bold my-4 block">Page {currentPage} of {pageTotals}</strong>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={this.getPrevPage}>Previous</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" onClick={this.getNextPage}>Next</button>
                </div>
            </div>
        } else if (this.state.page != pageTotals) {
            pagination =
                <div>
                    <strong className="font-bold my-4 block">Page {currentPage} of {pageTotals}</strong>
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={this.getPrevPage}>Previous</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={this.getNextPage}>Next</button>
                    </div>
                </div>
        } else if ((this.state.page == pageTotals) && (this.state.page == 1)) {
            pagination =
                <div>
                    <strong className="font-bold my-4 block">Page {currentPage} of {pageTotals}</strong>
                    <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 opacity-50 cursor-not-allowed" onClick={this.getPrevPage}>Previous</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" onClick={this.getNextPage}>Next</button>
                    </div>
                </div>
        } else {
            pagination  = <div></div>
        }

        return (
            <div>
                <div className="grid md:grid-cols-3 gap-8">
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