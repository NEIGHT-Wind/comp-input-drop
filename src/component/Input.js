import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

class InputComponent extends Component{
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			// 这里将value参数暴露出去有一下三点考虑
			// 1、不传参：value由组件自身控制；
			// 2、value可由外界控制；3、传固定值相当于defaultValue
			showCheckTips: false
			// 控制校验提示信息显示
		};
		this.checkWay = {
			Tel: /^1[34578]\d{9}$/,
			Email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
			ID: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
		};
		// 组件自带默认规则
		this.reg = '';
		// 使用者选择规则或自定义规则
		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}
	componentWillMount() {
		if (this.props.check !== '') {
			if (this.checkWay.hasOwnProperty(this.props.check)) {
				// 判断使用者传递的是否为自带默认规则
				this.reg = new RegExp(this.checkWay[this.props.check]);
				// 默认规则
			} else {
				this.reg = new RegExp(this.props.check);
				// 自定义规则
			}
		}
	}
	componentWillReceiveProps(next) {
		if (this.props.value !== next.value) {
			// 判断因异步改变的参数是否为value
			this.setState({
				value: next.value
			});
		}
	}
	handleChange(val) {
		this.setState({
			value: val
		});
	}
	handleBlur() {
		if (this.reg !== '' && this.state.value !== '') {
			// 判断使用者是否传了check参数 && value值不为空，为空不触发效验规则
			if (this.reg.test(this.state.value)) {
				// 判断value是否符合规则
				this.setState({
					showCheckTips: false
				});
				this.props.returnValue(this.state.value);
			} else {
				this.setState({
					showCheckTips: true
				});
			}
		} else {
			this.setState({
				showCheckTips: false
			});
			this.props.returnValue(this.state.value);
		}
	}
	// returnValue将改变的值返回给使用者
	// 没在onChange函数里面调用returnValue，而是在onBlur是出于onBlur的触发次数少于onChange
	render() {
		return (
			<div
				className="comp-input-box"
				style={this.props.ComponentStyle}
			>
				<label
					className="comp-title"
					style={this.props.CompTitleStyle}
				>{this.props.title + ':'}</label>
				<input
					className="comp-input"
					type="text"
					style={this.props.CompInputStyle}
					placeholder={this.props.placeholder}
					disabled={this.props.disabled}
					value={this.state.value}
					onChange={(e) => this.handleChange(e.target.value)}
					onBlur={this.handleBlur}
				/>
				{
					this.state.showCheckTips ?
						<span className="comp-checkTips">{'*' + this.props.checkTips}</span>
					: null
				}
			</div>
		);
	}
}

InputComponent.propTypes={
	title: PropTypes.string.isRequired,
	returnValue: PropTypes.func.isRequired,
	ComponentStyle: PropTypes.object,
	CompTitleStyle: PropTypes.object,
	CompInputStyle: PropTypes.object,
	placeholderMes: PropTypes.string,
	disabled: PropTypes.bool,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	check: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	checkTips: PropTypes.string
};
InputComponent.defaultProps={
	ComponentStyle: {},
	CompTitleStyle: {},
	CompInputStyle: {},
	placeholder: '',
	disabled: false,
	value: '',
	check: '',
	checkTips: ''
}

export default InputComponent;
