/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/14/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/17/2017
 */

import React from 'react';
import FilterBar from '../component/FilterBar/dialog.jsx';
import CitySelect from '../component/CitySelect.jsx';
import GridList from '../component/GridList.jsx';
import BondSelect from '../component/BondSelect.jsx';

const RateList = {
    title: '主体评级',
	cmpType: 'check-box',
	paramsType: 'issuer_rating_list',
	list: [
		{
			name: 'AAA',
			val: 'AAA'
		}, {
			name: 'AAA-',
			val: 'AAA-'
		}, {
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
			name: 'A-',
			val: 'A-'
		}, {
			name: '无评级',
			val: '-'
		}
	]
};

const DateList = {
    title: '发行日期',
	cmpType: 'radio-box',
	paramsType: 'range_short',
	rangeSelect: true,
	list: [
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

const CreditorRateList = {
    title: '债项评级',
	cmpType: 'check-box',
	paramsType: 'bond_rating_list',
	list: [
		{
			name: 'AAA',
			val: 'AAA'
		}, {
			name: 'AAA-',
			val: 'AAA-'
		}, {
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
			name: 'A-',
			val: 'A-'
		}, {
			name: '无评级',
			val: '-'
		}
	]
};

class Content extends React.Component {
    componentDidMount() {
		let {event} = this.props;
		event && this.eventHandler(event);
	}
	componentWillReceiveProps(nextProps) {
		let {event} = nextProps;
		event && event !== this.props.event && this.eventHandler(event) && this.initCities(0);
	}
    eventHandler(event) {
		let {mobxState} = this.props;
        let {curCities,selectedProvinces,selectedCities} = this.refs.city.state;
        let {list,range_begin,range_end,data} = this.refs.grid.state;
        let params = {};
        if (event === 'submit') {
            params['city_list'] = curCities;
            params['province_list'] = selectedProvinces;
            params['selected_city'] = selectedCities;

            if (range_begin && range_end) {
				params['range_begin'] = range_begin;
				params['range_end'] = range_end;
                params[data.paramsType] = data.cmpType == 'radio-box' ? '' : [];
			} else {
                params['range_begin'] = '';
                params['range_end'] = '';
				params[data.paramsType] = data.cmpType == 'radio-box' ? list.toString() : list;
			}

            mobxState.setParams(params);
        } else if (event === 'reset') {
            params['city_list'] = [];
            params['province_list'] = [];
			params['selected_city'] = [];
			params['list'] = [];
			params['range_begin'] = '';
			params['range_end'] = '';
            mobxState.setParams(params);
        }
    }
    render() {
        let {event,mobxState,height} = this.props;
        event = event === 'reset' ? event : '';
        return (
            <div style={{overflowY:'scroll',height:height || 400}}>
                <GridList data={DateList} mobxState={mobxState} event={event} ref="grid"/>
                <div style={{padding:15,paddingBottom:10,backgroundColor:'#fff'}}>地区</div>
                <CitySelect mobxState={mobxState} event={event} ref="city"/>
            </div>
        )
    }
}


const MutiFilter =({onClose,mobxState,height}) =>(
    <FilterBar content={<Content mobxState={mobxState} height={height}/>} onClose={onClose}/>
)

export default MutiFilter;
