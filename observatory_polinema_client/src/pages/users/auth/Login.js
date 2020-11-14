import React, { Component } from 'react';
import { login } from '../../../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../../constants';
import fbLogo from '../../../img/fb-logo.png';
import googleLogo from '../../../img/google-logo.png';
import githubLogo from '../../../img/github-logo.png';

import { Form, Input, Button, Icon, notification, Card, Typography } from 'antd';

const { Title } = Typography;
const FormItem = Form.Item;

class Login extends Component {
	render() {
		const AntWrappedLoginForm = Form.create()(LoginForm);
		return (
			<div className="login-container">
				<div className="login-body">
					<Link to="/">
						{/* <Icon type="global" style={{ fontSize: '72px', color: '#1D8EFB', paddingBottom: 10 }} /> */}
						<img src="/img/Polinema.png" width="100" height="60" class="d-inline-block align-top" alt="" />
					</Link>
					<Title level={3} textALign="center" type="secondary">
						JTI-Polinema - Research Data Portal
					</Title>
					<Card bordered={false} style={{ width: 400 }}>
						<div className="login-content">
							<div className="social-signup">
								<a className="btn btn-block social-btn google" >
									<img src={googleLogo} alt="Google" /> Login with Google
								</a>
								<a className="btn btn-block social-btn facebook">
									<img src={fbLogo} alt="Facebook" /> Login with Facebook
								</a>
								<a className="btn btn-block social-btn github">
									<img src={githubLogo} alt="Github" /> Login with Github
								</a>
							</div>
							<AntWrappedLoginForm onLogin={this.props.onLogin} />
						</div>
					</Card>
				</div>
			</div>
		);
	}
}

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const loginRequest = Object.assign({}, values);
				login(loginRequest)
					.then((response) => {
						localStorage.setItem(ACCESS_TOKEN, response.accessToken);
						this.props.onLogin();
					})
					.catch((error) => {
						if (error.status === 401) {
							notification.error({
								message: 'Observatory Polinema',
								description: 'Your Username or Password is incorrect. Please try again!',
							});
						} else {
							notification.error({
								message: 'Observatory Polinema',
								description: error.message || 'Sorry! Something went wrong. Please try again!',
							});
						}
					});
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem>
					{getFieldDecorator('usernameOrEmail', {
						rules: [{ required: true, message: 'Please input your username or email!' }],
					})(
						<Input
							prefix={<Icon type="user" />}
							size="large"
							name="usernameOrEmail"
							placeholder="Username or Email"
						/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input
							prefix={<Icon type="lock" />}
							size="large"
							name="password"
							type="password"
							placeholder="Password"
						/>
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" size="large" className="login-form-button">
						Login
					</Button>
					Or <Link to="/register">register now!</Link>
				</FormItem>
			</Form>
		);
	}
}
export default Login;
