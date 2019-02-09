<template>
    <div class="app-container">
        <el-form ref="form" label-width="80px">
            <el-form-item label="名字">
                <el-input v-model="editor.name"></el-input>
            </el-form-item>
            <!-- <el-form-item  label="综合薪资">
               <el-input  v-model="enterprise.salary"></el-input>
           </el-form-item> -->
            <el-form-item label="电话">
                <el-input v-model="editor.mobile"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleAdd()">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>>


<script>
  import { getToken } from '@/utils/auth'
  import { addBroker } from '@/api/broker/broker'

  export default {
    name: 'BrokerNew',
    data() {
      return {
        token: getToken(),
        editor: {
          name: null,
          mobile: null
        }
      }
    },
    created() {

    },
    methods: {
      handleAdd() {
        if (this.editor.name == null || this.editor.name == '') {
          this.$message({
            message: '名字不能为空',
            type: 'error',
            duration: 2000
          })
        } else if (this.editor.mobile == null || this.editor.mobile == '') {
          this.$message({
            message: '电话不能为空',
            type: 'error',
            duration: 2000
          })
        } else {
          this.submitAddBroker()
        }
      },
      submitAddBroker() {
        addBroker(this.token,this.editor.name,this.editor.mobile).then(() => {
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
