<template>
    <div class="app-container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="企业信息" name="enterprise_info">
                <el-form ref="form" label-width="80px">
                    <el-form-item label="企业名称">
                        <el-input v-model="enterprise.name"></el-input>
                    </el-form-item>
                    <!-- <el-form-item  label="综合薪资">
                       <el-input  v-model="enterprise.salary"></el-input>
                   </el-form-item> -->
                    <el-form-item label="补贴报价">
                        <el-input v-model="enterprise.subsidyMoney"></el-input>
                    </el-form-item>
                    <el-form-item label="补贴说明">
                        <el-input style="" v-model="enterprise.subsidyInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="温馨提示">
                        <el-input style="" v-model="enterprise.tip"></el-input>
                    </el-form-item>
                    <el-form-item label="企业说明">
                        <el-input style="" v-model="enterprise.info"></el-input>
                    </el-form-item>
                    <el-form-item label="经纬度">
                        <el-input style="" v-model="enterprise.salaryDate"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">提交</el-button>
                        
                    </el-form-item>
                </el-form>

            </el-tab-pane>
            <el-tab-pane label="工资说明" name="enterprise_salary_info">
                <el-form ref="form" label-width="80px">
                    <el-form-item label="综合薪资">
                        <el-input v-model="enterprise.salary"></el-input>
                    </el-form-item>
                    <el-form-item label="发薪日">
                        <el-input style="" v-model="enterprise.salaryDate"></el-input>
                    </el-form-item>
                    <el-form-item label="底薪说明">
                        <el-input style="" v-model="enterprise.salaryBasic"></el-input>
                    </el-form-item>
                    <el-form-item label="薪资结构">
                        <el-input style="" v-model="enterprise.salaryInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="伙食">
                        <el-input v-model="enterprise.eatInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="住宿">
                        <el-input style="" v-model="enterprise.dormInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="交通">
                        <el-input style="" v-model="enterprise.trafficInfo"></el-input>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="primary">提交</el-button>
                </el-form-item>
                </el-form>
                
            </el-tab-pane>        
            <el-tab-pane label="合同介绍" name="enterprise_contractual">
                <el-form ref="form" label-width="80px">
                    <el-form-item label="合同说明">
                        <el-input v-model="enterprise.contractualInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="工资发放">
                        <el-input style="" v-model="enterprise.contractualSalary"></el-input>
                    </el-form-item>
                    <el-form-item label="保险说明">
                        <el-input style="" v-model="enterprise.contractualInsurance"></el-input>
                    </el-form-item>
                     <el-form-item label="工作说明">
                        <el-input v-model="enterprise.jobContent"></el-input>
                    </el-form-item>
                    <el-form-item label="工时说明">
                        <el-input style="" v-model="enterprise.jobInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="工作环境">
                        <el-input style="" v-model="enterprise.jobEnvironment"></el-input>
                    </el-form-item>
                     <el-form-item>
                    <el-button type="primary">提交</el-button>
                </el-form-item>
                </el-form>
               
            </el-tab-pane>
             
            <el-tab-pane label="其他信息" name="enterprise_other">
                <el-form ref="form" label-width="180px">
                    <el-form-item label="体检说明">
                        <el-input v-model="enterprise.physicalInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证复印件">
                        <el-input style="" v-model="enterprise.idCardInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="毕业证复印件">
                        <el-input style="" v-model="enterprise.diplomaInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="照片">
                        <el-input style="" v-model="enterprise.photoInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="录用条件-身份证">
                        <el-input style="" v-model="enterprise.employIdCardInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="录用条件-毕业证">
                        <el-input style="" v-model="enterprise.employDiplomaInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="录用条件-年龄">
                        <el-input style="" v-model="enterprise.employSexAgeInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="录用条件-纹身">
                        <el-input style="" v-model="enterprise.employTattoo"></el-input>
                    </el-form-item>
                    <el-form-item label="录用条件-烟疤">
                        <el-input style="" v-model="enterprise.employSmoke"></el-input>
                    </el-form-item>
                    <el-form-item label="录用条件-返厂规定">
                        <el-input style="" v-model="enterprise.employReturnInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="录用条件-英文字母">
                        <el-input style="" v-model="enterprise.employEnglish"></el-input>
                    </el-form-item>
                    <el-form-item label="录用条件-简单算术">
                        <el-input style="" v-model="enterprise.employArithmetic"></el-input>
                    </el-form-item>
                    <el-form-item label="录用条件-考试">
                        <el-input style="" v-model="enterprise.employExam"></el-input>
                    </el-form-item>
                    <el-form-item label="录用条件-人脸识别">
                        <el-input style="" v-model="enterprise.employFace"></el-input>
                    </el-form-item>
                    <el-form-item label="录用条件-无尘服">
                        <el-input style="" v-model="enterprise.employClearGarment"></el-input>
                    </el-form-item>
                    <el-form-item label="录用条件-体检">
                        <el-input style="" v-model="enterprise.employPhysical"></el-input>
                    </el-form-item>
                    <el-form-item label="录用条件-体内异物">
                        <el-input style="" v-model="enterprise.employForeign"></el-input>
                    </el-form-item>
                     <el-form-item>
                    <el-button type="primary">提交</el-button>
                </el-form-item>
                </el-form>
                
            </el-tab-pane>

        </el-tabs>
    </div>
</template>>


<script>
  import { getEnterpriseList, updateEnterpriseSubsidy } from '@/api/enterprise/enterlist'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'EnterpriseNew',
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
        enterprise:{
            
        },
        activeName: 'enterprise_info'
      }
    },
    created() {
      
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
