/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/28/2017
*/

import React from 'react';
import qs from 'query-string';
import {get} from 'logics/rpc';
import 'static/css/creditor-interest.scss';
import {
    Toast
} from 'antd-mobile';
import {WIDTH,CONTENT_HEIGHT} from '../../route/const';
import WxConfig from 'component/WxConfig';

export default class ContentView extends React.Component {
    constructor(props) {
	  	super(props);

        let query = qs.parse(this.props.location.search);

		this.params = JSON.parse(query.params) || '';
        this.uri = query.uri || '';
        this.title = query.title || '';
	  	this.state = {
			data:null
		};
	}
  async componentWillMount() {
    let {title} = this;
		await this.fetch();
    title=title||'haha';
    await WxConfig.share({title});
	}
	async fetch(id) {
        if (this.uri === '') return;
		var data = await get(this.uri,{body:this.params});
		this.setState({data:data});
	}
    render () {
        let {data,share,download,email} = this.state;
        if (data === null) return null;
        let {text} = data||{};
        let bodyHtml = '';


        if (data.data && data.data.html_content) {
             bodyHtml = /<body.*?>([\s\S]*)<\/body>/.exec(data.data.html_content)[1];
        }

        // <div className="creditor-interest">
        //     <div className="creditor-interest-header">
        //         {share ? <div className="item">分享给朋友</div> : null}
        //         {download && data.data && data.data.pdf_url? <a className="item" href={data.data.pdf_url} download>下载</a> : null}
        //         {email ? <div className="item">邮件发送</div> : null}
        //     </div>
        //     <div className="creditor-interest-content">
        //         {
        //             text
        //                 ? <pre>{text}</pre>
        //                 : <div dangerouslySetInnerHTML={{__html: bodyHtml}}></div>
        //         }
        //     </div>
        //         {
        //             !download
        //                 ? <div style={{textAlign:'center',backgroundColor:'#fff'}}>
        //                     <i className="online-service"></i>
        //                     <p style={{
        //                         marginmottoTop: 20
        //                     }}>您查找的信息暂不支持在线查看</p> < p style = {{marginBottom:30}} > 请您联系客服索要相关文件 < /p>
        //                                         <div className="middle-btn">联系客服</div >
        //                   </div>
        //                 : null
        //         }
        // </div>

        return (
            <div className="creditor-interest" style={{marginTop:60}}>
                {
                	data && data.data && data.data.pdf_url
                		? <iframe src={`http://sfile.grandbondhouse.com/pdfjs/web/viewer.html?file=${data.data.pdf_url}`} frameBorder="0" width={WIDTH} height={CONTENT_HEIGHT - 60}></iframe>
                		: (
                			<div className="creditor-interest-content">{text
                					? <pre>{text}</pre>
                					: <div dangerouslySetInnerHTML={{
                						__html: bodyHtml
                					}}></div>}</div>
                		)
                }
            </div>
        )
    }
}
