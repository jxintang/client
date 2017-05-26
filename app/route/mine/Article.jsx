/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/01/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/01/2017
 */

import React from 'react';
import PageListView from '../../logics/PageListView.jsx';
import ArticleItem from '../../component/ArticleItem.jsx';

export default class MyArticle extends React.Component {
    render() {
        return (
             <div className="article-wrapper" style={{marginTop:60}}>
                 <PageListView uri={'/content/news'}  rowCmp={ArticleItem} doFetch={true}/>
             </div>
        )
    }
}
