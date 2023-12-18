export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.0df0d361.js","app":"_app/immutable/entry/app.255f8c99.js","imports":["_app/immutable/entry/start.0df0d361.js","_app/immutable/chunks/scheduler.256b6e1f.js","_app/immutable/chunks/singletons.68086654.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.255f8c99.js","_app/immutable/chunks/scheduler.256b6e1f.js","_app/immutable/chunks/index.6f54c819.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js')),
			__memo(() => import('../output/server/nodes/9.js')),
			__memo(() => import('../output/server/nodes/10.js')),
			__memo(() => import('../output/server/nodes/11.js')),
			__memo(() => import('../output/server/nodes/12.js')),
			__memo(() => import('../output/server/nodes/13.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(auth)/(mod)/(admin)/api/categories",
				pattern: /^\/api\/categories\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/(auth)/(mod)/(admin)/api/categories/_server.js'))
			},
			{
				id: "/(auth)/(mod)/(admin)/api/categories/[id]",
				pattern: /^\/api\/categories\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/(auth)/(mod)/(admin)/api/categories/_id_/_server.js'))
			},
			{
				id: "/(auth)/(mod)/(admin)/api/people",
				pattern: /^\/api\/people\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/(auth)/(mod)/(admin)/api/people/_server.js'))
			},
			{
				id: "/(auth)/(mod)/(admin)/api/people/[id]",
				pattern: /^\/api\/people\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/(auth)/(mod)/(admin)/api/people/_id_/_server.js'))
			},
			{
				id: "/(auth)/(mod)/(admin)/api/quotes",
				pattern: /^\/api\/quotes\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/(auth)/(mod)/(admin)/api/quotes/_server.js'))
			},
			{
				id: "/(auth)/(mod)/(admin)/api/quotes/assign/category",
				pattern: /^\/api\/quotes\/assign\/category\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/(auth)/(mod)/(admin)/api/quotes/assign/category/_server.js'))
			},
			{
				id: "/(auth)/(mod)/(admin)/api/quotes/assign/person",
				pattern: /^\/api\/quotes\/assign\/person\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/(auth)/(mod)/(admin)/api/quotes/assign/person/_server.js'))
			},
			{
				id: "/(auth)/(mod)/(admin)/api/quotes/clear",
				pattern: /^\/api\/quotes\/clear\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/(auth)/(mod)/(admin)/api/quotes/clear/_server.js'))
			},
			{
				id: "/(auth)/(mod)/(admin)/api/quotes/clear/categories/[id]",
				pattern: /^\/api\/quotes\/clear\/categories\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/(auth)/(mod)/(admin)/api/quotes/clear/categories/_id_/_server.js'))
			},
			{
				id: "/(auth)/(mod)/(admin)/api/quotes/clear/people/[id]",
				pattern: /^\/api\/quotes\/clear\/people\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/(auth)/(mod)/(admin)/api/quotes/clear/people/_id_/_server.js'))
			},
			{
				id: "/(auth)/(mod)/(admin)/api/quotes/indexOf/[index]",
				pattern: /^\/api\/quotes\/indexOf\/([^/]+?)\/?$/,
				params: [{"name":"index","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/(auth)/(mod)/(admin)/api/quotes/indexOf/_index_/_server.js'))
			},
			{
				id: "/(auth)/(mod)/(admin)/api/quotes/total",
				pattern: /^\/api\/quotes\/total\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/(auth)/(mod)/(admin)/api/quotes/total/_server.js'))
			},
			{
				id: "/(auth)/(mod)/(admin)/api/quotes/[id]",
				pattern: /^\/api\/quotes\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/(auth)/(mod)/(admin)/api/quotes/_id_/_server.js'))
			},
			{
				id: "/(auth)/(mod)/(admin)/api/vote",
				pattern: /^\/api\/vote\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/(auth)/(mod)/(admin)/api/vote/_server.js'))
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/(auth)/(mod)/prepare",
				pattern: /^\/prepare\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(auth)/(mod)/prepare/[quoteIndex]",
				pattern: /^\/prepare\/([^/]+?)\/?$/,
				params: [{"name":"quoteIndex","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(auth)/quotes",
				pattern: /^\/quotes\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(auth)/(mod)/(admin)/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,2,3,4,], errors: [1,,,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(auth)/vote",
				pattern: /^\/vote\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(auth)/vote/[categoryId]",
				pattern: /^\/vote\/([^/]+?)\/?$/,
				params: [{"name":"categoryId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
