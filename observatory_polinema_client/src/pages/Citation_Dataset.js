import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Citation_Datasets extends Component {
	render() {
		return (
			<div class="container-fluid">
				<div class="d-sm-flex align-items-center justify-content-between mb-4">
					<h1 class="h3 mb-0 text-gray-800">Citation Dataset</h1>
				</div>
				<div class="row justify-content-center">
					<div class="col-xl-12 col-lg-12">
						<div class="card o-hidden border-0 my-5">
							<div class="card-body p-0">
								<div class="row">
									<div class="col-lg-12">
										<div class="p-5">
											<div class="text-center">
												<h1 class="h5 text-gray-900">Dataset A</h1>
												<h1 class="h6 text-gray-600 mb-4">Papers That Cite This Dataset</h1>
												<div class="text-right p-4">
													<Link to="/">
														Another Type <i class="fas fa-plus"></i>
													</Link>
												</div>
												<div class="row justify-content-center">
													<div class="col-lg-8 text-left table-responsive">
														<table class="table table-hover table-striped table-bordered">
															<tr>
																<td>
																	<i class="fas fa-tags mr-4"></i>AAAA BBBB and C.
																	DDDD. Title Title Title. Applied. 20xx.
																</td>
															</tr>
															<tr>
																<td>
																	<i class="fas fa-tags mr-4"></i>AAAA BBBB and C.
																	DDDD. Title Title Title. Applied. 20xx.
																</td>
															</tr>
															<tr>
																<td>
																	<i class="fas fa-tags mr-4"></i>AAAA BBBB and C.
																	DDDD. Title Title Title. Applied. 20xx.
																</td>
															</tr>
															<tr>
																<td>
																	<i class="fas fa-tags mr-4"></i>AAAA BBBB and C.
																	DDDD. Title Title Title. Applied. 20xx.
																</td>
															</tr>
															<tr>
																<td>
																	<i class="fas fa-tags mr-4"></i>AAAA BBBB and C.
																	DDDD. Title Title Title. Applied. 20xx.
																</td>
															</tr>
															<tr>
																<td>
																	<i class="fas fa-tags mr-4"></i>AAAA BBBB and C.
																	DDDD. Title Title Title. Applied. 20xx.
																</td>
															</tr>
															<tr>
																<td>
																	<i class="fas fa-tags mr-4"></i>AAAA BBBB and C.
																	DDDD. Title Title Title. Applied. 20xx.
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

export default Citation_Datasets;
