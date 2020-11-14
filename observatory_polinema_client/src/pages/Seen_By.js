import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Scroll from '../components/Scroll';
import Modal from '../components/Modal';

class Seen_By extends Component {
	render() {
		return (
			<div class="container-fluid">
				<div class="d-sm-flex align-items-center justify-content-between mb-4">
					<h1 class="h3 mb-0 text-gray-800">Seen By</h1>
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
												<h1 class="h6 text-gray-600 mb-4">Seen By</h1>
												<div class="row justify-content-center">
													<div class="col-lg-6 text-left table-responsive">
														<table class="table table-hover table-striped table-bordered">
															<tr>
																<td>
																	<i class="fas fa-user mr-4"></i>Username
																</td>
																<td>
																	<i class="fas fa-calendar mr-4"></i>Time Joined
																</td>
															</tr>
															<tr>
																<td>
																	<i class="fas fa-user mr-4"></i>Username
																</td>
																<td>
																	<i class="fas fa-calendar mr-4"></i>Time Joined
																</td>
															</tr>
															<tr>
																<td>
																	<i class="fas fa-user mr-4"></i>Username
																</td>
																<td>
																	<i class="fas fa-calendar mr-4"></i>Time Joined
																</td>
															</tr>
															<tr>
																<td>
																	<i class="fas fa-user mr-4"></i>Username
																</td>
																<td>
																	<i class="fas fa-calendar mr-4"></i>Time Joined
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

export default Seen_By;
