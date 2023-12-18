import{s as P,e as L,a as h,c as x,b as I,g as b,f as d,l as y,i as A,h as g,k as S,m as C}from"../chunks/scheduler.256b6e1f.js";import{S as H,i as V,c as v,a as k,m as w,t as u,b as p,d as O,e as M,g as R}from"../chunks/index.6f54c819.js";import{L as D}from"../chunks/ListButton.abb2f25b.js";import{p as j}from"../chunks/stores.ef5854a9.js";function T(f){let e,r;return e=new D({props:{href:"/prepare",name:"Prepare"}}),{c(){v(e.$$.fragment)},l(t){k(e.$$.fragment,t)},m(t,i){w(e,t,i),r=!0},i(t){r||(u(e.$$.fragment,t),r=!0)},o(t){p(e.$$.fragment,t),r=!1},d(t){M(e,t)}}}function E(f){let e,r,t,i;return e=new D({props:{href:"/present",name:"Present"}}),t=new D({props:{href:"/register",name:"Register"}}),{c(){v(e.$$.fragment),r=h(),v(t.$$.fragment)},l(a){k(e.$$.fragment,a),r=b(a),k(t.$$.fragment,a)},m(a,m){w(e,a,m),A(a,r,m),w(t,a,m),i=!0},i(a){i||(u(e.$$.fragment,a),u(t.$$.fragment,a),i=!0)},o(a){p(e.$$.fragment,a),p(t.$$.fragment,a),i=!1},d(a){a&&d(r),M(e,a),M(t,a)}}}function N(f){let e,r='<form action="/logout" method="POST"><button type="submit" class="rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 w-full inline-block transition-colors ease-in duration-75">Logout</button></form>';return{c(){e=L("li"),e.innerHTML=r,this.h()},l(t){e=x(t,"LI",{class:!0,"data-svelte-h":!0}),C(e)!=="svelte-1aua1"&&(e.innerHTML=r),this.h()},h(){y(e,"class","my-2")},m(t,i){A(t,e,i)},d(t){t&&d(e)}}}function q(f){let e,r,t,i,a,m,_;t=new D({props:{href:"/vote",name:"Vote"}});let n=(f[0].data.user.role==="MODERATOR"||f[0].data.user.role==="ADMIN")&&T(),s=f[0].data.user.role==="ADMIN"&&E(),l=f[0].data.user&&N();return{c(){e=L("div"),r=L("ul"),v(t.$$.fragment),i=h(),n&&n.c(),a=h(),s&&s.c(),m=h(),l&&l.c(),this.h()},l(o){e=x(o,"DIV",{class:!0});var $=I(e);r=x($,"UL",{class:!0});var c=I(r);k(t.$$.fragment,c),i=b(c),n&&n.l(c),a=b(c),s&&s.l(c),m=b(c),l&&l.l(c),c.forEach(d),$.forEach(d),this.h()},h(){y(r,"class","text-center flex flex-col w-1/2 sm:w-1/3 lg:w-1/6 xl:w-1/12"),y(e,"class","flex justify-center mt-20")},m(o,$){A(o,e,$),g(e,r),w(t,r,null),g(r,i),n&&n.m(r,null),g(r,a),s&&s.m(r,null),g(r,m),l&&l.m(r,null),_=!0},p(o,[$]){o[0].data.user.role==="MODERATOR"||o[0].data.user.role==="ADMIN"?n?$&1&&u(n,1):(n=T(),n.c(),u(n,1),n.m(r,a)):n&&(R(),p(n,1,1,()=>{n=null}),O()),o[0].data.user.role==="ADMIN"?s?$&1&&u(s,1):(s=E(),s.c(),u(s,1),s.m(r,m)):s&&(R(),p(s,1,1,()=>{s=null}),O()),o[0].data.user?l||(l=N(),l.c(),l.m(r,null)):l&&(l.d(1),l=null)},i(o){_||(u(t.$$.fragment,o),u(n),u(s),_=!0)},o(o){p(t.$$.fragment,o),p(n),p(s),_=!1},d(o){o&&d(e),M(t),n&&n.d(),s&&s.d(),l&&l.d()}}}function B(f,e,r){let t;return S(f,j,i=>r(0,t=i)),[t]}class J extends H{constructor(e){super(),V(this,e,B,q,P,{})}}export{J as component};
