/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/05/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/11/2017
*/

import { observable,action } from 'mobx';

class AppState {
    @observable params = {};

    constructor() {
    }

    @action
    setParams(params) {
        this.params = Object.assign({},this.params,params);
    }

    getParams() {
        let params = this.params;
        for (var i in params) {
            if (params[i] === '' || params[i] === null || params.length === 0) {
                delete params[i];
            }
        }

        return params;
    }

    resetParams() {
        this.params = {};
    }
}

export default AppState;
