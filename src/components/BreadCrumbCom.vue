<script>
import { routes } from '@/router/index'

import { mapMutations } from 'vuex'

export default {
    data () {
        // 用来记录所有路由 name 对应的 label
        this.routesMap = new Map();
        // 用来处理将路由处理成 map
        this.initRoutesMap(routes)

        // console.log(this.routesMap);

        return {
            list: []
        }
    },
    methods: {
        // 0: home → "首页"
        // 1: manager → "账号管理"
        // 2: managerlist → "管理员列表"
        // 3: userlist → "用户员列表"
        // 4: banner → "轮播图管理"
        // 5: bannerlist → "轮播图列表"
        // 6: addbanner → "添加轮播图"
        ...mapMutations(['updateCurrentPath']),
        initRoutesMap(routes) {
            routes.forEach(route => {
                this.routesMap.set(route.name, route.label);
                //如果有子路由
                if(route.children) {
                    this.initRoutesMap(route.children);
                }
            })
        }
    },
    mounted () {
        // 带 r 就是用来做页面路由跳转用的
        //this.$router.push()
        // 不带 r 的是用来做路由信息查询用的
        // console.log(this.$route);
    },
    watch: {
        $route: {
            immediate: true,
            handler(route) {
                //处理路径
                
                //记录当前的页面路由路径
                this.updateCurrentPath(route.path);

                this.list = route.matched.map(item => {
                    return {
                        name: item.name,
                        label: this.routesMap.get(item.name)
                    }
                });
            }
        }
    }
}
</script>

<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in list" :key="item.name" :to="{ name: item.name }">{{ item.label }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<style lang="scss" scoped>
.el-breadcrumb {
    margin-bottom: 20px;
}
</style>