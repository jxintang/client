/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/07/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/24/2017
*/

import React from 'react';
import { SearchBar } from 'antd-mobile';
import PageListView from 'logics/PageListView.jsx';
import ArticleItem from 'component/ArticleItem.jsx';

export default class Campaign extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          keyword: '',
          doFetch:true
      };
    }
    onChange(keyword) {
        this.setState({keyword,doFetch:false});
    }
    onSubmit(keyword) {
        this.setState({keyword,doFetch:true});
    }
    render() {
        let {keyword,doFetch} = this.state;
        return (
            <div className="article-wrapper">
                <PageListView uri={'/content/research_report'} rowCmp={ArticleItem} doFetch={doFetch}/>
            </div>
        )
    }
}
