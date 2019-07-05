<template>
	<div class="product-list">
		<el-form :inline="true" class="query-form">
			<el-form-item>
				<el-input v-model="productName" placeholder="商品名"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button-group>
					<el-button type="primary" icon="search" @click="handleSearch">查询</el-button>
					<el-button type="primary" @click.native="handleInsert">新增</el-button>
				</el-button-group>
			</el-form-item>
		</el-form>

		<el-table v-loading="loading" :data="list" style="width: 100%;" stripe>
			<el-table-column label="productId" prop="productId" width="120"></el-table-column>
			<el-table-column label="productName" prop="productName"></el-table-column>
			<el-table-column label="price" prop="price"></el-table-column>
			<el-table-column label="productDesc" prop="productDesc"></el-table-column>
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

		<el-dialog title="新增商品" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
			<el-form>
				<el-form-item label="商品名">
					<el-input v-model="productInfo.productName"></el-input>
				</el-form-item>

				<el-form-item label="商品价格">
					<el-input v-model="productInfo.price"></el-input>
				</el-form-item>

				<el-form-item label="商品分类">
					<el-select placeholder="请选择" v-model="classId">
						<el-option
							v-for="item in productClasses"
							:key="item.classId"
							:label="item.className"
							:value="item.classId"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="供应商">
					<el-select placeholder="请选择" v-model="supplierId">
						<el-option
							v-for="item in supplieies"
							:key="item.supplierId"
							:label="item.supplierName"
							:value="item.supplierId"
						></el-option>
					</el-select>
				</el-form-item>


				<el-form-item label="商品描述">
					<el-input v-model="productInfo.productDesc"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="handleConfirm('1')">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="编辑商品" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
			<el-form>
				<el-form-item label="商品名">
					<el-input v-model="productInfo.productName" disabled></el-input>
				</el-form-item>

				<el-form-item label="商品价格">
					<el-input v-model="productInfo.price"></el-input>
				</el-form-item>

				<el-form-item label="商品描述">
					<el-input v-model="productInfo.productDesc"></el-input>
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
import { getProduct, addProduct, modifyProduct, getByName, deleteProduct } from '@/api/product/product.js'
import { getProductClass } from '@/api/product-class/product-class.js'
import { suppliers } from '@/api/supplier/supplier.js'

import { setTimeout } from 'timers';

export default {
	data() {
		return {
			query: {
				page: 1,
				page_size: 3,
				total: 0
			},
			productName: '',
			list: [],
			loading: false,
			productInfo: {},
			dialogVisible1: false,
			dialogVisible2: false,
			productClasses: [],
			supplieies: [],
			classId: '',
			supplierId: ''
		};
	},
	components: {
	},
	created() {
		this.getList(this.query.page, this.query.page_size)
		this.getProductClasses(1, 100)
		this.getSuppliers(1, 100)
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
					this.productInfo = {}
					done()
				})
				.catch(_ => { })
		},
		handleConfirm(index) {
			if (index === '1') {
				this.productInfo = {}
				this.productInfo.classId = this.classId
				this.productInfo.supplierId = this.supplierId
				addProduct(this.productInfo).then(res => {
					console.log(res)
					this.dialogVisible1 = false
					this.productInfo = {}
					this.$message({
						type: 'success',
						message: 'Add Success'
					})
					this.getList(this.query.page, this.query.page_size)
				})
			} else {
				modifyProduct(this.productInfo).then(res => {
					console.log(res)
					this.dialogVisible2 = false
					this.productInfo = {}
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
			getProduct(page, page_size)
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
			getByName(this.query.page, this.query.page_size, this.productName).then(res => {
				console.log(res)
				this.list = res.data.list
				this.query.total = res.data.total
				this.productInfo = {}
				this.loading = false
			})
		},
		handleInsert() {
			this.dialogVisible1 = true
		},
		handleDelete(row) {
			deleteProduct(row.productId).then(res => {
				this.$message({
					type: 'success',
					message: res.msg
				})
				this.getList(this.query.page, this.query.page_size)
			})
		},
		handleEdit(row) {
			this.dialogVisible2 = true
			this.productInfo = row
		},
		getProductClasses(page, page_size) {
			getProductClass(page, page_size).then(res => {
				console.log(res)
				this.productClasses = res.data.list
			})
		},
		getSuppliers(page, page_size) {
			suppliers(page, page_size).then(res => {
				this.supplieies = res.data.list
			})
		}
	}
};
</script>

<style type="text/scss" lang="scss">
</style>