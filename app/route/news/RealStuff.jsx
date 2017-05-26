/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/24/2017
 */

import React from 'react';
import PageListView from 'logics/PageListView.jsx';
import ArticleItem from 'component/ArticleItem.jsx';

export default class realStuff extends React.Component {
    render() {
        return (
            <div className="article-wrapper">
                <PageListView uri={'/content/real_stuff'}  rowCmp={ArticleItem} doFetch={true}/>
            </div>
        )
    }
}
