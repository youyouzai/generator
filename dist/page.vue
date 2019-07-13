<template>
            <div v-loading="loading">
                <el-form ref="form" inline :model="form" :rules="undefined">
            <el-form-item  label="国家sss：" prop="country">
            <el-select v-model="table.country" placeholder="请选择国家" >
                    <el-option v-for="item in countryList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
        </el-form-item><el-form-item  label="语言11：" prop="lang222">
            <el-select v-model="table.lang222" >
                    <el-option v-for="item in lang222List" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
        </el-form-item><el-form-item  label="名称：" prop="name">
            <el-input v-model="table.name" ></el-input>
        </el-form-item><el-form-item  label="日期：" prop="date">
            <el-date-picker v-model="table.date" type="daterange"  >
             </el-date-picker>
        </el-form-item>
        </el-form><el-table :data="table"   >
            <el-table-column    width="70" type="selection" >
            
        </el-table-column><el-table-column  prop="name" label="商品" width="180" >
            
        </el-table-column><el-table-column  prop="imgUrl" label="图片" width="undefined" >
            <template  slot-scope="scope">
            <img class="table-img" :src="domain + scope.row.imgUrl" width="90" height="120">
        </template>
        </el-table-column><el-table-column  prop="product" label="链接" width="180" >
            <a target="_blank" href="undefined"> <span>{{ scope.row.product }}</span></a>
        </el-table-column><el-table-column   label="操作" width="undefined" >
            <template  slot-scope="scope"><el-button
                size="mini"
                @click="onViewClick(scope.row, scope.$index)">查看</el-button><el-button
                size="mini"
                @click="onEditClick(scope.row, scope.$index)">编辑</el-button></template>
        </el-table-column>
        </el-table> <div class="text-right el-sub-container">
            <el-pagination :current-page="pagination.pageNo" :page-size="pagination.pageSize" :total="pagination.total" 
            :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" 
            @size-change="changePage" @current-change="changePage"></el-pagination>
        </div>
                <my-dialog ></my-dialog>
            </div>
        </template>
        <script>
             import myDialog from './components/myDialog'
            export default {
                components: {
                    myDialog
                },
                props: {
                    
                },
                data() {
                    return {loading:false,form:{country:'',lang222:'',name:'',date:''},countryList:[],lang222List:[{label:'英国',value:'English'},{label:'美国',value:'American'}],table:[],pagination:{pageNo:1,pageSize:10,total:0}}
                },
                computed: {
                    domain() {
            return this.$store.getters.getDomain + '/';
        },
                },
                mounted(){
                    this.queryCountry()
this.queryTable()
                },
                methods: {
                    queryCountry(){
            this.$http.get('/country/list').then(res => {
                this.countryList = res.data
            });
        },
queryTable(){
            this.$http.get('/users/list' , {params: this.form}).then(res => {
                this.loading = false;
                if (res.body.code === 0) {
                    let data = res.body.data;
                    this.tableList = data.data
                    this.pagination.total = data.total;
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
changePage(){
            this.queryTable()
        },
                }
            }
        </script>
        <style lang="less">

        </style>