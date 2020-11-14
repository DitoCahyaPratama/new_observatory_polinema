import React, { Component } from 'react';
import { Input, Select, Form, Button, Upload, Icon, Checkbox, notification } from 'antd';
import { createAppDetail, updateAppDetail } from '../../util/APIUtils';

const { TextArea } = Input;
const { Option } = Select;

class addFormLocalFiles extends Component {
	constructor(props) {
		super(props);
		if (props.data !== '') {
			console.log(props.data);
			this.state = {
				edit: true,
				appId: props.data.id,
				fileName: props.data.fileName,
				description: props.data.description,
				permission: props.data.permission,
				alias: props.data.alias,
				queryable: props.data.queryable,
				browsable: props.data.browsable,
				shared_to: props.data.shared_to,
			};
		} else {
			this.state = {
				edit: false,
				appId: props.appId,
				fileName: '',
				description: '',
				permission: '',
				alias: '',
				queryable: false,
				browsable: false,
				shared_to: '',
			};
		}
	}
	handleSubmitAppDetail = () => {
		const appDetailData = {
			fileName: this.state.fileName,
			description: this.state.description,
			permission: this.state.permission,
			alias: this.state.alias,
			queryable: this.state.queryable,
			browsable: this.state.browsable,
			shared_to: this.state.shared_to,
		};
		console.log(this.state.idApp);
		createAppDetail(appDetailData, this.state.appId)
			.then((response) => {
				// console.log(response)
				notification.success({
					message: 'Observatory Polinema',
					description: 'App detail successfully added',
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
  
  handleEditAppDetail = () => {
    const appDetailData = {
			fileName: this.state.fileName,
			description: this.state.description,
			permission: this.state.permission,
			alias: this.state.alias,
			queryable: this.state.queryable,
			browsable: this.state.browsable,
			shared_to: this.state.shared_to,
		};
		updateAppDetail(appDetailData, this.state.appId)
			.then((response) => {
				// console.log(response)
				notification.success({
					message: 'Observatory Polinema',
					description: 'App detail successfully edited',
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
  }

	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	handleSelectChange = (event) => {
		this.setState({ permission: event });
	};

	onChangeQuery = (event) => {
		this.setState({ queryable: event.target.checked });
	};

	onChangeBrowser = (event) => {
		this.setState({ browsable: event.target.checked });
	};


	render() {
		const { fileName, description, permission, alias, queryable, browsable, shared_to } = this.state;
		return (
			<Form className="login-form pt-4">
				<div class="form-group">
					<label htmlFor="filename">File Name</label>
					<Input
						placeholder="File Name"
						name="fileName"
						onChange={this.handleInputChange}
						value={fileName}
						allowClear
					/>
				</div>
				<div class="form-group">
					<label htmlFor="description">Description</label>
					<TextArea
						placeholder="Description"
						name="description"
						onChange={this.handleInputChange}
						value={description}
						allowClear
					/>
				</div>
				<div class="form-group">
					<Form.Item label="File">
						<Upload.Dragger name="files" action="/upload.do">
							<p className="ant-upload-drag-icon">
								<Icon type="inbox" />
							</p>
							<p className="ant-upload-text">Click or drag file to this area to upload</p>
							<p className="ant-upload-hint">Support for a single or bulk upload.</p>
						</Upload.Dragger>
					</Form.Item>
				</div>
				<div class="form-group">
					<label htmlFor="filename">Alias  (For the file as csv, json, txt, or xls and it is intended to be queryable, then, you have to name an alias table. )</label>
					<Input
						placeholder="Alias"
						name="alias"
						onChange={this.handleInputChange}
						value={alias}
						allowClear
					/>
				</div>
				<div class="form-group">
					<label htmlFor="description">Permissions</label>
					<Select
						style={{ width: '100%' }}
						name="permission"
						onChange={this.handleSelectChange}
						value={permission}
						defaultValue="public"
					>
						<Option value="public">Public</Option>
						<Option value="displayed">Displayed</Option>
						<Option value="private">Private</Option>
					</Select>
				</div>
				
				{/* <div class="form-group">
					<Checkbox onChange={this.onChangeQuery} checked={queryable}>Queryable</Checkbox>
				</div>

				<div class="form-group">
					<Checkbox onChange={this.onChangeBrowser} checked={browsable}>Browsable</Checkbox>
				</div> */}

				<div class="form-group">
					<label htmlFor="shared_to">Shared To</label>
					<Input
						placeholder="Shared To"
						name="shared_to"
						onChange={this.handleInputChange}
						value={shared_to}
						allowClear
					/>
				</div>
				{this.state.edit ? (
					<Button type="primary" icon="plus" onClick={this.handleEditAppDetail}>
						Edit
					</Button>
				) : (
					<Button type="primary" icon="plus" onClick={this.handleSubmitAppDetail}>
						Save
					</Button>
				)}
			</Form>
		);
	}
}

export default addFormLocalFiles;
