(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{18:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(2),s=n(13),c=n.n(s),i=n(3),r=(n(18),n(19)),o=function(){return r.get("/api/solves/fastestTen").then((function(e){return e.data})).catch((function(e){console.log(e)}))},l=function(e){return r.get("/api/solves/".concat(e)).then((function(e){return e.data})).catch((function(e){console.log(e)}))},d=function(e){return r.get("/api/solves/".concat(e,"/fastest")).then((function(e){var t=e.data.average;return{fastest:e.data.fastest,average:t,worst:e.data.worst.time}})).catch((function(e){console.log(e)}))},j=n(0),u=function(e){var t=e.className,n=e.handleClick,a=e.player;return Object(j.jsx)("button",{className:t,onClick:n,id:a.alias,children:a.name})},b=function(e){var t=e.name,n=e.solves,a=e.average,s=e.worst;return Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{children:t}),Object(j.jsx)("h3",{children:"Best Times"}),n.map((function(e){return Object(j.jsxs)("li",{children:[e.time," seconds on ",e.date]},e.id)})),Object(j.jsx)("br",{}),Object(j.jsxs)("p",{children:["Average solve time: ",a," seconds."]}),Object(j.jsx)("br",{}),Object(j.jsxs)("p",{children:["Worst time is ",s," seconds \ud83e\udd21"]})]})};var h=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],s=t[1],c=Object(a.useState)([]),r=Object(i.a)(c,2),h=(r[0],r[1]),f=Object(a.useState)(),m=Object(i.a)(f,2),O=m[0],v=m[1],x=Object(a.useState)([]),g=Object(i.a)(x,2),p=g[0],k=g[1],y=Object(a.useState)(),N=Object(i.a)(y,2),w=N[0],S=N[1],T=Object(a.useState)(),M=Object(i.a)(T,2),C=M[0],E=M[1],A=function(e){console.log(e.target.id),l(e.target.id).then((function(t){h(t),v(e.target.id)})),d(e.target.id).then((function(e){k(e.fastest),S(e.average.toFixed(2)),E(e.worst)}))};return Object(a.useEffect)((function(){o().then((function(e){s(e)}))}),[]),Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)("div",{className:"Header",children:Object(j.jsx)("h1",{children:Object(j.jsx)("a",{href:"/",children:"New York Times Mini Leaderboard"})})}),Object(j.jsx)("div",{className:"nav",children:Object(j.jsx)("ul",{children:[{name:"Kyle",alias:"kyledeanreinford"},{name:"Jeffrey",alias:"jalopey"},{name:"Ted",alias:"The Nuge"},{name:"Dane",alias:"d\u2019Anthony"},{name:"Conor",alias:"conor"},{name:"David",alias:"Szakonyi"},{name:"Mark",alias:"Mark Miller"},{name:"Will",alias:"willardsmith"},{name:"Eric",alias:"Ericki"}].map((function(e){return Object(j.jsx)("li",{children:Object(j.jsx)(u,{className:"btn",player:e,handleClick:A})},e.name)}))})}),Object(j.jsxs)("div",{className:"main",children:[O&&Object(j.jsx)(b,{name:O,solves:p,average:w,worst:C}),n&&!O&&Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{children:"Top 10 Times"}),n.map((function(e){return Object(j.jsxs)("li",{children:[e.name,": ",e.time," seconds"]},e.name)}))]})]}),Object(j.jsxs)("div",{className:"footer",children:["Made by"," ",Object(j.jsx)("a",{href:"https://github.com/kyledeanreinford",children:"Kyle Dean Reinford"})," | Mediocre Coder 2021"]})]})};c.a.render(Object(j.jsx)(h,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.b2ffe9e3.chunk.js.map