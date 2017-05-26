/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/31/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/26/2017
 */

import { observable,action } from 'mobx';

class navState {
    @observable navMap = {};
    @observable eventMap = {};
    @observable stateMap = {};

    @action
    addNavTitle(name,nav) {
        let obj = {};
        obj[name] = nav;
        this.navMap = Object.assign({},this.navMap,obj);
        console.log(this.navMap);
    }
    addEventListener(name,event) {
        this.eventMap[name] = event;
    }
    addState(name,stateName) {
        let obj = {};
        obj[name] = stateName;
        this.stateMap = Object.assign({},this.stateMap,obj)
    }
    removeState(name) {
        this.addState(name,'');
    }
}


export default new navState();
