import React from 'react'  
const axios = require('axios');

import RenderSinglePost from './RenderSinglePost'

class RenderPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.cat_ID,
            page: 1,
            posts: []
        }

        // This binding is necessary to make `this` work in the callback
        this.getNextPage = this.getNextPage.bind(this);
    }

    componentDidMount() {
        let currentComponent = this;
        axios.get(`https://us.wp.jonknoll.dev/wp-json/wp/v2/posts`, {
            params:{
                categories: this.state.id,
                page: this.state.page
            }
        })
        .then(function (response) {
            currentComponent.setState({
                posts:response.data
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
                page: this.state.page + 1
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

    
    render() {
        return (
            <div>
                {console.log(this.state.posts)}
                {this.state.posts.map((post) =>
                    <RenderSinglePost  key={post.id} post={post}/>
                )}
                <h1>Page: {this.state.page}</h1>
                
                <button onClick={this.getNextPage}>
                    Go up 1!
                </button>
            </div>
        )
    }

  }
  export default RenderPosts;