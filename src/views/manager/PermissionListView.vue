<script>
import { permissionList, addAdmin, updateAdmin, deleteAdmin } from '@/api/user'

import { routes } from '@/router/index.js'
import { ElMessage } from 'element-plus'
import { now } from 'lodash'

export default {
    data() {
        return {
            //当前页
            // currentPage: 1,
            //是否打开抽屉效果
            drawer: false,
            //路由信息
            menus: routes[0].children,
            //管理员数据
            formData: {
                adminname: '',
                password: '',
                role: '',
                checkedKeys: ''
            },
            //默认选中项
            defaultCheckedKeys: [],
            interfaceType: '10086', // 10086添加管理员 10010编辑管理员,

            //数据
            tableData: {},
            //分页
            page: {size:10, current:1},
            //查询参数
            data: {}
        }
    },
    methods: {
        addClick() {
            this.drawer = true;
            this.interfaceType = '10086'
        },
        close() {
            //清空所有状态
            this.formData = {};
            this.defaultCheckedKeys = [];
            if(this.$refs.treeRef){
                this.$refs.treeRef.setCheckedKeys([])
            }
        },
        handleSizeChange() {
            this.permissionList();
        },
        handleCurrentChange() {
            this.permissionList();
        },
        permissionList() {
            permissionList(this.page, this.data).then(res => {
                this.tableData = res.data;
            })
        }

    },
    //生命同期函数
    mounted() {
        //获取管理员列表
        this.permissionList();
    },
    //计算属性
    computed: {
    }
}
</script>

<template>
    <div>
        <div class="header">
            菜单列表
            <el-button type="success" @click="addClick">添加菜单</el-button>
        </div>

        <el-table :data="tableData.records" style="width: 100%">
            <el-table-column prop="name" label="菜单名称" />
            <el-table-column prop="authority" label="实体名称" />
            <el-table-column prop="url" label="URL" />
            <el-table-column prop="parentId" label="父级" />
            
            <!-- <el-table-column prop="role" label="操作" >
                <template #default="scope">
                    <el-button @click="editClick(scope.row)" size="small" type="primary">编辑</el-button>
                    <el-button @click="deleteClick(scope.row)" size="small" type="success">删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>

        <!-- 用来做分页显示-->
        <el-pagination v-model:current-page="page.current" v-model:page-size="page.size" :page-sizes="[1, 10, 20, 30]" :background="background"
            layout="sizes, prev, pager, next" :total="tableData.total"

            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
        <!-- <el-pagination background v-model:current-page="currentPage" layout="prev, pager, next" :total="tableData.length" /> -->

        <!-- 抽屉效果 -->
        <!-- <el-drawer @close="close" v-model="drawer">
            <template #header>
                <h4>{{ interfaceType == '10086' ? '添加管理员' : '编辑管理员' }}</h4>
            </template>

            <el-form label-width="120px">
                <el-form-item label="管理员账号">
                    <el-input placeholder ="请输入账号" v-model="formData.adminname"/>
                </el-form-item>
                <el-form-item label="管理员密码">
                    <el-input placeholder ="请输入密码" v-model="formData.password"/>
                </el-form-item>
                <el-form-item label="管理员角色">
                    <el-select placeholder="请选择角色" v-model="formData.role">
                        <el-option label="管理员" value="管理员" />
                        <el-option label="超级管理员" value="超级管理员" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-tree show-checkbox :default-checked-keys="defaultCheckedKeys" :default-expand-all="true" ref="treeRef" :data="menus" node-key="path" />
                </el-form-item>
            </el-form>

            <el-button v-if="interfaceType=='10086'" @click="add" type="primary">添加</el-button>
            <el-button v-else @click="update">修改</el-button>
        </el-drawer> -->
    </div>
</template>

<style lang="scss" scoped>
.header{
    margin-bottom: 16px;
}
</style>
