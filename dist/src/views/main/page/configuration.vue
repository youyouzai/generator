<template>
            <div v-loading="loading">
                <div class="form-container">
            <el-form ref="form" inline :model="form" >
                <el-form-item  label="搜索" prop="text">
            <el-input v-model="form.text" ></el-input>
        </el-form-item>
                <el-form-item>
                <el-button  type="primary"  @click="onSubmit">筛选</el-button>
                <el-button  type="info"  @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div><div class="table-container">
            <el-table :data="tableList"   >
                <el-table-column  prop="name" label="道号" >
            
        </el-table-column><el-table-column  prop="profession" label="封号" >
            
        </el-table-column><el-table-column  prop="flag" label="四象" >
            
        </el-table-column>
            </el-table>
        </div>
        
            </div>
        </template>
        <script>
             
            export default {
                components: {
                    
                },
                props: {
                    
                },
                data() {
                    return {loading:false,form:{text:''},tableList:[{name:'青龙',profession:'孟章神君',flag:'青龙为木'},{name:'白虎',profession:'监兵神君',flag:'白虎为金'},{name:'朱雀',profession:'陵光神君',flag:'玄武为水'},{name:'玄武',profession:'执明神君',flag:'中央黄龙为土'}]}
                },
                computed: {
                    
                },
                mounted(){
                    
                },
                methods: {
                    onSubmit(){
                    this.$refs['form'].validate( valid => {
                        if (valid) {
                            this.queryTable()
                        }
                    })
                },
onReset(){
                    this.$refs['form'].resetFields()
                },
                }
            }
        </script>
        <style lang="less">
        </style>