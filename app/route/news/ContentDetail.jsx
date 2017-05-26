/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/07/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/18/2017
*/

import React from 'react';
import qs from 'query-string';
import 'static/css/content.scss';
import {get} from 'logics/rpc';
import moment from 'moment';

export default class Campaign extends React.Component {
    constructor(props) {
      super(props);

      let query = qs.parse(this.props.history.location.search);
      this.id = query.id;

      this.state = {
          content:null
      };
    }
    componentWillMount() {
        this.fetch();
    }
    async fetch() {
        var data = await get('/content/by-id',{body:{id:this.id}});
        this.setState({
            content:data.content
        })
    }
    render() {
        let {content} = this.state;
        if (content === null) return null;
        let {content_html,title,publish_time,source_name} = content;
        return (
            <div className="content-detail">
                <div className="content-detail-head">
                    <h3>{title}</h3>
                    <h6>大债门</h6>
                    {source_name ? <span className="subtitle">{source_name}</span> : null}
                    {publish_time ? <span className="subtitle">{moment(publish_time).format('YYYY-MM-DD')}</span> : null}
                </div>
                <div className="content-detail-content" dangerouslySetInnerHTML={{__html: content_html}}></div>
            </div>
        )
    }
}
