import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from 'react-router';

export default class Home extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state={

        };
    }
    componentWillMount(){

    }

    componentWillReceiveProps(nextProps){

    }

    render() {
       return (
            <div className="content">
                我是home页面
            </div>
        )
    }
}
Home.contextTypes= { router: React.PropTypes.object.isRequired};
