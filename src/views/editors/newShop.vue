<template>
    <div class="app-container">
        <el-form ref="form" label-width="100px">
            <el-form-item label="名字">
                <el-input v-model="editor.name"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="editor.address"></el-input>
            </el-form-item>
              <el-form-item label="城市">
            <el-select v-model="currentCity" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
          </el-select></el-form-item>

          <el-form-item label="类型">
            <el-select v-model="currentType" placeholder="请选择">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.title"
                :value="item.value">
              </el-option>
          </el-select></el-form-item>

            <el-form-item label="工作时间说明">
                <el-input v-model="editor.workTime"></el-input>
            </el-form-item>
            <el-form-item label="经纬度">
                <el-input v-model="editor.location"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleAdd()">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>>


<script>
  import { getToken } from '@/utils/auth'
  import { addEditor } from '@/api/editors/editors'
  import { addShop,getCityList } from '@/api/common/common'

  export default {
    name: 'newShop',
    data() {
      return {
        token: getToken(),
        options:null,
        editor: this.$route.query.shop == null?{workTime:'早上9.00-下午18.00',name:null,address:null,cityId:null,type:null,lat:null,lng:null,location:null}:this.$route.query.shop,
        currentCity:null,
        types:[
          {
             value:'1',
             title:'门店',
          },
           {
             value:'2',
             title:'集结点',
          }
        ],
        currentType:null,
      }
    },
    created() {
        this.getOptions()
    },
    methods: {
      getOptions() {
        this.listLoading = true
        getCityList(this.token).then(response => {
          this.options = response.data.list
          console.log(this.types) 
          this.listLoading = false
        })
      },
      handleAdd() {
        this.editor.cityId = this.currentCity
        this.editor.type = this.currentType
        if (this.editor.name == null || this.editor.name == '') {
          this.$message({
            message: '名字不能为空',
            type: 'error',
            duration: 2000
          })
        } else if (this.editor.address == null || this.editor.address == '') {
          this.$message({
            message: '地址不能为空',
            type: 'error',
            duration: 2000
          })
        }
        else if (this.editor.cityId == null || this.editor.cityId == '') {
          this.$message({
            message: '请先选择城市',
            type: 'error',
            duration: 2000
          })
        } 
        else if (this.editor.type == null || this.editor.type == '') {
          this.$message({
            message: '请先选择类型',
            type: 'error',
            duration: 2000
          })
        }
        else if (this.editor.location == null || this.editor.location == '') {
          this.$message({
            message: '请先输入经纬度',
            type: 'error',
            duration: 2000
          })
        }
        else if (this.editor.workTime == null || this.editor.workTime == '') {
          this.$message({
            message: '请先输入工作时间',
            type: 'error',
            duration: 2000
          })
        }else{
         
        this.submitAddEditor()
        }
        
          
         

      
       
      },
      submitAddEditor() {console.log(this.editor)
        addShop(this.token,this.editor.name,this.editor.address,this.editor.location,this.editor.workTime,this.editor.type,this.editor.cityId).then(() => {
          
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
