<template>
    <div class="popup">
        <div class="popup-content">
            <div style="display: flex; align-items: center; padding-right: 24px">
                <div class="popup-title">
                    Cảnh báo
                </div>
                <div 
                @click="onCancelDeleteClick"
                class="close-btn">
                    <div class="close-btn-img"></div>
                </div>
            </div>
            <div class="popup-description">
                {{this.deleteDesciption}} 
            </div>
            <div class="popup-buttons">
                <BaseButton
                @click.native="onCancelDeleteClick"
                style="margin-right: 8px"
                :buttonInfor="buttonCancelInfo"/>
                <BaseButton
                @click.native="onConfirmDeleteClick"
                :buttonInfor="buttonDeleteInfo"/>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from "../components/BaseButton.vue"
export default {
    props:{
        deleteDesciption: {
            type: String,
            require: true,
        }
    },

    components:{
        BaseButton,
    },

    methods:{
        onCancelDeleteClick(){
            this.$emit('onCancelDeleteClick');
        },
        onConfirmDeleteClick(){
            this.$emit('onConfirmDeleteClick');
        },
    },

    data(){
        return{
            buttonDeleteInfo: {
                isDeleteButton: true,
                text: 'Xóa',
            },
            buttonCancelInfo: {
                isSecondaryButton: true,
                text: 'Hủy'
            }
        }
    }
}
</script>

<style scoped>
@import url('../assets/css/component/Popup.css');
</style>