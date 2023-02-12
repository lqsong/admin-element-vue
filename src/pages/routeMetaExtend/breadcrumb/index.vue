<script setup lang="ts">
const code = `
<pre>
	<code>
{
	meta: {
		title: "自定义面包屑",
		breadcrumb: [
			{
				title: "自定义面包屑",
				path: "",
			},
			{
				title: "首页",
				path: "/home",
			},
			{
				title: "liqingsong.cc",
				path: "http://liqingsong.cc",
			},
		],
	},
	path: "breadcrumb",
	component: () => import("@/pages/routeMetaExtend/breadcrumb/index.vue"),
},
	</code>
</pre>
`;
</script>
<template>
	<el-card shadow="never">
		<div><span :style="{ fontSize: '35px', color: '#FF0000' }">↑</span>请看上方面包屑。</div>
		<el-divider content-position="left">说明：</el-divider>
		<div>配置路由时，如需自定义面包屑，设置 `meta` 下的 `breadcrumb` 字段。</div>
		<el-divider content-position="left">代码：</el-divider>
		<div v-html="code"></div>
	</el-card>
</template>
