<template>
    <div class="app-container">

        <div class="filter-container">
            <el-input :placeholder='输入企业名称' v-model="listQuery.title" style="width: 200px;"
                      class="filter-item" @keyup.enter.native="handleFilter"/>
            <el-select v-model="listQuery.city" :placeholder='城市' clearable
                       style="width: 90px" class="filter-item">
                <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
            </el-select>

            <el-button class="filter-item" type="primary" icon="el-icon-search" hidden="rolehidden">
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
            <el-table-column label="签到日期" width="160" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.sex | sexFilter }}</span>
                </template>
            </el-table-column>
            <el-table-column label="来源" width="160" align="center">
                <template slot-scope="scope">
                    {{ scope.row.age }}
                </template>
            </el-table-column>
            <el-table-column label="员工状态" width="110" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | empolyeeStatusTypeFilter">{{ scope.row.status |
                        empolyeeStatusFilter }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="渠道" width="100" align="center">
                <template slot-scope="scope">
                    <!-- <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusFilter2 }}</el-tag> -->
                </template>
            </el-table-column>
            <el-table-column label="经纪人" width="110" align="center">
                <template slot-scope="scope">
                    {{ scope.row.pageviews }}
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
  import { getEmployeeSignLogList } from '@/api/employee/employee'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import { getToken, removeToken, setToken } from '@/utils/auth'

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
          2:'删除'
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
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id',
          city: undefined,
          token: getToken()
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
        getEmployeeSignLogList(this.listQuery).then(response => {
          this.list = response.data.list
          this.listLoading = false
          this.total = response.data.totalPage
        })
      }
    }
  }

</script>
