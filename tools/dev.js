'use strict';

var koa = require('koa');
var cors = require('kcors');
var app=new koa();
var bodyParser = require('koa-bodyparser');

var router = require('koa-router')();

router.get("/news",function *(){
    console.log(this.req);
    this.body = {
        count:10,
        next:'',
        results:[1,2,3]
    };
});

router.post("/issuer/list",function *(ctx){
    console.log(this.request.body);
    this.body = {
        count:10,
        next:'',
        list:[1,2,3],
        offset: this.request.body.offset,
        limit:10
    };
});

// router.post('/issuer/list', async(ctx, next)=>{
//     console.log(ctx);
//     ctx.body = {
//             count:10,
//             next:'',
//             results:[1,2,3]
//         };
// });

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(function*() {
      this.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  })
  .use(router.allowedMethods());

var port=4000;
app.listen(port);
console.log('listening on port ', port);
