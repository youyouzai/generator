<template>
            <el-dialog title="标题" :visible.sync="visible"  width="75%">
                <el-form ref="form" inline :model="form" :rules="undefined">
            <el-form-item  label="日志类型：" prop="type">
            {{ type }}
        </el-form-item><el-form-item  label="操作人：" prop="operator">
            {{ operator }}
        </el-form-item><el-form-item  label="更新时间：" prop="updateTime">
            {{ updateTime }}
        </el-form-item>
        </el-form>
                <div class="sub-container-custom text-right bottom-line">
                    <el-button type="primary" @click="onConfirm" >确定</el-button>
                    <el-button type="danger" @click="hide()">取消</el-button>
                </div>
            </el-dialog>    
        </template>
        <script>
            export default {
                data() {
                    return {visible:false,form:{type:'',operator:'',updateTime:''}}
                },
                computed: {
                    
                },
                mounted(){
                    
                },
                methods: {
                    onConfirm(){
                this.$emit('confirm', this.form)
            },
show(){
                this.visible = true
            },
hide(){
                this.visible = false
            },
                }
            }
        </script>
        <style lang="less">

        </style>