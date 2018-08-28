import React from 'react';

export default class AddPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            text: ''
        };
        this.submitPost = this.submitPost.bind(this);
    }

    submitPost(e) {
        e.preventDefault();
        const self = this;
        $.ajax({
            url: '/controllers/postController.php?addPost=true',
            method: 'POST',
            data: {
                "title": this.state.title,
                "text": this.state.text
            },
            success: function(result) {
                console.log(result);
                self.props.refreshPosts();
            }
        })
    }

    render () {
        return (
            <form onSubmit={this.submitPost}>
                <input type="text"
                       placeholder='title'
                       onChange={(e) => this.setState({ title: e.target.value })}/>
                <input type="text"
                       placeholder='text'
                       onChange={(e) => this.setState({ text: e.target.value })}/>
                <button>Отправить</button>
            </form>
        );
    }
}