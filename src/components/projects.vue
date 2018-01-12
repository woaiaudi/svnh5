<template>
  <div>

    <group>
      <cell title="项目列表" value="添加" @click.native="showAddproject"></cell>
      <search position="absolute" v-model="searchText" @on-submit="getProjectList" placeholder="模糊搜索"></search>
      <swipeout>
        <div v-for="(projectItem,index) in projectList" class="vux-1px-t">
          <swipeout-item transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="onDeleteprojectClicked(projectItem)" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="vux-1px-t">
              <cell :title="projectItem.name" @click.native="editProject(projectItem)" is-link></cell>
            </div>
          </swipeout-item>

        </div>
      </swipeout>
    </group>


    <div v-transfer-dom>
      <popup :value="isShowPopup" @on-hide="onCloseItemPopup">
        <div class="popup0">
          <group title="编辑项目">
            <x-input title="项目名称" v-model="editItemObj.name" placeholder="请输入(最多20字符)" :show-clear="true" :min="2"
                     :max="20"></x-input>

            <x-textarea title="项目路径" placeholder="请输入SVN路径" :show-counter="false" :rows="1" :max="200"
                        :height="200" v-model="editItemObj.path"></x-textarea>

            <flexbox>
              <flexbox-item style="padding: 15px">
                <x-button plain type="primary" style="border-radius:99px;" @click.native="onCloseItemPopup()">关闭
                </x-button>
              </flexbox-item>
              <flexbox-item style="padding: 15px">
                <x-button :gradients="['#19D5FD','#1D62F0']" style="border-radius:99px;"
                          @click.native="onSavePopup()">保存
                </x-button>
              </flexbox-item>
            </flexbox>

          </group>

        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import {
    XHeader,
    TransferDom,
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    Search,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Popup,
    XButton,
    XInput,
    XTextarea
  } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Flexbox,
      FlexboxItem,
      Group,
      Cell,
      Search,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Popup,
      XButton,
      XInput,
      XTextarea
    },
    mounted: function () {
      this.getProjectList();
    },
    computed: {
      isShowPopup: function () {
        var isShow = false;

        if (this.$ISJS.existy(this.editItemObj)) {
          if (this.$ISJS.existy(this.editItemObj.id)) {
            if (this.editItemObj.id == -1
              || this.editItemObj.id > 0) {
              isShow = true;
            }
          }
        }

        return isShow;
      }
    },
    methods: {
      getProjectList: function () {
        this.BaseHttp("./projects", {
          searchText: this.searchText
        }, (response) => {
          this.projectList = response;
        }, (errorMsg) => {
          this.showAlert(errorMsg);
        });
      },
      editProject: function (projectObj) {
        //编辑
        this.editItemObj = projectObj;
      },
      showAddproject: function () {
        //添加
        this.editItemObj = {
          id: -1
        };
      },
      onDeleteprojectClicked: function (projectObj) {
        this.showConfirm("确定要删除吗？",
          ()=> {
            this.BaseHttp("./delproject", {
              projectId: projectObj.id
            }, (response) => {
              //删除成功后 重新请求列表
              this.getProjectList();
            }, (errorMsg) => {
              this.showAlert(errorMsg);
            });
          })
      }, onCloseItemPopup: function () {
        this.editItemObj = {}
      }, onSavePopup: function () {
        //检验
        if (this.$ISJS.not.existy(this.editItemObj.name) || this.$ISJS.empty(this.editItemObj.name)) {
          this.showAlert("没有指定项目名称");
          return
        }
        if (this.$ISJS.not.existy(this.editItemObj.path) || this.$ISJS.empty(this.editItemObj.path)) {
          this.showAlert("没有指定项目SVN路径");
          return
        }


        var urlxxx = ''
        if (this.editItemObj.id == -1) {
          //是 添加功能
          urlxxx = './addProject'
        } else if (this.editItemObj.id > 0) {
          //是编辑功能
          urlxxx = './editProject'
        }


        this.showConfirm("确定执行该操作吗？",()=>{
          this.BaseHttp(urlxxx, this.editItemObj,
            (response) => {
              //添加 或 修改成功后，关闭弹窗
              this.onCloseItemPopup();
              //刷新列表
              this.getProjectList();
              this.showAlert("操作成功");
            }, (errorMsg) => {
              this.showAlert(errorMsg);
            });
        });



      }
    },
    data() {
      return {
        searchText: "",
        projectList: [],
        editItemObj: {}
      }
    }
  }
</script>

<style>
  .popup0 {
    padding-bottom: 5px;
  }
</style>
