<template>
    <div class="main-content">
        <div
        v-show="!isShowMultiDelete" class="title-and-function">
            <div class="page-title">
                Ca làm việc
            </div>
            <div class="funtions-group">
                <SearchInput
                v-model="filter"
                />
                <BaseButton
                @click.native="showPopupAdd"
                style="margin: 0px 8px; padding-right: 20px"
                :buttonInfor="buttonAddInfo"
                />
                <div class="filter-btn">
                    <div class="filter-icon-img"></div>
                </div>
            </div>
        </div>
        <div
        v-show="isShowMultiDelete"
         class="multi-delete-function">
            <span>Đã chọn <span style="font-weight: bold; padding: 0px 16px 0px 6px">{{deleteList.length}}</span> <span @click="clearDeleteList" style="color: red; cursor: pointer">Bỏ chọn</span> </span>
            <div
            @click="onMultiDelete"
             class="multi-delete-button">
                <div class="delete-icon">
                    <div class="delete-img">
                    </div>  
                </div>
                <div style="margin-left: 6px; color: red; font-family: Roboto-Medium; padding-top: 4px">
                    Xóa
                </div>
            </div>
        </div>
        <div class="grid-data">
            <div>
                <DataGrid
                @clearDeleteList="clearDeleteList"
                @showPopupDelete="showPopupDelete"
                @updateWorkShift="updateWorkShift"
                :cols="cols"
                :workShifts="workShifts"
                :deleteList="deleteList"
                />
            </div>
            <div class="paging-bar">
                <div>
                    <span>Tổng số bản ghi: <span style="font-family: Roboto-Bold">{{this.totalRecord}}</span></span>
                </div>
                <div class="paging-function">
                        <DxSelectBox
                        width="70"
                        :data-source="counts"
                        v-model="recordPerPage"
                        drop-down-button-template="imageIcon"
                        display-expr="Count"
                        value-expr="Count"
                        >
                        <template #imageIcon="{}">
                        <div class="selectbox-icon">
                        </div>
                        </template>
                        </DxSelectBox>
                    <div style="margin-left: 16px; margin-right: 16px">
                        <span>Từ <span style="font-family: Roboto-Bold">{{this.offSet + 1}}</span> đến <span style="font-family: Roboto-Bold">{{this.offSet+this.workShifts.length}}</span> bản ghi</span>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <div
                        @click="getPreviousPage"
                         class="paging-btn" style="margin-right: 20px"> 
                            <div
                             class="previous-icon-img">
                            </div>
                        </div>
                        <div
                        @click="getNextPage"
                         class="paging-btn">
                            <div class="next-icon-img">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <PopUpDelete
        v-show="isShowDeletePopup"
        :deleteDesciption="deleteDesciption"
        @onCancelDeleteClick="onCloseDeletePopup"
        @onConfirmDeleteClick="onConfirmDeleteClick"
        />
        <PopUpAdd
        ref="addPopUp"
        @showToastSuccess="showToastSuccess"
        @showToastWarning="showToastWarning"
        @showToastErro="showToastErro"
        @closePopup="closeAddPopup"
        @reloadTable="reload"
        @forceClosePopup="forceCloseAddPopup"
        v-show="isShowAddPopup"
        :formMode="formMode"
        :workShiftCodeList="workShiftCodeList"
        :workShiftUpdateInfor="workShiftUpdateInfor"
        />
        <PopupInforChange
        @closePopup="closeInforChange"
        @forceClosePopup="forceCloseAddPopup"
        @saveChangeInfor="saveChangeInfor"
        v-show="isShowPopupInforChange"
        />
        <transition name="slide-fade">
            <ToastMessage
            :toastInfor="toastInfor"
            v-show="isShowToastMessage"
            />
        </transition>
    </div>
</template>

<script>
import Format from "../js/utils/Format.js"
import BaseButton from "../components/BaseButton.vue"
import SearchInput from "../components/SearchInput.vue"
import PopUpDelete from "../components/PopUpDelete.vue"
import PopUpAdd from "../components/PopUpAdd.vue"
import PopupInforChange from "../components/PopupInforChange.vue"
import DxSelectBox from "devextreme-vue/select-box"
import WorkShiftApi from "../api/component/WorkShiftApi.js"
import DataGrid from "../components/DataGrid.vue"
import ToastMessage from "../components/ToastMessage.vue"
import { MISA_RESOURCE } from '../js/resources/MISAResource.js'
//import { DxDataGrid, DxSorting, DxColumn, DxScrolling,DxLoadPanel } from "devextreme-vue/data-grid"

export default {
    components: {
        DxSelectBox,
        DataGrid,
        PopupInforChange,
        PopUpAdd,
        BaseButton,
        SearchInput,
        PopUpDelete,
        ToastMessage
    },

    created(){
        this.recordPerPage =  this.counts[3].Count;
        WorkShiftApi.getFilterPaging('', 0, this.recordPerPage).then(res =>{
            res.data.workShiftList.forEach(item => {
                item.WorkShiftStart = Format.formatHour(item.WorkShiftStart);
                item.WorkShiftEnd = Format.formatHour(item.WorkShiftEnd);
            });
            this.workShifts = res.data.workShiftList;
            this.totalPage = res.data.totalPage
            this.totalRecord = res.data.totalRecord
        }).catch(res =>{
            console.log(res);
        });
        WorkShiftApi.getAllCode().then(res =>{
           this.workShiftCodeList = res.data
           console.log(this.workShiftCodeList);
        }).catch( res => {
            console.log(res);
        })
    },

    watch:{
        deleteList: function(){
            if(this.deleteList.length >0){
                this.isShowMultiDelete = true;
            } else{
                this.isShowMultiDelete = false;
            }
        },
        filter: function(val){
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() =>{
                WorkShiftApi.getFilterPaging(val, 0, this.recordPerPage).then(res=>{
                    res.data.workShiftList.forEach(item => {
                        item.WorkShiftStart = Format.formatHour(item.WorkShiftStart);
                        item.WorkShiftEnd = Format.formatHour(item.WorkShiftEnd);

                    });
                    this.workShifts = res.data.workShiftList;
                    this.totalPage = res.data.totalPage
                    this.totalRecord = res.data.totalRecord
                });
            },400);
        },
        recordPerPage: function(val){
            this.offSet = 0;
            WorkShiftApi.getFilterPaging(this.filter,0,val).then(res=>{
                    res.data.workShiftList.forEach(item => {
                        item.WorkShiftStart = Format.formatHour(item.WorkShiftStart);
                        item.WorkShiftEnd = Format.formatHour(item.WorkShiftEnd);
                    });
                    this.workShifts = res.data.workShiftList;
                    this.totalPage = res.data.totalPage
                    this.totalRecord = res.data.totalRecord
                });
        },
        offSet: function(val){
            WorkShiftApi.getFilterPaging(this.filter, val, this.recordPerPage).then(res =>{
                 res.data.workShiftList.forEach(item => {
                        item.WorkShiftStart = Format.formatHour(item.WorkShiftStart);
                        item.WorkShiftEnd = Format.formatHour(item.WorkShiftEnd);
                    });
                    this.workShifts = res.data.workShiftList;
                    this.totalPage = res.data.totalPage
                    this.totalRecord = res.data.totalRecord
            })
        }
    },

    computed:{
        isSelectAll(){
            var selectAll = true;
            this.workShifts.forEach(item => {
                if(this.deleteList.indexOf(item.WorkShiftId) === -1){
                    selectAll = false;
                }
            });
            return selectAll;
        }
    },

    methods:{
        /**
         * Hiện thị toast message warning 
         * created by: NHNGHIA (27/09/2021)
         */
        showToastWarning(des){
            this.isShowToastMessage = true;
            this.toastInfor.isSuccessToast = false;
            this.toastInfor.isErroToast = false;
            this.toastInfor.isWarningToast= true;
            this.toastInfor.description = des;
            setTimeout(() => {
                this.isShowToastMessage = false
            }, 3000);
        },

        /**
         * Hiện thị toast message thành công 
         * created by: NHNGHIA (27/09/2021)
         */
        showToastSuccess(des){
            this.isShowToastMessage = true;
            this.toastInfor.isSuccessToast = true;
            this.toastInfor.isErroToast = false;
            this.toastInfor.isWarningToast= false;
            this.toastInfor.description = des;
            setTimeout(() => {
                this.isShowToastMessage = false
            }, 3000);
        },    

        /**
         * Hiện thị toast message có lỗi sảy ra 
         * created by: NHNGHIA (27/09/2021)
         */
        showToastErro(des){
            this.isShowToastMessage = true;
            this.toastInfor.isSuccessToast = false;
            this.toastInfor.isErroToast = true;
            this.toastInfor.isWarningToast= false;
            this.toastInfor.description = des;
            setTimeout(() => {
                this.isShowToastMessage = false
            }, 3000);
        },

        /**
         * Hàm xóa nhiều sau khi xác nhận xóa nhiều 
         * created by: NHNGHIA (26/09/2021)
         */
        onMultiDelete(){
            this.deleteMode = 1;
            if(this.deleteList.length <= 1){
                this.deleteDesciption = 'Bạn có chắc muốn xóa Ca làm việc này không?';
                this.isShowDeletePopup = true;
            } else if(this.deleteList.length > 1){
                this.deleteDesciption = 'Bạn có chắc chắn muốn xóa những Ca làm việc này không';
                this.isShowDeletePopup = true;
            }
        },

        /**
         * Lấy dữ liệu trang trước trang hiện tại 
         * created by: NHNGHIA (26/09/2021)
         */
        getPreviousPage(){
            if(this.offSet !=0){
                this.curentPage = this.curentPage -1;
                this.offSet = this.offSet - this.recordPerPage;
            }
        },
        
        /**
         * Lấy dữ liệu trang trước trang tiếp theo
         * created by: NHNGHIA (26/09/2021)
         */
        getNextPage(){
            if(this.offSet != (this.totalPage*this.recordPerPage)-this.recordPerPage){
                this.curentPage = this.curentPage +1;
                this.offSet = this.offSet + this.recordPerPage;
            }
        },

        /**
         * Hàm reload giữ liệu ca làm việc để hiện thị  
         * created by: NHNGHIA (25/09/2021)
         */
        reload(){
            this.workShiftCodeList = [],
            WorkShiftApi.getFilterPaging(this.filter, 0, this.recordPerPage).then(res =>{
            res.data.workShiftList.forEach(item => {
                item.WorkShiftStart = Format.formatHour(item.WorkShiftStart);
                item.WorkShiftEnd = Format.formatHour(item.WorkShiftEnd);
            });
            
            this.workShifts = res.data.workShiftList;
            this.totalPage = res.data.totalPage;
            this.totalRecord = res.data.totalRecord
            }).catch(res =>{
                console.log(res);
            });
            WorkShiftApi.getAllCode().then(res =>{
            this.workShiftCodeList = res.data
            }).catch( res => {
                console.log(res);
            })
        },

        /**
         * Hàm update thông tin ca làm việc theo id  
         * created by: NHNGHIA (24/09/2021)
         */
        updateWorkShift(data){
            WorkShiftApi.getById(data.key).then(res=>{
                this.workShiftUpdateInfor = res.data;
                this.formMode = 1;
                this.isShowAddPopup = true;  
                this.$refs.addPopUp.focusFirstInput();
            });
        },

        /**
         * Sự kiện khi click vào nút bỏ chọn, clear deleteList hiện đang có
         * created by: NHNGHIA (24/09/2021)
         */
        clearDeleteList(){
            this.deleteList = [];
        },

        /**
         * Sự kiện khi check vào check box, lấy ra id để thêm vào danh sách xóa nhiều
         * created by: NHNGHIA (24/09/2021)
         */
        checkRow(id){
            var index = this.deleteList.indexOf(id);
           if(this.deleteList.indexOf(id) === -1){
               this.deleteList.push(id);
               console.log(this.deleteList);
           } else{
               this.deleteList.splice(index, 1)
           }
        },

        /**
         * Hàm đóng popup cảnh báo dữ liệu bị thay đổi
         * created by: NHNGHIA (24/09/2021)
         */
        closeInforChange(){
            this.isShowPopupInforChange = false
        },

        /**
         * Sự kiện khi bấm lưu ở popup dữ liệu thay đổi
         * created by: NHNGHIA (24/09/2021)
         */
        saveChangeInfor(){
            this.isShowPopupInforChange = false;
            this.$refs.addPopUp.onSaveBtnClick();
        },

        /**
         * Đóng popup confirm delete, reset deleteId
         * created by: NHNGHIA (24/09/2021)
         */
        onCloseDeletePopup(){
            this.isShowDeletePopup = false;
            this.workShiftDeleteId = '';
        },

        /**
         * Sự kiện khi ấn xóa ở popup xóa, gọi đến api xóa
         * created by: NHNGHIA (24/09/2021)
         */
        onConfirmDeleteClick(){
            if(this.deleteMode == 0){
                WorkShiftApi.deleteById(this.workShiftDeleteId).then(()=>{
                    this.showToastSuccess(MISA_RESOURCE.TOAST_MESSAGE.DELETE_SUCCESS)
                    this.isShowDeletePopup = false;
                    this.reload();
                }).catch(res =>{
                    console.log(res);
                    this.showToastErro(MISA_RESOURCE.TOAST_MESSAGE.DELETE_FAIL)
                    this.isShowDeletePopup = false;
                    this.reload();
                })
            } else if(this.deleteMode == 1){
                WorkShiftApi.multiDelete(this.deleteList).then(res=>{
                    this.showToastSuccess(MISA_RESOURCE.TOAST_MESSAGE.MULTI_DELETE_SUCCESS)
                    console.log(res);
                     this.isShowDeletePopup = false;
                    this.reload();
                    this.deleteList = [];
                }).catch(res =>{
                    this.showToastErro(MISA_RESOURCE.TOAST_MESSAGE.MULTI_DELETE_FAIL)
                    console.log(res);
                     this.isShowDeletePopup = false;
                    this.reload();
                    this.deleteList = [];
                })
            }
        },

        /**
         * Hiện thị popup thêm mới ca làm việc với formmode là thêm
         *  created by: NHNGHIA (24/09/2021)
         */
      showPopupAdd(){
          this.isShowAddPopup = true;
           this.$refs.addPopUp.focusFirstInput();
          this.formMode = MISA_RESOURCE.POPUP_WORKSHIFT_MODE.ADD_MODE;
      },

        /**
         * Đóng popup thêm mới ca làm việc
         *  created by: NHNGHIA (24/09/2021)
         */
      closeAddPopup(){
          this.isShowPopupInforChange = true;
      },
 
         /**
         * Đóng popup thêm mới ca làm việc mà không hiện thị popup thông tin bị thay đổi
         *  created by: NHNGHIA (24/09/2021)
         */
      forceCloseAddPopup(){
          this.isShowPopupInforChange = false;
          this.isShowAddPopup = false;
          this.formMode = MISA_RESOURCE.POPUP_WORKSHIFT_MODE.DEFAULT_MODE;
          this.workShiftUpdateInfor = {};
      },

        /**
         * Hiện thị popup xác nhận xóa
         *  created by: NHNGHIA (24/09/2021)
         */
      showPopupDelete(deleteId){
          this.deleteMode = 0;
          this.deleteDesciption= MISA_RESOURCE.POPUP_DELETE_DESCRIPTION.DEFAULT_MODE;
          this.workShiftDeleteId = deleteId;
          this.isShowDeletePopup = true
      },

        /**
         * Hàm chọn tất cả ở checkbox header
         *  created by: NHNGHIA (24/09/2021) 
         */
      checkAll(isCheckAll){
          if(isCheckAll == true){
              this.deleteList = []
          } else {
              this.workShifts.forEach(item => {
                if(this.deleteList.indexOf(item.WorkShiftId) === -1){
                    this.deleteList.push(item.WorkShiftId);
                }
              });
          }
      }
    },

    data(){
        return{
            items: [
                {'ID': 1,'Name': 'Đi muộn'},
                {'ID': 2, 'Name': 'Về sớm'}
            ],
            workShiftCodeList:[],
            deleteList: [],
            isShowMultiDelete: false,
            isShowPopupInforChange: false,
            isShowToastMessage: false,
            filter: '',
            offSet: 0,
            totalPage: 0,  
            curentPage: 1,
            totalRecord: 0,
            isDisablePreviousBtn: true,
            searchModeOption: 'contains',
            searchExprOption: 'Name',
            searchTimeoutOption: 200,
            minSearchLengthOption: 0,
            showDataBeforeSearchOption: false,
            deleteDesciption: MISA_RESOURCE.POPUP_DELETE_DESCRIPTION.DEFAULT_MODE,
            isShowFunction: false,
            workShiftDeleteId: '',
            deleteMode: MISA_RESOURCE.DELETE_MODE.DEFAULT,
            isShowAddPopup: false,
            isShowDeletePopup: false,
            timeOut: null,
            formMode: MISA_RESOURCE.POPUP_WORKSHIFT_MODE.DEFAULT_MODE,
            workShiftUpdateInfor: {},
            toastInfor: {
                isSuccessToast: true,   
                isErroToast: false,
                isWarningToast: false,
                description: '',
            },
            buttonAddInfo: {
                isPrimaryButton: true,
                isHaveIcon: true,
                buttonImg: 'add-icon',
                text: 'Thêm   '
            },
            counts: [
                {'ID': 1, 'Count': 15},
                {'ID': 2, 'Count': 20},
                {'ID': 3, 'Count': 50},
                {'ID': 4, 'Count': 100} ,
            ],
            recordPerPage: null,
            cols:[
                {
                    Name: 'Mã ca',
                    Id: 'WorkShiftCode',
                    ColWidth: 200,
                    ColFixed: false,
                    ColAlignment: 'left',
                },
                {
                    Name: 'Tên ca làm',
                    Id: 'WorkShiftName',
                    ColWidth: 240,
                    ColFixed: false,
                    ColAlignment: 'left',
                },
                {
                    Name: 'Giờ bắt đầu',
                    Id: 'WorkShiftStart',
                    ColWidth: 250,
                    ColFixed: false,
                    ColAlignment: 'left',
                },
                {
                    Name: 'Giờ kết thúc ca',
                    Id: 'WorkShiftEnd',
                    ColWidth: 200,
                    ColFixed: false,
                    ColAlignment: 'left',
                },
                {
                    Name: 'Hệ số công',
                    Id: 'WorkShiftWorkingDay',
                    ColWidth: 200,
                    ColFixed: false,
                    ColAlignment: 'right',
                },
                {
                    Name: 'Giờ công',
                    Id: 'WorkShiftWorkingHour',
                    ColWidth: 200,
                    ColFixed: false,
                    ColAlignment: 'right',
                }

            ],

            workShifts: [],

        }
    }
}
</script>

<style scoped>
@import url('../assets/css/layout/MainContent.css');
</style>
<style>
.function-button  {
    display: none;
}

tr.dx-state-hover .function-button {
    display: flex;
}
.data-grid-custom{
    max-height: calc(100vh - 150px - 60px);
}

.data-grid-custom .dx-gridbase-container{
    height: calc(100vh - 150px - 60px);
}
.data-grid-custom .dx-header-row{
    height: 49px;
}
.data-grid-custom .dx-row-lines{
    height: 49px;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>