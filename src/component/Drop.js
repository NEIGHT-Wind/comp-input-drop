import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Drop.css';

class DropComponent extends Component{
	constructor(props) {
		super(props);
		this.state = {
			valueKey: props.valueKey,
			// 这里将valueKey参数暴露出去有一下三点考虑
			// 1、不传参：valueKey由组件自身控制；
			// 2、valueKey可由外界控制；3、传固定值相当于defaultValue
			showList: false
			// 控制下拉菜单显示
		};
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}
	componentWillReceiveProps(next) {
		if (this.props.valueKey !== next.valueKey) {
			// 判断因异步改变的参数是否为value
			this.setState({
				valueKey: next.valueKey
			});
		}
	}
	// 聚焦显示
	handleFocus() {
		this.setState({
			showList: true
		});
	}
	// 失焦收回
	handleBlur() {
		this.setState({
			showList: false
		});
		this.props.returnValue(this.state.valueKey);
		// 将valueKey返回给使用者
	}
	// 选择下拉选项
	handleClick(key) {
		this.setState({
			valueKey: key,
			showList: false
		});
	}
	// 清空已选内容
	handleKeyUp(keyCode) {
		if (keyCode === 8) {
			// backspace键位的ASC码
			this.setState({
				valueKey: ''
			});
		}
	}
	render() {
		return (
			<div
				className="comp-drop-box"
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
					value={this.state.valueKey === '' ? '' : this.props.content[this.state.valueKey]}
					// 判断valueKey是否为空，空为无值
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					onKeyUp={(e) => this.handleKeyUp(e.keyCode)}
					disabled={this.props.disabled}
					readOnly
				/>
				{
					this.state.showList ?
						<ul
							className="comp-content"
							style={this.props.CompContentStyle}
						>
							{
								Object.keys(this.props.content).map((key, index) => (
									<li
										className="comp-contentLi"
										style={this.props.CompContentLiStyle}
										key={index}
										onMouseDown={() => this.handleClick(key)}
										// 这里使用mousedown，不使用click，click会晚于input的blur事件触发
									>{this.props.content[key]}</li>
								))
							}
						</ul>
					: null		
				}
			</div>
		);
	}
}

DropComponent.propTypes={
	title: PropTypes.string.isRequired,
	content: PropTypes.object.isRequired,
	ComponentStyle: PropTypes.object,
	CompTitleStyle: PropTypes.object,
	CompInputStyle: PropTypes.object,
	CompContentStyle: PropTypes.object,
	CompContentLiStyle: PropTypes.object,
	valueKey: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	disabled: PropTypes.bool
};
DropComponent.defaultProps={
	ComponentStyle: {},
	CompTitleStyle: {},
	CompInputStyle: {},
	CompContentStyle: {},
	CompContentLiStyle: {},
	valueKey: '',
	disabled: false
}

export default DropComponent;
