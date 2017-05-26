/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/14/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/14/2017
*/
import React from 'react';
import {
   Carousel
} from 'antd-mobile';

export default class LikeCmp extends React.Component {
    render() {
        let {guess} = this.props;
        return (
            <div>
                {guess ? <div className="like-wrapper">
                    <div className="like-item-header">
                        <div className="like-item-header-left">
                            猜你喜欢
                        </div>
                        <div className="like-item-header-right">
                            <Link className="article-item"  to={{
                              pathname: '/bond/like-list',
                              state: {data: guess}
                            }}>
                                共找到{guess.length}只证券>
                            </Link>
                        </div>
                    </div>
                    <Carousel
                      className="my-carousel" autoplay={false} infinite>
                       {guess.map((item)=>(
                           <LikeItem key={item.id} item={item} total={guess.length}/>
                       ))}
                      </Carousel>
                </div> : null}
            </div>
        )
    }
}
