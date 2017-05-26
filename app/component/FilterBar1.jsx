/**
 * @Author: tangjingxin <tangduck>
 * @Date:   05/18/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
*/

import React from 'react';
import DialogWrapper from './FilterBar/dialog.jsx';
import 'static/css/filter-bar.scss';
import 'rc-dialog/assets/index.css';
import Dialog from 'rc-dialog';

class FilterBar1 extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
		  child:null,
		  index:-1,
		  visible:false
	  };

      this.children = this.props.children.filter((child)=> child !== ',');
	}
	componentWillReceiveProps(nextProps) {
		let {onClose} = nextProps;
		onClose === true &&  this.close();
	}
	changeFilterIndex = (index) => {
		if (__DEV__ && event.type === 'react-mouseup') return; // 解决调试环境下的bug
		event.preventDefault();
		let {content} = this.props;
		if (index === this.state.index) {
			this.setState({index:-1,visible:false});
		} else {
			this.setState({child:this.children[index],index,visible:true});
		}
	}
	close() {
		this.setState({visible:false,index:-1})


            //     <nav>
            //         {
            //             header.map((name, index) =>
            //             <div key={name} className={this.state.index === index
            //                     ? 'active col'
            //                     : 'col'} style={{
            //                     width: 100 / header.length + '%'
            //                 }} onTouchTap={(event) => this.changeFilterIndex(header.length, index)}>
            //                     <span>{name}</span>
            //                     <i></i>
            //             </div>)
            //         }
            //     </nav>
            //     <div style={{clear:'both'}}></div>
            // {
            //     content
            //         ? <Dialog wrapClassName={(wrapClassName || "issuer-filter") + " filter-wrapper-style"} visible={this.state.visible} closable={false} onClose={this.close.bind(this)} maskStyle={Object.assign({
            //                 top: 176
            //             }, maskStyle)}>
            //                 {content.props.wrapper
            //                     ? <DialogWrapper content={content} onClose={this.close.bind(this)}/>
            //                     : React.createElement(content.type,{onClose:this.close.bind(this),...content.props})}
            //             </Dialog>
            //         : null
            // }
	}
    onReset() {
		let {index} = this.state,
			{onSubmit} = this.props,
			params = this.refs[`child${index}`].state;

		for (let key in params) {
			if (Array.isArray(params[key])) {
				params[key] = []
			} else {
				params[key] = '';
			}
		}

		onSubmit && typeof onSubmit === 'function' && onSubmit(params);
    }
    onSubmit(params) {
        if (__DEV__ && event.type === 'react-mouseup') return;
        let {index} = this.state,
            {onSubmit} = this.props;
        params = params || this.refs[`child${index}`].state;

        onSubmit && typeof onSubmit === 'function' && onSubmit(params);
        this.close();
    }
	render() {
        let {children} = this;
		let {filter, header, maskStyle, wrapClassName} = this.props;
		let {content,index,visible,child} = this.state;
		return (
			<div className="filter-bar">
                <nav>
                    {this.children.map((item,index)=>{
                        if (item !== ',') {
                            return (
                                <div key={item.props.name} className={this.state.index === index
                                        ? 'active col'
                                        : 'col'} style={{
                                        width: 100 / children.length + '%'
                                    }} onTouchTap={(event) => this.changeFilterIndex(index)}>
                                        <span>{item.props.name}</span>
                                        <i></i>
                                </div>
                            )
                        }
                    })}
                </nav>

                {
                    child
                        ? <Dialog wrapClassName={(wrapClassName || "issuer-filter") + " filter-wrapper-style"} visible={visible} closable={false} onClose={this.close.bind(this)} maskStyle={Object.assign({
                                top: 176
                            }, maskStyle)}>
                            {React.createElement(child.type,{ref:`child${index}`,onSubmit:this.onSubmit.bind(this),onClose:this.close.bind(this),...child.props})}
                            {
                                child.props.wrapper ? <div className="dialog-container">
                                    {
                                        child.props.middleBtn ?
                                            <div style={{color:'#36AFEF',fontSize:14,textAlign:'center',padding:'12px 0',borderTop:'1px solid #dedede'}} onTouchTap={this.onReset.bind(this)}>恢复至全部</div> :
                                            <div className="dialog-footer">
                                                <div className="dialog-footer-left">
                                                    <div className="dialog-btn dialog-reset-btn" onTouchTap={this.onReset.bind(this)}>{child.props.leftBtnText || '重置'}</div>
                                                </div>
                                                <div className="dialog-footer-right">
                                                    <div className="dialog-btn dialog-confirm-btn" onTouchTap={this.onSubmit.bind(this)}>{child.props.rightBtnText || '确定'}</div>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                    }
                                </div> : null
                            }
                            </Dialog>
                        : null
                }
			</div>
		)
	}
}

export default FilterBar1
