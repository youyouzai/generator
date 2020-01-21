<template>
  <el-dialog :title="title" :visible.sync="visible" width="75%">
    <simple-transfer 
        v-model="value" 
        :url="$attrs.url" 
        :data="data"
        :label-field="$attrs['label-field']" 
        :value-field="$attrs['value-field']" 
        :data-field="$attrs['data-field']" 
        :titles="$attrs.titles"
        style="height: 500px"
    ></simple-transfer>
    <div class="footer">
      <el-button type="primary" @click="onConfirm">确定</el-button>
      <el-button type="danger" @click="hide()">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
    import SimpleTransfer from '../simple-transfer'

    export default {
        components: {
            SimpleTransfer
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            data: {
                default: ()=> []
            }  
        },
        data() {
            return { 
                visible: false,
                value: []
            };
        },
        methods: {
            onConfirm() {
                this.hide();
                this.$emit("confirm", this.value);
            },
            show() {
                this.visible = true;
            },
            hide() {
                this.visible = false;
            }
        }
    };
</script>
<style lang="less" scoped>
.footer {
    margin-top: 25px;
    text-align: right;
}
</style>