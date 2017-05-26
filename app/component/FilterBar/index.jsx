/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/05/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/02/2017
 */

import React from 'react';
import DialogWrapper from './dialog.jsx';
import '../../static/css/filter-bar.scss';
import 'rc-dialog/assets/index.css';
import Dialog from 'rc-dialog';

class FilterBar extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
		  content:null,
		  index:-1,
		  visible:false
	  };
	}
	componentWillReceiveProps(nextProps) {
		let {onClose} = nextProps;
		onClose === true &&  this.close();
	}
	changeFilterIndex = (len, index) => {
		if (__DEV__ && event.type === 'react-mouseup') return; // 解决调试环境下的bug
		event.preventDefault();
		let {content} = this.props;
		if (index === this.state.index) {
			this.setState({index:-1,visible:false});
		} else {
			this.setState({content:content[index],index,visible:true});
		}
	}
	close() {
		this.setState({visible:false,index:-1})
	}
	render() {
		let {filter, header, maskStyle, wrapClassName} = this.props;
		let {content} = this.state;
		return (
			<div className="filter-bar">
				<nav>
					{
						header.map((name, index) =>
						<div key={name} className={this.state.index === index
								? 'active col'
								: 'col'} style={{
								width: 100 / header.length + '%'
							}} onTouchTap={(event) => this.changeFilterIndex(header.length, index)}>
								<span>{name}</span>
								<i></i>
						</div>)
					}
				</nav>
				<div style={{clear:'both'}}></div>
			{
				content
					? <Dialog wrapClassName={(wrapClassName || "issuer-filter") + " filter-wrapper-style"} visible={this.state.visible} closable={false} onClose={this.close.bind(this)} maskStyle={Object.assign({
							top: 176
						}, maskStyle)}>
							{content.props.wrapper
								? <DialogWrapper content={content} onClose={this.close.bind(this)}/>
								: React.createElement(content.type,{onClose:this.close.bind(this),...content.props})}
						</Dialog>
					: null
			}
			</div>
		)
	}
}

export default FilterBar
