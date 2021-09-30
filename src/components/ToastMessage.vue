<template>
    <div 
    class="toast-message"
    :class="{'toast-success': toastInfor.isSuccessToast, 
            'toast-erro': toastInfor.isErroToast,
            'toast-warning': toastInfor.isWarningToast}"
    >
        <div
        :class="{'toast-icon-success': toastInfor.isSuccessToast, 
                'toast-icon-erro': toastInfor.isErroToast,
                'toast-icon-warning': toastInfor.isWarningToast}"
         >
        </div>
        <div class="toast-message-description">
            {{toastInfor.description}}
        </div>
    </div>
</template>

<script>
export default {
    props:{ 
        toastInfor:{
            type: Object,
            require: true,
        }
    }
}
</script>

<style scoped>
    @import url('../assets/css/component/ToastMessage.css');
</style>