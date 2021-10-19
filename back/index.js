const Koa = require("koa");
const app = new Koa();

//add a date method to the context
app.context.date = Date();
app.context.userData = {
  first: "Koa",
  last: "Koa",
};

//response
// app.use(async (ctx, next) => {
// use the state
// ctx.state.user = 'Koa';
// let from = ctx.request.method;
// ctx.body = `Hello ${ctx.state.user} on ${ctx.date}`;
// ctx.response.body = ctx.userData.first;
// console.log(from);
// });

//log
app.use(async (ctx, next) => { 
  await next();
  const responseTime = ctx.response.get('X-Reponse-Time');
  console.log(`${ctx.request.method} ${ctx.request.url} - ${responseTime}`)
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const milisecond = Date.now() - start;
  ctx.set('X-Reponse-Time', `${milisecond}ms`)
})


app.use(async (ctx) => { 
  try {
    return ctx.response.body = await ctx.userData
  } catch (error) {
    console.log(error)
  }
});

// app.use((ctx) => {
//   if (ctx.userData) return (ctx.response.body = ctx.userData);
//   else return ctx.throw(400, "data required");
// });

app.listen(4700);
