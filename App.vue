<script>
	import {
		getWs,
		getUrl
	} from "./JS/ApiConf.js"
	const vision = "1.0.0"
	export default {
		onLaunch: function() {
			uni.getStorage({
				key:"userData",
				success:res=>{
					uni.request({
						url:getUrl()+"/api/PublicApi/inner",
						method:"POST",
						header:{
							Authorization:res.data.token
						},
						fail() {
							uni.removeStorageSync("userData")
						}
					})
				}
			})
			
			var Socket = uni.connectSocket({
				url:getWs()+"/api/UserApi/connect",
				success: () => {
					console.log("服务器正在连接")
				}
			})
			Socket.onOpen(()=>{
				Socket.send({
					data:"1",
					success: () => {
						console.log("服务器连接成功")
					}
				})
			})
			Socket.onMessage(()=>{
				Socket.send({
					data:"1"
				})
			})
		},
		onShow: function() {

		},
		onHide: function() {

		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	.content{
		padding: 10rpx;
	}
	.select_list{
		padding: 10rpx;
		padding-top: 0;
		display: flex;
		font-weight: bold;
		font-size: 15px;
		border-bottom: 1px solid #eee;
		.select{
			position: relative;
			padding: 15rpx;
			margin: 15rpx;
			.line{
				bottom: 0px;
				left: 50%;
				position: absolute;
				transition: all 0.5s;
				border-bottom: 3.5px solid black;
				width: 0px;
			};
			.sled{
				left: 0;
				width: 100%;
			}
		}
	}
	.page_list{
		display: flex;
		margin: 5.5px;
		padding-bottom: 10px;
		border-bottom: 1px solid lightgray;
		position: relative;
		align-items: center;
		image{
			width: 150rpx;
			height: 120rpx;
			margin-right: 10px;
		};
		view{
			display: flex;
			flex-direction: column;
		};
		.page_title{
			font-weight: bold;
			font-size: 16.5px;
			width: 300rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		};
		.page_content{
			margin-top: 10px;
			text-indent: 1em;
			font-size: 14px;
			width: 500rpx;
			height: 20px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		};
		.page_data{
			color:#aaa;
			font-size: 12px;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			view{
				width: 50px;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				margin: 0 10px;
				margin-top: 5px;
			};
			.page_time{
				width: 100px;
				justify-content: flex-end;
				position: absolute;
				right: 0px;
				top: -2.5px;
			};
			.icon_small{
				width: 15px;
				height: 15px;
			}
		}
	}
	.list{
		swiper-item{
			height: auto;
		};
		height: 1000px;
	}
	
	.page_tag {
		display: flex;
		margin: 0 10px;
		flex-flow: row wrap;
		align-items: center;
	
		view {
			margin: 5px;
			padding: 5px 10px;
			font-size: 12px;
			font-weight: bold;
			color: #555;
			border-radius: 20px;
			background-color: #eee;
		};
		text {
			font-size: 14px;
			font-weight: bold;
		}
	}
	.stuBar{
		height: var(--status-bar-height);
		width: 100%;
		background-color: #333;
	}
	.stuBar_{
		position: fixed;
		top: 0;
		z-index: 10;
		height: var(--status-bar-height);
		width: 100%;
		background-color: #000;
	}
</style>
