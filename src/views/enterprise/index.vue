<template>
    <div class="app-container">
        <el-table
                v-loading="listLoading"
                :data="list"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row>
            <el-table-column align="center" label="编号" width="95">
                <template slot-scope="scope">
                    {{ scope.row.id }}
                </template>
            </el-table-column>
            <el-table-column label="企业名称">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label="补贴报价" width="110" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.subsidyInfo }}</span><br/>
                    <span>{{  scope.row.subsidyMoney }}元</span>
                </template>
            </el-table-column>
            <el-table-column label="报名人数" width="110" align="center">
                <template slot-scope="scope">
                    {{ scope.row.pageviews }}
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="状态" width="100" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusFilter2 }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="操作">
                <template slot-scope="scope">
                    <el-button class="filter-item" type="primary" @click="handleUpdate(scope.row)">设置补贴价格</el-button>
                    <router-link :to="{path:'/enterprise/enterpriseEdit',query:{enterprise:scope.row}}">
                        <el-button type="primary" >编辑</el-button>
                    </router-link>

                </template>
            </el-table-column>

        </el-table>

        <pagination
                v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="fetchData"/>

        <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
            <el-form
                    ref="dataForm"
                    :model="editmoney"
                    label-position="left"

                    label-width="70px"
                    style="width: 400px; margin-left:50px;">
                <el-form-item>
                    <el-input v-model="enterpriseSubsidyInfo" placeholder="请输入补贴描述"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="input" placeholder="请输入价格"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitUpdateSubsidy()">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>

</template>

<script>
  import { getEnterpriseList, updateEnterpriseSubsidy } from '@/api/enterprise/enterlist'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Enterprise',
    components: { Pagination },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: 'success',
          1: 'gray',
          2: 'danger'
        }
        return statusMap[status]
      },
      statusFilter2(status) {
        const statusMap2 = {
          0: '正常',
          1: '关闭'
        }
        return statusMap2[status]
      }
    },
    data() {
      return {
        enterpriseSubsidyInfo: '',
        input: '',
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        dialogStatus: '',
        dialogFormVisible: false,
        editmoney: {
          id: -1,
          subsidyMoney: 0,
          subsidyInfo: null,
          currentMoney: 0
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getEnterpriseList(this.listQuery).then(response => {
          this.list = response.data.list
          this.listLoading = false
          this.total = response.data.totalPage
          this.$store.dispatch('setLanguage', 'zh')
        })
      },
      toEdit(row) {
        this.$route.push({
          path: '/404',
          query: {
            enterprise: row
          }
        })
      },
      handleCreate(row) {
        this.dialogStatus = '设置补贴价格'
        this.dialogFormVisible = true
        this.currentMoney = row.status
      },
      handleUpdate(row) {
        this.enterpriseSubsidyInfo = row.subsidyInfo
        this.input = row.subsidyMoney
        this.editmoney = Object.assign({}, row)
        this.dialogStatus = '设置补贴价格'
        this.dialogFormVisible = true
      },
      submitUpdateSubsidy() {
        this.editmoney.subsidyMoney = this.input
        this.editmoney.subsidyInfo = this.enterpriseSubsidyInfo
        updateEnterpriseSubsidy(this.editmoney.id, this.editmoney.subsidyMoney, this.enterpriseSubsidyInfo).then(() => {
          for (const v of this.list) {
            console.log(v.id)
            if (v.id === this.editmoney.id) {
              const index = this.list.indexOf(v)
              this.list.splice(index, 1, this.editmoney)
              break
            }
          }

          this.dialogFormVisible = false
          this.enterpriseSubsidyInfo = null
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    }
  }

</script>
