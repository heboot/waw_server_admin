<template>
    <div class="app-container">

        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="企业信息" name="enterprise_info">企业信息</el-tab-pane>
            <el-tab-pane label="工资说明" name="enterprise_salary_info">工资说明</el-tab-pane>
            <el-tab-pane label="食宿介绍" name="enterprise_eat">食宿介绍</el-tab-pane>
            <el-tab-pane label="合同介绍" name="enterprise_contractual">合同介绍</el-tab-pane>
            <el-tab-pane label="岗位状态" name="enterprise_job">岗位状态</el-tab-pane>
            <el-tab-pane label="其他信息" name="enterprise_other">其他信息</el-tab-pane>
            <el-tab-pane label="录用条件" name="enterprise_condition">录用条件</el-tab-pane>
        </el-tabs>
    </div>
</template>>


<script>
  import { getEnterpriseList, updateEnterpriseSubsidy } from '@/api/enterprise/enterlist'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'EnterpriseEdit',
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
        enterprise: this.$route.query.enterprise

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
