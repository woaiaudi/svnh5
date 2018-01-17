<template>
  <div>

    <group>

      <cell title="更改列表" value="刷新数据" @click.native="refreshChangePaths"></cell>

      <div v-for="(pathItem,index) in changePathList">
        <x-textarea :title="pathItem.type" :value="pathItem.path" readonly autosize></x-textarea>
      </div>

    </group>


  </div>
</template>

<script>
  import {
    TransferDom,
    Group,
    Cell,
    XTextarea
  } from 'vux'


  export default {
    directives: {
      TransferDom
    },
    components: {
      Group,
      Cell,
      XTextarea
    },
    props: {
      logbean: {
        type: Object,
        default: {}
      }
    },
    watch: {
      logbean: function (bean) {
        if (this.$ISJS.empty(this.logbean)
          || this.$ISJS.not.existy(this.logbean.id)) {

          return;
        }
        this.getChangePaths();
      }
    },
    methods: {
      getChangePaths: function () {
        if (this.$ISJS.empty(this.logbean)
        || this.$ISJS.not.existy(this.logbean.id)) {
          this.showAlert("没有执行 logbean prop");
          return;
        }
        this.BaseHttp("./changepaths/query", {
          revisionId: this.logbean.revision_id
        }, (response) => {
          this.changePathList = response;
        }, (errorMsg) => {
          this.showAlert(errorMsg);
        });
      },
      refreshChangePaths: function () {
        if (this.$ISJS.empty(this.logbean)
          || this.$ISJS.not.existy(this.logbean.id)) {
          this.showAlert("没有执行 logbean prop");
          return;
        }
        this.showConfirm("确定要刷新吗？",
          ()=> {
            this.BaseHttp("./changepaths/refresh", {
              revisionId: this.logbean.revision_id
            }, (response) => {
              this.showAlert("成功");
              this.getChangePaths();
            }, (errorMsg) => {
              this.showAlert(errorMsg);
            });
          })



      }
    },
    data() {
      return {
        commitLogObj: {},
        changePathList: []
      }
    }
  }
</script>

<style>
</style>
