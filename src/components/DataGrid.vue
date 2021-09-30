<template>
    <div class="data-grid-container">
        <DxDataGrid
                    :data-source="workShifts"
                    :show-borders="false"
                    :show-column-lines="false"
                    :show-row-lines="true"
                     :allow-column-reordering="true"
                     :column-auto-width="true"
                     :hover-state-enabled="true"
                     :allow-column-resizing="true"
                     @row-dbl-click="updateWorkShift"
                     class="data-grid"
                     key-expr="WorkShiftId"
                    >
                    <DxSorting
                    mode="none"
                    />
                    <DxScrolling
                    :scroll-by-content="true"
                    :scroll-by-thumb="true"
                    showScrollbar="always"
                    :use-native="false"
                    mode="virtual"
                    />
                    <DxColumn
                     header-cell-template="tableOption"
                     width="50"
                     align="center"
                    />
                    <DxColumn
                    width="40"
                    cell-template="checkboxCell"
                    header-cell-template="checkboxHeader"
                    alignment="center"
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
                    cell-header-template="noDisplay"
                    caption=""
                    />
                    <DxColumn
                    alignment="center"
                    width="50"
                    caption=""
                    cell-template="deleteFunction"
                    cell-header-template="noDisplay"
                    />
                    <template #checkboxHeader>
                        <div>
                            <input type="checkbox" @input="checkAll(isSelectAll)" :checked="isSelectAll">
                        </div>
                    </template>
                     <template #noDisplay>
                        <div style="display: none;">
                        </div>
                    </template>
                     <template #checkboxCell={data}>
                        <div>
                            <input type="checkbox" @input="checkRow(data.key)" :checked=" deleteList.indexOf(data.key)=== -1 ? false : true">
                        </div>
                    </template>
                    <template #tableOption>
                        <div style="display: flex; padding-left: 8px;">
                            <div class="table-option-img">
                            </div>
                        </div>
                    </template>

                    <template #editFunction={data}>
                        <div
                        @click="updateWorkShift(data)"
                         class="function-button">
                            <div class="edit-img">
                            </div>
                        </div>
                    </template>

                    <template #deleteFunction={data}>
                        <div
                        @click="showPopupDelete(data.key)"
                         class="function-button">
                            <div class="delete-img">
                            </div>
                        </div>
                    </template>
                </DxDataGrid>
    </div>
</template>

<script>
import { DxDataGrid, DxSorting, DxColumn, DxScrolling } from "devextreme-vue/data-grid"

export default {
    props:{
        cols: {
            type: Array,
            require: true,
        },
        workShifts: {
            type: Array, 
            require: true,
        },
        deleteList: {
            type: Array,
            require: true,
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



    components:{
        DxDataGrid, DxSorting, DxColumn, DxScrolling
    },

    methods:{
        checkRow(id){
            var index = this.deleteList.indexOf(id);
           if(this.deleteList.indexOf(id) === -1){
               this.deleteList.push(id);
               console.log(this.deleteList);
           } else{
               this.deleteList.splice(index, 1)
           }
        },
        checkAll(isCheckAll){
          if(isCheckAll == true){
              this.$emit('clearDeleteList');
          } else {
              this.workShifts.forEach(item => {
                if(this.deleteList.indexOf(item.WorkShiftId) === -1){
                    this.deleteList.push(item.WorkShiftId);
                }
              });
          }
      },
      updateWorkShift(data){
          this.$emit('updateWorkShift', data)
      },

      showPopupDelete(deleteId){
          this.$emit('showPopupDelete',deleteId);
      }
    },

    data(){
        return{

        }
    }
}
</script>

<style>
 @import url('../assets/css/component/DataGrid.css');
</style>
