<template>
            <div>
                <el-form ref="form" inline :model="form" :rules="undefined">
            <el-form-item label="国家：" prop="country">
            <el-select v-model="country"  disabled style="background-color: red" >
                    <el-option v-for="item in countryDataSource" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
        </el-form-item>
        </el-form><el-table :data="userTable" border style="width: 100%">
            <el-table-column  prop="name" label="名称">
            
        </el-table-column>
        </el-table>
            </div>
            <div>
                <form>
                <el-form-item v-for="item in arr">
                    
                        <el-select v-if="options.type ==='select'"  disabled style="background-color: red" >
                            <el-options v-for="item in options.data" ></el-options>
                        </el-select>
                    </el-form-item>
                </form>
                </div>
        </template>
        <script>
            export default {
                props: {
                    
                },
                data() {
                    return {countryDataSource:[{label:"英国",value:"English"},{label:"美国",value:"American"}],form:{country:""},userTable:[]}
                },
                getT
                mounted(){
                    this.queryCountry()
                },
                methods: {
                    queryCountry(){
                        this.$http.get('/country/list').then(res => {
                            this.countryDataSource = res.data
                        });
                    },
                }
            }
        </script>
        <style lang="less">

        </style>