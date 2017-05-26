/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/02/2017
 */

import React from 'react';
import Chart from 'chart.js';
import moment from 'moment';
import { DatePicker } from 'antd-mobile';
import qs from 'query-string';
import {get} from 'logics/rpc';
import 'static/css/trends.scss';
import RowTable from 'component/RowTable.jsx';

let before = moment();
before.month(before.month() - 3);

let rows = [
	{
		title:'品种',
		key:'name',
	},
	{
		title:'评级',
		key:'rating',
	},
	{
		title:'期限',
		key:'term_year',
		render:(name)=>(
			<div>{name}年</div>
		)
	},
];

let params = {
	"range_begin":before.format('YYYY-MM-DD'),
	"range_end":moment().format('YYYY-MM-DD')
}

let MIN_DATE = moment('2016-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
let minDate = moment('2016-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
let maxDate = moment('2070-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);

export default class Trends extends React.Component {
	constructor(props) {
		super(props);

		let str = decodeURI(this.props.history.location.search);
		let arr = str.split('&');
		this.namerating = arr[0].substr(1).replace('namerating=','');
		this.term_year = arr[1] ? arr[1].replace('term_year=','') : 1;

		this.state = {data:null};
	}
	componentWillMount() {
		this.fetch(Object.assign(params,{term_year:this.term_year},{namerating:this.namerating}))
	}
	initChat(data) {
		let list = [],labels = [];
		data.list.map((item)=> {
			list.push(item.yield_rate);
			labels.push(item.date);
		});
		var ctx = document.getElementById("myChart");
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: labels,
				showLines: true,
				datasets: [
					{
						label: "利率",
						backgroundColor: 'transparent',
						pointBorderColor: '#FFD5D5',
						pointBackgroundColor: '#AD2323',
						borderColor: '#DD4D20',
						pointBorderWidth: 0,
						pointRadius: 0,
						borderWidth: 0,
						data: list,
						fill: false
					}
				]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: '',
					fontSize: 0
				},
				tooltips: {
					mode: 'index',
					position: 'average',
					intersect: false,
					backgroundColor: '#F6F6F6',
					titleFontColor: '#AD2323',
					titleFontSize: 15,
					bodyFontColor: '#999',
					displayColors: false,
					caretX: 0,
					caretY: 0,
					x:0,
					y:0
				},
				hover: {
					mode: 'index',
					intersect: false
				},
				scales: {
					xAxes: [
						{
							display: true,
							scaleLabel: {
								display: false
							}
						}
					],
					yAxes: [
						{
							display: true,
							scaleLabel: {
								display: true
							}
						}
					]
				}
			}
		});
	}
	async fetch(params) {
		var data = await get('/cbond/history', {
			method: 'POST',
			body: params
		});
		this.setState({data});
		this.initChat(data);
	}
	onChange(type,date) {
		let state = {};
		state[type] = date.format('YYYY-MM-DD');
		this.setState(state);
		if (type === 'range_begin') {
			minDate = date;
		} else if (type === 'range_end'){
			maxDate = date;
		}

		if (minDate <= maxDate) {
			this.fetch(Object.assign(params,{range_begin:minDate.format('YYYY-MM-DD'),range_end:maxDate.format('YYYY-MM-DD')}))
		}
	}
	render() {
		let {data} = this.state;
		if (data === null) return null;
		return (
			<div className="trends-container">
					<DatePicker
					  mode="date"
					  title="选择日期"
					  minDate={MIN_DATE}
					  maxDate={maxDate}
					  onChange={this.onChange.bind(this,'range_begin')}
					>
						<div className="date-picker">
							<span>{data.range_begin || params.range_begin}</span><i></i>
						</div>
					</DatePicker>

					<span className="seperator">至</span>
					<DatePicker
					  mode="date"
					  title="选择日期"
					  minDate={minDate}
					  onChange={this.onChange.bind(this,'range_end')}
					>
						<div className="date-picker">
							<span>{data.range_end || params.range_end}</span><i></i>
						</div>
					</DatePicker>
				<canvas id="myChart" width="400" height="400"></canvas>
				<div style={{marginTop:30}}></div>
				<RowTable rows={rows} data={data} />
			</div>
		)
	}
}
