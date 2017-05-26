/**
 * @Author: tangjingxin <tangduck>
 * @Date:   05/03/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/09/2017
 */

import React from 'react';
import {Switch, Link, withRouter} from 'react-router-dom';
import emitter from 'logics/notification';
import {Popup} from 'antd-mobile';
import Login from '../route/auth/Login';
import {WIDTH,CONTENT_HEIGHT} from '../route/const';
import GoHome from 'component/GoHome.jsx';
import {isHomePage} from 'logics/rpc';


const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
const maskProps=isIPhone? {	onTouchStart: e => e.preventDefault()}:null;

class AuthWrapper extends React.Component{
  state={popup:false}
  componentWillMount() {
    emitter.on('authEvt',(data)=>{
      let {status,json} = data;
			let {history} = this.props;
      if (status == 401) {
				if (json) {
					let {appid,action,redirect_uri} = json;
					if (action === 'fweixin') {
						let {pathname,search} = this.props.location;
						if (__DEV__) {
							redirect_uri = 'http://wx.grandbondhouse.com/fweixin/oauth2';
						}
						let verify_uri= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${pathname}${search}#wechat_redirect`;
						window.location.href = verify_uri;
					} else if (action === 'secure_phone') {
						Popup.show(
		          <div style={{width:WIDTH,height:CONTENT_HEIGHT}}>
		            <header id="nav-bar" className="nav" >
		              <div className="nav-left" onTouchTap={()=>{Popup.hide();history.goBack();}}>
		                <div className="back-icon"></div>
		              </div>
		              <div className="nav-title">登录</div>
		              <div className="nav-right"></div>
		              <div className="clearfix"></div>
		            </header>
		            <Login callback={()=>{Popup.hide();this.setState({popup:false});}}/>
		          </div>, { animationType: 'slide-up', maskProps, maskClosable: false })
            this.setState({popup:true});
					}
				}
      } else if (status == 403) {
				this.props.history.replace('/auth/jump?type=unauthorized&uri=/mine/list');
      }
    })
	}
  render(){
      let {history} = this.props;
    if(this.state.popup){
      return null;
    }
return (
        <div>
            {this.props.children}
            {!isHomePage(history.location.pathname)  ? <GoHome /> : null}
        </div>
    );
  }
}

export default withRouter(AuthWrapper);
