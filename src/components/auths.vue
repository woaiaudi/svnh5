<template>
  <div>
    <group>
      <cell title="开发人员列表"></cell>
      <search position="absolute" v-model="searchText" @on-submit="getAuthList" @on-change="debounce(onSearchTextChange, 500)" placeholder="模糊搜索"></search>
      <swipeout>
        <div v-for="(authItem,index) in authList" class="vux-1px-t">
          <swipeout-item transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="onDeleteAuthClicked(authItem)" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="vux-1px-t">
              <cell :title="authItem.auth" :value="authItem.mark" @click.native="openAuthCommitHistory(authItem)" is-link></cell>
            </div>
          </swipeout-item>

        </div>
      </swipeout>
    </group>

  </div>
</template>

<script>
  import {XHeader, TransferDom, Group, Cell, Search, Swipeout, SwipeoutItem, SwipeoutButton,debounce} from 'vux'

  export default {
    name: 'authList',
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Group,
      Cell,
      Search,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    mounted: function () {
      this.getAuthList();
    },
    methods: {
      onSearchTextChange:function(str){
        console.log("search : "+ this.searchText)


      },
      getAuthList: function () {
        this.BaseHttp("./code/auths", {
          searchText: this.searchText
        }, (response) => {
          this.authList = response;
        }, (errorMsg) => {
          this.showAlert(errorMsg);
        });
      },
      openAuthCommitHistory: function (authObj) {

        let routerMap = {
          name: 'AuthCommitLog',
          params: {
            authObj: authObj
          }
        }

        this.$router.push(routerMap);
      },
      showAddAuth: function () {
        const _this = this
        this.$vux.confirm.prompt('请输入svn账户', {
          title: '添加开发人员',
          onConfirm (msg) {

            if (_this.$ISJS.not.existy(msg) || _this.$ISJS.empty(msg)) {
              _this.showAlert("请输入用户账号");
              return;
            }

            _this.BaseHttp("./addAuth", {
              authName: msg
            }, (response) => {
              //添加成功后 重新请求列表
              _this.getAuthList();
            }, (errorMsg) => {
              this.showAlert(errorMsg);
            });
          }
        })
      },
      onDeleteAuthClicked: function (authObj) {
        this.showConfirm("确定要删除吗？",
          ()=> {
            console.log("del " + authObj.auth);
            this.BaseHttp("./delAuth", {
              authId: authObj.id
            }, (response) => {
              //删除成功后 重新请求列表
              this.getAuthList();
            }, (errorMsg) => {
              this.showAlert(errorMsg);
            });
          })
      }
    },
    data() {
      return {
        searchText: "",
        authList: []
      }
    }
  }
</script>

<style>
  .vux-demo {
    text-align: center;
    padding: 20px;
  }

  .logo {
    width: 100%;
    height: auto;
  }
</style>
