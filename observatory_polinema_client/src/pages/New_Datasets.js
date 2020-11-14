import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class New_Datasets extends Component {
	render() {
		return (
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
										<div class="p-5">
											<div class="text-center">
												<Link to="/datasets-submit">
													<button class="btn btn-primary">Add Datasets</button>
												</Link>
											</div>
											<hr />
											<div class="row">
												<div class="col-lg-6">
													<div class="card mb-4">
														<div class="card-header py-3">
															<Link to="/datasets-detail">
																<h6 class="m-0 font-weight-bold text-primary">
																	Dataset A
																</h6>
															</Link>
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
															<Link to="/datasets-detail">
																<h6 class="m-0 font-weight-bold text-primary">
																	Dataset B
																</h6>
															</Link>
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
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default New_Datasets;
