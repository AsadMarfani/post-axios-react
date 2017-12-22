import React, {Component} from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null
  };
  componentDidMount () {
    axios
      .get ('https://jsonplaceholder.typicode.com/posts')
      .then (response => {
        const posts = response.data.slice (0, 4);
        console.log (posts);
        const updatedPosts = posts.map (post => {
          return {
            ...post,
            author: 'Max',
          };
        });
        this.setState ({
          posts: updatedPosts,
        });
      })
      .catch (err => console.log (err));
  }
  renderSelectablePost = id => {
    console.log (id);
    this.setState({selectedPostId: id})
  };
  render () {
    console.log ('Render Posts : ', this.state.posts);
    const posts = this.state.posts.map (post => {
      return (
        <Post
          title={post.title}
          key={post.id}
          author={post.author}
          clicked={() => this.renderSelectablePost (post.id)}
        />
      );
    });
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <section>
          <FullPost id = {this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
