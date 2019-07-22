/**
 * 必填
 * @type {{trigger: string, message: string, required: boolean}}
 */
export const baseDef = { required: true, message: '该项必填', trigger: 'blur' };

/**
 * 数组类型
 * @type {({} & {trigger: string, message: string, required: boolean} & {type: string})[]}
 */
export const isDefArray = [Object.assign({}, baseDef, { type: 'array' })];

/**
 * 字符串类型
 * @type {({} & {trigger: string, message: string, required: boolean} & {type: string})[]}
 */
export const isDefString = [Object.assign({}, baseDef, { type: 'string' })];

/**
 * 数字类型
 * @type {({} & {trigger: string, message: string, required: boolean} & {type: string})[]}
 */
export const isDefNumber = [Object.assign({}, baseDef, { type: 'number' })];
