import{t as q,b as z}from"./index.6f54c819.js";import{r as B}from"./scheduler.256b6e1f.js";function F(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}function C(n,d){z(n,1,1,()=>{d.delete(n.key)})}function G(n,d){n.f(),C(n,d)}function H(n,d,x,S,A,g,h,b,p,j,u,k){let i=n.length,c=g.length,f=i;const w={};for(;f--;)w[n[f].key]=f;const o=[],a=new Map,m=new Map,_=[];for(f=c;f--;){const e=k(A,g,f),s=x(e);let t=h.get(s);t?S&&_.push(()=>t.p(e,d)):(t=j(s,e),t.c()),a.set(s,o[f]=t),s in w&&m.set(s,Math.abs(f-w[s]))}const M=new Set,v=new Set;function y(e){q(e,1),e.m(b,u),h.set(e.key,e),u=e.first,c--}for(;i&&c;){const e=o[c-1],s=n[i-1],t=e.key,l=s.key;e===s?(u=e.first,i--,c--):a.has(l)?!h.has(t)||M.has(t)?y(e):v.has(l)?i--:m.get(t)>m.get(l)?(v.add(t),y(e)):(M.add(l),i--):(p(s,h),i--)}for(;i--;){const e=n[i];a.has(e.key)||p(e,h)}for(;c;)y(o[c-1]);return B(_),o}export{F as e,G as f,H as u};
