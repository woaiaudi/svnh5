<template>
  <div>
    <div>
      <x-header style="background-color:#8B8AEE;">
        <span>SVN代码统计</span>
        <x-icon slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      </x-header>
      <div class="vux-demo">
        <img class="logo" src="http://zt3000.com/images/index/logo.png">
        <h1></h1>
      </div>
      <div  style="margin-bottom: 44px">
        <div v-if="selIndex == 0">
          <auth-list></auth-list>
        </div>
        <div v-if="selIndex == 1">
          <project-list></project-list>
        </div>

      </div>

    </div>
    <tabbar style="position: fixed" v-model="selIndex">
      <tabbar-item>
        <img slot="icon" src="../assets/icon_auth_list.png">
        <span slot="label">人员列表</span>
      </tabbar-item>

      <tabbar-item>
        <img slot="icon" src="../assets/icon_proj_list.png">
        <span slot="label">项目列表</span>
      </tabbar-item>

    </tabbar>
  </div>
</template>

<script>
  import {XHeader, TransferDom, Tabbar, TabbarItem,Group, Cell } from 'vux'
  import AuthList from './auths.vue'
  import ProjectList from './projects.vue'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Tabbar,
      TabbarItem,
      Group,
      Cell,
      AuthList,
      ProjectList
    },
    data () {
      return {
        selIndex:0,
        msg: 'Hello World!'
      }
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
</style>
