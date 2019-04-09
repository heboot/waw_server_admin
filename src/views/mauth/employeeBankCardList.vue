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
                    {{ scope.row.employeeModel.name }}
                </template>
            </el-table-column>
            <el-table-column label="电话" width="120">
                <template slot-scope="scope">
                    {{ scope.row.employeeModel.mobile }}
                </template>
            </el-table-column>
            <el-table-column label="银行" width="60" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.name   }}</span>
                </template>
            </el-table-column>
            <el-table-column label="卡号" width="150" align="center">
                <template slot-scope="scope">
                    {{ scope.row.bankNumber }}
                </template>
            </el-table-column>
            <el-table-column label="审核状态" width="110" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.employeeModel.bankCardstatus | statusJobTypeFilter">{{ scope.row.employeeModel.bankCardstatus | statusJobFilter
                        }}
                    </el-tag>
                </template>
            </el-table-column>
             
            <el-table-column class-name="status-col" label="渠道" width="100" align="center">
                <template slot-scope="scope">
                    {{ scope.row.parentUser==null?'无':scope.row.parentUser.name }}
                </template>
            </el-table-column>
            <el-table-column label="经纪人" width="110" align="center">
                <template slot-scope="scope">
                    {{ scope.row.brokerUser==null?'无':scope.row.brokerUser.name }}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="操作">
                <template slot-scope="scope">
                    <el-button class="filter-item"  @click="showEnableDialog(scope.row )">查看图片</el-button>
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
                title="银行卡图片"
                :visible.sync="disabledialogVisible"
                width="30%"
                :before-close="handleClose">
             
            <img :src="editEmployee.picFront" style="width: 300px;height: 150px" @click="showDetailDialog(editEmployee.picFront)" />
<img :src="editEmployee.picReverse" style="width: 300px;height: 150px"  @click="showDetailDialog(editEmployee.picReverse)"/>
            <span slot="footer" class="dialog-footer">
              <el-button  type="success" @click="updateBankStatus(2)">通过</el-button>
              <el-button type="danger" @click="updateBankStatus(-1)">失败</el-button>
    <el-button type="info" @click="disabledialogVisible = false">关闭</el-button>
    <!-- <el-button type="primary" @click="doupdateEmployeeStatus(0)">确 定</el-button> -->
  </span>
        </el-dialog>


        <el-dialog width="80%" :visible.sync="detailDialogFormVisible">

            <img :src="detailPic"  />

        </el-dialog>
        


    </div>

</template>

<script>
  import { updateEmployeeBankStatus,getEmployeeBankCardList} from '@/api/employee/employee'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import { getToken, removeToken, setToken } from '@/utils/auth'
  

  export default {
    name: 'employeeBankCardList',
    components: { Pagination },
    filters: {
       
      empolyeeStatusTypeFilter(status) {
        const jobStatusMap = {
          0: 'danger',
          1: 'success'
        }
        return jobStatusMap[status]
      },
      statusJobFilter(status) {
        const jobStatusMap = {
          0: '未提交',
          1: '待审核',
          2: '认证成功',
          3: '认证失败'
        }
        return jobStatusMap[status]
      },
      statusJobTypeFilter(status) {
        const jobStatusMap = {
          0: '',
          1: 'info',
          2: 'success',
          3: 'danger'
        }
        return jobStatusMap[status]
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
        detailPic:null,
        detailDialogFormVisible: false,
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
        jobDialogTipText:'',
        editEmployee: {
          id:null,
          picFront:"",
          picReverse:"",

        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getEmployeeBankCardList(this.listQuery).then(response => {
          this.list = response.data.list
          this.listLoading = false
          this.total = response.data.total
        })
      },
      updateBankStatus(status){
          updateEmployeeBankStatus(this.token,this.editEmployee.employeeModel.id,status).then(response => {
           this.disabledialogVisible=false
           this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
          this.fetchData()
        })
      },
      showDetailDialog(url){
        this.detailPic = url
        this.detailDialogFormVisible = true
      },
      showEnableDialog(employee) {
        this.editEmployee = employee
        console.log(this.editEmployee)
        if (employee.status == 0) {
          this.enabledialogVisible = true
        } else {
          this.disabledialogVisible = true
        }
      },
      
    }
  }

</script>
