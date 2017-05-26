import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Link, browserHistory} from 'react-router';
import PageList from '../../logics/PageList';

export default class Index extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {};
		this.articleList = [];
	}
	componentWillMount() {
		this.articleList = new PageList('/news');
		this.setState({
			articleList:this.articleList
		})
	}

	componentDidMount() {
		document.querySelector('#myToggle').addEventListener('toggle', function() {
			alert(1)
		})
	}

	componentWillReceiveProps(nextProps) {}

	render() {
		return (
			<div>
				<form style={{
					marginTop: 100
				}}>
					<span className="icon icon-search"></span>
					<input type="search" placeholder="Search"/>
				</form>
				<div className="toggle active" id="myToggle">
					<div className="toggle-handle"></div>
				</div>
				<div className="toggle">
					<div className="toggle-handle"></div>
				</div>
				<a href="#myModalexample" className="btn">Open modal</a>
				<div id="myModalexample" className="modal">
					<header className="bar bar-nav">
						<a className="icon icon-close pull-right" href="#myModalexample"></a>
						<h1 className="title">Modal</h1>
					</header>

					<div className="content">
						<p className="content-padded">The contents of my modal go here. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.</p>
					</div>
				</div>
				<ul className="table-view">
					<li className="table-view-cell">
						<a className="navigate-right">
							Item 1
						</a>
					</li>
					<li className="table-view-cell">
						<a className="navigate-right">
							Item 2
						</a>
					</li>
					<li className="table-view-cell">
						<a className="navigate-right">
							Item 3
						</a>
					</li>
				</ul>

				<ul className="table-view">
					<li className="table-view-cell media">
						<a className="navigate-right">
							<img className="media-object pull-left" src="http://placehold.it/42x42"/>
							<div className="media-body">
								Item 1
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet.</p>
							</div>
						</a>
					</li>
                    <li className="table-view-cell media">
						<a className="navigate-right">
							<div className="media-body">
								Item 1
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet.</p>
							</div>
                            <img className="media-object pull-left" src="http://placehold.it/42x42"/>
						</a>
					</li>
                    <li className="table-view-cell media">
						<a className="navigate-right">
							<img className="media-object pull-left" src="http://placehold.it/42x42"/>
							<div className="media-body">
								Item 1
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet.</p>
							</div>
						</a>
					</li>
				</ul>
			</div>
		)
	}
}
Index.contextTypes = {
	router: React.PropTypes.object.isRequired
}
