/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/25/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/26/2017
*/

import React from 'react';
import qs from 'query-string';
import {get} from 'logics/rpc';

const COUNT_SECS = 5;

class Jump extends React.Component {
    constructor(props) {
      super(props);

      let query = qs.parse(this.props.location.search);
      this.type = query.type;
      this.uri = query.uri;
      this.state = {
          seconds:COUNT_SECS
      };
    }
    componentWillMount() {
        this.type === 'login-verify' && this.fetch();
        this.count();
    }
    count() {
        let {seconds} = this.state;
        let timer = setInterval(()=>{
            if (seconds > 0) {
                seconds -= 1;
                this.setState({
                    seconds
                })
            } else {
                clearInterval(timer);
                this.props.history.replace(this.uri || '/mine/list');
            }
        },1000);

    }
    async fetch() {
        let data = await get('/secure_phone/exists');
        let {history} = this.props;

        if (data.data) {
            history.replace('/mine/list');
        } else {
            history.replace('/auth/login');
        }
    }
    render() {
        let {type,state:{seconds}} = this;
        if (type === 'login-verify') {
            return (
                <div style={{width:240,textAlign:'center',margin:'70px auto'}}>
                    <p style={{color:'#666',lineHeight:'1.5em'}}>页面跳转中</p>
                    <span style={{fontSize:12,color:'#999'}}>页面自动跳转，等待时间{seconds}秒</span>
                </div>
            )
        } else if (type === 'unauthorized') {
            return (
                <div style={{width:240,textAlign:'center',margin:'70px auto'}}>
                    <p style={{color:'#666',lineHeight:'1.5em'}}>您没有实名认证，没有权限访问，请先上传名片申请实名认证</p>
                    <span style={{fontSize:12,color:'#999'}}>页面自动跳转，等待时间{seconds}秒</span>
                </div>
            )
        }
    }
}

export default Jump;
