import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { getAvatarColor } from '../../util/Colors';
import { getUserProfile, getAllAppHeader, deleteAppHeaderById, getAppHeaderById } from '../../util/APIUtils';
import { Table, Input, Button, Space, Icon, Divider, notification } from 'antd';
import Highlighter from 'react-highlight-words';

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			isLoading: false,
			searchText: '',
			searchedColumn: '',
			data: [],
		};
		this.loadUserProfile = this.loadUserProfile.bind(this);
	}

	getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						this.searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
					icon="search"
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
				</Button>
				<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
					Reset
				</Button>
			</div>
		),
		filterIcon: (filtered) => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
		render: (text) =>
			this.state.searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[this.state.searchText]}
					autoEscape
					textToHighlight={text.toString()}
				/>
			) : (
				text
			),
	});

	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.setState({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex,
		});
	};

	handleReset = (clearFilters) => {
		clearFilters();
		this.setState({ searchText: '' });
	};

	loadUserProfile(username) {
		this.setState({
			isLoading: true,
		});

		getUserProfile(username)
			.then((response) => {
				this.setState({
					user: response,
					isLoading: false,
				});
			})
			.catch((error) => {
				if (error.status === 404) {
					this.setState({
						notFound: true,
						isLoading: false,
					});
				} else {
					this.setState({
						serverError: true,
						isLoading: false,
					});
				}
			});
	}

	componentDidMount() {
		const username = this.props.currentUser.username;
		getAllAppHeader()
			.then((datas) => {
				console.log(datas)
				const AppHeader = []
				datas.map((dt, key) => {
					let dateFull = new Date(dt.createdAt)
					let date = dateFull.getDate() +" - "+ (dateFull.getUTCMonth() + 1) +" - "+ dateFull.getFullYear()
					let data_cache = {id: key + 1, key: dt.id, name: dt.name, description: dt.description, uploaded: date}
					AppHeader.push(data_cache)
				})
				this.setState({
					data: AppHeader,
				});
			})
			.catch((error) => {
				console.log(error);
			});
		// console.log(username);
		this.loadUserProfile(username);
	}

	componentDidUpdate(nextProps) {
		if (this.props.match.params.username !== nextProps.match.params.username) {
			this.loadUserProfile(nextProps.match.params.username);
		}
		getAllAppHeader()
			.then((datas) => {
				const AppHeader = []
				datas.map((dt, key) => {
					let dateFull = new Date(dt.createdAt)
					let date = dateFull.getDate() +" - "+ (dateFull.getUTCMonth() + 1) +" - "+ dateFull.getFullYear()
					let data_cache = {id: key + 1, key: dt.id, name: dt.name, description: dt.description, uploaded: date}
					AppHeader.push(data_cache)
				})
				this.setState({
					data: AppHeader,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	deleteAppHeader = (id) => {
		deleteAppHeaderById(id)
			.then((response) => {
				// console.log(response)
				notification.success({
					message: 'Observatory Polinema',
					description: 'App header successfully deleted',
				});
			})
			.catch((error) => {
				notification.error({
					message: 'Observatory Polinema',
					description: error.message || 'Sorry! Something went wrong. Please try again!',
				});
			})
	}
	editAppHeader = (id) => {
		getAppHeaderById(id)
			.then((response) => {
				this.props.history.push({pathname: '/datasets-submit', state: response});
			})
			.catch((error) => {
				notification.error({
					message: 'Observatory Polinema',
					description: error.message || 'Sorry! Something went wrong. Please try again!',
				});
			})
	}
	render() {
		const columns = [
			{
				title: 'Number',
				dataIndex: 'id',
				key: 'id',
				width: '10%',
			},
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				width: '20%',
				...this.getColumnSearchProps('name'),
			},
			{
				title: 'Description',
				dataIndex: 'description',
				key: 'description',
				width: '30%',
				...this.getColumnSearchProps('description'),
			},
			{
				title: 'Uploaded',
				dataIndex: 'uploaded',
				key: 'uploaded',
				...this.getColumnSearchProps('uploaded'),
			},
			{
				title: 'Action',
				dataIndex: 'action',
				key: 'action',
				render: (text, record) => (
					<span>
					  <a onClick={() => this.editAppHeader(record.key)}>Edit</a>
					  <Divider type="vertical" />
					  <a onClick={() => this.deleteAppHeader(record.key)}>Delete</a>
					</span>
				  ),
			},
		];
		const {data} = this.state
		return (
			<>
				{this.state.user ? (
					<div class="container-fluid">
						<div class="d-sm-flex align-items-center justify-content-between mb-0">
							<h1 class="h3 mb-0 text-gray-800">My Account</h1>
						</div>
						<div class="row justify-content-center">
							<div class="col-xl-12 col-lg-12">
								<div class="card o-hidden border-0 my-2">
									<div class="card-body p-2">
										<div class="row">
											<div class="col-lg-12">
												<div class="p-2">
													<div class="text-center">
														<Avatar
															className="user-avatar-circle"
															style={{
																backgroundColor: getAvatarColor(this.state.user.name),
															}}
														>
															{this.state.user.name[0].toUpperCase()}
														</Avatar>
														<h1 class="h5 text-gray-900">{this.state.user.name}</h1>
														<h1 class="h6 text-gray-600 mb-4">
															Joining Date - {this.state.user.joinedAt}
														</h1>
														<Button type="primary">Edit Profil</Button>
														<div class="row justify-content-center">
															<div class="col-lg-6 text-left">
																<table border="0" class="tbl-account">
																	<tr>
																		<td>Username</td>
																		<td>
																			{this.state.user.username} (cannot be
																			changed)
																		</td>
																	</tr>
																	<tr>
																		<td>Fullname</td>
																		<td>{this.state.user.name}</td>
																	</tr>
																	<tr>
																		<td>Email</td>
																		<td>{this.state.user.email}</td>
																	</tr>
																</table>
															</div>
															<div class="col-lg-12 pt-4 text-center">
																<h4>Your Dataset</h4>
																<Link to="/datasets-submit" className="m-4">
																	<Button type="primary" icon="plus">
																		Add DataSet
																	</Button>
																</Link>
																<Table columns={columns} dataSource={data} />
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
				) : null}
			</>
		);
	}
}

export default Account;
