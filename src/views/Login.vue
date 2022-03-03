<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-medium-size-40 md-small-size-50 md-xsmall-size-70 mx-auto text-center"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Login</h4>
              <md-field class="md-form-group" slot="inputs">
                <label>账号</label>
                <md-input v-model="username"></md-input>
              </md-field>

              <md-field class="md-form-group" slot="inputs">
                <label>密码</label>
                <md-input v-model="password"></md-input>
              </md-field>
              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click="handleLogin()"
              >
                登入
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import Cookies from "js-cookie";

export default {
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      username: null,
      password: null
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg")
    }
  },
  methods: {
    async reqLoginAPI(params) {
      const res = await this.$http.post("/v1/user/login", params);
      const { token } = res;
      return {
        token
      };
    },
    async handleLogin() {
      // 请求登陆接口，返回 token 存到 cookie，过期时间临时设置 1h
      const millisecond = new Date().getTime();
      const expiresTime = new Date(millisecond + 60 * 1000 * 60);
      // 请求接口
      // const { token } = await this.reqLoginAPI({
      //   username: this.username,
      //   password: this.password
      // });
      const token = "12";
      if (token) {
        Cookies.set("cleanOcean_token", token, { expires: expiresTime });
        this.$router.push("/home");
      }
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
};
</script>

<style lang="css"></style>
