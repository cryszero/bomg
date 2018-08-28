import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch , } from 'react-router-dom';
import Header from './components/Header';
import PostList from './components/PostList'
import AdminPanel from './components/AdminPanel';



import '../css/App.scss';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            name: '',
            role: '',
            logged: false
        };

        this.getCategories = this.getCategories.bind(this);
        this.loginCallback = this.loginCallback.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        const self = this;
        $.ajax({
            url: '/controllers/categoryController.php?getCategories=true',
            method: 'GET',
            success: function(result) {
                console.log(result);
                self.setState({
                    categories: JSON.parse(result)
                });
            }
        })
    }

    loginCallback(resultObj) {
        console.log(resultObj);
        this.setState({
            role: resultObj.role,
            name: resultObj.name,
            logged: true,
        });
    }

    render() {
        console.log(this.state);
        return (
            <Router>
                <div>
                    <Header
                        categories={this.state.categories}
                        name={this.state.name}
                        role={this.state.role}
                    />
                    <Switch>
                        <Route exact path='/' render={() => <h1>ПРИВЕТ В МОЁМ БЛОЖИКЕ</h1>}/>
                        <Route path='/blog' render={(props) => <PostList {...props} role={this.state.role}/>
                        }/>
                        <Route path='/admin'
                               render={(props) => <AdminPanel {...props}
                                                              name={this.state.name}
                                                              role={this.state.role}
                                                              loginCallback={this.loginCallback}
                                                              logged={this.state.logged}
                        />}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));