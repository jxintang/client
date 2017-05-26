/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/28/2017
 */

import React from 'react';
import PageListView from 'logics/PageListView.jsx';
import ArticleItem from 'component/ArticleItem.jsx';
import { SwipeAction,List } from 'antd-mobile';
import {get} from 'logics/rpc';

export default class exclusiveArticle extends React.Component {
    render() {
        return (
            <div className="article-wrapper" style={{marginTop:60}}>
                <PageListView uri={'/content/policy'}  rowCmp={ArticleItem} doFetch={true}/>
            </div>
        )
    }
}
