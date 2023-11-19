<script>
import { ElMessage } from 'element-plus'
import md5 from 'md5'
import axios from 'axios'
// 导入数据请求的方法
import { loginFn } from '@/api/user'

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'LoginView',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    submitForm() {
      // console.log("被调用了",this.username,this.password);

      // if(this.username.length < 5){
      //   //长度不够
      //   ElMessage.error('管理员账号应大于5位');
      //   //让代码不再执行
      //   return
      // }
      // if(!/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/.test(this.password)) {
      //   ElMessage.error('密码必须包含：大写字母，小写字母，数字，特殊符号 `@#$%^&*`~()-+=` 中任意3项密码');
      //   return
      // };

      //md5是一个加密函数，可以将要加密的字符串传递进去，会返回一个加密好的字符串
      //console.log(md5('千峰123教育456前端'));

      //发送数据请求
      //直接请求没有问题，但是如果ip变了就很麻烦
      // axios.get('http://121.89.205.189:3000/api/pro/list')
      // .then(res=> {
      //   console.log(res);
      // })
      // .catch(err => {
      //   console.log(err);
      // })
      loginFn({
        username: this.username,
        password: this.password
      }).then(res => {
        if(res.code != '200') {
          //未注册
          ElMessage.error(res.msg)
          return
        } else {
          //第一种修改数据的方法
          //this.$store.commit('updateUserInfo', res.data);
          // 第二种修改数据的方法
          this.updateUserInfo(res.data);

          //将 token 存到本地
          localStorage.setItem('token', res.data.token);

          // this.$router 是我们的路由对象
          // .push 需要进入到哪个路由中
          this.$router.push('/')
          // console.log(this.$router);
        }
      })
    }
  }
}

</script>

<template>
  <div class="login-container">
    <div class="form-wrap">
      <h2 class="header">{{ count }}封神登录 {{ $store.state.count }}</h2>

      <el-input v-model="username" placeholder="请输入账号" />
      <el-input class="psw" show-password type="password" v-model="password" @keyup.enter="submitForm" placeholder="请输入密码" />
      <el-button type="success" @click="submitForm">登录</el-button>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  background-color: #dbe4ff;

  .form-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 360px;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 15px;
    padding: 32px 32px 20px;

    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .psw {
      margin-top: 10px;
    }
    .el-button {
      width: 100%;
      margin-top: 10px;
    } 
  }
}
</style>
