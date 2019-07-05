<template>
	<div class="supplier-list">
		<el-form :inline="true" class="query-form">
			<el-form-item>
				<el-input v-model="className" placeholder="供应商名"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button-group>
					<el-button type="primary" icon="search" @click="handleSearch">查询</el-button>
					<el-button type="primary" @click.native="handleInsert">新增</el-button>
				</el-button-group>
			</el-form-item>
		</el-form>

		<el-table v-loading="loading" :data="list" style="width: 100%;" stripe>
			<el-table-column label="classId" prop="classId" width="120"></el-table-column>
			<el-table-column label="className" prop="className"></el-table-column>
			<el-table-column label="classDesc" prop="classDesc">
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

		<el-dialog title="新增商品种类" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
			<el-form>
				<el-form-item label="分类名">
					<el-input v-model="productClassInfo.className"></el-input>
				</el-form-item>

				<el-form-item label="分类描述">
					<el-input v-model="productClassInfo.classDesc"></el-input>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="handleConfirm('1')">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="编辑用户" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
			<el-form>
				<el-form-item label="分类名">
					<el-input v-model="productClassInfo.className" disabled></el-input>
				</el-form-item>

				<el-form-item label="分类描述">
					<el-input v-model="productClassInfo.classDesc"></el-input>
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
import { getProductClass, addProductClass, modifyProductClass, getByName, deleteProductClass} from '@/api/product-class/product-class.js'
import { setTimeout } from 'timers';

export default {
	data() {
		return {
			query: {
				page: 1,
				page_size: 3,
				total: 0
			},
            className: '',
			list: [],
			loading: false,
			productClassInfo: {},
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
					this.productClassInfo = {}
					done()
				})
				.catch(_ => { })
		},
		handleConfirm(index) {
			if (index === '1') {
				addProductClass(this.productClassInfo).then(res => {
					console.log(res)
					this.dialogVisible1 = false
					this.productClassInfo = {}
					this.$message({
						type: 'success',
						message: 'Add Success'
					})
					this.getList(this.query.page, this.query.page_size)
				})
			} else {
				modifyProductClass(this.productClassInfo).then(res => {
					console.log(res)
					this.dialogVisible2 = false
					this.productClassInfo = {}
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
			getProductClass(page, page_size)
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
			getByName(this.query.page, this.query.page_size, this.className).then(res => {
				console.log(res)
				this.list = res.data.list
                this.query.total = res.data.total
                this.productClassInfo = {}
				this.loading = false
			})
		},
		handleInsert() {
			this.dialogVisible1 = true
		},
		handleDelete(row) {
			deleteProductClass(row.classId).then(res => {
				this.$message({
					type: 'success',
					message: res.msg
				})
				this.getList(this.query.page, this.query.page_size)
			})
		},
		handleEdit(row) {
			this.dialogVisible2 = true
			this.productClassInfo = row
		}
	}
};
</script>

<style type="text/scss" lang="scss">
</style>