<template>
  <div class="wrapper">
    <div id="nav-tabs">
      <h3>活动广场</h3>
      <div>
        <carousel
          :per-page="perPage"
          loop
          :speed="700"
          :autoplay="true"
          :autoplay-timeout="5000"
          :minSwipeDistance="40"
          :mouse-drag="false"
          :paginationSize="1"
          navigationEnabled
          navigationNextLabel="<i class='material-icons'>》</i>"
          navigationPrevLabel="<i class='material-icons'>《</i>"
          @page-change="onPageChange"
        >
          <slide v-for="(item, index) in initList" :key="index">
            <div class="md-layout-item md-size-150 md-small-size-100">
              <h3>
                <small>{{ item.name }}</small>
              </h3>
              <nav-tabs-card no-label>
                <template slot="content">
                  <md-tabs class="md-primary" md-alignment="left">
                    <md-tab id="tab-home" :md-label="item.name">
                      <p>
                        {{ item.name }}
                      </p>
                    </md-tab>

                    <md-tab id="tab-pages" md-label="详情介绍">
                      <p>
                        {{ item.description }}
                      </p>
                    </md-tab>

                    <md-tab id="tab-posts" md-label="参与方式">
                      <p>
                        {{ item.method }}
                      </p>
                    </md-tab>
                  </md-tabs>
                </template>
              </nav-tabs-card>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { NavTabsCard } from "@/components";
import bus from "@/utils/bus";

export default {
  components: {
    NavTabsCard
  },
  data() {
    return {
      initList: [
        {
          id: 1,
          name: "活动名称1",
          filePath: "图片地址",
          isDeleted: 0,
          description: "活动描述",
          method: "参与方式",
          status: "UNDERWAY", //进行中UNDERWAY，已完成COMPLETED
          taskTime: "yyyy-MM-dd HH:mm:ss", //活动开始时间
          taskScore: 222 //活动积分
        },
        {
          id: 2,
          name: "活动名称2",
          filePath: "图片地址",
          isDeleted: 0,
          description: "活动描述",
          method: "参与方式",
          status: "UNDERWAY", //进行中UNDERWAY，已完成COMPLETED
          taskTime: "yyyy-MM-dd HH:mm:ss", //活动开始时间
          taskScore: 222 //活动积分
        },
        {
          id: 3,
          name: "活动名称3",
          filePath: "图片地址",
          isDeleted: 0,
          description: "活动描述",
          method: "参与方式",
          status: "UNDERWAY", //进行中UNDERWAY，已完成COMPLETED
          taskTime: "yyyy-MM-dd HH:mm:ss", //活动开始时间
          taskScore: 222 //活动积分
        },
        {
          id: 4,
          name: "活动名称4",
          filePath: "图片地址",
          isDeleted: 0,
          description: "活动描述",
          method: "参与方式",
          status: "UNDERWAY", //进行中UNDERWAY，已完成COMPLETED
          taskTime: "yyyy-MM-dd HH:mm:ss", //活动开始时间
          taskScore: 222 //活动积分
        },
        {
          id: 5,
          name: "活动名称5",
          filePath: "图片地址",
          isDeleted: 0,
          description: "活动描述",
          method: "参与方式",
          status: "UNDERWAY", //进行中UNDERWAY，已完成COMPLETED
          taskTime: "yyyy-MM-dd HH:mm:ss", //活动开始时间
          taskScore: 222 //活动积分
        }
      ],
      perPage: 2
    };
  },
  async mounted() {
    bus.$on("on-publish-success", async value => {
      if (value) {
        // 发布成功后请求列表数据
        const { data = [] } = await this.reqContentListAPI({});
        this.initList = data;
      }
    });
    // 初始化请求列表数据
    const { data = [] } = await this.reqContentListAPI({});
    if (data) {
      this.initList = data;
    }
  },
  methods: {
    async reqContentListAPI(params) {
      const res = await this.$http.get("/v1/article/list", params);
      const { data } = res;
      return {
        data
      };
    },
    onPageChange(index) {}
  }
};
</script>

<style lang="css"></style>
