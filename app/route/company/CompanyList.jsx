/**
 * @Author: tangjingxin <tangduck>
 * @Date:   05/15/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
*/

import React from 'react';
import qs from 'query-string';
import { SearchBar } from 'antd-mobile';
import PageListView from 'logics/PageListView.jsx';
import CompanyItem from 'component/CompanyItem.jsx';

export default class Campaign extends React.Component {
    constructor(props) {
      super(props);
      let query = qs.parse(this.props.history.location.search);

      this.state = {keyword:'',province:query.province || '',doFetch:true,provinces:[]};
    }
    componentWillMount() {}
    onChange(keyword) {
        this.setState({keyword,doFetch:false});
    }
    onSubmit(keyword) {
        this.setState({keyword,doFetch:true});
    }
    render() {
        let {province,keyword,doFetch,provinces} = this.state;
        if (province === '') return null;
        return (
            <div>
                <SearchBar value={keyword} placeholder="请输入关键字搜索" onSubmit={this.onSubmit.bind(this)} onChange={this.onChange.bind(this)}  onCancel={this.onSubmit.bind(this,'')}/>
                <PageListView uri={'/company/page/list'} params={{province,keyword}} rowCmp={CompanyItem} doFetch={doFetch}/>
            </div>
        )
    }
}
