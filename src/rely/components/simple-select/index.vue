<template>
    <el-select 
        v-model="currentValue" 
        :clearable="clearable"
        :multiple="multiple"
        :filterable="filterable"
        :placeholder="placeholder"  
        @change="onChange">
        <el-option v-for="(item,index) in list" :key="index" :value="item.value" :label="item.label"></el-option>
    </el-select>
</template>

<script>
import {getList, getDataSourceByUrl } from  '../../util/util'
export default {
    props: {
        value: {
            type: [String, Number, Array],
            default: ''
        },
        url: {
            default: ''
        },
        data: {
            default: ()=> []
        },
        labelField: {
            type: String,
            default: 'label'
        },
        valueField: {
            type: String,
            default: 'value'
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        clearable: {
            type: Boolean,
            default: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
        filterable: {
            type: Boolean,
            default: true
        },
        dataField: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            currentValue: null,
            dataSource: []
        }
    },
    computed: {
        list() {
            return getList(this.dataSource, this.labelField, this.valueField);
        }
    },
    watch: {
        data(val) {
            this.dataSource = val;
        },
        value(val) {
            this.currentValue = val;
        }
    },
    mounted() {
        this.currentValue = this.value;
        this.dataSource = this.data;
        this.init();
    },
    methods: {
        async init(params) {
            const dataSource = await getDataSourceByUrl(this, params);
            this.dataSource = dataSource;
        },
        onChange(){
            this.$emit('input', this.currentValue);
            this.$emit('change', this.currentValue);
        }
    }
}

</script>
<style>
</style>