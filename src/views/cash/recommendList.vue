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
             <el-table-column align="center" label="员工编号" width="95">
                <template slot-scope="scope">
                    {{ scope.row.employeeModel.id }}
                </template>
            </el-table-column>
            
            <el-table-column label="名字" width="150">
                <template slot-scope="scope">
                    {{ scope.row.employeeModel.name==null?"":scope.row.employeeModel.name}}
                </template>
            </el-table-column>
            <el-table-column label="电话" width="150">
                <template slot-scope="scope">
                    {{ scope.row.employeeModel.mobile }}
                </template>
            </el-table-column>
            <el-table-column label="性别" width="60" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.employeeModel.sex | sexFilter }}</span>
                </template>
            </el-table-column>
            
            <el-table-column label="推荐人号码" width="140" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.mobile }}</span>
                </template>
            </el-table-column>

            <el-table-column label="推荐人状态" width="110" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.joinStatus | statusJobTypeFilter">{{ scope.row.joinStatus | statusJobFilter
                        }}
                    </el-tag>
                </template>
            </el-table-column>


            <el-table-column class-name="status-col" label="渠道" width="100" align="center">
                <template slot-scope="scope">
                    {{ scope.row.employeeModel.parentUser==null?'无':scope.row.employeeModel.parentUser.name }}
                </template>
            </el-table-column>
            <el-table-column label="经纪人" width="110" align="center">
                <template slot-scope="scope">
                    {{ scope.row.employeeModel.brokerUser==null?'无':scope.row.employeeModel.brokerUser.name }}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="操作">
                <template slot-scope="scope">
                     
                   <el-button hidden="true" class="filter-item" type="primary"  @click="showEnableDialog(scope.row.employeeModel)">{{
                        scope.row.status |
                        empolyeesubsidyStatusTypeBtnTxtFilter }}</el-button>
                   

                </template>
            </el-table-column>

        </el-table>

        <pagination
                v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.pageSize"
                @pagination="fetchData"/>


 <el-dialog 
                title="发放补贴"
                :visible.sync="disabledialogVisible"
                width="30%"
                :before-close="handleClose">
               
            <span>请先确认入职日期和补贴金额，谨慎操作</span>
 
           
                     
                    <el-input style="margin-top:40px" type="number" v-model="subsidyMoney" placeholder="请输入补贴金额"/>
                
          

            <span slot="footer" class="dialog-footer">
    <el-button @click="disabledialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doSendEmployeeJoinSubsidyMoney()">确 定</el-button>
  </span>
        </el-dialog>
                 

         

    </div>

</template>

<script>
  import { getCashList } from '@/api/cash/cash'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import { getToken, removeToken, setToken } from '@/utils/auth'

  export default {
    name: 'cashList',
    components: { Pagination },
    filters: {
       
      statusJobFilter(status) {
        const jobStatusMap = {
          
          0: '未入职',
          1: '工作中',
          2: '离职'
        }
        return jobStatusMap[status]
      },
      empolyeesubsidyStatusTypeBtnTxtFilter(status) {
        const jobStatusMap = {
          0: '未打款',
          1: '已打款'
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
      }
    },
    data() {
      return {
        rolehidden: '',
        enterpriseSubsidyInfo: '',
        input: '',
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          token: getToken(),
          page: 1,
          pageSize: 20,
          key: '',
          type: '0'
        },
        token: getToken(),
        dialogStatus: '',
        dialogFormVisible: false,
        enabledialogVisible: false,//启用弹框
        disabledialogVisible: false,//禁用弹框
        jobStatusDialogVisible:false,
        jobDialogTipText:'',
        editEmployee: null,
        subsidyMoney:null
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getCashList(this.listQuery).then(response => {
          this.list = response.data.list
          this.listLoading = false
          this.total = response.data.total
        })
      },
      showEnableDialog(employee) {
        this.editEmployee = employee
     
          this.disabledialogVisible = true
       
      },
      doSendEmployeeJoinSubsidyMoney(){
        sendEmployeeJoinSubsidyMoney(this.token,this.editEmployee.id, this.subsidyMoney).then(() => {
         this.fetchData()
          this.disabledialogVisible = false
          this.enterpriseSubsidyInfo = null
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
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
