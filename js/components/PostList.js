import React from 'react';
import Post from './Post';
import AddPost from './AddPost';


class PostList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
        };

        this.getPosts = this.getPosts.bind(this);
    }
    componentDidMount() {
        this.getPosts();
    }

    getPosts () {
        const self = this;
        $.ajax({
            url: '/controllers/postController.php?getPosts=true',
            method: 'GET',
            success: function(result) {
                self.setState({
                    posts: JSON.parse(result)
                });
            }
        })
    }
    render() {
       return (
           <div className='container'>
               {this.props.role === 'admin' ?
                   <AddPost refreshPosts={this.getPosts}/> :
                   null}
                <Post
                    posts={this.state.posts}
                />
           </div>
       );
    }
}

export default PostList;