<template>
    <div class="search-input">
        <div class="search-icon">
            <div class="search-img"></div>
        </div>
        <input class="input-search"
        :value="value"
        @input="updateValue($event.target.value)"
         placeholder="Tìm kiếm ca làm việc" 
         type="text" />
    </div>
</template>

<script>
export default {
    props:{
        value: String,
    },

   components:{
   },

    methods:{
        updateValue(value){
            this.$emit('input', value);
        }
    }

}
</script>

<style scoped>
    @import url('../assets/css/component/SearchInput.css');
</style>