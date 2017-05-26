/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/21/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/27/2017
*/

import React from 'react';
import { List, InputItem,Button,Toast,WhiteSpace } from 'antd-mobile';
import {get} from 'logics/rpc';
import SendCodeBtn from 'component/SendCodeBtn.jsx';

class LoginCmp extends React.Component {
    constructor(props) {
      super(props);
      let {phonePlaceholder,phoneLabel,phone,disabled} = this.props;
      this.state = {
          code:null,
          loading:false,
          phonePlaceholder: phonePlaceholder || '请输入手机号',
          phoneLabel: phoneLabel || '手机号',
          phone: phone || '',
          disabled: disabled || false
      };
    }
    async check() {
        let {submitUri} = this.props;
        this.setState({loading:true});
        let {phone,code} = this.state;
        let {callback} = this.props;
        let data = await get(submitUri, {
            body: {phone,code}
        });

        console.log('log',data);
        this.setState({loading:false});

        let {submit} = this.props;
        submit && submit(data);
    }
    componentWillReceiveProps(nextProps) {
        let {sendUri,submitUri} = nextProps;
        if (sendUri !== this.state.sendUri || submitUri !== this.state.submitUri) {
            this.setState({phone:'',code:'',...nextProps});
        }
    }
    render() {
        let {phone,code,loading,phonePlaceholder,phoneLabel,disabled} = this.state;
        let {sendUri,buttonText} = this.props;
        return (
            <div>
                <WhiteSpace size="xl" />
                <List>
                  <InputItem
                    value={phone}
                    disabled={disabled}
                    onChange={(v)=>{this.setState({phone:v})}}
                    placeholder={phonePlaceholder}
                    extra={<SendCodeBtn phone={phone} uri={sendUri}/>}
                  >{phoneLabel}</InputItem>
                  <InputItem
                    value={code}
                    placeholder="请输入验证码"
                    onChange={(v)=>{this.setState({code:v})}}
                    data-seed="logId"
                  >验证码</InputItem>
                </List>
                <WhiteSpace size="xl" />
                <Button className="btn" type="primary" onClick={this.check.bind(this)} loading={loading} style={{margin:'0 20px'}}>{loading ? `${buttonText || '登录'}中` : `${buttonText || '登录'}`}</Button>
            </div>
        )
    }
}

LoginCmp.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default LoginCmp;
