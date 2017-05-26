/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/07/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/11/2017
 */

import React from 'react';
import 'static/css/city-select.scss';
import all_data from '../province-city.json';
import _ from 'lodash';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';

const options = {
	useTransition: true,
	bounce: false
}

const ITEM_HEIGHT = 40;

export default class CitySelect extends React.Component {
	constructor(props) {
		super(props);
		this.data = null;
		this.cache = {
			province:'',
			cities: []
		};

		let {mobxState} = this.props;

		let {province_list,city_list,selected_city} = mobxState.params;

		this.state = {
			selectedCities: selected_city || [],
			selectedProvinces: province_list || [],
			cities: [],
			curCities: city_list || [], // 当前显示的城市列表,发送请求的城市列表
			provinces: [], // 当前显示省列表,发送请求省列表
			index: 0
		};
	}
	componentWillMount() {
		this.initialize();
	}
	componentDidMount() {
		let {event} = this.props;
		event && this.eventHandler(event);
	}
	componentWillReceiveProps(nextProps) {
		let {event,data,mobxState} = nextProps;
		event && this.eventHandler(event) && this.initCities(0);
	}
	eventHandler(event) {
		let {mobxState} = this.props;
        let {list,curCities,selectedProvinces,selectedCities} = this.state;
        let params = {};
        if (event === 'submit') {
            params['city_list'] = curCities;
            params['province_list'] = selectedProvinces;
            params['selected_city'] = selectedCities;
            mobxState.setParams(params);
        } else if (event === 'reset') {
            params['city_list'] = [];
            params['province_list'] = [];
			params['selected_city'] = [];
            mobxState.setParams(params);
            this.setState({selectedCities:[],curCities:[],selectedProvinces:[]});
        }
    }
	initialize() {
		let provinces;
		this.data = _.groupBy(all_data, 'name');
		provinces = this.provinces = Object.keys(this.data);
		provinces = this.trickStyle(provinces);

		this.setState({provinces});
		this.initCities(0);
	}
	trickStyle(arr) {
		// 暂时的trick方法，可以暂时解决样式问题
		arr.unshift('blank0');
		arr.unshift('blank1');
		arr.push('blank3');
		arr.push('blank4');
		return arr;
	}
	onProvinceSelect(index) {
		this.refs.iScroll.withIScroll(function(iScroll) {
	    	iScroll.scrollTo(0,(-index + 2) * ITEM_HEIGHT,1000);
	    });
		this.initCities((index - 2) * ITEM_HEIGHT);
	}
	onCitySelect(name,event) {
		let {selectedCities,selectedProvinces,curCities} = this.state,
			{cache} = this,
			isAllCitySelected =  false, // 当前的城市是否都被选中
			tmp = [];

		if (selectedCities.indexOf(name) > -1) {
			selectedCities = selectedCities.filter((item) => item !== name);
			curCities = curCities.filter((item) => item !== name );
		} else {
			selectedCities.push(name);
			curCities.push(name);
		}

		tmp = cache.cities.filter((item)=> selectedCities.indexOf(item) > -1);
		isAllCitySelected = tmp.length === cache.cities.length;

		if (isAllCitySelected) {
			selectedProvinces.push(cache.province);
			curCities = curCities.filter((item)=> cache.cities.indexOf(item) === -1);
		} else {
			selectedProvinces = selectedProvinces.filter((item) => item !== cache.province);
			curCities = selectedCities.filter((item) => cache.cities.concat(curCities).indexOf(item) !== -1);
		}

		this.setState({selectedCities,selectedProvinces,curCities});
	}
	onCitySelectAll(name,event) {
		let {selectedCities,selectedProvinces,curCities} = this.state,
			{cache} = this,
			tmp = [];

		selectedCities = selectedCities.filter((item) => cache.cities.indexOf(item) == -1); // 把当前的城市都从selectedCities中剔除掉
		curCities = curCities.filter((item) => cache.cities.indexOf(item) == -1); // 把当前的城市都从selectedCities中剔除掉
		if (selectedProvinces.indexOf(name) > -1) {
			selectedProvinces = selectedProvinces.filter((item) => item !== cache.province);
		} else {
			selectedProvinces.push(name);
			selectedCities = selectedCities.concat(cache.cities);
		}

		this.setState({selectedCities,selectedProvinces,curCities});
	}
	onScrollEnd(iScroll) {
		let topOffset = 0, // 临近最近的上方距离
			bottomOffset = 0, // 临近最近的下方距离
			y = iScroll.y, // 滚动距离
			distance = 0; // 要移动的距离

		topOffset = Math.abs(y % 40);
		bottomOffset = ITEM_HEIGHT - topOffset;
		distance = bottomOffset >= topOffset ? y + topOffset : y - bottomOffset;

		topOffset && iScroll.scrollTo(0,distance,1000);
		this.initCities(distance);
	}
	initCities(d) {
		// 初始化城市列表
		let index = Math.abs(d) / ITEM_HEIGHT + 2,
			name = this.provinces[index],
			cities = [];

		if (!name) return;
		cities = this.data[name][0].cities.map((item) => item.name);
		this.cache = {province:name,cities};
		this.setState({
			index,
			cities
		});
	}
	render() {
		let {cache} = this;
		let {provinces, selectedProvinces, selectedCities, cities, curCities} = this.state;
		return (
			<div className="city-select only-city-select-list">
				<div className="scroll-area">
					<div id="mirror" className="mirror"></div>
					<div className="left">
						<ReactIScroll
							ref="iScroll"
							iScroll={iScroll}
							options={options}
							onScrollEnd={this.onScrollEnd.bind(this)}>
							<ul>
								{provinces.map((item,index) => {
									return (
										<li key={item} onTouchTap={this.onProvinceSelect.bind(this,index)}>
											{item}
										</li>
									)
								})}
							</ul>
						</ReactIScroll>
					</div>
					<div className="right">
						<ReactIScroll iScroll={iScroll}>
							<ul>
								{cities && ['选择全部市',...cities].map((city, index) => {
									return (
										<li onTouchTap={index == 0
											? this.onCitySelectAll.bind(this,cache.province)
											: this.onCitySelect.bind(this,city)} key={city} name={city}
											className={(index === 0 && selectedProvinces.indexOf(cache.province) > -1)|| selectedCities.indexOf(city) > -1 ? 'active' : ''} >
											<i className="check-box"></i>
											<label>{index == 0
													? '选择全部市'
													: city}</label>
										</li>
									)
								})}
							</ul>
						</ReactIScroll>
					</div>
					<div className="clear"></div>
				</div>

				<div className="show-area">
					已选地区
					<p className="selected-city-list">
						{curCities.concat(selectedProvinces).join(';')  || '暂无'}
					</p>
				</div>
			</div>
		)
	}
}
