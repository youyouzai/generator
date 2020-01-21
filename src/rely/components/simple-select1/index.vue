<template>
    <div  class="u-simple-select">
        <el-input v-model="condition" :placeholder="placeholder" @input="search"></el-input>
        <div class="panel">
            <el-row class="item">
                <el-col :span="18">全部</el-col>
                <el-col :span="6">
                    <el-checkbox v-model="selectedAll" :disabled="disabled" @change="onAllSelectedChange"></el-checkbox>
                </el-col>
            </el-row>
            <el-row v-for="(item, index) in dataSource" :key="index" class="item">
                <el-col :span="18">{{ item.label }}</el-col>
                <el-col :span="6">
                    <el-checkbox v-model="item.selected" :disabled="disabled"></el-checkbox>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import { getList, getDataSourceByUrl } from  '../../util/util'

    export default {
        props: {
            url: {
                default: ''
            },
            data: {
                default: ()=> []
            },
            value: {
                default: ()=> []
            },
            disabled: {
                type: Boolean,
                default: false
            },
            labelField: {
                type: String,
                default: 'label'
            },
            valueField: {
                type: String,
                default: 'value'
            },
            dataField: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: '请输入查询条件'
            }
        },
        data() {
            return {
                selectedAll: false,
                dataMap: {},
                dataSource: [],
                condition: '',
            };
        },
        watch: {
            dataMap: {
                handler(newVal) {
                    // 获取选中的值
                    const result = [];
                    for (const key in newVal) {
                        const item = newVal[key];
                        if (item.selected) {
                            result.push(item.value);
                        }
                    }
                    this.$emit('input', result);
                },
                deep: true
            }
        },
        mounted() {
            this.initDataMap(this.data);
            this.init();
        },
        methods: {
            init(params) {
                this.query(params);     
            },
            async query(params) {
                const dataSource = await getDataSourceByUrl(this, params);
                this.initDataMap(dataSource);
            },
            initDataMap(dataSource) {
                const map = {};
                const arr = getList(dataSource, this.labelField, this.valueField);
                arr.forEach((item) => {
                    item.selected = (this.value.indexOf(item.value) > -1);
                    map[item.value] = item;
                });
                this.dataSource = arr;
                this.dataMap = map;
            },
            search() {
                const reg = /\s*,\s*/;
                const conditions = this.condition.split(reg);
                const arr = [];
                for (const key in this.dataMap) {
                    const item = this.dataMap[key];
                    if (!this.condition) {
                        arr.push(item);
                    } else {
                        for (let i = 0; i < conditions.length; i++) {
                            const value = conditions[i].toUpperCase();
                            if (value !=='' && item[this.labelField].toUpperCase().indexOf(value) > -1) {
                                arr.push(item);
                                break;
                            }
                        }
                    }
                }
                this.dataSource = arr;
            },
            onAllSelectedChange() {
                this.dataSource.forEach((item) => {
                    item.selected = this.selectedAll;
                });
            }
        }
    }

</script>
<style lang="less" scoped>
    .u-simple-select {
        width: 100%;
        max-width: 500px;
        .panel {
            max-height: 380px;
            border: 1px solid #DCDFE6;
            outline: 0;
            padding: 3px 10px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            border-radius: 3px;
            overflow-y: auto;
            margin-top: 20px;
        }
        .item{
            line-height: 36px;
            text-align: left;
            font-size: 14px;
        }
    }
</style>
