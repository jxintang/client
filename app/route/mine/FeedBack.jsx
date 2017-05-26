/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/27/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/19/2017
*/

import React from 'react';

export default class FeedBack extends React.Component {
    render () {
        return (
            <div style={{margin:'-44px auto',width:'90%',textAlign:'center',fontSize:14,backgroundColor:'#fff',padding:'20px 0',position:'relative',top:100}}>
                <p>请添加客服“大债门小掌柜”微信进行咨询</p>
                <img src="/static/images/qr-service.jpeg" width="282"/>
                <p style={{margin:0,fontFamily:"'STHeiti', 'simsun', sans-serif"}}>微信号 ficc616</p>
            </div>
        )
    }
}
