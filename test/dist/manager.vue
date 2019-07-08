<template>
            <div>
                <el-form ref="form" inline :model="form" :rules="undefined">
            <el-form-item label="国家：" prop="country">
            <el-select v-model="country"  >
                    <el-option v-for="(item, index) in countryDataSource" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
        </el-form-item>
        </el-form><el-table :data="userTable" border style="width: 100%">
            <el-table-column  prop="name" label="名称">
            
        </el-table-column>
        </el-table>
            </div>
        </template>
        <script>
            export default {
                props: {
                    
                },
                data() {
                    return {countryDataSource:[{label:"英国",value:"English"},{label:"美国",value:"American"}],form:{country:""},userTable:[]}
                },
                methods: {}
            }
        </script>
        <style lang="less">

        </style>