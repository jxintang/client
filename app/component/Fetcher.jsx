/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/16/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/02/2017
*/

import React from 'react';
import {autorun} from 'mobx';
import {observer} from 'mobx-react';
import {get} from 'logics/rpc';

class Fetcher extends React.Component {
    state = {data: null};
	isRefreshing = false;
	isFetching = false;
	count = -1; // 总数量
	offset = 0; // 分页
	params = {}; // 请求参数
	componentWillMount() {
		// this.refresh();
	}
	_fetch = async(refresh = false,params0) => {
        let {params,mobxState} = this.props;
        this.params = Object.assign({},this.params,params,params0,mobxState ? mobxState.params : {}); //初始化请求参数
		let {offset, limit, props: {
				uri
			}} = this;
		this.params = refresh
			? Object.assign({},this.params,{offset:0})
			: Object.assign({}, this.params, {
				offset
			});

        this.params = this.validate(this.params);
        if ((this.params.offset && this.params.offset !== this.offset) || this.isFetching) return;

        this.isFetching = true;
		var data = await get(uri, {body: this.params});

		this.setState({data});
		this.isFetching = false;
		this.offset = data.offset + data.limit || 0;
		this.limit = data.limit;
		this.count = data.count;
	}
    validate = (data) => {
        for (var key in data) {
            if (!!!data[key] && data[key] !== 0) delete data[key]
        }
        return data;
    }
	refresh = () => {
		this.isRefreshing = true;
		return this._fetch(true);
	}
	fetch = (refresh = false,params) => {
		let self = this;
        this.isRefreshing = refresh;
		return self._fetch(refresh,params);
	}
    autorunFetch = autorun(() => {
		this._fetch(true,this.props.params);
    })

	render() {
		let {data} = this.state;
		const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
			fetch: this.fetch.bind(this),
			data
		}));

		return <div>{childrenWithProps}</div>
	}
};

export default Fetcher;
