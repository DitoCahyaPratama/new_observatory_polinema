import React, { Component } from 'react';

class About extends Component {
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
												<h1 class="h5 text-gray-900">About Web Observatory JTI Polinema</h1>
												<h1 class="h6 text-gray-600 mb-4">Timejoined - last seen</h1>
											</div>
											<hr />
											<div class="row">
												<div class="col-lg-12">
													<div class="card mb-4">
														<div class="card-header py-3">
															<h6 class="m-0 font-weight-bold text-primary">
																Created By
															</h6>
														</div>
														<div class="card-body"></div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-lg-12">
													<div class="card mb-4">
														<div class="card-header py-3">
															<h6 class="m-0 font-weight-bold text-primary">
																Access Type
															</h6>
														</div>
														<div class="card-body"></div>
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

export default About;
