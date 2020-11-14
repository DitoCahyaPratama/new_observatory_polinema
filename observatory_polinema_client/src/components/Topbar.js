import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Modal, Button, Space } from 'antd';
import { getAvatarColor } from '../util/Colors';

const { confirm } = Modal;

class Topbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchClick: false,
			notification: false,
			profile: false,
			user: null,
			isLoading: false,
		};
	}

	componentDidMount = () => {
		const user = this.props.currentUser;
		this.setState({
			user: user
		})
	};


	handleSearchClick = () => {
		this.setState({ searchClick: !this.state.searchClick });
	};
	handleNotification = () => {
		this.setState({ notification: !this.state.notification });
	};
	handleProfile = () => {
		this.setState({ profile: !this.state.profile });
	};

	handleOk = () => {
		this.props.handleLogout()
	};

	handleCancel = e => {
		// this.handleProfile()
	}

	handleLogout = () => {
		confirm({
			title: 'Are you sure to logout ?',
			content: 'This actions cannot be undo',
			onOk: this.handleOk,
			onCancel(){
				console.log('cancel')
			},
		});
	}

	render() {
		return (
			<div>
				{this.state.user ? (
					<nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
						<form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
							<div class="input-group">
								<input
									type="text"
									class="form-control bg-light border-0 small"
									placeholder="Search for..."
									aria-label="Search"
									aria-describedby="basic-addon2"
								/>
								<div class="input-group-append">
									<button class="btn btn-primary" type="button">
										<i class="fas fa-search fa-sm"></i>
									</button>
								</div>
							</div>
						</form>

						<ul class="navbar-nav ml-auto">
							<li
								class={
									this.state.searchClick
										? 'nav-item dropdown no-arrow d-sm-none show'
										: 'nav-item dropdown no-arrow d-sm-none'
								}
							>
								<span
									onClick={this.handleSearchClick}
									class="nav-link dropdown-toggle"
									id="searchDropdown"
									aria-haspopup="true"
									aria-expanded={this.state.searchClick ? 'true' : 'false'}
								>
									<i class="fas fa-search fa-fw"></i>
								</span>
								<div
									class={
										this.state.searchClick
											? 'dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in show'
											: 'dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in'
									}
									aria-labelledby="searchDropdown"
								>
									<form class="form-inline mr-auto w-100 navbar-search">
										<div class="input-group">
											<input
												type="text"
												class="form-control bg-light border-0 small"
												placeholder="Search for..."
												aria-label="Search"
												aria-describedby="basic-addon2"
											/>
											<div class="input-group-append">
												<button class="btn btn-primary" type="button">
													<i class="fas fa-search fa-sm"></i>
												</button>
											</div>
										</div>
									</form>
								</div>
							</li>

							<li
								class={
									this.state.notification
										? 'nav-item dropdown no-arrow mx-1 show'
										: 'nav-item dropdown no-arrow mx-1'
								}
							>
								<span
									onClick={this.handleNotification}
									class="nav-link dropdown-toggle"
									id="alertsDropdown"
									aria-haspopup="true"
									aria-expanded={this.state.notification ? 'true' : 'false'}
								>
									<i class="fas fa-bell fa-fw"></i>
									<span class="badge badge-danger badge-counter">3+</span>
								</span>
								<div
									class={
										this.state.notification
											? 'dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in show'
											: 'dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in'
									}
									aria-labelledby="alertsDropdown"
								>
									<h6 class="dropdown-header">Alerts Center</h6>
									<Link class="dropdown-item d-flex align-items-center" to="/">
										<div class="mr-3">
											<div class="icon-circle bg-primary">
												<i class="fas fa-file-alt text-white"></i>
											</div>
										</div>
										<div>
											<div class="small text-gray-500">December 12, 2019</div>
											<span class="font-weight-bold">
												A new monthly report is ready to download!
											</span>
										</div>
									</Link>
									<Link class="dropdown-item d-flex align-items-center" to="/">
										<div class="mr-3">
											<div class="icon-circle bg-success">
												<i class="fas fa-donate text-white"></i>
											</div>
										</div>
										<div>
											<div class="small text-gray-500">December 7, 2019</div>
											$290.29 has been deposited into your account!
										</div>
									</Link>
									<Link class="dropdown-item d-flex align-items-center" to="/">
										<div class="mr-3">
											<div class="icon-circle bg-warning">
												<i class="fas fa-exclamation-triangle text-white"></i>
											</div>
										</div>
										<div>
											<div class="small text-gray-500">December 2, 2019</div>
											Spending Alert: We've noticed unusually high spending for your account.
										</div>
									</Link>
									<Link class="dropdown-item text-center small text-gray-500" to="/">
										Show All Alerts
									</Link>
								</div>
							</li>

							<div class="topbar-divider d-none d-sm-block"></div>

							<li
								class={
									this.state.profile
										? 'nav-item dropdown no-arrow show'
										: 'nav-item dropdown no-arrow'
								}
							>
								<span
									class="nav-link dropdown-toggle"
									onClick={this.handleProfile}
									id="userDropdown"
									aria-haspopup="true"
									aria-expanded={this.state.profile ? 'true' : 'false'}
								>
									<span class="mr-2 d-none d-lg-inline text-gray-600 small">{this.state.user.name}</span>
									<Avatar
										className="user-avatar-circle"
										style={{ backgroundColor: getAvatarColor(this.state.user.name) }}
									>
										{this.state.user.name[0].toUpperCase()}
									</Avatar>
								</span>
								<div
									class={
										this.state.profile
											? 'dropdown-menu dropdown-menu-right shadow animated--grow-in show'
											: 'dropdown-menu dropdown-menu-right shadow animated--grow-in'
									}
									aria-labelledby="userDropdown"
								>
									<Link class="dropdown-item" to="/my-profile" onClick={this.handleProfile}>
										My Profile
									</Link>
									<Link class="dropdown-item" to="/my-account" onClick={this.handleProfile}>
										My Account
									</Link>
									<p class="dropdown-item" onClick={() => { this.handleLogout() }}>
										Logout
									</p>
								</div>
							</li>
						</ul>
					</nav>
				) : null}
			</div>
		);
	}
}

export default Topbar;
