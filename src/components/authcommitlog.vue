<template>
  <div>
    <x-header style="background-color:#8B8AEE;">{{authObj.mark}}的记录</x-header>
    <group title="时间范围">
      <calendar v-model="startDate" title="开始日期" disable-futureplaceholder="请选择日期"></calendar>
      <calendar v-model="endDate" title="结束日期" disable-future placeholder="请选择日期"></calendar>
    </group>
    <div class="padding20px">
      <x-button :gradients="['#19D5FD','#1D62F0']" @click.native="getCommitLogs()" :disabled="isLoadingHttp"
                :show-loading="isLoadingHttp">查询
      </x-button>
      <span>总计代码行数：</span>
      <countup :start-val="0" :end-val="allCodeLines" :duration="1" class="code-lines-number"
               v-if="allCodeLines > 0"></countup>
    </div>

    <Divider>提交记录</Divider>

    <div>
      <div v-for="(logItem,index) in commitLogList">
        <form-preview :header-label="'V'+logItem.revision_id" :header-value="logItem.code_lines+'行'"
                      :body-items="getFormListData(logItem)" @click.native="onItemClicked(logItem)"></form-preview>
      </div>
    </div>

    <div v-transfer-dom>
      <popup v-model="isShowItemPopup">
        <div class="popup0">
          <div>{{clickedItemDetail.commit_log}}</div>
          <x-button mini :gradients="['#19D5FD','#1D62F0']" @click.native="onCloseItemPopup()">关闭</x-button>
        </div>
      </popup>
    </div>

  </div>
</template>

<script>
  import {
    XHeader,
    TransferDom,
    Group,
    Cell,
    XButton,
    Flexbox,
    FlexboxItem,
    Divider,
    Calendar,
    Badge,
    Popup,
    Countup,
    FormPreview
  } from 'vux'
  import {format, subDays} from 'date-fns'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Group,
      Cell,
      XButton,
      Flexbox,
      FlexboxItem,
      Divider,
      Calendar,
      Badge,
      Popup,
      Countup,
      FormPreview
    },
    created: function () {
      if (this.$ISJS.existy(this.$route.params.authObj)) {
        this.authObj = this.$route.params.authObj;
      } else {
        this.authObj = {
          id: 0,
          auth: "",
          mark: ""
        }
      }


      this.startDate = this.aWeekAgoFEnd;
    },
    mounted: function () {
    },
    computed: {
      //计算属性的 getter   结束时间的 一周前日期
      aWeekAgoFEnd: function () {
        var tmpdate = format(this.endDate, 'YYYY-MM-DD');
        var weekAgoDay = subDays(tmpdate, 7);
        var weekAgoDayStr = format(weekAgoDay, 'YYYY-MM-DD');

        return weekAgoDayStr;
      },
      allCodeLines: function () {
        //总计代码行数
        var lines = 0;
        for (var index in this.commitLogList) {
          lines += (this.commitLogList[index].code_lines);
        }
        return lines;
      }
    },
    methods: {
      getCommitLogs: function () {
        if (this.$ISJS.not.existy(this.authObj.id)
          || this.$ISJS.empty(this.authObj.id)
          || this.authObj.id < 1) {
          this.showConfirm("没有指定 开发人员,请返回选择", () => {
            this.$router.push("/auths");
          });

          return;
        }
        this.isLoadingHttp = true;
        this.BaseHttp("./commitLogs", {
          startDate: this.startDate,
          endDate: this.endDate,
          auth: this.authObj.auth
        }, (response) => {
          this.isLoadingHttp = false;
          this.commitLogList = response;
        }, (errorMsg) => {
          this.isLoadingHttp = false;
          this.showAlert(errorMsg);
        });

      },
      getFormListData: function (itemObj) {
        var retList = [];

        retList.push({
          label: '提交日期',
          value: itemObj.commit_time
        });

        retList.push({
          label: '日志',
          value: itemObj.commit_log
        });

        return retList;

      },
      onItemClicked: function (item) {
        this.clickedItemDetail = item;
        this.isShowItemPopup = true;
      },
      onCloseItemPopup: function () {
        this.clickedItemDetail = {};
        this.isShowItemPopup = false;
      }
    },
    data() {
      return {
        isLoadingHttp: false,
        authObj: {},
        startDate: "",
        endDate: format(new Date(), 'YYYY-MM-DD'), //不能用 TODAY
        commitLogList: [],
        clickedItemDetail: {},
        isShowItemPopup: false
      }
    }
  }
</script>

<style>
  .padding20px {
    padding: 20px;
  }

  .vux-demo {
    text-align: center;
    padding: 20px;
  }

  .logo {
    width: 100%;
    height: auto;
  }

  .popup0 {
    padding-bottom: 15px;
    height: 200px;
  }

  .code-lines-number {
    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
    font-size: 2em;
    color: #04BE02;
  }
</style>
