import React, { Component } from 'react';

class Discussion_Menu extends Component {
	render() {
		return (
			<div class="container-fluid">
				<div class="d-sm-flex align-items-center justify-content-between mb-4">
					<h1 class="h3 mb-0 text-gray-800">Discussion</h1>
				</div>

				<div class="row justify-content-center">
					<div class="col-xl-12 col-lg-12">
						<div class="card o-hidden border-0 my-5">
							<div class="card-body p-0">
								<div class="row">
									<div class="col-lg-12">
										<div class="p-5">
											<div class="text-center">
												<div class="row justify-content-center">
													<div class="col-lg-8 text-left table-responsive">
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
														<table class="table table-hover table-striped table-bordered">
															<tr>
																<td>
																	<i class="fas fa-file mr-4"></i>Dataset A
																</td>
															</tr>
															<tr>
																<td>
																	<i class="fas fa-file mr-4"></i>Dataset B
																</td>
															</tr>
															<tr>
																<td>
																	<i class="fas fa-file mr-4"></i>Dataset C
																</td>
															</tr>
															<tr>
																<td>
																	<i class="fas fa-file mr-4"></i>Dataset D
																</td>
															</tr>
															<tr>
																<td>
																	<i class="fas fa-file mr-4"></i>Dataset E
																</td>
															</tr>
															<tr>
																<td>
																	<i class="fas fa-file mr-4"></i>Dataset F
																</td>
															</tr>
															<tr>
																<td>
																	<i class="fas fa-file mr-4"></i>Dataset G
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

export default Discussion_Menu;
