<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form" auto-complete="on" label-position="left">
      <!-- 帝可得图片 -->
      <div class="header-img">
        <img src="@/assets/common/logo.png" alt="">
      </div>
      <!-- 用户名 -->
      <el-form-item prop="loginName">
        <span class="svg-container el-icon-mobile-phone" />
        <el-input
          ref="loginName"
          v-model="loginForm.loginName"
          type="text"
          placeholder="请输入账号"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container el-icon-lock" />
        <el-input
          ref="pwd"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          tabindex="2"
          auto-complete="on"
        />
        <span class="svg-cntainer" @click="showPwd">
          <svg-icon :icon-class="passwordType==='password'? 'eye':'eye-open'" />
        </span>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="code">
        <el-row justify="space-between">
          <el-col :span="17">
            <i class="svg-container el-icon-setting " />
            <el-input ref="code" v-model="loginForm.code" placeholder="请输入验证码" />
          </el-col>
          <el-col :span="7" style="height:50px">
            <div @click="imageCode">
              <img :src="codeUrl" alt="" style="width:130px;height:50px;border: 1px solid #82A181;">
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button type="primary" :loading="loading" @click="login">登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { imageCodeAPI } from '@/api/public'
export default {
  name: 'Login',
  data() {
    const phoneValid = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('格式不正确'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        clientToken: '',
        loginType: 0
      },
      passwordType: 'password',
      rules: {
        loginName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: phoneValid, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 16, message: '密码格式不对', trigger: 'blur' }
        ],
        code: [{ required: true, trigger: 'blur', message: '验证码格式有误' }]
      },
      loading: false,
      codeUrl: ''
    }
  },
  watch: {

  },
  created() {
    this.imageCode()
    this.login()
  },
  methods: {
    showPwd() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    async imageCode() {
      const clientToken = Math.random().toString()
      this.loginForm.clientToken = clientToken
      const res = await imageCodeAPI(clientToken)
      this.codeUrl = res.config.url
      console.log(res)
    },
    async login() {
      // const { data } = await loginAPI(this.loginForm)
      // console.log(data)
      try {
        // await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/LOGIN_ACTION', this.loginForm)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#A4A0B1;
$cursor: #A4A0B1;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #C0C4CC !important;
      }
    }
  }
  .el-form-item__error {
    color: red
  }

  .el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
  border: 1px solid #e9e9e9;
  background: #fff;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url('~@/assets/common/background.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .el-button--primary{
  border-radius: 8px;
  height: 52px;
  text-shadow: 0 7px 22px #cfcfcf;
  font-size: 14px;
  font-weight: 700;
  width: 100%;
  background-color: #5970ea;
}

  .login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    background-color: red;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0px;
    background: rgb(255, 255, 255);
    box-shadow: rgb(30 111 72 / 35%) 0px 3px 70px 0px;
    border-radius: 10px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .header-img img{
    position: absolute;
    width: 96px;
    height: 96px;
    top: -46px;
    left: 50%;
    margin-left: -48px;
  }

}

</style>
