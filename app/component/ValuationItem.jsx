/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/15/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/11/2017
 */

import React from 'react';
import SliderItem from './SliderItem.jsx';
import { Carousel } from 'antd-mobile';

const genItems = (list)=> {
    let items = [];
    list.map((item,index)=>{
        if (index % 3 === 0) {
            items.push(
                <div className="swiper-slide" key={item.namerating}>
                    <SliderItem data={list[index]}/>
                    <SliderItem data={list[index + 1]}/>
                    <SliderItem data={list[index + 2]}/>
                </div>
            )
        }
    });

    return items;
}

const ValuationItem =({item,rowID}) => {
    if (item.term_year_list.length) {
        return (
            <div>
                <div className="creditor-valuation-item" key={rowID}>
                    {
                    	item.term_year_list[0].rating !== '-'
                    		? <div className="item-header">{item.term_year_list[0].rating}
                    				<div className="seperator"></div>
                    			</div>
                    		: <div style={{backgroundColor:'#fff',height:10}}></div>
                    }
                    <Carousel
                      className="my-carousel" autoplay={false} >
                        {genItems(item.term_year_list)}
                    </Carousel>
                </div>

            </div>
        )
    } else {
        return null;
    }
};

export default ValuationItem;
