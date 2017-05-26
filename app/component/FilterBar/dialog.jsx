/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/06/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/17/2017
 */

import React, {PropTypes} from 'react';
import emitter from '../../logics/notification';
import ReactIScroll from 'react-iscroll';
var iScroll = require('iscroll/build/iscroll-probe');
import '../../static/css/filter-bar.scss';

let options = {
	scrollX:true,
    scrollY:true,
}

class Dialog extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			event: ''
		};
	}
	componentWillReceiveProps() {
		this.setState({event:''});
	}
	onReset(e) {
		e.preventDefault();
		this.setState({event:'reset'});
	}
	onSubmit(e) {
		e.preventDefault();
		this.setState({event:'submit'});
		this.props.onClose();
	}
	render() {
		let {event} = this.state;
		let {content} = this.props;

        return (
            <div className="dialog-container">
				<div className="dialog-content">{React.createElement(content.type,Object.assign({},content.props,{event}))}</div>
					{
						content.props.middleBtn ?
							<div style={{color:'#36AFEF',fontSize:14,textAlign:'center',padding:'12px 0',borderTop:'1px solid #dedede'}} onTouchTap={this.onReset.bind(this)}>恢复至全部</div> :
							<div className="dialog-footer">
								<div className="dialog-footer-left">
									<div className="dialog-btn dialog-reset-btn" onTouchTap={this.onReset.bind(this)}>{content.props.leftBtnText || '重置'}</div>
			                    </div>
			                    <div className="dialog-footer-right">
									<div className="dialog-btn dialog-confirm-btn" onTouchTap={this.onSubmit.bind(this)}>确定</div>
			                    </div>
			                    <div className="clearfix"></div>
							</div>
					}
            </div>
        )
	}
}

export default Dialog;
