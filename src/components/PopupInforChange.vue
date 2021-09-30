<template>
    <div class="popup">
        <div class="popup-content">
            <div style="display: flex; align-items: center; padding-right: 24px">
                <div class="popup-title">
                    Thông báo
                </div>
                <div
                @click="closePopup" 
                class="close-btn">
                    <div class="close-btn-img"></div>
                </div>
            </div>
            <div class="popup-description">
               Thông tin đã được thay đổi, bạn có muốn lưu lại không? 
            </div>
            <div class="popup-buttons">
                <BaseButton
                @click.native="closePopup"
                :buttonInfor="buttonCancelInfo"/>
                <BaseButton
                @click.native="forceClosePopup"
                style="margin-right: 8px; margin-left: 8px"
                :buttonInfor="buttonNotSaveInfo"/>
                <BaseButton
                @click.native="saveChangeInfor"
                :buttonInfor="buttonSaveInfo"/>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from "../components/BaseButton.vue"
export default {
    components:{
        BaseButton,
    },

    methods:{
        closePopup(){
            this.$emit('closePopup');
        },
        
        forceClosePopup(){
            this.$emit('forceClosePopup');
        },

        saveChangeInfor(){
            this.$emit('saveChangeInfor');
        }
    },

    data(){
        return{
            buttonSaveInfo: {
                isPrimaryButton: true,
                text: 'Lưu',
            },
            buttonNotSaveInfo: {
                isSecondaryButton: true,
                text: 'Không lưu'
            },
            buttonCancelInfo: {
                isSecondaryButton: true,
                text: 'Hủy'
            }
        }   
    }
}
</script>