<template>
	<div class="sell-list">
		<el-form :inline="true" class="query-form">
			<el-form-item>
				<el-input v-model="seller" placeholder="销售人"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button-group>
					<el-button type="primary" icon="search" @click="handleSearch">查询</el-button>
					<el-button type="primary" @click.native="handleInsert">新增</el-button>
				</el-button-group>
			</el-form-item>
		</el-form>

		<el-table v-loading="loading" :data="list" style="width: 100%;" stripe>
			<el-table-column label="sellId" prop="sellId" width="120"></el-table-column>
			<el-table-column label="productName" prop="productName"></el-table-column>
			<el-table-column label="seller" prop="seller"></el-table-column>
			<el-table-column label="sellNum" prop="sellNum"></el-table-column>
			<el-table-column label="price" prop="price"></el-table-column>
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

		<el-dialog title="新增销售" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
			<el-form>
				<el-form-item label="商品名">
					<el-select placeholder="请选择" v-model="productId">
						<el-option
							v-for="item in products"
							:key="item.productId"
							:label="item.productName"
							:value="item.productId"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="商品价格">
					<el-input v-model="sellInfo.price" placeholder="Enter sell price"></el-input>
				</el-form-item>

                <el-form-item label="商品数量">
					<el-input v-model="sellInfo.sellNum" placeholder="Enter sell num"></el-input>
				</el-form-item>

				<el-form-item label="支付方式">
					<el-input v-model="sellInfo.payWay" placeholder="Enter payWay"></el-input>
				</el-form-item>

				<el-form-item label="销售人">
					<el-input v-model="sellInfo.seller" placeholder="Enter seller"></el-input>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="handleConfirm('1')">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="编辑销售" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
			<el-form>

				<el-form-item label="商品价格">
					<el-input v-model="sellInfo.price"></el-input>
				</el-form-item>

				<el-form-item label="商品数量">
					<el-input v-model="sellInfo.sellNum"></el-input>
				</el-form-item>

				<el-form-item label="支付方式">
					<el-input v-model="sellInfo.payWay"></el-input>
				</el-form-item>

				<el-form-item label="销售人">
					<el-input v-model="sellInfo.seller"></el-input>
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
import { getSell, addSell, modifySell, getByName, deleteSell } from '@/api/sell/sell.js'
import { getProduct } from '@/api/product/product.js'
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
			seller: '',
			list: [],
			loading: false,
			sellInfo: {},
			dialogVisible1: false,
			dialogVisible2: false,
			products: [],
			supplieies: [],
			productId: '',
			supplierId: ''
		};
	},
	components: {
	},
	created() {
		this.getList(this.query.page, this.query.page_size)
		this.getProduct(1, 100)
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
					this.sellInfo = {}
					done()
				})
				.catch(_ => { })
		},
		handleConfirm(index) {
			if (index === '1') {
				this.sellInfo.productId = this.productId
				this.sellInfo.supplierId = this.supplierId
				addSell(this.sellInfo).then(res => {
					console.log(res)
					this.dialogVisible1 = false
					this.sellInfo = {}
					this.$message({
						type: 'success',
						message: 'Add Success'
					})
					this.getList(this.query.page, this.query.page_size)
				})
			} else {
				modifySell(this.sellInfo).then(res => {
					console.log(res)
					this.dialogVisible2 = false
					this.sellInfo = {}
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
			getSell(page, page_size)
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
			getByName(this.query.page, this.query.page_size, this.seller).then(res => {
				console.log(res)
				this.list = res.data.list
				this.query.total = res.data.total
				this.sellInfo = {}
				this.loading = false
			})
		},
		handleInsert() {
			this.dialogVisible1 = true
		},
		handleDelete(row) {
			deleteSell(row.sellId).then(res => {
				this.$message({
					type: 'success',
					message: res.msg
				})
				this.getList(this.query.page, this.query.page_size)
			})
		},
		handleEdit(row) {
			this.dialogVisible2 = true
			this.sellInfo = row
		},
		getProduct(page, page_size) {
			getProduct(page, page_size).then(res => {
				console.log(res)
				this.products = res.data.list
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