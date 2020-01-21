import vue from 'vue';
import { Message } from 'element-ui';

const defaultErr = '感觉有什么不对~~';

/**
 * 
 * 返回参数结构： { code: 0,  msg: '', data:[] }
 *
 */
export function httpGet(url, params) {
    if(!vue.http) {
        Message.error(new Error('vue.http对象不存在，请添加HTTP库!')) 
        return;
    }
    return new Promise((resolve, reject) =>{        
        vue.http.get(url, {            
            params: params        
        }).then(res => {
            const responseData = res.data;
            if(responseData.code === 0) {
                resolve(responseData.data);
            }else {
                reject(new Error(responseData.msg || defaultErr))
            }
            
        }).catch(err =>{
            Message.error(defaultErr)
            reject(err)        
        })
    })
}
