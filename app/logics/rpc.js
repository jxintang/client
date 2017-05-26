/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/31/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
*/
// import createHistory from 'history/createBrowserHistory';
// const history = createHistory();
import emitter from 'logics/notification';

const token = '';
const KEY_TOKEN = 'token';
const ROOT_URL = '';
const __DEV__ = true;

import URI from 'urijs';
import moment from 'moment';
import 'whatwg-fetch';
import {NAV_NEWS_LIST,NAV_BOND_LIST,NAV_COMPANY_LIST} from '../route/const';

export async function clearToken() {
    await AsyncStorage.removeItem(KEY_TOKEN);
}

async function request(url, _options) {
    const uri = new URI(ROOT_URL + url).normalize();
    const headers = new Headers();
    const options = _options || {};
    options.method = options.method || 'POST';
    options.headers = options.headers;
    // options.mode = 'cors';

    if (token) {
        options.headers['Authorization'] = token.get();
    }

    if (options.type === 'image') {
        headers.append('Accept', 'application/json');
    } else {
        headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
        let keys = options.headers.keys();
        keys.forEach((item)=>{
            headers.append(item, item[keys]);
        });
    }

    options.headers = headers;

    if (options.body) {
        if (__DEV__) {
            // console.log(options.body);
        }

        // 图片做特殊处理
        if (options.type !== 'image') {
            options.body = JSON.stringify(options.body);
        }
    }

    options.credentials = 'include';
    delete options.type;

    const resp = await fetch(uri.toString(), options);
    const text = await resp.text();

    let json;
    try {
        json = JSON.parse(text);
        // console.log(json);
    } catch (err){
        console.log('Err:', err, 'RESP: ', text.slice(0, 1000));

        if (resp.status === 401) {
            emitter.emit('authEvt',{status:resp.status});
        } else if (resp.status === 403) {
            emitter.emit('authEvt',{status:resp.status});
        }else {
            throw err;
        }
    }

    // 如果请求失败
    if (resp.status >= 300) {
        console.log('STATUS:', resp.status);


        if (resp.status === 401) {
            let {appid,action} = json;
            emitter.emit('authEvt',{status:resp.status,json});
        } else {
            // throw new Error(json.errorMsg, json.errorId, json);
        }


    }

    return json;
}

export function get(url, options) {
	return request(url, options)
}

export const getStorage = (name)=> {
	let storage = localStorage.getItem(name);
	if (storage) {
		try {
			storage = JSON.parse(storage);
		} catch(err) {
			console.log('err',err);
		}
	}
	return storage || {};
}

export const setStorage = (name,val,type = 'set')=> {
    if (type === 'set') {
        localStorage.setItem(name,JSON.stringify(val));
    } else if (type === 'merge') {
        let obj = Object.assign({},getStorage(name),val)
        localStorage.setItem(name,JSON.stringify(obj));
    }
}

export const removeStorage = (name)=> {
    try {
        localStorage.removeItem(name);
    } catch(err) {
        console.log('err',err);
    }
}

export const isHomePage = (path)=> {
    return [...NAV_NEWS_LIST,...NAV_BOND_LIST,...NAV_COMPANY_LIST,{path:'/disclosure/list'},{path:'/mine/list'}].filter((item)=>item.path === path).length ? true : false
}

export const isDropDownPage = (path)=> {
    return [...NAV_NEWS_LIST,...NAV_BOND_LIST,...NAV_COMPANY_LIST].filter((item)=>item.path === path).length ? true : false
}

export const formatLargeMount = (v) => {
    if (!isNaN(parseFloat(v)) && isFinite(v)) {
        v = parseInt(v);
        if (v >= 10000) {
            return (v / 10000).toFixed(2) + '亿';
        } else {
            return v + '万';
        }
    } else {
        return v;
    }
}
