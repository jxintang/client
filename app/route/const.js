/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
 */

var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

export const WIDTH = body.clientWidth;

export const TABBAR_HEIGHT = 50;
export const CONTENT_HEIGHT = height;
export const NAV_HEIGHT = 44;

export const STORAGE_ISSUER_LIST = 'issuer/list';
export const STORAGE_BONDF_LIST = 'bondf/list';
export const STORAGE_BOND_LIST = 'bond/list';


export const WEEK_LIST = ['一','二','三','四','五','六','七'];

export const NAV_NEWS_LIST = [
    {
        path: '/news/info',
        name: '新闻资讯'
    }, {
        path: '/news/policy-article',
        name: '政策新闻'
    }, {
        path: '/news/real-stuff',
        name: '干货分享'
    }, {
        path: '/news/report',
        name: '研究报告'
    },
];

export const NAV_BOND_LIST = [
    {
        path: '/bond/find',
        name: '查找债券'
    },
    {
        path: '/bond/rate-change',
        name: '评级变动'
    }, {
        path: '/bond/creditor-valuation',
        name: '债券估值'
    }, {
        path: '/bond/main-release',
        name: '一级发行'
    }
];


export const NAV_COMPANY_LIST = [
    {
        path: '/company1/campaign',
        name: '查找企业'
    },
    {
        path: '/company1/newbond',
        name: '新债推荐'
    },
    {
        path: '/company1/activity',
        name: '固收活动'
    }
];

export const DATE_LIST = {
	cmpType: 'radio-box',
	paramsType: 'range_short',
	rangeSelect: true,
    type:'date',
	list: [
        {
            name: '不限',
            val: '',
            type: 'date'
        },
		{
			name: '当天',
			val: '1days',
			type: 'date'
		}, {
			name: '一周内',
			val: '1weeks',
			type: 'date'
		}, {
			name: '两周内',
			val: '2weeks',
			type: 'date'
		}, {
			name: '一个月内',
			val: '1months',
			type: 'date'
		}, {
			name: '三个月内',
			val: '3months',
			type: 'date'
		}
	]
};

export const RATE_LIST = {
	cmpType: 'check-box',
	paramsType: 'rating_list',
	list: [
		{
			name: 'AAA',
			val: 'AAA'
		},{
			name: 'AA+',
			val: 'AA+'
		}, {
			name: 'AA',
			val: 'AA'
		}, {
			name: 'AA-',
			val: 'AA-'
		}, {
			name: 'A+',
			val: 'A+'
		}, {
			name: 'A',
			val: 'A'
		}, {
			name: 'A-及以下',
			val: 'A-'
		}
	]
};
