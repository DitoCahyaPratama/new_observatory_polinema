import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';

import Login from '../pages/users/auth/Login';
import Register from '../pages/users/auth/Register';
import Account from '../pages/users/Account';
import My_Profile from '../pages/users/My_Profile';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import About from '../pages/About';
import Citation_Dataset from '../pages/Citation_Dataset';
import Citation_Menu from '../pages/Citation_Menu';
import Datasets_Detail from '../pages/Datasets_Detail';
import Datasets_Submit from '../pages/datasets/Datasets_Submit';
import Discussion_Menu from '../pages/Discussion_Menu';
import Homepage from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import New_Datasets from '../pages/New_Datasets';
import Reset from '../pages/Reset';
import Seen_By from '../pages/Seen_By';

import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';

// Component
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Scroll from '../components/Scroll';
import Modal from '../components/Modal';

import { notification } from 'antd';

// import { createStore } from 'redux';
// import { Provider, connect } from 'react-redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './reducers';
// import { setUser, clearUser } from './actions';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			isAuthenticated: false,
			isLoading: false,
		};
		this.handleLogout = this.handleLogout.bind(this);
		this.loadCurrentUser = this.loadCurrentUser.bind(this);
		this.handleLogin = this.handleLogin.bind(this);

		notification.config({
			placement: 'topRight',
			top: 70,
			duration: 3,
		});
	}

	loadCurrentUser() {
		this.setState({
			isLoading: true,
		});
		getCurrentUser()
			.then((response) => {
				this.setState({
					currentUser: response,
					isAuthenticated: true,
					isLoading: false,
				});
			})
			.catch((error) => {
				this.setState({
					isLoading: false,
				});
			});
	}

	componentDidMount() {
		this.loadCurrentUser();
	}

	handleLogout(redirectTo = '/', notificationType = 'success', description = "You're successfully logged out.") {
		localStorage.removeItem(ACCESS_TOKEN);

		this.setState({
			currentUser: null,
			isAuthenticated: false,
		});

		this.props.history.push(redirectTo);

		notification[notificationType]({
			message: 'Observatory Polinema',
			description: description,
		});
	}

	handleLogin() {
		notification.success({
			message: 'Observatory Polinema',
			description: "You're successfully logged in.",
		});
		this.loadCurrentUser();
		this.props.history.push('/dashboard');
	}
	render() {
		if (this.state.isLoading) {
			return <LoadingIndicator />;
		}
		return (
			<Switch>
				<Route exact path="/" component={Homepage} />
				<Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />} />
				<Route path="/register" component={Register} />
				<div>
					<div id="wrapper">
						<Sidebar />
						<div id="content-wrapper" class="d-flex flex-column">
							<div id="content">
								<Topbar
									handleLogout={this.handleLogout}
									isAuthenticated={this.state.isAuthenticated}
									currentUser={this.state.currentUser}
								/>
								<PrivateRoute
									authenticated={this.state.isAuthenticated}
									handleLogout={this.handleLogout}
									path="/about"
									component={About}
								/>
								<PrivateRoute
									authenticated={this.state.isAuthenticated}
									handleLogout={this.handleLogout}
									path="/my-account"
									component={Account}
									currentUser={this.state.currentUser}
								/>
								<PrivateRoute
									authenticated={this.state.isAuthenticated}
									handleLogout={this.handleLogout}
									path="/citation-dataset"
									component={Citation_Dataset}
								/>
								<PrivateRoute
									authenticated={this.state.isAuthenticated}
									handleLogout={this.handleLogout}
									path="/citation"
									component={Citation_Menu}
								/>
								<PrivateRoute
									authenticated={this.state.isAuthenticated}
									handleLogout={this.handleLogout}
									path="/datasets-detail"
									component={Datasets_Detail}
								/>
								<PrivateRoute
									authenticated={this.state.isAuthenticated}
									handleLogout={this.handleLogout}
									path="/datasets-submit"
									component={Datasets_Submit}
								/>
								<PrivateRoute
									authenticated={this.state.isAuthenticated}
									handleLogout={this.handleLogout}
									path="/discussion"
									component={Discussion_Menu}
								/>
								<PrivateRoute
									authenticated={this.state.isAuthenticated}
									handleLogout={this.handleLogout}
									path="/dashboard"
									component={Dashboard}
								/>
								<PrivateRoute
									authenticated={this.state.isAuthenticated}
									handleLogout={this.handleLogout}
									path="/my-profile"
									component={My_Profile}
									currentUser={this.state.currentUser}
								/>
								<PrivateRoute
									authenticated={this.state.isAuthenticated}
									handleLogout={this.handleLogout}
									path="/datasets"
									component={New_Datasets}
								/>
								<PrivateRoute
									authenticated={this.state.isAuthenticated}
									handleLogout={this.handleLogout}
									path="/reset"
									component={Reset}
								/>
								<PrivateRoute
									authenticated={this.state.isAuthenticated}
									handleLogout={this.handleLogout}
									path="/seen_by"
									component={Seen_By}
								/>
							</div>
							<Footer />
						</div>
					</div>
					<Scroll />
					<Modal />
				</div>
				<Route component={NotFound}></Route>
			</Switch>
		);
	}
}

export default withRouter(App);
