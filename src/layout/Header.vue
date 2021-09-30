<template>
    <div class="header">
        <div class="header-logo-container">
            <div class="toggle">
                <div class="toggle-img">
                </div>
            </div>
            <div class="logo">
            </div>
            <div class="logo-text">
                Chấm công
            </div>
        </div>
        <div class="header-option">
            <div class="header-option-item">
                Tổng quan
            </div>
            <div class="header-option-item">
                Chấm công
                <div class="dropdown-icon">
                    <div class="dropdown-img"></div>
                </div>
            </div>
            <div style="font-family: Roboto-Bold;" class="header-option-item">
                <div class="option-item-active">
                    Ca làm việc
                    <div class="border-active"></div>
                </div>
                <div class="dropdown-icon">
                    <div class="dropdown-img"></div>
                </div>
            </div>
            <div class="header-option-item">
                Quản lý đơn
                <div class="dropdown-icon">
                    <div class="dropdown-img"></div>
                </div>
            </div>
            <div class="header-option-item">
                Báo cáo
            </div>
            <div class="header-option-item">
                Thiết lập
            </div>
        </div>
        <div class="account-area">
            <div
             class="icon-24">
                <div
                @mouseenter="toggleDefault"
                @mouseleave="toggleDefault"
                id="notification-icon"
                 class="notification-icon"></div>
            </div>
            <DxTooltip
                    :height="40"
                    :visible="defaultVisible"
                    :close-on-outside-click="false"
                    target="#notification-icon"
            >
                   Thông báo
            </DxTooltip>
            <div class="icon-24">
                <div
                 @mouseenter="toggleDefault1"
                @mouseleave="toggleDefault1"
                id="help-icon"
                 class="help-icon"></div>
            </div>
            <DxTooltip
                    :height="40"
                    :visible="defaultVisible1"
                    :close-on-outside-click="false"
                    target="#help-icon"
            >
                   Trợ giúp
            </DxTooltip>
            <div style="width: 52px" class="icon-24">
                <div
                 @mouseenter="toggleDefault2"
                @mouseleave="toggleDefault2"
                id="more-function"
                 class="more-function"></div>
            </div>
             <DxTooltip
                    :height="40"
                    :visible="defaultVisible2"
                    :close-on-outside-click="false"
                    target="#more-function"
            >
                   Tính năng khác
            </DxTooltip>
            <div class="account-avatar">
                HN
            </div>
        </div>
    </div>
</template>
 <script>
import DxTooltip from "devextreme-vue/tooltip"

 export default {
     components:{
         DxTooltip,
     },

    methods:{
        toggleDefault(){
            this.defaultVisible = !this.defaultVisible;
        },
         toggleDefault1(){
            this.defaultVisible1 = !this.defaultVisible1;
        },
        toggleDefault2(){
            this.defaultVisible2 = !this.defaultVisible2;
        },
    },

     data(){
         return{
             defaultVisible: false,
             defaultVisible1: false,
             defaultVisible2: false,
         }
     }
 }
 </script>

<style scoped>
    @import url('../assets/css/layout/Header.css');
</style>