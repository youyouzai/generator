<template>
  <div>
      <el-input v-model="text"  placeholder="请选择"  @focus="onInputClick" />
      <simple-transfer-dialog 
        ref="dialog" 
        v-model="selectValue"
        :url="$attrs.url" 
        :data="data"
        :label-field="$attrs['label-field']" 
        :value-field="$attrs['value-field']" 
        :data-field="$attrs['data-field']" 
        :titles="$attrs.titles"
        @confirm="onConfirm"
    ></simple-transfer-dialog>
  </div>
</template>

<script>
import SimpleTransferDialog from '../simple-transfer-dialog'

export default {
    props: {
        value: {
            type: Array,
            default: () => []
        },
        data: {
            default: ()=> []
        } 
    },
    components: {
        SimpleTransferDialog
    },
    data() {
        return {
            text: '',
            selectValue:[]
        }
    },
    watch: {
        value(val){
            this.selectValue = val;
        },
        selectValue(val) {
            this.text = val.join(',');
        }
    },
    mounted() {
        this.selectValue = this.value;
    },
    methods: {
        onInputClick(){
            this.$refs.dialog.show();
        },
        onConfirm(value) {
            this.$emit('input', value);
        }
    }
}

</script>
<style>
</style>