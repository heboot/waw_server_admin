<template>
    <div class="app-container">

        <div class="filter-container">
            <el-input placeholder='输入员工名字、电话' v-model="listQuery.key" style="width: 300px;"
                      class="filter-item" @keyup.enter.native="handleFilter"/>
            <!-- <el-select v-model="listQuery.city" :placeholder='城市' clearable
                       style="width: 90px" class="filter-item">
                <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
            </el-select> -->

            <el-button class="filter-item" type="primary" icon="el-icon-search" hidden="rolehidden"
                       @click="fetchData()">
                搜索
            </el-button>

        </div>


        <el-table
                style="margin-top: 10px;"
                v-loading="listLoading"
                :data="list"
                element-loading-text="加载中"
                border
                fit
                highlight-current-row>
            <el-table-column align="center" label="编号" width="95">
                <template slot-scope="scope">
                    {{ scope.row.id }}
                </template>
            </el-table-column>
            <el-table-column label="名字" width="150">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label="电话" width="150">
                <template slot-scope="scope">
                    {{ scope.row.mobile }}
                </template>
            </el-table-column>
            <el-table-column label="性别" width="60" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.sex | sexFilter }}</span>
                </template>
            </el-table-column>
            <el-table-column label="年龄" width="60" align="center">
                <template slot-scope="scope">
                    {{ scope.row.age }}
                </template>
            </el-table-column>
            <el-table-column label="工作状态" width="110" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.jobStatus | statusJobTypeFilter">{{ scope.row.jobStatus | statusJobFilter
                        }}
                    </el-tag>
                </template>
            </el-table-column>

            <!-- <el-table-column label="提现状态" width="110" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.cashStatus | statusCashTypeFilter">{{ scope.row.cashStatus |
                        statusCashFilter }}
                    </el-tag>
                </template>
            </el-table-column> -->
            <el-table-column label="员工状态" width="110" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | empolyeeStatusTypeFilter">{{ scope.row.status |
                        empolyeeStatusFilter }}
                    </el-tag>
                </template>
            </el-table-column>
            <!-- <el-table-column class-name="status-col" label="渠道" width="100" align="center">
                <template slot-scope="scope">
                    {{ scope.row.parentUser==null?'无':scope.row.parentUser.name }}
                </template>
            </el-table-column> -->
            <el-table-column label="经纪人" width="110" align="center">
                <template slot-scope="scope">
                    {{ scope.row.brokerUser==null?'无':scope.row.brokerUser.name }}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="操作">
                <template slot-scope="scope">
                    <el-button class="filter-item" :type="scope.row.status | empolyeeStatusTypeBtnFilter"
                               @click="showEnableDialog(scope.row )">{{ scope.row.status |
                        empolyeeStatusTypeBtnTxtFilter }}
                    </el-button>
                    <el-button hidden="true" class="filter-item" type="primary" @click="showJobStatusDialog(scope.row)">{{
                        scope.row.jobStatus |
                        empolyeeJobStatusTypeBtnTxtFilter }}
                    </el-button>
                    <!-- <router-link :to="{path:'/enterprise/enterpriseEdit',query:{enterprise:scope.row}}">
                        <el-button type="primary">签到日志</el-button>
                    </router-link> -->

                </template>
            </el-table-column>

        </el-table>

        <pagination
                v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.pageSize"
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

        <el-dialog
                title="提示"
                :visible.sync="enabledialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>确定要启用该员工吗</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="enabledialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doupdateEmployeeStatus(1)">确 定</el-button>
  </span>
        </el-dialog>

        <el-dialog
                title="提示"
                :visible.sync="disabledialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>确定要禁用该员工吗，禁用后该员工将无法登录系统</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="disabledialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doupdateEmployeeStatus(0)">确 定</el-button>
  </span>
        </el-dialog>

        <el-dialog
                title="提示"
                :visible.sync="jobStatusDialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>{{jobDialogTipText}}</span>
            <span slot="footer" class="dialog-footer">
               
    <el-button @click="jobStatusDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doupdateEmployeeJobStatus()">确 定</el-button> 
  </span>
        </el-dialog>


        <el-dialog  title="选择职位"
                :visible.sync="chooseEnterpriseDialogVisible"
                width="60%"
                :before-close="handleClose">

  <el-table  height="300px"
  @current-change="handleCurrentChange"
                style="margin-top: 10px;"
                v-loading="listLoading"
                :data="enterpriseList"
                element-loading-text="加载中"
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
            <el-table-column label="最新补贴报价" width="110" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.subsidyInfo }}</span><br/>
                    <span>{{  scope.row.subsidyMoney }}元</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="打包价格" width="110" align="center">
                <template slot-scope="scope">
                    {{ scope.row.packageMoney==null || scope.row.packageMoney==0 ?"500元": scope.row.packageMoney+"元" }}
                </template>
            </el-table-column> -->
            
        </el-table>
 <el-button style="margin:30px" @click="chooseEnterpriseDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doupdateEmployeeJobStatus()">确 定</el-button>
        </el-dialog>


    </div>

</template>

<script>
  import { getEmployeeList,updateEmployeeJobStatus, updateEmployeeStatus } from '@/api/employee/employee'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import { getToken, removeToken, setToken } from '@/utils/auth'
  import {  getEnterpriseList  } from '@/api/enterprise/enterlist'

  export default {
    name: 'EmployeeList',
    components: { Pagination },
    filters: {
      empolyeeStatusFilter(status) {
        const jobStatusMap = {
          0: '禁用',
          1: '正常'
        }
        return jobStatusMap[status]
      },
      empolyeeStatusTypeBtnFilter(status) {
        const jobStatusMap = {
          0: 'success',
          1: 'danger'
        }
        return jobStatusMap[status]
      },
      empolyeeStatusTypeBtnTxtFilter(status) {
        const jobStatusMap = {
          0: '启用',
          1: '禁用'
        }
        return jobStatusMap[status]
      },
      empolyeeJobStatusTypeBtnTxtFilter(status) {
        const jobStatusMap = {
          0: '入职',
          1: '离职',
          2: '入职'
        }
        return jobStatusMap[status]
      },
      empolyeeStatusTypeFilter(status) {
        const jobStatusMap = {
          0: 'danger',
          1: 'success'
        }
        return jobStatusMap[status]
      },
      statusJobFilter(status) {
        const jobStatusMap = {
          0: '已报名',
          1: '工作中',
          2: '离职'
        }
        return jobStatusMap[status]
      },
      statusJobTypeFilter(status) {
        const jobStatusMap = {
          0: '',
          1: 'success',
          2: 'danger'
        }
        return jobStatusMap[status]
      },
      sexFilter(status) {
        const cashTypeMap = {
          0: '女',
          1: '男'
        }
        return cashTypeMap[status]
      },
      statusCashTypeFilter(status) {
        const cashTypeMap = {
          0: 'danger',
          1: 'success',
          2: 'info'
        }
        return cashTypeMap[status]
      },
      statusCashFilter(status) {
        const cashTypeMap = {
          0: '不可提现',
          1: '可提现',
          2: '已经提现'
        }
        return cashTypeMap[status]
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
        rolehidden: '',
        enterpriseSubsidyInfo: '',
        input: '',
        list: null,
        enterpriseList:null,
        total: 0,
        listLoading: true,
        listQuery: {
          token: getToken(),
          page: 1,
          pageSize: 20,
          key: '',
          type: '0'
        },
        currentRow:null,
        token: getToken(),
        dialogStatus: '',
        dialogFormVisible: false,
        editmoney: {
          id: -1,
          subsidyMoney: 0,
          subsidyInfo: null,
          currentMoney: 0
        },
        enabledialogVisible: false,//启用弹框
        disabledialogVisible: false,//禁用弹框
        jobStatusDialogVisible:false,
        chooseEnterpriseDialogVisible:false,
        jobDialogTipText:'',
                editEmployee: null
      }
    },
    created() {
      this.fetchData(),
      this.getEnterpriseListData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getEmployeeList(this.listQuery).then(response => {
          this.list = response.data.list
          this.listLoading = false
          this.total = response.data.total
        })
      },
      getEnterpriseListData() {
        this.listLoading = true
        getEnterpriseList(this.listQuery).then(response => {
          this.enterpriseList = response.data.list
          this.listLoading = false
          
        })
      },
      showEnableDialog(employee) {
        this.editEmployee = employee
        if (employee.status == 0) {
          this.enabledialogVisible = true
        } else {
          this.disabledialogVisible = true
        }
      },
      showJobStatusDialog(employee){
        this.editEmployee = employee
          if(employee.jobStatus == 0){
              this.jobDialogTipText = '确定将员工状态改为入职吗?'
              this.chooseEnterpriseDialogVisible = true
          }else if(employee.jobStatus == 1){
              this.jobDialogTipText = '确定将员工状态改为离职吗?'
                this.jobStatusDialogVisible = true
          }else if(employee.jobStatus == 2){
              this.jobDialogTipText = '确定将员工状态改为入职吗?'
                this.chooseEnterpriseDialogVisible = true
          }
        
      },
       handleCurrentChange(val) {
         console.log(val)
        this.currentRow = val;
      },
      doupdateEmployeeJobStatus(){
        var status = undefined
        if(this.editEmployee.jobStatus == 0){
            status = 1
            if(this.currentRow == null){
            this.$message({
            message: '请先选择职位哦',
            type: 'error',
            duration: 2000
          })
          return
        }
        }else if(this.editEmployee.jobStatus ==1){
            status  = 2
        }else{
           status = 1
          if(this.currentRow == null){
            this.$message({
            message: '请先选择职位哦',
            type: 'error',
            duration: 2000
          })
          return
        }
        }

        updateEmployeeJobStatus(this.token, this.editEmployee.id, status,this.currentRow.id).then(response => {
          this.editEmployee.jobStatus = status
          for (const v of this.list) {
            console.log(v.id)
            if (v.id === this.editEmployee.id) {
              const index = this.list.indexOf(v)
              this.list.splice(index, 1, this.editEmployee)
              break
            }
          }
            this.jobStatusDialogVisible = false
          this.editEmployee = null
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      doupdateEmployeeStatus(status) {
        updateEmployeeStatus(this.token, this.editEmployee.id, status).then(response => {
          this.editEmployee.status = status
          for (const v of this.list) {
            console.log(v.id)
            if (v.id === this.editEmployee.id) {
              const index = this.list.indexOf(v)
              this.list.splice(index, 1, this.editEmployee)
              break
            }
          }
          if (status == 1) {
            this.enabledialogVisible = false
          } else {
            this.disabledialogVisible = false
          }
        this.chooseEnterpriseDialogVisible = false
          this.editEmployee = null
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
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
