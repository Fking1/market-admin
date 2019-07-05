<template>
	<div class="user-list">
		<el-form :inline="true" class="query-form">
			<el-form-item>
				<el-input v-model="username" placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button-group>
					<el-button type="primary" icon="search" @click="handleSearch">查询</el-button>
					<el-button type="primary" @click.native="handleInsert">新增</el-button>
				</el-button-group>
			</el-form-item>
		</el-form>

		<el-table v-loading="loading" :data="list" style="width: 100%;" stripe>
			<el-table-column label="userId" prop="userId" width="120"></el-table-column>
			<el-table-column label="username" prop="username"></el-table-column>
			<el-table-column label="user" prop="userPermission">
				<template slot-scope="scope">
					<el-tag type="success" v-if="scope.row.userPermission === '0'">已授权</el-tag>
					<el-tag type="danger" v-else>未授权</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="product" prop="productPermission">
				<template slot-scope="scope">
					<el-tag type="success" v-if="scope.row.productPermission === '0'">已授权</el-tag>
					<el-tag type="danger" v-else>未授权</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="purchase" prop="purchasePermission">
				<template slot-scope="scope">
					<el-tag type="success" v-if="scope.row.purchasePermission === '0'">已授权</el-tag>
					<el-tag type="danger" v-else>未授权</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="sell" prop="sellPermission">
				<template slot-scope="scope">
					<el-tag type="success" v-if="scope.row.sellPermission === '0'">已授权</el-tag>
					<el-tag type="danger" v-else>未授权</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="supplier" prop="supplierPermission">
				<template slot-scope="scope">
					<el-tag type="success" v-if="scope.row.supplierPermission === '0'">已授权</el-tag>
					<el-tag type="danger" v-else>未授权</el-tag>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleDelete(scope.row)" type="text" size="small">
						<i class="el-icon-delete"></i>
					</el-button>
					<el-button @click="handleEdit(scope.row)" type="text" size="small">
						<i class="el-icon-edit"></i>
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog title="新增用户" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
			<el-form>
				<el-form-item label="用户名">
					<el-input v-model="userInfo.username"></el-input>
				</el-form-item>

				<el-form-item label="密码">
					<el-input v-model="userInfo.password"></el-input>
				</el-form-item>

				<el-form-item label="用户管理权限:">
					<el-radio v-model="userInfo.userPermission" label="0">启用</el-radio>
					<el-radio v-model="userInfo.userPermission" label="-1">禁用</el-radio>
				</el-form-item>

				<el-form-item label="商品管理权限">
					<el-radio v-model="userInfo.productPermission" label="0">启用</el-radio>
					<el-radio v-model="userInfo.productPermission" label="-1">禁用</el-radio>
				</el-form-item>

				<el-form-item label="进货管理权限">
					<el-radio v-model="userInfo.purchasePermission" label="0">启用</el-radio>
					<el-radio v-model="userInfo.purchasePermission" label="-1">禁用</el-radio>
				</el-form-item>

				<el-form-item label="销售管理权限">
					<el-radio v-model="userInfo.sellPermission" label="0">启用</el-radio>
					<el-radio v-model="userInfo.sellPermission" label="-1">禁用</el-radio>
				</el-form-item>

				<el-form-item label="供应商管理权限">
					<el-radio v-model="userInfo.supplierPermission" label="0">启用</el-radio>
					<el-radio v-model="userInfo.supplierPermission" label="-1">禁用</el-radio>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="handleConfirm('1')">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="编辑用户" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
			<el-form>
				<el-form-item label="用户名">
					<el-input v-model="userInfo.username" disabled></el-input>
				</el-form-item>

				<!-- <el-form-item label="密码">
					<el-input v-model="userInfo.password"></el-input>
				</el-form-item>-->

				<el-form-item label="用户管理权限:">
					<el-radio v-model="userInfo.userPermission" label="0">启用</el-radio>
					<el-radio v-model="userInfo.userPermission" label="-1">禁用</el-radio>
				</el-form-item>

				<el-form-item label="商品管理权限">
					<el-radio v-model="userInfo.productPermission" label="0">启用</el-radio>
					<el-radio v-model="userInfo.productPermission" label="-1">禁用</el-radio>
				</el-form-item>

				<el-form-item label="进货管理权限">
					<el-radio v-model="userInfo.purchasePermission" label="0">启用</el-radio>
					<el-radio v-model="userInfo.purchasePermission" label="-1">禁用</el-radio>
				</el-form-item>

				<el-form-item label="销售管理权限">
					<el-radio v-model="userInfo.sellPermission" label="0">启用</el-radio>
					<el-radio v-model="userInfo.sellPermission" label="-1">禁用</el-radio>
				</el-form-item>

				<el-form-item label="供应商管理权限">
					<el-radio v-model="userInfo.supplierPermission" label="0">启用</el-radio>
					<el-radio v-model="userInfo.supplierPermission" label="-1">禁用</el-radio>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="handleConfirm('2')">确 定</el-button>
			</span>
		</el-dialog>

		<el-pagination
			background
			@prev-click="handlePrev"
			@next-click="handleNext"
			@current-change="handleCurrent"
			layout="prev, pager, next"
			:page-size="query.page_size"
			:total="query.total"
		></el-pagination>
	</div>
</template>

<script>
import { register, getUsers, modifyUser, deleteUser, getUserByName } from '@/api/user/user.js'
import { setTimeout } from 'timers';

export default {
	data() {
		return {
			query: {
				page: 1,
				page_size: 3,
				total: 0
			},
			username: '',
			list: [],
			loading: false,
			userInfo: {},
			dialogVisible1: false,
			dialogVisible2: false
		};
	},
	components: {
	},
	created() {
		this.getList(this.query.page, this.query.page_size)
	},
	methods: {
		handlePrev() {
			this.query.page = this.query.page - 1
		},
		handleNext() {
			this.query.page = this.query.page + 1
		},
		handleCurrent(e) {
			this.query.page = e
			this.getList(this.query.page, this.query.page_size)
		},
		handleClose(done) {
			this.$confirm("确认关闭？")
				.then(_ => {
					this.userInfo = {}
					done()
				})
				.catch(_ => { })
		},
		handleConfirm(index) {
			if (index === '1') {
				register(this.userInfo).then(res => {
					console.log(res)
					this.dialogVisible1 = false
					this.userInfo = {}
					this.$message({
						type: 'success',
						message: 'Add Success'
					})
					this.getList(this.query.page, this.query.page_size)
				})
			} else {
				modifyUser(this.userInfo).then(res => {
					console.log(res)
					this.dialogVisible2 = false
					this.userInfo = {}
					this.$message({
						type: 'success',
						message: res.msg
					})
					this.getList(this.query.page, this.query.page_size)
				})
			}
		},
		getList(page, page_size) {
			this.loading = true;
			getUsers(page, page_size)
				.then(res => {
					console.log(res.data.list)
					this.list = res.data.list
					this.query.total = res.data.total
					this.loading = false
				})
				.catch(err => {
					console.log(err)
				})
		},
		handleSearch() {
			this.loading = true
			getUserByName(this.query.page, this.query.page_size, this.username).then(res => {
				console.log(res)
				this.list = res.data.list
				this.query.total = res.data.total
				this.loading = false
			})
		},
		handleInsert() {
			this.dialogVisible1 = true
		},
		handleDelete(row) {
			deleteUser(row.userId).then(res => {
				this.$message({
					type: 'success',
					message: res.msg
				})
				this.getList(this.query.page, this.query.page_size)
			})
		},
		handleEdit(row) {
			this.dialogVisible2 = true
			this.userInfo = row
		}
	}
};
</script>

<style type="text/scss" lang="scss">
</style>