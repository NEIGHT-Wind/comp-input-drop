import React, { Component } from 'react';
import InputComponent from './../component/Input';
import DropComponent from './../component/Drop';
import './container.css';
import requestData from './../json/requestData.json';

if (!localStorage) {
	let key = Object.keys(requestData);
	// requestData是编写的假数据，json格式
	key.forEach(val => localStorage.setItem(val, requestData[val]));
	// 存入缓存作为假数据存储
}
// input字段
const InputData = [
	{
		title: '邮箱',
		key: 'email',
		placeholder: '请输入邮箱',
		check: 'Email',
		checkTips: '邮箱不符规格'
	}, {
		title: '电话',
		key: 'tel',
		placeholder: '请输入电话',
		check: 'Tel',
		checkTips: '电话号不符规格'
	}, {
		title: '身份证',
		key: 'ID',
		placeholder: '请输入身份证',
		check: 'ID',
		checkTips: '身份证不符规格'
	}, {
		title: '年龄',
		key: 'age',
		placeholder: '18-70岁',
		check: /^(?:18|19|[2-6][0-9]?|70)$/,
		checkTips: '请输入正确的年龄'
	}, {
		title: '兴趣',
		key: 'hobby',
		disabled: true
	}
];
// drop字段
const DropData = [
	{
		title: 'cpu',
		key: 'cpu',
		content: { 0: '2G', 1: '4G', 2: '8G' },
	}, {
		title: '带宽',
		key: 'mbsp',
		content: { 0: '200mbps', 1: '400mbps', 2: '800mbps'}
	}
];

class Container extends Component{
	constructor(props) {
		super(props);
		this.state = {
			email: '1354583681@qq.com',
			tel: '',
			ID: '',
			age: '',
			hobby: '',
			cpu: '',
			mbsp: ''
		}
		// 我们可以在this.state里面为组件设置默认值
		this.data = {
			email: '1354583681@qq.com',
			tel: '',
			ID: '',
			age: '',
			hobby: '',
			cpu: '',
			mbsp: ''
		}
		// this.data作为this.state的副本，当input与drop组件通过returnValue得到返回值的时候，
		// 只改变this.data不改变this.state，避免不必要的渲染过程
		this.getInputValue = this.getInputValue.bind(this);
		this.getDropValue = this.getDropValue.bind(this);
		this.save = this.save.bind(this);
	}
	componentDidMount() {
		setTimeout(() => {
			let key = Object.keys(this.data);
			key.forEach(val => {
				this.setState({ [val]: localStorage.getItem(val) });
				this.data[val] = localStorage.getItem(val)
			});
		}, 5000);
		// 这里做一个异步请求假设发送请求返回数据并改变了this.state
	}
	getInputValue(val, key) {
		this.data[key] = val;
		// 不改变this.state，避免没必要的渲染
	}
	getDropValue(val, key) {
		this.data[key] = val;
		// 不改变this.state，避免没必要的渲染
	}
	save() {
		// 调用接口发送this.data即可
		alert('保存成功'); // 后台返回的successed message
		let key = Object.keys(this.data);
		key.forEach(val => localStorage.setItem(val, this.data[val]));
		// 存储假数据
	}
	render() {
		return (
			<React.Fragment>
				{
					InputData.map((val, index) => (
						<InputComponent
							key={index}
							title={val.title}
							returnValue={value => this.getInputValue(value, val.key)}
							placeholder={val.placeholder}
							disabled={val.disabled}
							value={this.state[val.key]}
							check={val.check}
							checkTips={val.checkTips}
						/>
					))
				}{
					DropData.map((val, index) => (
						<DropComponent
							key={index}
							title={val.title}
							content={val.content}
							returnValue={contentkey => this.getDropValue(contentkey, val.key)}
							valueKey={this.state[val.key]}
							disabled={val.disabled}
						/>
					))
				}
				<button
					className="saveBtn"
					onClick={this.save}
				>保存</button>
			</React.Fragment>
		);
	}
}

export default Container;
