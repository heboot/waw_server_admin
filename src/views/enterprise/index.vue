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
          <span>{{ scope.row.subsidy_info }}</span>
          <span>{{ scope.row.subsidy_money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报名人数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <el-button class="filter-item" type="primary" @click="handleCreate(row)">设置补贴价格</el-button>
          <el-button type="primary">编辑</el-button>
          <el-button type="primary">管理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"/>

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="editmoney"
        label-position="left"

        label-width="70px"
        style="width: 400px; margin-left:50px;">
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
import { getEnterpriseList } from '@/api/enterprise/enterlist'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Enterprise',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
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
        id: 0,
        money: 200,
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
    handleCreate(row) {
      this.dialogStatus = '设置补贴价格'
      this.dialogFormVisible = true
      this.currentMoney = row.status
      this.input = 'gaa'
    },
    submitUpdateSubsidy(money, id) {

    }
  }
}

</script>
