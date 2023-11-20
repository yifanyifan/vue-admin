<script>
import { roleList, addRole, listTree, updateAdmin, deleteRole, getPermissionByRoleId } from '@/api/user'

import { routes } from '@/router/index.js'
import { ElMessage } from 'element-plus'
import { now } from 'lodash'

export default {
    data() {
        return {
            //是否打开抽屉效果
            drawer: false,
            //管理员数据
            formData: {
                id: '',
                name: '',
                permissionList: []
            },
            //默认选中项
            defaultCheckedKeys: [],
            interfaceType: '10086', // 10086添加管理员 10010编辑管理员,

            //数据
            tableData: {},
            //分页
            page: {size:10, current:1},
            //查询参数
            data: {},
            //菜单集合
            permissions: []
        }
    },
    methods: {
        //获取树形结构中选中的值
        formatCheckedKeys() {
            //最终结果
            const result = [];
            //选中的值
            const list = this.$refs.treeRef.getCheckedNodes(true);
            console.log(list);
            list.forEach(item => {
                // 获取父级路由
                // const parent = this.permissions.find(permission => {
                //     return permission.children.some(child => child.id == item.id)
                // })
                // if(!result.some(i => i.id == parent.id)){
                //     result.push({
                //         id: parent.id,
                //         authority: "CREATE,UPDATE,READ,DELETE"
                //     })
                // }
                result.push({
                    id: item.id,
                    authority: "CREATE,UPDATE,READ,DELETE"
                })
            });
            // 将路由权限添加到 formData中
            this.formData.permissionList = result;
        },
        addClick() {
            this.drawer = true;
            this.interfaceType = '10086'
            //获取菜单数据
            listTree().then(res => {
                this.permissions = res.data;
            })
        },
        add() {
            this.interfaceType = '10086'

            //获取所有的权限路由
            this.formatCheckedKeys();

            //将数据添加到服务器中
            addRole(this.formData).then(res => {
                if(res.code == '200'){
                    ElMessage.success(res.message);
                    //关闭抽屉效果
                    this.drawer = false;
                    //重新获取最新数据
                    this.roleList();
                }else{
                    ElMessage.error(res.message);
                }
                
            });
        },
        editClick(row) {
            this.interfaceType = '10010'
            //打开抽屉
            this.drawer = true;

            this.formData.id = row.id;
            this.formData.name = row.name;

            //获取所有菜单数据
            listTree().then(res => {
                this.permissions = res.data;
            })

            //获取当前已选择菜单
            const checkedKeys = [];
            getPermissionByRoleId(row.id).then(res => {
                res.data.forEach(item => {
                    checkedKeys.push(item.id);
                });
                this.defaultCheckedKeys = checkedKeys;
            })
        },
        update() {
            //获取当前用户选中的权限
            this.formatCheckedKeys();

            //提交修改信息
            addRole(this.formData).then(res => {
                if(res.code == '200'){
                    ElMessage.success(res.message);
                    //关闭抽屉效果
                    this.drawer = false;
                    //重新获取最新数据
                    this.roleList();
                }else{
                    ElMessage.error(res.message);
                }
            });

        },
        deleteClick(row) {
            deleteRole(row.id).then(res => {
                if(res.code == '200'){
                    //成功
                    ElMessage.success(res.message);
                    //重新获取最新数据
                    this.roleList();
                }else{
                    ElMessage.error(res.message);
                }
            })
        },
        close() {
            //清空所有状态
            this.permissions=[];
            this.formData = {
                id: '',
                name: '',
                permissionList: []
            };
            this.defaultCheckedKeys = [];
            
        },
        handleSizeChange() {
            this.page.current = 1;
            this.roleList();
        },
        handleCurrentChange() {
            this.roleList();
        },
        roleList() {
            roleList(this.page, this.data).then(res => {
                this.tableData = res.data;
            })
        }

    },
    //生命同期函数
    mounted() {
        //获取管理员列表
        this.roleList();
    },
    //计算属性
    computed: {
    }
}
</script>

<template>
    <div>
        <div class="header">
            权限列表
            <el-button type="success" @click="addClick">添加权限</el-button>
        </div>

        <!-- 主页面 -->
        <el-table :data="tableData.records" style="width: 100%">
            <el-table-column prop="name" label="权限名称"/>
            <el-table-column prop="role" label="操作" >
                <template #default="scope">
                    <el-button @click="editClick(scope.row)" size="small" type="primary">编辑</el-button>
                    <el-button @click="deleteClick(scope.row)" size="small" type="success">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 用来做分页显示-->
        <el-pagination v-model:current-page="page.current" v-model:page-size="page.size" :page-sizes="[1, 10, 20, 30]" :background="background" layout="sizes, prev, pager, next" :total="tableData.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
   
        <!-- 抽屉效果 -->
        <el-drawer @close="close" v-model="drawer">
            <template #header>
                <h4>{{ interfaceType == '10086' ? '添加权限' : '编辑权限' }}</h4>
            </template>

            <el-form label-width="120px">
                <el-form-item label="名称">
                    <el-input placeholder ="请输入权限名称" v-model="formData.name"/>
                </el-form-item>
                
                <el-form-item>
                    <el-tree show-checkbox :default-checked-keys="defaultCheckedKeys" :default-expand-all="true" ref="treeRef" :data="permissions" :props="{ id: 'id', label: 'name' }" node-key="id"/>
                </el-form-item>
            </el-form>

            <el-button v-if="interfaceType=='10086'" @click="add" type="primary">添加</el-button>
            <el-button v-else @click="update">修改</el-button>
        </el-drawer>
    </div>
</template>

<style lang="scss" scoped>
.header{
    margin-bottom: 16px;
}
</style>
