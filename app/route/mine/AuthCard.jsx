/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/28/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/28/2017
*/

import React from 'react';
import {Link} from 'react-router-dom';
import {
	Toast,
    List,
	Button
} from 'antd-mobile';
import {get} from 'logics/rpc';

import 'static/css/me.scss';
import {WIDTH} from '../const';

const Item = List.Item;

export default class AuthCard extends React.Component {
    constructor(props) {
      super(props);

	  let {data,info,uri} = this.props;

      this.state = {
		  data:data,
          info: info || {},
		  uri: uri || '/static/images/business-card@2x.png',
		  loading:false,
      };
    }
	onChange(event) {
		this.files = event.currentTarget.files;
		this.readURL(this.files);
	}
	readURL(files) {
	    if (files && files[0]) {
	        var reader = new FileReader();

	        reader.onload = (e)=>{
				this.setState({uri: e.target.result});
	        }

	        reader.readAsDataURL(files[0]);
	    }
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			info:nextProps.info
		})
	}
	async onSubmit() {
		let {files} = this;
		if (files === null) return;
		let {data} = this.state;
		var form = new FormData();
		form.append('file',files[0]);
		this.setState({loading:true})
		let data1 = await get('/me/info/upload', {
			type: 'image',
			body: form
		});


		Toast.info('提交名片成功', 1);
		if (this.props.location.pathname === '/mine/list') {
			data.info.is_auth = null;
			data.info.card_imgurl = data1.card.card_imgurl;
			data.info.auth_id = data1.card.id;

			this.setState({data,loading:false,uri:data1.card.card_imgurl});
		} else {
			this.props.history.replace('/mine/list');
		}
	}
    render() {
		let {info,uri,loading,data} = this.state;
        let {is_auth,auth_id,card_imgurl,reject_reason} = info;
        if (is_auth === null || typeof(is_auth) === 'undefined') {
            if (auth_id) {
                return (
                    <div className="me-wrapper">
                        <div className="auth-wrapper">
                            <p>您的名片信息已提交</p>
                            <p>正在审核中，请耐心等待</p>
                            <p>审核结果会通过微信消息发送给您</p>
                            <div className="auth-box">
                                <div className="img-wrapper" style={{backgroundImage:`url(${uri})`}}></div>
                                <i className="authing-icon"></i>
                            </div>
                        </div>

                        <Button className="btn" type="primary" activeStyle={false} onClick={()=> {this.props.history.push('/news/info')}}>逛一逛</Button>
                    </div>
                )
            } else {
                return (
                    <div className="me-wrapper">
                        <div className="auth-wrapper">
                            <p>请上传您的名片完成身份认证</p>
                            <div className="img-wrapper" style={{backgroundImage:`url(${uri})`}}>
                                <div className="img-mask">点击上传名片</div>
                                <input type="file" className="file-upload" onChange={this.onChange.bind(this)} />
                            </div>
                        </div>
                        <Button className="btn red-btn" type="primary" activeStyle={false} onClick={this.onSubmit.bind(this)} loading={loading}>
                            {loading ? '提交中' : '提交名片申请认证'}
                        </Button>
                        <div className="info">
                            <p>完成认证，解锁三大功能</p>
                            <p>1.查看大债门所有信息</p>
                            <p>2.设置自己关注的债券</p>
                            <p>3.接收债券信息披露的提醒</p>
                        </div>
                    </div>
                )
            }
        } else if (is_auth === false) {
            return (
                <div className="me-wrapper">
                    <div className="auth-wrapper">
                        <p>您的身份信息因【{reject_reason}】未通过审核</p>
                        <p>请您重新提交名片</p>
                        <div className="auth-box" style={{marginTop:20}}>
                            <div className="img-wrapper" style={{backgroundImage:`url(${uri})`}}>
                                <div className="img-mask">点击上传名片</div>
                                <input type="file" className="file-upload" onChange={this.onChange.bind(this)} />
                            </div>
                            <i className="auth-failed-icon"></i>
                        </div>
                    </div>
                    <Button className="btn red-btn" type="primary" activeStyle={false} loading={loading} onClick={this.onSubmit.bind(this)}>{loading ? '重新提交中' : '重新提交'}</Button>
                </div>
            )
        }
    }
}
