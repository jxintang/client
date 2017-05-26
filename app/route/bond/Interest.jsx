/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/13/2017
 */

import React from 'react';
import qs from 'query-string';
import {get} from 'logics/rpc';
import '../../static/css/creditor-interest.scss';

export default class CreditorInterest extends React.Component {
    constructor(props) {
	  	super(props);
	  	let {id} = qs.parse(this.props.location.search);
		this.id = id;
	  	this.state = {
			data:null
		};
	}
    componentWillMount() {
		this.fetch();
	}
	async fetch(id) {
		var data = await get('/reveal/law/get-by-id',{body:{id:this.id}});
		this.setState({data:data.data})
	}
    render () {
        let {data} = this.state;
        if (data === null) return null;
        let {html_content,pdf_url} = data;

        let bodyHtml = /<body.*?>([\s\S]*)<\/body>/.exec(html_content)[1];
        return (
            <div className="creditor-interest">
                <div className="creditor-interest-header">
                    <div className="item">
                        分享给朋友
                    </div>
                    <a className="item" href={pdf_url}>
                        下载
                    </a>
                    <div className="item">
                        邮件发送
                    </div>
                </div>
                <div className="creditor-interest-content" dangerouslySetInnerHTML={{__html: bodyHtml}}></div>
                <div style={{textAlign:'center',backgroundColor:'#fff'}}>
                    <i className="online-service"></i>

                    <p style={{marginmottoTop:20}}>您查找的信息暂不支持在线查看</p>
                    <p style={{marginBottom:30}}>请您联系客服索要相关文件</p>
                    <div className="middle-btn">联系客服</div>
                </div>
            </div>
        )
    }
}
