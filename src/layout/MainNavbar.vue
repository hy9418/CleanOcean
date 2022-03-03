<template>
  <md-toolbar
    id="toolbar"
    md-elevation="0"
    class="md-transparent md-absolute"
    :class="extraNavClasses"
    :color-on-scroll="colorOnScroll"
  >
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">净塑自然</h3>
      </div>
      <div class="md-toolbar-section-end">
        <div class="md-collapse" v-if="isShowRightBtns">
          <md-button class="md-raised md-primary" @click="showDialog = true"
            >发布</md-button
          >
        </div>
      </div>
    </div>
    <md-dialog style="width: 700px;" :md-active.sync="showDialog">
      <div class="body text-center">
        <form novalidate @submit.prevent="validate">
          <md-card class="md-layout-item md-size-50 md-small-size-200">
            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-200">
                  <md-field :class="getValidationClass('name')">
                    <label for="first-name">活动主题</label>
                    <md-input
                      name="name"
                      id="name"
                      v-model="form.name"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.name.required"
                      >请输入</span
                    >
                    <span class="md-error" v-else-if="!$v.form.name.minlength"
                      >长度不合法</span
                    >
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-200">
                  <md-field :class="getValidationClass('description')">
                    <label for="description">详情介绍</label>
                    <md-input
                      name="description"
                      id="descriptione"
                      v-model="form.description"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.description.required"
                      >请输入</span
                    >
                    <span
                      class="md-error"
                      v-else-if="!$v.form.description.minlength"
                      >长度不合法</span
                    >
                  </md-field>
                </div>
              </div>

              <div class="md-layout-item md-small-size-200">
                <md-field :class="getValidationClass('method')">
                  <label for="method">参与方式</label>
                  <md-input
                    id="method"
                    name="method"
                    v-model="form.method"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.method.required"
                    >请输入</span
                  >
                  <span class="md-error" v-else-if="!$v.form.method.maxlength"
                    >长度不合法</span
                  >
                </md-field>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>

      <div class="footer">
        <md-button class="md-raised" @click="showDialog = false"
          >关闭</md-button
        >
        <md-button class="md-raised md-primary" @click="sure()">确认</md-button>
      </div>
    </md-dialog>
  </md-toolbar>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

// {
// "id":1,
// "name":"活动名称",
// "filePath":"图片地址",
// isDeleted:0,
// "description":"活动描述",
// "status":"UNDERWAY", //进行中UNDERWAY，已完成COMPLETED
// "taskTime":"yyyy-MM-dd HH:mm:ss", //活动开始时间
// "taskScore":222 //活动积分
// }

export default {
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info"
        ].includes(value);
      }
    },
    colorOnScroll: {
      type: Number,
      default: 0
    }
  },
  mixins: [validationMixin],
  data() {
    return {
      extraNavClasses: "",
      toggledClass: false,
      showDialog: false,
      form: {
        name: "",
        description: "",
        method: ""
      },
      sending: false
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      description: {
        required,
        minLength: minLength(3)
      },
      method: {
        required,
        maxLength: maxLength(3)
      }
    }
  },
  computed: {
    showDownload() {
      const excludedRoutes = ["login", "landing", "profile"];
      return excludedRoutes.every(r => r !== this.$route.name);
    },
    isShowRightBtns() {
      const path = this.$route.path;
      return path === "/home";
    }
  },
  methods: {
    sure() {
      this.save();
    },
    async reqSubmitAPI(params) {
      const res = await this.$http.post("/v1/article/content", params);
      const { success } = res;
      return {
        success
      };
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.name = null;
      this.form.description = null;
      this.form.method = null;
    },
    async save() {
      this.sending = true;
      // 请求接口
      const { success } = await this.reqSubmitAPI(this.form);
      if (success) {
        this.clearForm();
        this.sending = false;
        this.showDialog = false;
        this.$emit("on-publish", true);
      }
    },
    validate() {
      this.$v.$touch();

      // if (!this.$v.$invalid) {
      //   this.save();
      // }
    },
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      let navbarColor = document.getElementById("toolbar");
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove("md-transparent");
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = "";
          navbarColor.classList.add("md-transparent");
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    },
    scrollToElement() {
      let element_id = document.getElementById("downloadSection");
      if (element_id) {
        element_id.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    }
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  }
};
</script>

<style scoped>
.body {
  width: 100%;
}
.footer {
  display: block;
  width: 100%;
  text-align: center;
}
</style>
