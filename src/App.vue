<template>
  <div id="material-kit">
    <div :class="{ 'nav-open': NavbarStore.showNavbar }">
      <router-view name="header" />
      <div>
        <router-view />
      </div>
      <router-view name="footer" />
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  mounted() {
    // 从 cookie 获取 token， 判断是否登陆成功
    const token = Cookies.get("CleanOcean-token");
    if (!token) {
      this.$router.replace("/login");
    }
  }
};
</script>
