<script setup lang="ts">
import Permission from "@/components/Permission/index.vue";
import vPermission from "@/directives/vPermission";
</script>
<template>
	<el-card shadow="never">
		<el-alert title="此栏目为权限功能做演示！" type="warning" />
		<h3>以下有三个账号,密码：123456，你可以登录不同的账号查看此栏目下的区别：</h3>
		<table class="el-table el-table--border" cellspacing="0" cellpadding="0" border="0">
			<thead>
				<tr>
					<th class="el-table__cell" style="background-color: #f5f7fa !important"><div class="cell">admin</div></th>
					<th class="el-table__cell" style="background-color: #f5f7fa !important"><div class="cell">user</div></th>
					<th class="el-table__cell" style="background-color: #f5f7fa !important"><div class="cell">test</div></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="el-table__cell"><div class="cell">超级管理员（拥有所有权限）</div></td>
					<td class="el-table__cell"><div class="cell">临时用户账号</div></td>
					<td class="el-table__cell"><div class="cell">临时测试账号</div></td>
				</tr>
			</tbody>
		</table>
		<h3>此页面所有用户都可以查看，以下只做操作按钮权限演示，页面权限请登录不同账号查看左侧栏目对应菜单区别。</h3>

		<table class="el-table el-table--border" cellspacing="0" cellpadding="0" border="0">
			<thead>
				<tr class="custom-table-header">
					<th class="el-table__cell" style="background-color: #f5f7fa !important">
						<div class="cell">不做验证的操作按钮</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="el-table__cell">
						<div class="cell">
							<el-button type="primary">编辑</el-button>
							<el-button type="danger"> 删除</el-button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>

		<el-divider content-position="left"><h3>Permission 组件使用方法：</h3></el-divider>
		<table class="el-table el-table--border" cellspacing="0" cellpadding="0" border="0">
			<thead>
				<tr class="custom-table-header">
					<th class="el-table__cell" style="background-color: #f5f7fa !important">
						<div class="cell">user账号可操作按钮</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="el-table__cell">
						<div class="cell">
							<Permission roles="user">
								<template #nodata>无权操作！</template>
								<el-button type="primary">编辑</el-button>
								<el-button type="danger"> 删除 </el-button>
							</Permission>
						</div>
					</td>
				</tr>
			</tbody>
			<thead>
				<tr class="custom-table-header">
					<th class="el-table__cell" style="background-color: #f5f7fa !important">
						<div class="cell">test账号可操作按钮</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="el-table__cell">
						<div class="cell">
							<Permission roles="test">
								<template #nodata>无权操作！</template>
								<el-button type="primary">编辑</el-button>
								<el-button type="danger"> 删除 </el-button>
							</Permission>
						</div>
					</td>
				</tr>
			</tbody>
		</table>

		<el-divider content-position="left"><h3>v-permission 指令使用方法：</h3></el-divider>
		<table class="el-table el-table--border" cellspacing="0" cellpadding="0" border="0">
			<thead>
				<tr class="custom-table-header">
					<th class="el-table__cell" style="background-color: #f5f7fa !important">
						<div class="cell">user账号可操作按钮</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="el-table__cell">
						<div class="cell">
							<el-button v-permission="'user'" type="primary">编辑</el-button>
							<el-button v-permission="'user'" type="danger">删除</el-button>
						</div>
					</td>
				</tr>
			</tbody>
			<thead>
				<tr class="custom-table-header">
					<th class="el-table__cell" style="background-color: #f5f7fa !important">
						<div class="cell">test账号可操作按钮</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="el-table__cell">
						<div class="cell">
							<el-button v-permission="'test'" type="primary">编辑</el-button>
							<el-button v-permission="'test'" type="danger">删除</el-button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</el-card>
</template>
