<template>
            <div v-loading="loading">
                <el-form ref="form" inline :model="form" :rules="undefined">
            <el-form-item  label="国家：" prop="country">
            <el-select v-model="country" disabled style="background-color: red" >
                    <el-option v-for="item in countryDataSource" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
        </el-form-item><el-form-item  label="名称：" prop="name">
            <el-input v-model="name" disabled style="background-color: red" >></el-input>
        </el-form-item><el-form-item  label="选择日期：" prop="time">
            <el-date-picker v-model="time" type="daterange" placeholder="请选择日期"  >
             </el-date-picker>
        </el-form-item><el-form-item   >
            <el-button  type="primary"  @click="onSubmit">筛选</el-button><el-button  type="danger"  @click="onReset">重置</el-button>
        </el-form-item>
        </el-form><el-table :data="userTable"   >
            <el-table-column  prop="name" label="名称">
            
        </el-table-column><el-table-column  prop="link" label="商品">
            <a target="_blank" href="http://www.baidu.com"> <span>{{ scope.row.link }}</span></a>
        </el-table-column><el-table-column  prop="imgUrl" label="图片">
            <template  slot-scope="scope">
            <img class="table-img" :src="domain + scope.row.imgUrl" width="90" height="120">
        </template>
        </el-table-column><el-table-column   label="操作">
            <template  slot-scope="scope"><el-button
                size="mini"
                @click="onViewClick(scope.row, scope.$index)">查看</el-button><el-button
                size="mini"
                @click="onEditClick(scope.row, scope.$index)">编辑</el-button></template>
        </el-table-column>
        </el-table>
            </div>
        </template>
        <script>
            export default {
                props: {
                    
                },
                data() {
                    return {loading:false,form:{country:"",name:"",time:""},countryDataSource:[{label:"英国",value:"English"},{label:"美国",value:"American"}],userTable:[],total:0}
                },
                computed: {
                    domain() {
            return this.$store.getters.getDomain + '/';
        },
                },
                mounted(){
                    this.queryCountry()
this.queryUsertable()
                },
                methods: {
                    queryCountry(){
            this.$http.get('/country/list').then(res => {
                this.countryDataSource = res.data
            });
        },
onSubmit(){
                        this.$refs['form'].validate( valid => {
                            if (valid) {
                                this.queryUsertable()
                            }
                        })
                    },
onReset(){
                        this.$refs.form.resetFields()
                    },
queryUsertable(){
            this.$http.get('/users/list' , {params: this.form}).then(res => {
                this.loading = false;
                if (res.body.code === 0) {
                    let data = res.body.data;
                    this.userTableDataSource = data.data
                    this.total = data.total;
                }
            }).catch(err => {
                this.loading = false;
            });
        },
onViewClick(row, rowIndex){
                // todo: do something for onViewClick
            },
onEditClick(row, rowIndex){
                // todo: do something for onEditClick
            },
                }
            }
        </script>
        <style lang="less">

        </style>