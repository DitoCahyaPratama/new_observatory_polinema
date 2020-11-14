import React, { Component } from 'react';
import { Avatar, Modal } from 'antd';
import { getAvatarColor } from '../../util/Colors';
import { getUserProfile } from '../..//util/APIUtils';

class My_Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			isLoading: false,
			visible: false
		}
	}

	showModal = () => {
	  this.setState({
		visible: true,
	  });
	};
  
	handleOk = e => {
	  console.log(e);
	  this.setState({
		visible: false,
	  });
	};
  
	handleCancel = e => {
	  console.log(e);
	  this.setState({
		visible: false,
	  });
	};
  

	loadUserProfile = (username) => {
		this.setState({
			isLoading: true
		});

		getUserProfile(username)
			.then(response => {
				this.setState({
					user: response,
					isLoading: false
				});
			}).catch(error => {
				if (error.status === 404) {
					this.setState({
						notFound: true,
						isLoading: false
					});
				} else {
					this.setState({
						serverError: true,
						isLoading: false
					});
				}
			});
	}

	componentDidMount = () => {
		const username = this.props.currentUser.username;
		console.log(username)
		this.loadUserProfile(username);
	}

	componentDidUpdate = (nextProps) => {
		if (this.props.match.params.username !== nextProps.match.params.username) {
			this.loadUserProfile(nextProps.match.params.username);
		}
	}
	render() {
		return (
			<>
				{
					this.state.user ? (
						<div class="container-fluid">
							<div class="d-sm-flex align-items-center justify-content-between mb-4">
								<h1 class="h3 mb-0 text-gray-800">My Profile</h1>
							</div>

							<div class="row justify-content-center">
								<div class="col-xl-12 col-lg-12">
									<div class="card o-hidden border-0 my-5">
										<div class="card-body p-0">
											<div class="row">
												<div class="col-lg-12">
													<div class="p-2">
														<div class="text-center">
															<Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.name) }}>
																{this.state.user.name[0].toUpperCase()}
															</Avatar>
															<h1 class="h5 text-gray-900">{this.state.user.name}</h1>
															<h1 class="h6 text-gray-600 mb-4">Timejoined - {this.state.user.joinedAt}</h1>
														</div>
														<hr />
														<div class="row">
															<div class="col-lg-6">
																<div class="card mb-4">
																	<div class="card-header py-3">
																		<h6 class="m-0 font-weight-bold text-primary">Dataset A</h6>
																	</div>
																	<div class="card-body">
																		<div class="row">
																			<div class="col-lg-6 text-center">
																				<i class="fas fa-camera fa-7x mb-4"></i>
																				<button class="btn btn-block btn-primary">
																					41 | Seen
																	</button>
																				<button class="btn btn-block btn-primary">
																					31 | Citation
																	</button>
																			</div>
																			<div class="col-lg-6">
																				<div class="row">
																					<div class="col-lg-12 mb-4">
																						<i class="fas fa-user fa-2x"></i>
																						<span class="ml-4">Username</span>
																					</div>
																					<div class="col-lg-12 mb-4">
																						<i class="fas fa-calendar-alt fa-2x"></i>
																						<span class="ml-4">2 days</span>
																					</div>
																					<div class="col-lg-12 mb-4">
																						<i class="fas fa-database fa-2x"></i>
																						<span class="ml-4">729 MB</span>
																					</div>
																					<div class="col-lg-12 mb-4">
																						<i class="fas fa-file-alt fa-2x"></i>
																						<span class="ml-4">JSON, CSV etc</span>
																					</div>
																					<div class="col-lg-12 mb-4">
																						<i class="fas fa-star text-warning fa-2x"></i>
																						<i class="fas fa-star text-warning fa-2x"></i>
																						<i class="fas fa-star text-warning fa-2x"></i>
																						<i class="fas fa-star text-warning fa-2x"></i>
																						<i class="fas fa-star text-warning fa-2x"></i>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div class="col-lg-6">
																<div class="card mb-4">
																	<div class="card-header py-3">
																		<h6 class="m-0 font-weight-bold text-primary">Dataset B</h6>
																	</div>
																	<div class="card-body">
																		<div class="row">
																			<div class="col-lg-6 text-center">
																				<i class="fas fa-camera fa-7x mb-4"></i>
																				<button class="btn btn-block btn-primary">
																					41 | Seen
																	</button>
																				<button class="btn btn-block btn-primary">
																					31 | Citation
																	</button>
																			</div>
																			<div class="col-lg-6">
																				<div class="row">
																					<div class="col-lg-12 mb-4">
																						<i class="fas fa-user fa-2x"></i>
																						<span class="ml-4">Username</span>
																					</div>
																					<div class="col-lg-12 mb-4">
																						<i class="fas fa-calendar-alt fa-2x"></i>
																						<span class="ml-4">2 days</span>
																					</div>
																					<div class="col-lg-12 mb-4">
																						<i class="fas fa-database fa-2x"></i>
																						<span class="ml-4">729 MB</span>
																					</div>
																					<div class="col-lg-12 mb-4">
																						<i class="fas fa-file-alt fa-2x"></i>
																						<span class="ml-4">JSON, CSV etc</span>
																					</div>
																					<div class="col-lg-12 mb-4">
																						<i class="fas fa-star text-warning fa-2x"></i>
																						<i class="fas fa-star text-warning fa-2x"></i>
																						<i class="fas fa-star text-warning fa-2x"></i>
																						<i class="fas fa-star text-warning fa-2x"></i>
																						<i class="fas fa-star text-warning fa-2x"></i>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<hr />
														<div class="row">
															<div class="col-lg-12">
																<div class="card mb-4">
																	<div class="card-header py-3">
																		<h6 class="m-0 font-weight-bold text-primary">Bio</h6>
																	</div>
																	<div class="card-body">
																		<div class="form-group">
																			<div class="input-group mb-3">
																				<input
																					type="text"
																					class="form-control"
																					placeholder="Click to add bio ..."
																					aria-label=""
																					aria-describedby="basic-addon1"
																				/>
																				<div class="input-group-prepend">
																					<button class="btn btn-primary" type="button">
																						Edit
																		</button>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : null
				}
			</>
		);
	}
}

export default My_Profile;
