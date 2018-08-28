import React from 'react';

export default class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            posts: []
        };
        this.logIn = this.logIn.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.postsTable = this.postsTable.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    logIn(e) {
        e.preventDefault();
        const self = this;
        $.ajax({
            url: '/controllers/userController.php',
            method: 'POST',
            data: {
                "username": this.state.username,
                "password": this.state.password
            },
            success: function(result) {
                const resultObj = JSON.parse(result)[0];
                self.props.loginCallback(resultObj);
                self.getPosts();
            }
        })
    }

    renderForm() {
        return (
            <form onSubmit={this.logIn}>
                <input type="text"
                       placeholder='username'
                       onChange={(e) => this.setState({ username: e.target.value })}
                />
                <input type="text"
                       placeholder='password'
                       onChange={(e) => this.setState({ password: e.target.value })}
                />
                <button>Отправить</button>
            </form>
        );
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

    postsTable() {
        return (
            <table className='post-table'>
                <thead>
                    <th>id</th>
                    <th>title</th>
                    <th>text</th>
                    <th>date</th>
                </thead>
                {this.state.posts.map((post) => {
                    return (
                        <tr key={post.id}>
                            <td className='post-list__cell'>
                                {post.id}
                            </td>
                            <td className='post-list__cell'>
                                {post.title}
                            </td>
                            <td className='post-list__cell'>
                                {post.text}
                            </td>
                            <td className='post-list__cell'>
                                {post.date}
                            </td>
                            <td className='post-list__cell'>
                                <button type='button'
                                        onClick={(e) => this.handleRemove(e, post.id)}
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </table>
        )
    }

    handleRemove(e, id) {
        const self = this;
        $.ajax({
            url: '/controllers/postController.php?removePost=true',
            method: 'POST',
            data: {
              "id": id
            },
            success: function(result) {
                self.getPosts();
            }
        })
    }

    componentDidMount() {
        this.getPosts();
    }

    render() {
        return (
            <div>
                {this.props.logged ? this.postsTable() : this.renderForm()}
            </div>
        );
    }
}