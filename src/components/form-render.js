import Vue from 'vue'
(function(){
    function createElementByType(h, self){
        if(self.options.render){
            return self.options.render.call(null, h, self.options)
        }
        function inputEvent(value) {
            self.$emit('input', value)
        }
        switch(self.options.type){
            case 'input':
                return (
                    <el-input value={self.value} placeholder={self.options.childAttrs.placeholder} oninput={inputEvent}></el-input>
                );
            case 'select':
                return (
                    <el-select value={self.value} placeholder={self.options.childAttrs.placeholder} onchange={inputEvent}>
                        { self.options.options.map((item, index) =>
                            <el-option
                                key={ index }
                                label={ item }
                                value={ String(index) }>
                            </el-option>
                        ) }
                    </el-select>
                );
            default:
                // return throw Error(options.type+'类型未找到');
        }
    }
    Vue.component('simple-form-render', {
        model: {
            prop: 'value',
            event: 'input'
        },
        props: {
            options: Object,
            value: String,
        },
        render(h) {
            return createElementByType(h, this, this.options, this.value)
        },
    })
})();
