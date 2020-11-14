import React, { Component } from 'react';
import {
	getAllResearchGroup,
	getAllLicense,
	createAppHeader,
	updateAppHeader,
	getAllAppDetail,
	deleteAppDetailById,
	updateAppDetail,
	getAppDetailById,
} from '../../util/APIUtils';
import { Link } from 'react-router-dom';
import {
	Input,
	Select,
	Form,
	DatePicker,
	Typography,
	Tabs,
	Table,
	Button,
	Icon,
	Card,
	notification,
	Divider,
	Tag,
	Tooltip,
} from 'antd';
import moment from 'moment';
import AddFormLocalFiles from './AddFormLocalFiles';
import AddImageThumbnail from './AddImageThumbnail';
import Highlighter from 'react-highlight-words';
import QueryBrowser from './QueryBrowser';

const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;
const { TabPane } = Tabs;

let current_datetime = new Date();
let formatted_date =
	current_datetime.getDate() + '-' + (current_datetime.getMonth() + 1) + '-' + current_datetime.getFullYear();
const dateFormatList = ['DD/MM/YYYY'];

class Datasets_Submit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addLF: false,
			addAT: false,
			addDS: false,
			searchText: '',
			searchedColumn: '',
			researchGroups: [],
			licenses: [],

			idApp: 0,
			name: '',
			description: '',
			researchGroup: '',
			tags: '',
			tag: [],
			citedAs: '',
			published: '',
			generated: '',
			license: '',
			link: '',
			organization: '',
			inputVisible: false,
			inputValue: '',

			appDetails: [],
			appDetail: '',
		};
	}

	componentDidMount = () => {
		if (this.props.location.state) {
			console.log(this.props.location.state);
			const dataState = this.props.location.state;
			this.setState({
				idApp: dataState.id,
				name: dataState.name,
				description: dataState.description,
				researchGroup: dataState.rg.id,
				tags: dataState.tags,
				organization: dataState.organization,
				link: dataState.link,
				citedAs: dataState.cited_as,
				published: '',
				generated: '',
				license: dataState.license.id,
				addDS: true,
			});
			const tagArr = dataState.tags.split(",")
			this.setState({
				tag: tagArr
			})
			getAllAppDetail(dataState.id)
				.then((datas) => {
					console.log(datas);
					const AppDetail = [];
					datas.map((dt, key) => {
						let dateFull = new Date(dt.createdAt)
						let date = dateFull.getDate() +" - "+ (dateFull.getUTCMonth() + 1) +" - "+ dateFull.getFullYear()
						let data_cache = {
							id: key + 1,
							key: dt.id,
							fileName: dt.fileName,
							fileSize: dt.fileSize,
							description: dt.description,
							uploaded: date,
							permission: dt.permission,
							alias: dt.alias,
						};
						AppDetail.push(data_cache);
					});
					this.setState({
						appDetails: AppDetail,
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
		this.setState({
			published: moment(`${formatted_date}`, dateFormatList[0]),
			generated: moment(`${formatted_date}`, dateFormatList[0]),
		});
		getAllResearchGroup()
			.then((data) => {
				let researchGroupFromApi = data.map((rg) => {
					return { value: rg.id, display: rg.rgName };
				});
				this.setState({
					researchGroups: [{ value: '', display: '(Select your research group)' }].concat(
						researchGroupFromApi
					),
				});
			})
			.catch((error) => {
				console.log(error);
			});
		getAllLicense()
			.then((data) => {
				// console.log(data);
				let licenseFromApi = data.map((lic) => {
					return { value: lic.id, display: lic.licName, image: lic.licImage };
				});
				this.setState({
					licenses: [{ value: '', display: '(Select your license)', image: '' }].concat(licenseFromApi),
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	handleInputChange = (event) => {
		// console.log(event);
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	handlePublishedChange = (event) => {
		const { _i } = event;
		this.setState({ published: _i });
	};

	handleGeneratedChange = (event) => {
		const { _i } = event;
		this.setState({ generated: _i });
	};

	handleResearchGroupChange = (event) => {
		this.setState({ researchGroup: event });
	};

	handleLicenseChange = (event) => {
		this.setState({ license: event });
	};

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

	addLocalFiles = () => {
		this.setState({ addLF: !this.state.addLF });
	};

	addThumbnail = () => {
		this.setState({ addAT: !this.state.addAT });
	};

	addDatasets = () => {
		this.setState({ addDS: !this.state.addDS });
	};

	handleSubmitAppHeader = () => {
		const appHeaderData = {
			name: this.state.name,
			description: this.state.description,
			tags: this.state.tags,
			organization: this.state.organization,
			link: this.state.link,
			citedAs: this.state.citedAs,
			publish_date: this.state.published,
			generated_date: this.state.generated,
		};
		// console.log(appHeaderData);
		createAppHeader(appHeaderData, this.state.researchGroup, this.state.license)
			.then((response) => {
				// console.log(response)
				notification.success({
					message: 'Observatory Polinema',
					description: 'App header successfully added',
				});
				this.props.history.push('/my-account');
			})
			.catch((error) => {
				if (error.status === 401) {
					console.log('anda belum login');
				} else {
					notification.error({
						message: 'Observatory Polinema',
						description: error.message || 'Sorry! Something went wrong. Please try again!',
					});
				}
			});
	};

	handleEditAppHeader = () => {
		console.log(this.state.tags)
		const appHeaderData = {
			name: this.state.name,
			description: this.state.description,
			tags: this.state.tags,
			organization: this.state.organization,
			link: this.state.link,
			citedAs: this.state.citedAs,
			publish_date: this.state.published,
			generated_date: this.state.generated,
		};
		// console.log(appHeaderData);
		updateAppHeader(appHeaderData, this.state.idApp, this.state.researchGroup, this.state.license)
			.then((response) => {
				// console.log(response)
				notification.success({
					message: 'Observatory Polinema',
					description: 'App header successfully Edited',
				});
				this.props.history.push('/my-account');
			})
			.catch((error) => {
				if (error.status === 401) {
					console.log('anda belum login');
				} else {
					notification.error({
						message: 'Observatory Polinema',
						description: error.message || 'Sorry! Something went wrong. Please try again!',
					});
				}
			});
	};

	editAppDetail = (id) => {
		this.setState({ addLF: !this.state.addLF });
		getAppDetailById(id)
			.then((response) => {
				// console.log(response)
				this.setState({ appDetail: response });
				// this.props.history.push({pathname: '/datasets-submit', state: response});
			})
			.catch((error) => {
				notification.error({
					message: 'Observatory Polinema',
					description: error.message || 'Sorry! Something went wrong. Please try again!',
				});
			});
	};

	deleteAppDetail = (id) => {
		deleteAppDetailById(id)
			.then((response) => {
				// console.log(response)
				notification.success({
					message: 'Observatory Polinema',
					description: 'App detail successfully deleted',
				});
				this.props.history.push('/my-account');
			})
			.catch((error) => {
				notification.error({
					message: 'Observatory Polinema',
					description: error.message || 'Sorry! Something went wrong. Please try again!',
				});
			});
	};

	handleClose = (removedTag) => {
		const tag = this.state.tag.filter((tag) => tag !== removedTag);
		// console.log(tag);
		const strTag = tag.toString()
		this.setState({ 
			tag,
			tags: strTag
		});
	};

	showInput = () => {
		this.setState({ inputVisible: true }, () => this.input.focus());
	};

	handleTagsChange = (e) => {
		this.setState({ inputValue: e.target.value });
	};

	handleInputConfirm = () => {
		const { inputValue } = this.state;
		let { tag } = this.state;
		if (inputValue && tag.indexOf(inputValue) === -1) {
			tag = [...tag, inputValue];
		}
		const strTag = tag.toString()
		this.setState({
			tags: strTag,
			tag,
			inputVisible: false,
			inputValue: '',
		});
	};

	saveInputRef = (input) => (this.input = input);

	render() {
		const {
			researchGroups,
			licenses,
			tags,
			tag,
			name,
			description,
			researchGroup,
			citedAs,
			license,
			inputValue,
			inputVisible,
			link,
			organization,
		} = this.state;

		const children = [];

		for (let i = 10; i < 36; i++) {
			children.push(
				<Option key={i.toString(36) + i} value={i.toString(36) + i}>
					{i.toString(36) + i}
				</Option>
			);
		}

		const columns = [
			{
				title: 'Number',
				dataIndex: 'id',
				key: 'id',
			},
			{
				title: 'Name',
				dataIndex: 'fileName',
				key: 'fileName',
				width: '25%',
				// ...this.getColumnSearchProps('fileName'),
				render: (text, record) => (
					<span>
						<a onClick={() => {}} className="text-primary">{record.fileName}</a>
					</span>
				)
			},
			{
				title: 'Description',
				dataIndex: 'description',
				key: 'description',
				...this.getColumnSearchProps('description'),
			},
			{
				title: 'Uploaded',
				dataIndex: 'uploaded',
				key: 'uploaded',
				width: '15%',
				...this.getColumnSearchProps('uploaded'),
			},
			{
				title: 'Size',
				dataIndex: 'fileSize',
				key: 'fileSize',
				className: 'column-size',
				...this.getColumnSearchProps('fileSize'),
			},
			{
				title: 'Permissions',
				dataIndex: 'permission',
				key: 'permission',
				...this.getColumnSearchProps('permission'),
			},
			{
				title: 'Alias',
				dataIndex: 'alias',
				key: 'alias',
				...this.getColumnSearchProps('alias'),
			},
			{
				title: 'Action',
				dataIndex: 'action',
				key: 'action',
				render: (text, record) => (
					<span>
						<a onClick={() => this.editAppDetail(record.key)}>Edit</a>
						<Divider type="vertical" />
						<a onClick={() => this.deleteAppDetail(record.key)}>Delete</a>
					</span>
				),
			},
		];

		let researchGroupMap =
			researchGroups.length > 0 &&
			researchGroups.map((item, i) => {
				return (
					<Option key={i} value={item.value}>
						{item.display}
					</Option>
				);
				// console.log(item)
			}, this);

		let licenseMap =
			licenses.length > 0 &&
			licenses.map((item, i) => {
				return (
					<Option key={i} value={item.value}>
						<img src={item.image} alt="" width="88" height="31" />
						<Text>{item.display}</Text>
					</Option>
				);
			});
		const { appDetails } = this.state;
		return (
			<div class="container-fluid">
				<div class="d-sm-flex align-items-center justify-content-between mb-1">
					<h1 class="h3 mb-0 text-gray-800">Dataset Entry Form</h1>
				</div>

				<div class="row justify-content-center">
					<div class="col-xl-12 col-lg-12">
						<div class="card o-hidden border-0 my-1">
							<div class="card-body p-0">
								<div class="row">
									<div class="col-lg-12">
										<div class="p-2">
											<Form className="login-form">
												<div className="mb-1">
													<label class="mb-1" for="description">Name</label>
													<Input
														placeholder="Name"
														name="name"
														onChange={this.handleInputChange}
														value={name}
														allowClear
													/>
												</div>
												<div class="mb-1">
													<label class="mb-1" for="description">Description</label>
													<TextArea
														placeholder="Description"
														name="description"
														onChange={this.handleInputChange}
														value={description}
														allowClear
													/>
												</div>
												<div class="mb-1">
													<label class="mb-1" for="description">Research Group</label>
													<Select
														style={{ width: '100%' }}
														name="researchGroup"
														onChange={this.handleResearchGroupChange}
														value={researchGroup}
													>
														{researchGroupMap}
													</Select>
												</div>
												<div class="mb-1">
													<label class="mb-1" for="organization">Organization</label>
													<Input
														placeholder="Organization"
														name="organization"
														onChange={this.handleInputChange}
														value={organization}
														allowClear
													/>
												</div>
												<div class="mb-1">
													<label class="mb-1" for="link">Link Website</label>
													<Input
														placeholder="www.organization.ac.id ..."
														name="link"
														onChange={this.handleInputChange}
														value={link}
														allowClear
													/>
												</div>
												<div class="mb-1">
													<label class="mb-1" for="tags">Tags</label>
													<div>
														{tag.map((tag, index) => {
															const isLongTag = tag.length > 20;
															const tagElem = (
																<Tag
																	key={tag}
																	closable={index !== 0}
																	onClose={() => this.handleClose(tag)}
																>
																	{isLongTag ? `${tag.slice(0, 20)}...` : tag}
																</Tag>
															);
															return isLongTag ? (
																<Tooltip title={tag} key={tag}>
																	{tagElem}
																</Tooltip>
															) : (
																tagElem
															);
														})}
														{inputVisible && (
															<Input
																ref={this.saveInputRef}
																type="text"
																size="small"
																style={{ width: 78 }}
																value={inputValue}
																onChange={this.handleTagsChange}
																onBlur={this.handleInputConfirm}
																onPressEnter={this.handleInputConfirm}
															/>
														)}
														{!inputVisible && (
															<Tag
																onClick={this.showInput}
																style={{ background: '#fff', borderStyle: 'dashed' }}
															>
																<Icon type="plus" /> New Tag
															</Tag>
														)}
													</div>
												</div>
												<div class="mb-1">
													<label class="mb-1" for="citedAs">Cited As</label>
													<TextArea
														placeholder="citedAs"
														name="citedAs"
														onChange={this.handleInputChange}
														value={citedAs}
														allowClear
													/>
												</div>
												<div class="mb-1">
													<label class="mb-1" for="published">Published</label>
													<DatePicker
														name="published"
														style={{ width: '100%' }}
														defaultValue={moment(`${formatted_date}`, dateFormatList[0])}
														format={dateFormatList}
														onChange={this.handlePublishedChange}
													/>
												</div>
												<div class="mb-1">
													<label class="mb-1" for="published">Generated</label>
													<DatePicker
														name="generated"
														style={{ width: '100%' }}
														defaultValue={moment(`${formatted_date}`, dateFormatList[0])}
														format={dateFormatList}
														onChange={this.handleGeneratedChange}
													/>
												</div>
												<div class="mb-1">
													<label class="mb-1" for="description">License</label>
													<Select
														style={{ width: '100%' }}
														name="license"
														onChange={this.handleLicenseChange}
														value={license}
													>
														{licenseMap}
													</Select>
												</div>
												{this.state.addDS ? (
													<Button
														className="mt-2"	
														type="primary"
														icon="edit"
														onClick={this.handleEditAppHeader}
													>
														Edit
													</Button>
												) : (
													<Button
														className="mt-2"
														type="primary"
														icon="plus"
														onClick={this.handleSubmitAppHeader}
													>
														Submit
													</Button>
												)}
											</Form>
										</div>
										{this.state.addDS ? (
											<div class="p-2">
												<Tabs defaultActiveKey="1">
													<TabPane tab="Local Files" key="1">
														<Button type="primary" icon="plus" onClick={this.addLocalFiles}>
															Add Files
														</Button>
														<Table columns={columns} dataSource={appDetails} />
														{this.state.addLF ? (
															<AddFormLocalFiles
																appId={this.state.idApp}
																history={this.props.history}
																data={this.state.appDetail}
															/>
														) : null}
													</TabPane>
													<TabPane tab="Remote Files" key="2">
														<Form onSubmit={this.handleSubmit} className="login-form">
															<div class="form-group">
																<label for="filename">File Name</label>
																<Input placeholder="filename" allowClear />
															</div>
															<div class="form-group">
																<label for="description">Description</label>
																<TextArea placeholder="Description" allowClear />
															</div>
															<div class="form-group">
																<label for="fileLocation">File Location</label>
																<Input placeholder="fileLocation" allowClear />
															</div>
															<div class="form-group">
																<label for="endPoint">End Point</label>
																<Input placeholder="endPoint" allowClear />
															</div>
															<Button type="primary" icon="plus">
																{' '}
																Submit
															</Button>
														</Form>
													</TabPane>
													<TabPane tab="Image Gallery" key="3">
														<Button
															type="primary"
															class="m-4"
															icon="plus"
															onClick={this.addThumbnail}
														>
															{' '}
															Add Thumbnail
														</Button>
														<Card
															hoverable
															style={{ width: 240 }}
															cover={
																<img
																	alt="thumbnail"
																	src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
																/>
															}
														>
															<Meta title="Thumbnail" />
														</Card>
														{this.state.addAT ? <AddImageThumbnail /> : null}
													</TabPane>
													<TabPane tab="Query Browser" key="4">
														<QueryBrowser />
													</TabPane>
												</Tabs>
											</div>
										) : (
											<></>
										)}
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

export default Datasets_Submit;
