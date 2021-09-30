<template>
    <div class="popup">
        <div class="popup-content popup-add">
            <div style="display: flex; width: 100%; height: 35px; padding-right: 24px;box-sizing: border-box">
                <div
                @click="focusFirstInput"
                 class="popup-title">
                    Ca làm việc
                </div>
                <div
                @click="closePopup"
                 class="close-btn">
                    <div class="close-btn-img"></div>
                </div>
            </div>
            <div class="main-popup-content">
                <div class="information-group">
                    <div style="font-family: Roboto-Bold; font-size: 16px; margin-bottom: 16px; align-items: center;">
                        Thông tin chung
                    </div>
                    <div class="information-row-input">
                        <div class="label-input-col">
                            <span>Tên ca<span style="color: red">*</span></span>
                        </div>
                        <div class="input-col-1">
                            <input
                            ref="WorkShiftName"
                            class="input-workshitf-name"
                            v-model="workShiftInform.WorkShiftName"
                            />
                        </div>
                         <div class="input-col-2">
                            <div class="label-input-col_2">
                               <span>Mã ca<span style="color: red">*</span></span>
                            </div>
                            <DxTextBox
                            ref="WorkShiftCode"
                            v-model="workShiftInform.WorkShiftCode"
                            width="100"/>
                        </div>
                    </div>
                    <div class="information-row-input">
                        <div class="label-input-col">
                            <span>Giờ bắt đầu ca<span style="color: red">*</span></span>
                        </div>
                         <div class="input-col-1">
                            <div class="width-25-percen">
                                <DxDateBox
                                ref="WorkShiftStart"
                                width="96"  
                                :use-mask-behavior="true"
                                display-format="HH:mm"
                                placeholder="HH:mm"
                                type="time"
                                date-serialization-format="yyyy-MM-ddTHH:mm:ss"
                                drop-down-button-template="imageIcon"
                                v-model="workShiftInform.WorkShiftStart"
                                >
                                <template #imageIcon="{}">
                                    <div class="datebox-icon">
                                    </div>
                                </template>
                                </DxDateBox>
                            </div>
                            <div class="width-50-percen">
                                <div class="width-75-percen" style="padding-left: 16px; display: flex; align-items: center">
                                    <div class="checkbox-container">
                                        <input type="checkbox" id="start-work" :checked="workShiftInform.IsHavingCheckinDetail" @click="toggleWorkStart">
                                    </div>
                                    <label for="start-work">Chấm vào</label>
                                </div>
                                <div
                                v-show="workShiftInform.IsHavingCheckinDetail"
                                 class="width-25-percen" style="display: flex;  align-items: center">
                                    Từ
                                </div>
                            </div>
                            <div
                            v-show="workShiftInform.IsHavingCheckinDetail"
                             class="width-25-percen">
                                 <DxDateBox
                                 v-model="workShiftInform.WorkShiftStartFrom"
                                width="100%"  
                                :use-mask-behavior="true"
                                date-serialization-format="yyyy-MM-ddTHH:mm:ss" 
                                display-format="HH:mm"
                                placeholder="HH:mm"
                                type="time"
                                drop-down-button-template="imageIcon"
                            >
                                <template #imageIcon="{}">
                                    <div class="datebox-icon">
                                    </div>
                                </template>
                            </DxDateBox>
                            </div>
                        </div>
                        <div
                        v-show="workShiftInform.IsHavingCheckinDetail"
                         class="input-col-2">
                            <div class="label-input-col_2">
                                Đến
                            </div>
                             <DxDateBox
                                v-model="workShiftInform.WorkShiftStartTo"
                                width="100"  
                                :use-mask-behavior="true"
                                display-format="HH:mm"
                                placeholder="HH:mm"
                                date-serialization-format="yyyy-MM-ddTHH:mm:ss" 
                                type="time"
                                drop-down-button-template="imageIcon"
                            >
                                <template #imageIcon="{}">
                                    <div class="datebox-icon">
                                    </div>
                                </template>
                            </DxDateBox>
                        </div>
                    </div>
                    <div class="information-row-input">
                        <div class="label-input-col">
                            <span>Giờ kết thúc ca<span style="color: red">*</span></span>
                        </div>
                         <div class="input-col-1">
                             <div class="width-25-percen">
                                 <DxDateBox
                                  ref="WorkShiftEnd"
                                 v-model="workShiftInform.WorkShiftEnd"
                                width="100%" 
                                date-serialization-format="yyyy-MM-ddTHH:mm:ss" 
                                :use-mask-behavior="true"
                                display-format="HH:mm"
                                placeholder="HH:mm"
                                type="time"
                                drop-down-button-template="imageIcon"
                            >
                                <template #imageIcon="{}">
                                    <div class="datebox-icon">
                                    </div>
                                </template>
                            </DxDateBox>
                            </div>
                             <div class="width-50-percen">
                                <div class="width-75-percen" style="padding-left: 16px; display: flex; align-items: center">
                                    <div class="checkbox-container">
                                        <input type="checkbox" id="end-work" :checked="workShiftInform.IsHavingCheckoutDetail" @click="toggleWorkEnd">
                                    </div>
                                    <label for="end-work">Chấm ra</label>
                                </div>
                                <div
                                v-show="workShiftInform.IsHavingCheckoutDetail"
                                 class="width-25-percen" style="display: flex;  align-items: center">
                                    Từ
                                </div>
                            </div>
                            <div
                            v-show="workShiftInform.IsHavingCheckoutDetail"
                             class="width-25-percen">
                                 <DxDateBox
                                 date-serialization-format="yyyy-MM-ddTHH:mm:ss"
                                  v-model="workShiftInform.WorkShiftEndFrom"
                                width="100%"  
                                :use-mask-behavior="true"
                                display-format="HH:mm"
                                placeholder="HH:mm"
                                type="time"
                                drop-down-button-template="imageIcon"
                            >
                                <template #imageIcon="{}">
                                    <div class="datebox-icon">
                                    </div>
                                </template>
                            </DxDateBox>
                            </div>
                        </div>
                        <div
                        v-show="workShiftInform.IsHavingCheckoutDetail"
                         class="input-col-2">
                            <div class="label-input-col_2">
                                Đến
                            </div>
                             <DxDateBox
                                date-serialization-format="yyyy-MM-ddTHH:mm:ss"
                                v-model="workShiftInform.WorkShiftEndTo"
                                width="100"  
                                :use-mask-behavior="true"
                                display-format="HH:mm"
                                placeholder="HH:mm"
                                type="time"
                                drop-down-button-template="imageIcon"
                            >
                                <template #imageIcon="{}">
                                    <div class="datebox-icon">
                                    </div>
                                </template>
                            </DxDateBox>
                        </div>
                    </div>
                </div>
                <div class="optional-information" style="margin-top: 4px;">
                    <div class="optional-information-title margin-bot-16">
                        <div class="checkbox-container">
                            <input type="checkbox" id="option-1" :checked="workShiftInform.IsHavingBreakout" @click="toggleShowOptionalInformation1">
                        </div>
                        <label for="option-1">Có nghỉ giữa ca</label>
                    </div>
                    <div
                    v-show="workShiftInform.IsHavingBreakout"
                    class="information-row-input"
                    >
                        <div class="label-input-col">
                            <span>Giờ bắt đầu<span style="color: red">*</span></span>
                        </div>
                         <div class="input-col-1">
                             <div class="width-25-percen">
                                 <DxDateBox
                                 ref="WorkShiftBreakStart"
                                 v-model="workShiftInform.WorkShiftBreakStart"
                                width="100%"
                                date-serialization-format="yyyy-MM-ddTHH:mm:ss"  
                                :use-mask-behavior="true"
                                display-format="HH:mm"
                                placeholder="HH:mm"
                                type="time"
                                drop-down-button-template="imageIcon"
                            >
                                <template #imageIcon="{}">
                                    <div class="datebox-icon">
                                    </div>
                                </template>
                            </DxDateBox>
                            </div>
                             <div class="width-50-percen">
                                <div class="width-75-percen" style="padding-left: 16px; display: flex; align-items: center">
                                    <div class="checkbox-container">
                                        <input type="checkbox" id="time-option-1" :checked="workShiftInform.IsHavingBreakoutCheckInOut" @click="toggleShowTimeOption1">
                                    </div>
                                    <label for="time-option-1">Chấm ra</label>
                                </div>
                                <div
                                v-show="workShiftInform.IsHavingBreakoutCheckInOut"
                                 class="width-25-percen" style="display: flex;  align-items: center">
                                    Từ
                                </div>
                            </div>
                            <div
                            v-show="workShiftInform.IsHavingBreakoutCheckInOut"
                             class="width-25-percen">
                                 <DxDateBox
                                v-model="workShiftInform.WorkShiftBreakFrom"
                                width="100%"
                                date-serialization-format="yyyy-MM-ddTHH:mm:ss"  
                                :use-mask-behavior="true"
                                display-format="HH:mm"
                                placeholder="HH:mm"
                                type="time"
                                drop-down-button-template="imageIcon"
                            >
                                <template #imageIcon="{}">
                                    <div class="datebox-icon">
                                    </div>
                                </template>
                            </DxDateBox>
                            </div>
                        </div>
                    </div>
                    <div
                    v-show="workShiftInform.IsHavingBreakout"
                    class="information-row-input"
                    >
                        <div class="label-input-col">
                            <span>Giờ kết thúc<span style="color: red">*</span></span>
                        </div>
                         <div class="input-col-1">
                             <div class="width-25-percen">
                                 <DxDateBox
                                 ref="WorkShiftBreakEnd"
                                 v-model="workShiftInform.WorkShiftBreakEnd"
                                width="100%"
                                date-serialization-format="yyyy-MM-ddTHH:mm:ss"  
                                :use-mask-behavior="true"
                                display-format="HH:mm"
                                placeholder="HH:mm"
                                type="time"
                                drop-down-button-template="imageIcon"
                            >
                                <template #imageIcon="{}">
                                    <div class="datebox-icon">
                                    </div>
                                </template>
                            </DxDateBox>
                            </div>
                             <div class="width-50-percen">
                                <div class="width-75-percen" style="padding-left: 16px; display: flex; align-items: center">
                                    <div class="checkbox-container">
                                        <input type="checkbox" id="time-option-1" :checked="workShiftInform.IsHavingBreakoutCheckInOut" @click="toggleShowTimeOption1">
                                    </div>
                                    <label for="time-option-1">Chấm vào</label>
                                </div>
                                <div
                                v-show="workShiftInform.IsHavingBreakoutCheckInOut"
                                 class="width-25-percen" style="display: flex;  align-items: center">
                                    Đến
                                </div>
                            </div>
                            <div
                            v-show="workShiftInform.IsHavingBreakoutCheckInOut"
                             class="width-25-percen">
                                 <DxDateBox
                                 v-model="workShiftInform.WorkShiftBreakTo"
                                width="100%"
                                date-serialization-format="yyyy-MM-ddTHH:mm:ss"  
                                :use-mask-behavior="true"
                                display-format="HH:mm"
                                placeholder="HH:mm"
                                type="time"
                                drop-down-button-template="imageIcon"
                            >
                                <template #imageIcon="{}">
                                    <div class="datebox-icon">
                                    </div>
                                </template>
                            </DxDateBox>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="optional-information">
                    <div class="optional-information-title margin-bot-16">
                         <div class="checkbox-container">
                            <input type="checkbox" id="option-2" :checked="workShiftInform.IsHavingLateOrSoonAllow" @click="toggleShowOption2">
                        </div>
                        <label for="option-2">Đi muộn về sớm</label>
                    </div>
                    <div
                    v-show="workShiftInform.IsHavingLateOrSoonAllow"
                     class="information-row-input">
                        <div class="label-input-col">
                            <span>Cho phép đi muộn</span>
                        </div>
                         <div class="input-col-1">
                            <div class="width-25-percen">
                                 <DxNumberBox
                                 v-model="workShiftInform.WorkShiftAllowLate"
                                class="number-box"
                                width="100%"
                                :min="0"
                                :show-spin-buttons="true"
                                />
                            </div>
                            <div class="width-50-percen">
                                <div style="padding-left: 16px; display: flex; align-items: center">
                                   Phút
                                </div>
                                <div
                                style="display: flex;  align-items: center; margin-left: auto; margin-right: 20px">
                                    Về sớm
                                </div>
                            </div>
                            <div
                             class="width-25-percen">
                                 <DxNumberBox
                                 v-model="workShiftInform.WorkShiftAllowEndSoon"
                                class="number-box"
                                width="100%"
                                :min="0"
                                :show-spin-buttons="true"
                                />
                            </div>
                        </div>
                        <div
                         class="input-col-2">
                            <div class="label-input-col_2">
                                Phút
                            </div>
                        </div>
                    </div>
                    <div
                    style="padding-left: 32px; display: flex"
                     v-show="workShiftInform.IsHavingLateOrSoonAllow">
                        <div
                        class="margin-bot-16" style="display: flex; align-items: center;">
                            <div class="checkbox-container">
                                <input type="checkbox" id="punish" :checked="workShiftInform.IsHavingLateOrSoonPunish" @click="toggleShowPunish">
                            </div>
                            <label for="punish">Phạt đi muộn/về sớm</label>
                        </div>
                        <div
                        @click="showAddPopupPunish"
                        class="add-punish-btn"
                         style="margin-left: auto">
                            <div class="add-icon-red">
                                <div class="addicon-red-img">
                                </div>
                            </div>
                            <div >
                                Thêm
                            </div>
                        </div>    
                    </div> 
                    <div
                    v-show="workShiftInform.IsHavingLateOrSoonPunish"
                     class="pusnish-grid" style="margin-left: 33px; margin-right: 16px">
                        <DxDataGrid
                         :data-source="punishs"
                        :show-borders="false"
                        :show-column-lines="false"
                        :show-row-lines="true"
                        :allow-column-reordering="true"
                        :column-auto-width="true"
                        :hover-state-enabled="true"
                        :allow-column-resizing="true"
                        no-data-text=""
                        @row-dbl-click="updateWorkShiftLatePunish"
                        class="data-grid-punish"
                         key-expr="WorkShiftLatePunishId"
                        >
                            <DxSorting
                            mode="none"
                            />
                            <DxColumn 
                                v-for="col in cols"
                                :key="col.Id"
                                :data-field="col.Id"
                                :caption="col.Name"
                                :min-width="col.ColWidth"
                                :alignment="col.ColAlignment"
                            />
                            <DxColumn
                            alignment="center"
                            width="50"
                            cell-template="editFunction"
                            caption=""
                            />
                            <DxColumn
                            alignment="center"
                            width="50"
                            caption=""
                            cell-template="deleteFunction"
                            />
                            <template #editFunction={data}>
                                <div
                                @click="updateWorkShiftLatePunish(data)"
                                class="function-button">
                                    <div class="edit-img">
                                    </div>
                                </div>
                            </template>
                            <template #deleteFunction={data}>
                                <div
                                @click="deleteWorkShiftLatePunish(data.key)"
                                class="function-button">
                                    <div class="delete-img">
                                    </div>
                                </div>
                            </template>
                        </DxDataGrid>
                    </div>               
                </div> 
                <div class="information-group">
                    <div style="font-family: Roboto-Bold; font-size: 16px; margin-bottom: 16px; align-items: center;">
                        Tính công
                    </div>
                    <div class="information-row-input margin-bot-16">
                        <div class="label-input-col">
                            Giờ công
                        </div>
                        <div class="input-col-1">
                            <div class="width-25-percen">
                                <DxNumberBox
                                v-model="workShiftInform.WorkShiftWorkingHour"
                                class="number-box"
                                width="100%"
                                :min="0"
                                :show-spin-buttons="true"
                                />
                            </div>
                            <div class="width-50-percen right-align">
                                Ngày công
                            </div>
                            <div class="width-25-percen">
                                <DxNumberBox
                                v-model="workShiftInform.WorkShiftWorkingDay"
                                class="number-box"
                                width="100%"
                                :min="0"
                                :show-spin-buttons="true"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="information-row-input margin-bot-16">
                        <div class="label-input-col">
                            Hệ số ngày lương
                        </div>
                         <div class="input-col-1">
                            <div class="width-25-percen">
                                <DxNumberBox
                                v-model="workShiftInform.NormalDayCoefficent"
                                class="number-box"
                                width="100%"
                                :min="0"
                                :show-spin-buttons="true"
                                />
                            </div>
                            <div class="width-50-percen right-align">
                                Hệ số ngày nghỉ
                            </div>
                            <div class="width-25-percen">
                                <DxNumberBox
                                v-model="workShiftInform.OffDayCoefficent"
                                class="number-box"
                                width="100%"
                                :min="0"
                                :show-spin-buttons="true"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="information-row-input margin-bot-16">
                        <div class="label-input-col">
                            Hệ số ngày lễ
                        </div>
                       <div class="input-col-1">
                            <div class="width-25-percen">
                                <DxNumberBox
                                v-model="workShiftInform.HolidayCoefficent"
                                class="number-box"
                                width="100%"
                                :min="0"
                                :show-spin-buttons="true"
                                /> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="padding-left-24" >
                    <div class="margin-bot-16">
                        <div style="display: flex; align-items: center; margin-bottom: 12px">
                            <div class="checkbox-container">
                                <input type="checkbox" id="no-check-in" :checked="workShiftInform.NoStartTime" @click="toggleShowNoCheckIn">
                            </div>
                            <label for="no-check-in">Nếu không có giờ vào thì bị trừ công</label>
                        </div>
                        <div
                        v-show="workShiftInform.NoStartTime"
                         style="display: flex; align-items: center; margin-left: -24px">
                            <div class="label-input-col">
                                Giờ công
                            </div>
                            <div class="input-col-1">
                                <div class="width-25-percen">
                                    <DxNumberBox
                                    v-model="workShiftInform.NoStartHourPunishHour"
                                    class="number-box"
                                    width="100%"
                                    :min="0"
                                    :show-spin-buttons="true"
                                    />
                                </div>
                                <div class="width-50-percen right-align">
                                    Ngày công
                                </div>
                                <div class="width-25-percen">
                                    <DxNumberBox
                                    v-model="workShiftInform.NoStartHourPunishDay"
                                    class="number-box"
                                    width="100%"
                                    :min="0"
                                    :show-spin-buttons="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="margin-bot-16" >
                        <div style="display: flex; align-items: center; margin-bottom: 12px">
                            <div class="checkbox-container">
                                <input type="checkbox" id="no-check-out" :checked="workShiftInform.NoEndTime" @click="toggleShowNoCheckOut">
                            </div>
                            <label for="no-check-out">Nếu không có giờ ra thì bị trừ công</label>
                        </div>
                        <div
                        v-show="workShiftInform.NoEndTime"
                         style="display: flex; align-items: center; margin-left: -24px">
                            <div class="label-input-col">
                                Giờ công
                            </div>
                            <div class="input-col-1">
                                <div class="width-25-percen">
                                    <DxNumberBox
                                     v-model="workShiftInform.NoEndHourPunishHour"
                                    class="number-box"
                                    width="100%"
                                    :min="0"
                                    :show-spin-buttons="true"
                                    />
                                </div>
                                <div class="width-50-percen right-align">
                                    Ngày công
                                </div>
                                <div class="width-25-percen">
                                    <DxNumberBox
                                    v-model="workShiftInform.NoEndHourPunishDay"
                                    class="number-box"
                                    width="100%"
                                    :min="0"
                                    :show-spin-buttons="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="margin-bot-16" style="display: flex; align-items: center;">
                        <div class="width-50-percen" style="display: flex; align-items: center;">
                            <div class="checkbox-container">
                            <input type="checkbox" @click="toggleShowNotWorkEnough" id="lunch" :checked="workShiftInform.LunchCoefficent">
                            </div>
                            <label for="lunch">Tính công ăn ca</label>
                        </div>
                        <div 
                        v-show="workShiftInform.LunchCoefficent"
                        class="width-50-percen" style="display: flex; align-items: center;">
                            <div class="checkbox-container">
                            <input type="checkbox" id="notWorkEnough" :checked="workShiftInform.NotWorkEnoughCoefficent">
                            </div>
                            <label for="notWorkEnough">Loại trừ khi không làm đủ công</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="popup-footer">
                 <BaseButton
                @click.native="closePopup"
                 style="margin-right:8px"
                :buttonInfor="buttonCancelInfor"/>
                <BaseButton
                @click.native="onSaveBtnClick"
                :buttonInfor="buttonSaveInfor"/>
            </div>
        </div>
        <PopUpAddPunish
        :punishFormMode="punishFormMode"
        :punishNeedUpdate="workshiftLatePunishUpdate"
        :workShiftCode="workShiftInform.WorkShiftCode"
        @closePopup="closeAddPunishPopup"
        @reloadPunish="reloadPunish"
        @showToastErro="showToastErro"
        v-show="isShowPopupAddPunish"

        />
        <PopUpDelete
        deleteDesciption="Bạn có chắc muốn xóa bản ghi này không?"
        @onCancelDeleteClick="onCancelDeleteClick"
        @onConfirmDeleteClick="onConfirmDeleteClick"
        v-show="isShowPopupDelete"/>
    </div>
</template>

<script>
import __ from "lodash"
import DxTextBox from "devextreme-vue/text-box"
import DxDateBox from "devextreme-vue/date-box"
import DxNumberBox from "devextreme-vue/number-box"
import BaseButton from "../components/BaseButton.vue"
import PopUpAddPunish from "../components/PopUpAddPunish.vue"
import {WorkShiftModel} from "../js/models/WorkShift.js"
import {DxDataGrid, DxColumn, DxSorting} from "devextreme-vue/data-grid"
import WorkShiftApi from '../api/component/WorkShiftApi'
import WorkShiftLatePunishApi from "../api/component/WorkShiftLatePunishApi.js"
import PopUpDelete from "../components/PopUpDelete.vue"
import {MISA_RESOURCE} from "../js/resources/MISAResource.js"
export default {
    props:{
        formMode: {
            type: Number,
            require: true,
        },
        workShiftUpdateInfor:{
            type: Object,
            require: true, 
        },
        workShiftCodeList: {
            type: Array,
            require: true,
        }
    },
    
    components:{
        DxTextBox,
        DxDateBox,
        DxNumberBox,
        DxDataGrid,
        DxColumn,
        DxSorting,
        BaseButton,
        PopUpAddPunish,
        PopUpDelete,
    },

    methods:{
        /**
         * Custome event để gửi lên component cha,
         * created by: NHNGHIA (28/09/2021)
         */
        showToastErro(des){ 
            this.$emit('showToastErro', des)
        },

        /**
         * Load lại các hình phạt sau khi thêm mới hoặc sửa
         * * created by: NHNGHIA (28/09/2021)
         */
        reloadPunish(){
            WorkShiftLatePunishApi.getByWorkShiftCode(this.workShiftInform.WorkShiftCode)
                                    .then(res => {
                                        this.punishs = res.data
                                    }).catch(res=>{
                                         console.log(res);
                                    });
        },

        /**
         * Focus vào các trường bắt buộc đang để trống
         * created by: NHNGHIA (28/09/2021)
         */
        focusEmptyField(){
            for (let index = 0; index < this.requireField.length; index++) {
                if(this.requireField[index].IsEmpty == true){
                    var self = this;
                    if(index == 0){
                        this.$nextTick(() =>{
                        this.$refs[`${self.requireField[index].FieldName}`].focus();                  
                        })
                        this.$emit('showToastErro', `${self.requireField[index].DisplayName} không được để trống`)
                    } else {
                        this.$nextTick(() =>{
                        this.$refs[`${self.requireField[index].FieldName}`].instance.focus();  
                        this.$emit('showToastErro', `${self.requireField[index].DisplayName} không được để trống`)                
                    })
                    }
                    this.requireField[index].IsEmpty = false;
                    break;
                } 
            }
        },

        /**
         * Kiểm tra trùng mã ca làm
         * created by: NHNGHIA (27/09/2021)
         */
        validateCodeDuplicate(){
            var isDuplicate = false
            if(this.workShiftCodeList.indexOf(this.workShiftInform.WorkShiftCode) != -1){
                isDuplicate = true;
            }
            return isDuplicate;
        },

        /**
         * Kiểm tra các trường cần validate
         * created by: NHNGHIA (28/09/2021)
         */
        validateRequireField(){
            var isValid = true;
            if(this.workShiftInform.WorkShiftName == null || this.workShiftInform.WorkShiftName == ''){
                isValid = false;
                this.requireField[0].IsEmpty = true;    
            }
            else if(this.workShiftInform.WorkShiftCode == null || this.workShiftInform.WorkShiftCode == ''){
                isValid = false;
                this.requireField[1].IsEmpty = true;    
            }
            else if(this.workShiftInform.WorkShiftStart == null || this.workShiftInform.WorkShiftStart == ''){
                isValid = false;
                this.requireField[2].IsEmpty = true;    
            }
            else if(this.workShiftInform.WorkShiftEnd == null || this.workShiftInform.workShiftEnd == ''){
                isValid = false;
                this.requireField[3].IsEmpty = true;    
            }
            else if(this.workShiftInform.IsHavingBreakout == true){
                if(this.workShiftInform.WorkShiftBreakStart == null || this.workShiftInform.WorkShiftBreakStart == ''){
                    isValid = false;
                    this.requireField[4].IsEmpty = true;  
                } else if(this.workShiftInform.WorkShiftBreakEnd == null || this.workShiftInform.WorkShiftBreakEnd == ''){
                    isValid = false;
                    this.requireField[5].IsEmpty = true;  
                }
            }
            return isValid;
        },

        /**
         * Gán id của hình phạt cần xóa và hiện thị popup xác nhận xóa
         *  created by: NHNGHIA (28/09/2021)
         */
        deleteWorkShiftLatePunish(id){
            this.deletePunishId = id;
            this.isShowPopupDelete = true;
        },

        /**
         * Sự kiện khi click vào nút xóa ở popup xác nhận xóa, gọi api xóa hình phạt
         *  created by: NHNGHIA (28/09/2021)
         */
        onConfirmDeleteClick(){
            WorkShiftLatePunishApi.deleteById(this.deletePunishId).then(()=>{
                this.reloadPunish();
                this.isShowPopupDelete = false;
                this.$emit('showToastSuccess', MISA_RESOURCE.TOAST_MESSAGE.PUNISH_DELETE_SUCESS);
            }).catch(res=>{
                console.log(res);
                this.reloadPunish();
                this.isShowPopupDelete = false;
                this.$emit('showToastErro', MISA_RESOURCE.TOAST_MESSAGE.PUNISH_DELETE_FAIL);
            })
        },      

        /**
         * Đóng popup xác nhận xóa
         *  created by: NHNGHIA (28/09/2021)
         */
        onCancelDeleteClick(){
            this.isShowPopupDelete = false;
        },

        /**
         * Sửa thông tin hình phạt
         *  created by: NHNGHIA (28/09/2021)
         */
        updateWorkShiftLatePunish(data){
            WorkShiftLatePunishApi.getById(data.key).then(res =>{  
                this.workshiftLatePunishUpdate = res.data;
                this.punishFormMode = 2;
                this.isShowPopupAddPunish = true;
            }).catch(res =>{
                console.log(res);
            })
        },

        /**
         * Đóng popup thêm mới hình phạt
         *  created by: NHNGHIA (28/09/2021)
         */
        closeAddPunishPopup(){
            this.punishFormMode = 0;
            this.isShowPopupAddPunish = false;
        },

        /**
         * Sự kiện check vào checkbox, hiện thị các trường mới
         * created by: NHNGHIA (28/09/2021)
         */
        toggleShowTimeOption1(){
            this.workShiftInform.IsHavingBreakoutCheckInOut = !this.workShiftInform.IsHavingBreakoutCheckInOut
        },

        /**
         * Sự kiện check vào checkbox, hiện thị các trường mới
         * created by: NHNGHIA (28/09/2021)
         */
        toggleShowOptionalInformation1(){
            this.workShiftInform.IsHavingBreakout = !this.workShiftInform.IsHavingBreakout
        },

        /**
         * Đóng popup thêm mới, kiếm tra xem dữ liệu có bị thay đổi chưa
         * created by: NHNGHIA (28/09/2021)
         */
        closePopup(){
            if(__.isEqual(this.workShiftInform, this.workShiftInformClone)){
                this.$emit('forceClosePopup')
            } else{
                this.$emit('closePopup');
            }
        },

        /**
         * Custome event đóng popup mà không kiểm tra thông tin 
         * created by: NHNGHIA (28/09/2021)
         */
        forceClosePopup(){
            this.$emit('forceClosePopup')
        },

        /**
         * Focus vào ô input đầu tiên của popup thêm mới ca làm việc
         * created by: NHNGHIA (28/09/2021)
         */
        focusFirstInput(){
            this.$nextTick(() =>{
                this.$refs.WorkShiftName.focus();
            })
        },

        /**
         * Custome event gửi lên component cha để reload dữ liệu
         */
        reloadTable(){
            this.$emit('reloadTable')
        },

        /**
         * Sự kiện check vào checkbox, hiện thị các trường mới
         * created by: NHNGHIA (28/09/2021)
         */
        toggleWorkStart(){
            this.workShiftInform.IsHavingCheckinDetail = !this.workShiftInform.IsHavingCheckinDetail
        },

        toggleWorkEnd(){
            this.workShiftInform.IsHavingCheckoutDetail = !this.workShiftInform.IsHavingCheckoutDetail
        },

        /**
         * Sự kiện check vào checkbox, hiện thị các trường mới
         * created by: NHNGHIA (28/09/2021)
         */
        toggleShowOption2(){
            this.workShiftInform.IsHavingLateOrSoonAllow = !this.workShiftInform.IsHavingLateOrSoonAllow
        },

        showAddPopupPunish(){
           if(this.formMode == MISA_RESOURCE.POPUP_WORKSHIFT_MODE.UPDATE_MODE){
                this.punishFormMode = MISA_RESOURCE.POPUP_WORKSHIT_PUNISH_MODE.ADD_MODE;
                this.isShowPopupAddPunish = true
           } else if(this.formMode == MISA_RESOURCE.POPUP_WORKSHIFT_MODE.ADD_MODE){
               this.$emit('showToastWarning', MISA_RESOURCE.TOAST_MESSAGE.WARNING_ADD_PUNISH);
           }
        },

        /**
         * Sự kiện check vào checkbox, hiện thị các trường mới
         * created by: NHNGHIA (28/09/2021)
         */
        toggleShowNoCheckIn(){
            this.workShiftInform.NoStartTime = !this.workShiftInform.NoStartTime
        },

        /**
         * Sự kiện check vào checkbox, hiện thị các trường mới
         * created by: NHNGHIA (28/09/2021)
         */
        toggleShowNoCheckOut(){
            this.workShiftInform.NoEndTime = !this.workShiftInform.NoEndTime
        },

        /**
         * Sự kiện check vào checkbox, hiện thị các trường mới
         * created by: NHNGHIA (28/09/2021)
         */
        toggleShowNotWorkEnough(){
            this.workShiftInform.LunchCoefficent = !this.workShiftInform.LunchCoefficent
        },

        /**
         * Sự kiện check vào checkbox, hiện thị các trường mới
         * created by: NHNGHIA (28/09/2021)
         */
        toggleShowPunish(){
            this.workShiftInform.IsHavingLateOrSoonPunish = !this.workShiftInform.IsHavingLateOrSoonPunish
        },
        
        /**
         * Sự kiện khi click vào nút thêm ở popup thêm mới ca làm việc
         * created by: NHNGHIA (24/09/2021)
         */
        onSaveBtnClick(){
            if(this.validateRequireField()){
                if(this.formMode == MISA_RESOURCE.POPUP_WORKSHIFT_MODE.UPDATE_MODE){
                WorkShiftApi.updateById(this.workShiftInform.WorkShiftId, this.workShiftInform)
                            .then(res => {
                                console.log(res);
                                this.$emit('showToastSuccess', MISA_RESOURCE.TOAST_MESSAGE.UPDATE_SUCCESS)
                                this.forceClosePopup();
                                this.reloadTable();
                            }).catch(res => {
                                console.log(res);
                                this.$emit('showToastErro', MISA_RESOURCE.TOAST_MESSAGE.UPDATE_FAIL)
                                this.forceClosePopup();
                                this.reloadTable();
                            })
                }
                if(this.formMode == MISA_RESOURCE.POPUP_WORKSHIFT_MODE.ADD_MODE){
                    if(!this.validateCodeDuplicate()){
                        WorkShiftApi.add(this.workShiftInform).then(()=> {
                            this.$emit('showToastSuccess', MISA_RESOURCE.TOAST_MESSAGE.ADD_SUCCESS)
                            this.forceClosePopup();
                            this.reloadTable();
                        }).catch(res =>{
                            console.log(res);
                            this.$emit('showToastErro', MISA_RESOURCE.TOAST_MESSAGE.ADD_FAIL)
                            this.forceClosePopup();
                            this.reloadTable();
                        
                        })
                    } else{
                        this.$emit('showToastErro', MISA_RESOURCE.TOAST_MESSAGE.CODE_DUPLICATE);
                        this.$refs.WorkShiftCode.instance.focus();
                    }
                }
            } else {
                this.focusEmptyField();
            }
        }

    },

    watch:{
        formMode: function(val){
            if(val == MISA_RESOURCE.POPUP_WORKSHIFT_MODE.UPDATE_MODE){
                this.workShiftInform = JSON.parse(JSON.stringify(this.workShiftUpdateInfor));
                if(this.workShiftInform.IsHavingLateOrSoonAllow == false){
                    this.workShiftInform.IsHavingLateOrSoonPunish = false;
                }
                this.workShiftInformClone = JSON.parse(JSON.stringify(this.workShiftInform));
                WorkShiftLatePunishApi.getByWorkShiftCode(this.workShiftInform.WorkShiftCode)
                                        .then(res => {
                                            this.punishs = res.data
                                        }).catch(res=>{
                                            console.log(res);
                                        });
            }
            if(val == MISA_RESOURCE.POPUP_WORKSHIFT_MODE.ADD_MODE){
                this.workShiftInform = JSON.parse(JSON.stringify(WorkShiftModel));
                this.workShiftInformClone = JSON.parse(JSON.stringify(this.workShiftInform));
            }
        },


    },

    data(){
        return{
           
            requireField: [
                {
                    FieldName: "WorkShiftName",
                    IsEmpty: false,
                    DisplayName: "Tên ca",
                },
                {
                    FieldName: "WorkShiftCode",
                    IsEmpty: false,
                    DisplayName: "Mã ca"
                },
                {
                    FieldName: "WorkShiftStart",
                    IsEmpty: false,
                    DisplayName: "Giờ bắt đầu ca"
                },
                {
                    FieldName: "WorkShiftEnd",
                    IsEmpty: false,
                    DisplayName: "Giờ kết thúc ca"
                },
                {
                    FieldName: "WorkShiftBreakStart",
                    IsEmpty: false,
                    DisplayName: "Giờ bắt đầu nghỉ giữa ca"
                },
                {
                    FieldName: "WorkShiftBreakEnd",
                    IsEmpty: false,
                    DisplayName: "Giờ kết thúc nghỉ giữa ca"
                },
            ],
            isShowOpion2: false,
            isShowTimeOption1: false,
            isShowPopupAddPunish: false,
            isShowPunish: false,
            isShowOptionalInformation1: false,
            isShowNotWorkEnough: false,
            isShowNoCheckOut: false,
            isShowNoCheckIn: false,
            isShowStartWork: true,
            isShowEndWork: true,
            isShowPopupDelete: false,
            workshiftLatePunishUpdate: {},
            punishFormMode: 0,
            deletePunishId: '',
            workShiftInform: JSON.parse(JSON.stringify(WorkShiftModel)),
            workShiftInformClone: {},
            buttonSaveInfor:{
                isPrimaryButton: true,
                text: 'Lưu'
            },
            buttonCancelInfor: {
                isSecondaryButton: true,
                text: 'Hủy',
            },
            cols:[
                {
                    Name: 'Loại',
                    Id: 'WorkShiftLatePunishType',
                    ColWidth: 200,
                    ColFixed: false,
                    ColAlignment: 'left',
                },
                 {
                    Name: 'Từ (phút)',
                    Id: 'WorkShiftLatePunishFrom',
                    ColWidth: 200,
                    ColFixed: false,
                    ColAlignment: 'left',
                },
                 {
                    Name: 'Đến (phút)',
                    Id: 'WorkShiftLatePunishTo',
                    ColWidth: 200,
                    ColFixed: false,
                    ColAlignment: 'left',
                },
                 {
                    Name: 'Giờ công bị trừ (giờ)',
                    Id: 'PunishHour',
                    ColWidth: 200,
                    ColFixed: false,
                    ColAlignment: 'left',
                },
                {
                    Name: 'Ngày công bị trừ (ngày)',
                    Id: 'PunishDay',
                    ColWidth: 200,
                    ColFixed: false,
                    ColAlignment: 'left',
                },

            ],

            punishs:[],
        }
    }
}
</script>

<style>

</style>