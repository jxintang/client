/**
 * created by jxintang on 2/15/17.
 */

import {observable, computed} from 'mobx';
import {get} from './rpc';

export default class PageList {
	constructor(uri) {
        this.uri = uri;
		this.state = {};
        setImmediate(() => {
            this.refresh();
        });
	}

    isFetching = observable(true);

	isRefreshing = observable(false);

	data = observable([]);

	dataSource = observable([]);

	get isOver() {
        return this.count >= 0 && (this.data.length >= this.count || this.next === null);
    };


    //
    // @observable
    // isRefreshing = false;
    //
    // @observable
    // data = [];
    //
    // @observable
    // dataSource = [];
    //
    // @computed
    // get isOver() {
    //     return this.count >= 0 && (this.data.length >= this.count || this.next === null);
    // }

    refresh() {
        this.isRefreshing = true;
        return this._fetch(true);
    }

    fetch() {
        return this._fetch(false);
    }

    rowHasChanged() {

    }

    async _fetch(refresh = false) {
        if ((!refresh && this.isFetching) || this.isOver) {
            return;
        }
        let uri = refresh ? this.uri : this.next;
        this.isFetching = true;
        let {count, next, results} = await get(uri);
        if (refresh) {
            this.data = results;
            this.dataSource = this.data;
            this.next = next;
        } else if (uri === this.next) {
            // 防止数据重复
            this.data.slice(this.data.length, 0, ...results);
            this.dataSource = this.data;
            this.next = next;
        }

        this.isFetching = false;
        this.isRefreshing = false;
    }
}
