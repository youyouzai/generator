<template>
    <div>
        <el-form ref="form" :model="form" :inline="options.inline" :label-width="options.labelWidth" :class="options.class">
            <el-form-item v-for="(item, index) in options.data"
                          :prop="item.key"
                          :class="item.attrs.class"
                          :label="item.label"
                          :rules="item.attrs.rules"
                          :key="index"
            >
                <simple-form-render :options="item" v-model="form[item.key]"></simple-form-render>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import './form-render.js';
    export default {
        props:['options', 'form'],
        data(){
            return {
            }
        },
        created() {
            this.getFormAttr();
        },
        methods: {
            getFormAttr() {
                this.options.data.forEach(({ key, value = '' }) => {
                    this.$set(this.form, key, value);
                });
            }
        }
    }
</script>
