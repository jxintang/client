import React from 'react';

module.exports=function(title){
  let idx=title.indexOf('》');
  if(idx>-1 && idx<(title.length-1)){
    return (
      <span>{title.substring(0, idx+1)}<br/>{title.substr(idx+1)}</span>
    );
  }
  return title;
}
