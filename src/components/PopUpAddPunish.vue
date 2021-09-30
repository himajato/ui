<template>
    <div class="popup">
        <div class="popup-content" style="width: 500px; height: 360px">
            <div style="display: flex; width: 100%; height: 35px; padding-right: 24px;box-sizing: border-box">
                <div class="popup-title">
                    Thêm khung giờ phạt
                </div>
                <div
                @click="closePopup"
                 class="close-btn">
                    <div class="close-btn-img"></div>
                </div>
            </div>
            <div class="main-popup-content">
                <div class="row-popup-addpunish" >
                    <div class="width-33-percen">
                        Loại
                    </div>
                    <div class="width-67-percen">
                        <DxSelectBox
                                ref="WorkShiftLatePunishType"
                                width="100%"
                                :search-enabled="true"
                                :data-source="items"
                                search-mode="contains"
                                search-expr="Name"
                                :search-timeout="200"
                                :min-search-length="0"
                                :show-data-before-search="false"
                                drop-down-button-template="imageIcon"
                                placeholder=""
                                display-expr="Name"
                                value-expr="Name"
                                v-model="punishInForm.WorkShiftLatePunishType"
                                >
                                <template #imageIcon="{}">
                                <div class="selectbox-icon">
                                </div>
                                </template>
                    </DxSelectBox>
                    </div>
                </div>
                <div class="row-popup-addpunish" >
                    <div class="width-33-percen">
                        Thời gian từ
                    </div>
                    <div class="width-67-percen">
                        <div class="width-42-percen">
                            <DxNumberBox
                            ref="WorkShiftLatePunishFrom"
                            v-model="punishInForm.WorkShiftLatePunishFrom"
                            class="minute-input"/>
                            <div class="text-in-input">
                                phút
                            </div>
                        </div>
                        <div class="width-16-percen">
                            đến
                        </div>
                        <div class="width-42-percen">
                            <DxNumberBox
                            ref="WorkShiftLatePunishTo"
                            v-model="punishInForm.WorkShiftLatePunishTo"
                            class="minute-input"/>
                            <div class="text-in-input">
                                phút
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-popup-addpunish" >
                    <div class="width-33-percen">
                        Giờ công bị trừ
                    </div>
                    <div class="width-67-percen">
                        <div class="width-42-percen">
                             <DxNumberBox
                                ref="PunishHour"
                                v-model="punishInForm.PunishHour"
                                class="number-box"
                                width="100%"
                                :show-spin-buttons="true"
                                :min="0"
                            />
                        </div>
                    </div>
                </div>
                <div class="row-popup-addpunish" >
                    <div class="width-33-percen">
                        Ngày công bị trừ
                    </div>
                    <div class="width-67-percen">
                        <div class="width-42-percen">
                             <DxNumberBox
                                ref="PunishDay"
                                v-model="punishInForm.PunishDay"
                                class="number-box"
                                width="100%"
                                :show-spin-buttons="true"
                                :min="0"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="popup-footer">
                 <BaseButton             
                 style="margin-right:8px"
                 @click.native="closePopup"
                :buttonInfor="buttonCancelInfor"/>
                <BaseButton 
                @click.native="onSaveClick"
                :buttonInfor="buttonApplyInfor"/>
            </div>
        </div>
    </div>
</template>

<script>
import DxSelectBox from "devextreme-vue/select-box"
import DxNumberBox from "devextreme-vue/number-box"
//import DxTextBox from "devextreme-vue/text-box"
import BaseButton from "../components/BaseButton.vue"
import {WorkShiftLatePunishModel} from "../js/models/WorkShiftLatePunish"
import WorkShiftLatePunishApi from '../api/component/WorkShiftLatePunishApi'
//import WorkShiftLatePunishApi from "../api/component/WorkShiftLatePunishApi"
export default {
    components:{
        DxSelectBox,
        DxNumberBox,
        BaseButton
    },

    props:{
        workShiftCode: {
            type: String,
            require: true,
        },
        punishFormMode: {
            type: Number,
            require: true,
        },
        punishNeedUpdate: {
            type: Object,
            require: true,
        },
    },

    methods:{
        closePopup(){
            this.$emit('closePopup');
        },
        reloadPunish(){
            this.$emit('reloadPunish');
        },
        onSaveClick(){
            if(this.validateRequireField()){
                if(this.punishFormMode == 1){
                    WorkShiftLatePunishApi.add(this.punishInForm).then(res =>{
                        console.log(res);
                        this.closePopup();
                        this.reloadPunish();
                    }).catch(res =>{
                        this.closePopup();
                        this.reloadPunish();
                        console.log(res);
                    })
                }
                if(this.punishFormMode == 2){
                    WorkShiftLatePunishApi.updateById(this.punishInForm.WorkShiftLatePunishId, this.punishInForm).then(res =>{
                        console.log(res);
                        this.closePopup();
                        this.reloadPunish();
                    }).catch(res =>{
                        console.log(res);
                        this.closePopup();
                        this.reloadPunish();
                    })
                }
            } else{
                this.focusEmptyField();
            }
        },
        validateRequireField(){
            var isValid = true;
            // for (let index = 0; index < this.requireField.length; index++) {
            //    if(this.requireField[index].Value == null || this.requireField[index].Value == ''){
            //        isValid = false;
            //        this.requireField[0].IsEmpty = true; 
            //    }
            // }
            if(this.punishInForm.WorkShiftLatePunishType == null || this.punishInForm.WorkShiftLatePunishType == ''){
                isValid = false;
                this.requireField[0].IsEmpty = true;    
            }
            if(this.punishInForm.WorkShiftLatePunishFrom == null || this.punishInForm.WorkShiftLatePunishFrom == ''){
                isValid = false;
                this.requireField[1].IsEmpty = true;    
            }
            if(this.punishInForm.WorkShiftLatePunishTo == null || this.punishInForm.WorkShiftLatePunishTo == ''){
                isValid = false;
                this.requireField[2].IsEmpty = true;
            }
            if(this.punishInForm.PunishHour == null || this.punishInForm.PunishHour == ''){
                isValid = false;
                this.requireField[3].IsEmpty = true;
            }
            if(this.punishInForm.PunishDay == null || this.punishInForm.PunishDay == ''){
                isValid = false;
                this.requireField[4].IsEmpty = true;    
            }
            return isValid;
        },

        focusEmptyField(){
            for (let index = 0; index < this.requireField.length; index++) {
                if(this.requireField[index].IsEmpty == true){
                    console.log(this.requireField[index].FieldName);
                    var self = this;
                    this.$nextTick(() =>{
                        this.$refs[`${self.requireField[index].FieldName}`].instance.focus(); 
                    })                 
                    this.$emit('showToastErro', `${self.requireField[index].DisplayName} không được để trống`)
                    this.requireField[index].IsEmpty = false;
                    break;
                } 
            }
        },
    },

    watch:{
        workShiftCode: function(val){
            this.punishInForm.WorkShiftCode = val;
        },
        punishFormMode: function(val){
            if(val == 2){
                console.log(this.workShiftCode);
                this.punishInForm = JSON.parse(JSON.stringify(this.punishNeedUpdate));
            }
            if(val == 1){
                this.punishInForm = JSON.parse(JSON.stringify(WorkShiftLatePunishModel));
                this.punishInForm.WorkShiftCode = this.workShiftCode;
            }
        },
    },

    data(){
        return{
            items: [
                {'ID': 1,'Name': 'Đi muộn'},
                {'ID': 2, 'Name': 'Về sớm'},
            ],
            buttonApplyInfor:{
                isPrimaryButton: true,
                text: 'Áp dụng'
            },
            buttonCancelInfor: {
                isSecondaryButton: true,
                text: 'Hủy',
            },
            punishInForm: JSON.parse(JSON.stringify(WorkShiftLatePunishModel)),
            requireField: [
                {
                    FieldName: "WorkShiftLatePunishType",
                    IsEmpty: false,
                    DisplayName: "Loại hình phạt",
                },
                {
                    FieldName: "WorkShiftLatePunishFrom",
                    IsEmpty: false,
                    DisplayName: "Khoảng thời gian",
                },
                {
                    FieldName: "WorkShiftLatePunishTo",
                    IsEmpty: false,
                    DisplayName: "Khoảng thời gian",
                },
                {
                    FieldName: "PunishHour",
                    IsEmpty: false,
                    DisplayName: "Giờ công bị trừ",

                },
                {
                    FieldName: "PunishDay",
                    IsEmpty: false,
                    DisplayName: "Ngày công bị trừ",
                },
            ],
        }
    }
}
</script>

<style scoped>
@import url('../assets/css/component/PopupAddPunish.css');
</style>