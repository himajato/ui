<template>
    <div 
    class="base-button"
    :class="{'primary-button': buttonInfor.isPrimaryButton , 
                'secondary-button': buttonInfor.isSecondaryButton,
                'delete-button': buttonInfor.isDeleteButton}">
        <div 
        v-show="buttonInfor.isHaveIcon"
        class="button-icon">
            <div :class="buttonInfor.buttonImg">
            </div>
        </div>
        {{buttonInfor.text}}
    </div>
</template>

<script>
export default {
    props:{
        buttonInfor:{
            type: Object,
            require: true,
        }
    },
}
</script>

<style>
@import url('../assets/css/component/BaseButton.css');
</style>