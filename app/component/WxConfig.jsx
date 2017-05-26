/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/28/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
*/

import React from 'react';
import {get} from 'logics/rpc';

function cfuture(){
  let cfuture;
  let result=new Promise((resolve, reject)=>{
    cfuture={resolve, reject};
  });
  return Object.assign(result, cfuture);
}

let url0=null;
let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
if(isiOS){
  url0=window.location.href.split('#')[0];
}
async function sign(url){
  url= url0||url;
  let data = await get('/fweixin/js_sign',{body:{url}});
  wx.config({...data, debug:__DEV__, jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']});
  return new Promise((resolve, reject)=>{
    wx.ready(()=>resolve(true));
    wx.error((res)=>reject(res));
  });
}

let WxConfig={};

module.exports=WxConfig;

WxConfig.init=()=>{
  //空函数，确保WxConfig 一定第一时间调用了
};
WxConfig.share=async(info)=>{
  if(!info.link){
    info.link=window.location.href.split('#')[0];
  }
  if(!info.imgUrl){
    info.imgUrl='http://wx.grandbondhouse.com/static/images/share-icon.jpeg';
  }
  let data=await sign(info.link);
  wx.onMenuShareTimeline(info);
  wx.onMenuShareAppMessage(info);
};
