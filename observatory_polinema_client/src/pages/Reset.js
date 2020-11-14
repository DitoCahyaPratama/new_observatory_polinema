import React, { Component } from 'react';

class Reset extends Component {
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
												<i class="fas fa-users fa-4x pb-4 text-primary"></i>
												<h1 class="h5 text-gray-900">Username</h1>
												<h1 class="h6 text-gray-600 mb-4">Timejoined - last seen</h1>
												<div class="row justify-content-center">
													<div class="col-lg-6 text-left">
														<table border="0" class="tbl-account">
															<tr>
																<td>Old password</td>
																<td>
																	<input
																		type="password"
																		class="form-control bg-light border-0 "
																		placeholder="Old password ... "
																		aria-label="Old password"
																		aria-describedby="Old password"
																	/>
																</td>
															</tr>
															<tr>
																<td>New password</td>
																<td>
																	<input
																		type="password"
																		class="form-control bg-light border-0 "
																		placeholder="New password ... "
																		aria-label="New password"
																		aria-describedby="New password"
																	/>
																</td>
															</tr>
															<tr>
																<td>Confirm new password</td>
																<td>
																	<input
																		type="password"
																		class="form-control bg-light border-0 "
																		placeholder="Confirm new password ... "
																		aria-label="Confirm new password"
																		aria-describedby="Confirm new password"
																	/>
																</td>
															</tr>
															<tr>
																<td colspan="2" class="text-center">
																	<div
																		class="btn-group"
																		role="group"
																		aria-label="Basic example"
																	>
																		<button type="button" class="btn btn-danger">
																			Cancel
																		</button>
																		<button type="button" class="btn btn-secondary">
																			Reset
																		</button>
																	</div>
																</td>
															</tr>
														</table>
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

export default Reset;
