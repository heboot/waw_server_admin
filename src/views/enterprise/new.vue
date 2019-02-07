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
                    <el-form-item label="地址">
                        <el-input style="" v-model="enterprise.address"></el-input>
                    </el-form-item>
                    <el-form-item label="经纬度">
                        <el-input style="" v-model="enterprise.salaryDate"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleAdd()">提交</el-button>

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
                        <el-button type="primary" @click="handleAdd()">提交</el-button>
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
                        <el-button type="primary" @click="handleAdd()">提交</el-button>
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
                        <el-button type="primary" @click="handleAdd()">提交</el-button>
                    </el-form-item>
                </el-form>

            </el-tab-pane>

        </el-tabs>
    </div>
</template>>


<script>
  import { getToken } from '@/utils/auth'
  import { addEnterprise } from '@/api/enterprise/enterlist'
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
        enterprise: {
          salary: '3000-4500元',
          salaryDate: '每月10号发(1-30日)',
          salaryBasic: '底薪2000元',
          salaryInfo: '保底200元/天',
          eatInfo: '工作时间内提供免费工作餐，8小时工作制提供一餐，12小时工作制提供2餐，工作时间外用餐自理',
          dormInfo: '公司提供宿舍，住宿费20元/月。水电费自理，每间宿舍配有空调，单独卫生间及淋浴房，宿舍区域总体配有洗衣机，食堂',
          trafficInfo: '厂车上下班',
          age: '男：18-32岁，女18-32岁',
          tip: '1.入职前和工作中需要经常考试；2.培训三天无薪资；离职需要按企业流程办理手续，薪资以企业实结为准。',
          info: '企业说明',
          contractualInfo: '与企业制定人力资源公司签订',
          contractualSalary: '转正前由平台代发，转正后企业发放',
          contractualInsurance: '入职后第三个月缴纳社会保险，（签合同时可以选择缴纳或是不缴纳）',
          jobContent: '',
          jobInfo: '两班倒，上5天休息一天，每班12小时（包含吃饭休息时间在内）',
          jobEnvironment: '全部流水线，需要穿无尘衣，有安检门',
          physicalInfo: '65元自理（面试第二天体检）',
          idCardInfo: '4张复印件',
          diplomaInfo: '不需要',
          photoInfo: '不需要',
          employIdCardInfo: '必须有磁身份证',
          employDiplomaInfo: '初中毕业证，高中毕业证，大专毕业证',
          employSexAgeInfo: '男：18-40岁，女18-40岁',
          employTattoo: '手部无纹身，手臂无纹身',
          employSmoke: '手部无烟疤，手臂无烟疤',
          employReturnInfo: '',
          employEnglish: '听说读写26个字母',
          employArithmetic: '会简单加减乘除',
          employFace: '有',
          employClearGarment: '看部门',
          employPhysical: '需要',
          employForeign: '不查',
          gmtCreate: undefined
        },
        activeName: 'enterprise_info',
        token: getToken()
      }
    },
    created() {

    },
    methods: {
      handleAdd() {
        if (this.enterprise.address == null || this.enterprise.address == '') {
          this.$message({
            message: '企业地址不能为空',
            type: 'error',
            duration: 2000
          })
        }
        else  if (this.enterprise.name == null || this.enterprise.name == '') {
          this.$message({
            message: '企业名称不能为空',
            type: 'error',
            duration: 2000
          })
        }
        else  if (this.enterprise.subsidyMoney == null || this.enterprise.subsidyMoney == '') {
          this.$message({
            message: '企业补贴价格不能为空',
            type: 'error',
            duration: 2000
          })
        }
        else {
          this.submitAddEnterprise()
        }
      },
      submitAddEnterprise() {
        this.enterprise.gmtCreate = new Date()
        addEnterprise(this.token, this.enterprise).then(() => {
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    }
  }

</script>
