<template>
    <div class="app-container">

        <div class="filter-container">
            <el-input placeholder='输入名字或电话' v-model="listQuery.key" style="width: 200px;"
                      class="filter-item" @keyup.enter.native="handleFilter"/>
            
            <el-button  @click="fetchData()"  class="filter-item" type="primary" icon="el-icon-search" hidden="rolehidden">
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
            <el-table-column label="地址" width="150">
                <template slot-scope="scope">
                    {{ scope.row.address }}
                </template>
            </el-table-column>
            <el-table-column label="工作时间说明" width="160" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.workTime }}</span>
                </template>
            </el-table-column>
             <el-table-column label="城市" width="160" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.city }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建日期" width="160" align="center">
                <template slot-scope="scope">
                    {{ scope.row.createTime | formatDate }}
                </template>
            </el-table-column>
            <el-table-column label="状态" width="110" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | empolyeeStatusTypeFilter">{{ scope.row.status |
                        empolyeeStatusFilter }}
                    </el-tag>
                </template>
            </el-table-column>
             <el-table-column align="center" prop="created_at" label="操作">
                <template slot-scope="scope">
                    <el-button class="filter-item" :type="scope.row.status | empolyeeStatusTypeBtnFilter"
                               @click="showEnableDialog(scope.row)">{{ scope.row.status |
                        empolyeeStatusTypeBtnTxtFilter }}
                    </el-button>
                  
                    <router-link :to="{path:'/editor/newEditor',query:{user:scope.row}}">
                        <el-button type="primary">编辑</el-button>
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

        
<el-dialog
                title="提示"
                :visible.sync="enableDialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>{{enableTipText}}}</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="enableDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doUserStatusUpdate()">确 定</el-button>
  </span>
        </el-dialog>
    </div>

</template>

<script>
  import { getShopList ,updateEditorStatus} from '@/api/editors/editors'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import { getToken, removeToken, setToken } from '@/utils/auth'
  import {formata} from '@/utils/date'
  import {parseTime,formatTime} from   '@/utils/index'

  export default {
    name: 'shopList',
    components: { Pagination },
    filters: {
      formatDate: function(time) {
        return formatTime(time,false)
      },
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
      
      empolyeeStatusTypeFilter(status) {
        const jobStatusMap = {
          0: 'danger',
          1: 'success'
        }
        return jobStatusMap[status]
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
          token: getToken(),
          key:null
        },
        token: getToken(),
        enableTipText:'',
        enableDialogVisible:false,
        editUser:null
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      showEnableDialog(row){
          this.editUser = row
          if(this.editUser.status == 1){
              this.enableTipText = '你确定要禁用该用户吗?'
          }else{
               this.enableTipText = '你确定要启用该用户吗?'
          }
           this.enableDialogVisible = true
      },
      doUserStatusUpdate(){
          var status = undefined
          if(this.editUser.status == 1){
            status = 0
          }else{
            status = 1
          }
          updateEditorStatus(this.token, this.editUser.id, status).then(response => {
          this.editUser.status = status
          for (const v of this.list) {
            console.log(v.id)
            if (v.id === this.editUser.id) {
              const index = this.list.indexOf(v)
              this.list.splice(index, 1, this.editUser)
              break
            }
          }
           
            this.enableDialogVisible = false
          

          this.editUser = null
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      fetchData() {
        this.listLoading = true
        getShopList(this.listQuery).then(response => {
          console.log(response.data)
          this.list = response.data.list
          this.listLoading = false
          this.total = response.data.totalPage
        })
      }
    }
  }

</script>
