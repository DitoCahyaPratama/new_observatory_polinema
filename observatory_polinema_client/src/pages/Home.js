import React, { Component } from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';

import { Collapse } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

class Home extends Component {
	renderLogin = () => {
		if (localStorage.getItem(ACCESS_TOKEN)) {
			return (
				<ul class="navbar-nav ml-auto">
					<li class="nav-item">
						<Link class="nav-link" to="/dashboard">
							<button href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
								Dashboard
							</button>
						</Link>
					</li>
				</ul>
			);
		} else {
			return (
				<ul class="navbar-nav ml-auto">
					<li class="nav-item">
						<Link class="nav-link" to="/login">
							<button href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
								Sign In
							</button>
						</Link>
					</li>
					<div class="topbar-divider d-none d-sm-block"></div>
					<li class="nav-item">
						<Link class="nav-link" to="/register">
							<button href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
								Registration
							</button>
						</Link>
					</li>
				</ul>
			);
		}
	};
	render() {
		return (
			<div>
				<div id="wrapper">
					<div id="content-wrapper" class="d-flex flex-column">
						<div id="content">
							<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
								<button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
									<i class="fa fa-bars"></i>
								</button>
								<Link class="navbar-brand" to="/">
									<img
										src="/img/Polinema.png"
										width="100"
										height="60"
										class="d-inline-block align-top"
										alt=""
									/>
								</Link>
								{this.renderLogin()}
							</nav>
							<div class="container-fluid">
								<div class="row justify-content-center">
									<div class="col-xl-2 col-lg-2 col-md-3 col-sm-6">
										<div class="card my-5">
											<div class="card-header py-3 text-center">
												<h6 class="m-0 font-weight-bold text-primary">Users</h6>
											</div>
											<div class="card-body p-3 text-center">425</div>
										</div>
									</div>
									<div class="col-xl-2 col-lg-2 col-md-3 col-sm-6">
										<div class="card my-5">
											<div class="card-header py-3 text-center">
												<h6 class="m-0 font-weight-bold text-primary">Datasets</h6>
											</div>
											<div class="card-body p-3 text-center">425</div>
										</div>
									</div>
									<div class="col-xl-2 col-lg-2 col-md-3 col-sm-6">
										<div class="card my-5">
											<div class="card-header py-3 text-center">
												<h6 class="m-0 font-weight-bold text-primary">Downloaded</h6>
											</div>
											<div class="card-body p-3 text-center">425</div>
										</div>
									</div>
									<div class="col-xl-2 col-lg-2 col-md-3 col-sm-6">
										<div class="card my-5">
											<div class="card-header py-3 text-center">
												<h6 class="m-0 font-weight-bold text-primary">Queried</h6>
											</div>
											<div class="card-body p-3 text-center">425</div>
										</div>
									</div>
									<div class="col-xl-2 col-lg-2 col-md-3 col-sm-6">
										<div class="card my-5">
											<div class="card-header py-3 text-center">
												<h6 class="m-0 font-weight-bold text-primary">Cited</h6>
											</div>
											<div class="card-body p-3 text-center">425</div>
										</div>
									</div>
								</div>
								<div class="row justify-content-center">
									<div class="col-xl-10 col-lg-10 col-md-9">
										<div class="card o-hidden border-0">
											<div class="card-body p-0">
												<div class="row">
													<div class="col-lg-12">
														<div class="p-5">
															<div class="text-center">
																<i class="fas fa-globe fa-4x pb-4 text-primary"></i>
																<h1 class="h5 text-gray-900 mb-4">
																	Polinema Web Observatory
																</h1>
															</div>
															<form class="user">
																<div class="form-group">
																	<input
																		type="email"
																		class="form-control form-control-user"
																		id="exampleInputEmail"
																		aria-describedby="emailHelp"
																		placeholder="Search Datasets..."
																	/>
																</div>
															</form>
															<hr />
															<Collapse accordion>
																<Panel header="The ten most recent datasets" key="1">
																	<p>{text}</p>
																</Panel>
																<Panel header="The ten most downloaded datasets" key="2">
																	<p>{text}</p>
																</Panel>
																<Panel header="The ten most cited datasets" key="3">
																	<p>{text}</p>
																</Panel>
                                                                <Panel header="The ten most active users" key="4">
																	<p>{text}</p>
																</Panel>
                                                                <Panel header="The ten most recent datasets of the Computer Vision Research Group" key="5">
																	<p>{text}</p>
																</Panel>
                                                                <Panel header="The ten most recent datasets of the Expert System Research Group" key="6">
																	<p>{text}</p>
																</Panel>
                                                                <Panel header="The ten most recent datasets of the Information System Research Group" key="7">
																	<p>{text}</p>
																</Panel>
                                                                <Panel header="The ten most recent datasets of the Multimedia Research Group" key="8">
																	<p>{text}</p>
																</Panel>
                                                                <Panel header="The ten most recent datasets of the Networking Research Group" key="9">
																	<p>{text}</p>
																</Panel>
                                                                <Panel header="The ten most queried datasets" key="10">
																	<p>{text}</p>
																</Panel>
															</Collapse>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<Footer />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
