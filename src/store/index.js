// src/store/index.js
import { createStore } from "vuex"
// 导入数据持久化操作的创建函数
import createPersistedState from "vuex-persistedstate"

//导入状态模块
import student from './student'

// 定义全局状态的实例
const store = createStore({
    // 严格模式，在生产环境中不要打开
    strict: process.env.NODE_ENV !== 'production',
    //定义全局状态有哪些
    state () {
        //全局状态
        return {
            count: 100,
            // 放用户信息的对象
            userInfo: {

            },
            userAll: {
                
            },
            //记录当前的路由路径
            currentPath: '/',
            list: ['q','w','e','r']
        }
    },
    // 唯一修改数据的方法
    mutations: {
        add(state){
            // setTimeout(()=>{
                state.count++
            // }, 5000)
        },
        addNum (state, value) {
            state.count += value;
        },
        // 保存用户数据（Token）
        updateUserInfo (state, value) {
            state.userInfo = value;
        },
        // 保存用户信息（权限等）
        updateUserAll (state, value) {
            state.userAll = value;
        },
        //修改路由路径的方法
        updateCurrentPath(state, value) {
            state.currentPath = value;
        }
    },
    // 异步修改数据的地方
    actions: {
        addActions(context) {
            // console.log(context);
            // 所谓的异步也还要调用同步的方法来进行修改数据
            setTimeout(()=>{
                context.commit('add')
            }, 5000)
        },
        addnumActions({commit}, value) {
            commit('addNum', value)
        }
    },
    // 是 vuex 中的计算属性（可以认为是 store 的计算属性）
    getters: {
        //state 就是全局状态
        getListCount(state) {
            return state.list.length * 10
        }
    },
    // 状态模块
    modules: {
        student
    },
    // vuex配置插件
    plugins: [
        // 创建持久化对象
        createPersistedState({
            // 配置需要持久化的数据
            reducer: state => {
                return {
                    // 需要持久化的数据
                    userInfo: state.userInfo
                }
            }
        })
    ]
})

// 导出创建好的实例
export default store