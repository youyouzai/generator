import { httpGet } from './http';
/**
 * 获取对象的属性值
 * @param {对象} target 
 * @param {属性字段，支持a.b.c} field 
 */
export function getField(target, field){
    if(!field){
        return target;
    }
    const fields = field.split('.');
    let result = target[fields[0]];
    for(let i = 1; i< fields.length; i++){
        if(!result){
            return result;
        }
        result = result[fields[i]];
    }
    return result;
}
/**
 * 处理数据源，共支持三种数据结构：
 * [{label:  '', value: ''}]
 * {key: value}
 * [value, value1]
 * @param {Array} dataSource  初始数据集
 * @param {String} labelField 标签对应的属性名
 * @param {String} valueField 值对应的属性名
 */
export function getList(dataSource, labelField, valueField) {
    if(toString.call(dataSource === '[object Array]')){
        return dataSource.map((item) => {
            let result = null;
            if(typeof(item) === 'object'){
                result = {
                    key: item[valueField],
                    label: item[labelField],
                    value: item[valueField]
                }
            } else {
                result = {
                    key: item,
                    label: item,
                    value: item
                }
            }
            return result;
        });
    }else if(toString.call(dataSource === '[object Object]')){
        let result = [];
        for(const key in dataSource) {
            result.push({
                key,
                label: dataSource[key],
                value: key
            });
        }
        return result;
    }else {
        return [];
    }
}
/**
 * 处理请求url，共支持两种数据结构
 * ① 请求地址字符串
 * ② promise对象
 * @param {VueComponent} target 组件对象
 * @param {Object} params 请求参数
 */
export  function getDataSourceByUrl(target, params) {
    if(!target.url) return Promise.reject('url 不能为空！');
    return new Promise(function(resolve, reject) {
        function success(response) {
            const dataSource = getField(response, target.dataField);
            resolve(dataSource);
        }
        function fail(err) {
            reject(err)
        }
        if(target.url.then){
            // promise对象
            target.url.then(success, fail)
        }else if(typeof(target.url) === 'string'){
            httpGet(target.url, { params }).then(success, fail);
        }
    })
    
}
