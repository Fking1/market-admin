<template>
	<div class="supplier-list">
		<el-form :inline="true" class="query-form">
			<el-form-item>
				<el-input v-model="supplierName" placeholder="供应商名"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button-group>
					<el-button type="primary" icon="search" @click="handleSearch">查询</el-button>
					<el-button type="primary" @click.native="handleInsert">新增</el-button>
				</el-button-group>
			</el-form-item>
		</el-form>

		<el-table v-loading="loading" :data="list" style="width: 100%;" stripe>
			<el-table-column label="supplierId" prop="supplierId" width="120"></el-table-column>
			<el-table-column label="supplierName" prop="supplierName"></el-table-column>
			<el-table-column label="agent" prop="agent">
			</el-table-column>
			<el-table-column label="phone" prop="phone">
			</el-table-column>
			<el-table-column label="address" prop="address">
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

		<el-dialog title="新增供应商" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
			<el-form>
				<el-form-item label="供应商名">
					<el-input v-model="supplierInfo.supplierName"></el-input>
				</el-form-item>

				<el-form-item label="法人">
					<el-input v-model="supplierInfo.agent"></el-input>
				</el-form-item>

				<el-form-item label="手机号:">
                    <el-input v-model="supplierInfo.phone"></el-input>
				</el-form-item>

                <el-form-item label="地址:">
                    <el-input v-model="supplierInfo.address"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="handleConfirm('1')">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="编辑用户" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
			<el-form>
				<el-form-item label="供应商名">
					<el-input v-model="supplierInfo.supplierName" disabled></el-input>
				</el-form-item>

				<el-form-item label="法人">
					<el-input v-model="supplierInfo.agent"></el-input>
				</el-form-item>

				<el-form-item label="手机号:">
                    <el-input v-model="supplierInfo.phone"></el-input>
				</el-form-item>

                <el-form-item label="地址:">
                    <el-input v-model="supplierInfo.address"></el-input>
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
import { suppliers, addSupplier, modifySupplier, getSupplierByName, deleteSupplier } from '@/api/supplier/supplier.js'
import { setTimeout } from 'timers';

export default {
	data() {
		return {
			query: {
				page: 1,
				page_size: 3,
				total: 0
			},
            supplierName: '',
			list: [],
			loading: false,
			supplierInfo: {},
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
					this.supplierInfo = {}
					done()
				})
				.catch(_ => { })
		},
		handleConfirm(index) {
			if (index === '1') {
				addSupplier(this.supplierInfo).then(res => {
					console.log(res)
					this.dialogVisible1 = false
					this.supplierInfo = {}
					this.$message({
						type: 'success',
						message: 'Add Success'
					})
					this.getList(this.query.page, this.query.page_size)
				})
			} else {
				modifySupplier(this.supplierInfo).then(res => {
					console.log(res)
					this.dialogVisible2 = false
					this.supplierInfo = {}
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
			suppliers(page, page_size)
				.then(res => {
					console.log(res)
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
			getSupplierByName(this.query.page, this.query.page_size, this.supplierName).then(res => {
				console.log(res)
				this.list = res.data.list
                this.query.total = res.data.total
                this.supplierInfo = {}
				this.loading = false
			})
		},
		handleInsert() {
			this.dialogVisible1 = true
		},
		handleDelete(row) {
			deleteSupplier(row.supplierId).then(res => {
				this.$message({
					type: 'success',
					message: res.msg
				})
				this.getList(this.query.page, this.query.page_size)
			})
		},
		handleEdit(row) {
			this.dialogVisible2 = true
			this.supplierInfo = row
		}
	}
};
</script>

<style type="text/scss" lang="scss">
</style>