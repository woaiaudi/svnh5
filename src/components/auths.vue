<template>
  <div>
    <x-header style="background-color:#8B8AEE;">
      <span>SVN代码统计</span>
      <x-icon slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"
              @click.native="showAddAuth"></x-icon>
    </x-header>
    <div class="vux-demo">
      <img class="logo" src="http://zt3000.com/images/index/logo.png">
      <h1></h1>
    </div>

    <group title="开发人员列表">
      <search position="absolute" v-model="searchText" @on-submit="getAuthList" placeholder="模糊搜索"></search>
      <swipeout>
        <div v-for="(authItem,index) in authList" class="vux-1px-t">
          <swipeout-item transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="onDeleteAuthClicked(authItem)" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="vux-1px-t">
              <cell :title="authItem.auth" @click.native="openAuthCommitHistory(authItem)" is-link></cell>
            </div>
          </swipeout-item>

        </div>
      </swipeout>
    </group>

  </div>
</template>

<script>
  import {XHeader, TransferDom, Group, Cell, Search, Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'

  export default {
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
    created: function () {
      this.getAuthList();
    },
    methods: {
      getAuthList: function () {
        this.BaseHttp("./auths", {
          searchText: this.searchText
        }, (response) => {
          this.authList = response;
        }, (errorMsg) => {
          console.log(errorMsg);
        });
      },
      openAuthCommitHistory: function (authObj) {

        let routerMap = {
          name: 'AuthCommitLog',
          params: {
            authId: authObj.id,
            authName: authObj.auth
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
              console.log(errorMsg);
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
              _this.getAuthList();
            }, (errorMsg) => {
              console.log(errorMsg);
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
