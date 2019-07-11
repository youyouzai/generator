<template>
    <el-dialog title="添加比标题" :visible.sync="visible"  width="75%">
        <el-row>
                    <el-col :span="7">                        
                        <el-form-item label="专题">
                            <span>{{ goodsForm.special }}</span>
                        </el-form-item>                        
                    </el-col>
                    <el-col :span="7">                        
                        <el-form-item label="版块">
                            <span>{{ goodsForm.position }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">                        
                        <el-form-item label="分组" prop="group_id">
                            <span>{{ goodsForm.group === '' ? '无' : goodsForm.group }}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
        <div class="sub-container-custom text-right bottom-line">
            <el-button type="primary" @click="onConfirm" >确定</el-button>
            <el-button type="danger" @click="hide()">取消</el-button>
        </div>
    </el-dialog>    
</template>
<script>
    export default {
        data(){
            return {
                visible: false
            }
        },
        methods: {
            onConfirm(){
                this.$emit('confirm')
            },
            show(){
                this.visible = true
            },
            hide(){
                this.visible = false
            }
        }
    }
</script>