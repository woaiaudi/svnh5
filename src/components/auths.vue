<template>
	<div>
		<x-header style="background-color:#8B8AEE;">
			<span>SVN代码统计</span>
			<x-icon slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
		</x-header>
		<div class="vux-demo">
			<img class="logo" src="http://zt3000.com/images/index/logo.png">
			<h1> </h1>
		</div>

		<group title="开发人员列表">
			<search position="absolute" v-model="searchText" @on-submit="getAuthList" placeholder="模糊搜索"></search>
			<div v-for="(authItem,index) in authList">
				<cell :title="authItem.auth" @click.native="openAuthCommitHistory(authItem)" is-link></cell>
			</div>
		</group>
	</div>
</template>

<script>
	import { XHeader, TransferDom, Group, Cell, Search } from 'vux'

	export default {
		directives: {
			TransferDom
		},
		components: {
			XHeader,
			Group,
			Cell,
			Search
		},
		created: function() {
			this.getAuthList();
		},
		methods: {
			getAuthList: function() {
				this.BaseHttp("./auths", {
					searchText: this.searchText
				}, (response) => {
					this.authList = response;
				}, (errorMsg) => {
					console.log(errorMsg);
				});
			},
			openAuthCommitHistory: function(authObj) {

				let routerMap = {
					name: 'AuthCommitLog',
					params: {
						authId: authObj.id,
						authName: authObj.auth
					}
				}

				this.$router.push(routerMap);
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