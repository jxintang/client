/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/18/2017
 */

import React from 'react';
import {
	SearchBar
} from 'antd-mobile';
import 'static/css/results.scss';
import PageListView from 'logics/PageListView.jsx';
import BondItem from 'component/BondItem.jsx';

export default class Results extends React.Component {
	constructor(props) {
	  	super(props);
		this.params = {};
		let str = this.props.location.search.substr(1);
	  	this.state = {
			keyword: str ? decodeURI(str.split('=')[1]) : '',
			doFetch: true
		};
	}
	onSubmit(keyword) {
		let {history} = this.props;
		if (keyword !== '') {
			this.setState({keyword,doFetch: true});
			history.replace(history.location.pathname + '?keyword=' + keyword);
		}
	}
	onChange(keyword) {
		this.setState({ keyword,doFetch: false });
	}
    render() {
		let {keyword,doFetch} = this.state;
        return (
            <div>
                <SearchBar value={keyword} onSubmit={this.onSubmit.bind(this)} onChange={this.onChange.bind(this)} onCancel={this.onSubmit.bind(this,'')}/>
				<PageListView uri={'/issuer/list'} params={{keyword}} rowCmp={BondItem} doFetch={doFetch}/>
            </div>
        )
    }
}
