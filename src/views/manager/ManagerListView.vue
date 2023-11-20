<script>
import { adminList, addAdmin, updateAdmin, deleteAdmin } from '@/api/user'

import { routes } from '@/router/index.js'
import { ElMessage } from 'element-plus'
import { now } from 'lodash'
import { roleAll,getRoleByUserId } from '../../api/user'

export default {
    data() {
        return {
            //是否打开抽屉效果
            drawer: false,
            // 10086添加管理员 10010编辑管理员
            interfaceType: '10086', 
            //管理员数据
            formData: {
                id: '',
                username: '',
                password: '',
                clientId: '',
                roleList: []
            },
            //数据
            tableData: {},
            //分页
            page: {size:10, current:1},
            //查询参数
            data: {},
            // 权限集合
            roles: [],
            // 默认选中项
            defaultCheckedKeys: [],
        }
    },
    methods: {
        //获取树形结构中选中的值
        formatCheckedKeys() {
            //选中的值
            const list = this.$refs.treeRef.getCheckedNodes(true);
            list.forEach(item => {
                this.formData.roleList.push({"id": item.id});
            })
        },
        addClick() {
            //展示弹框
            this.drawer = true;
            //10086新增，10010编辑
            this.interfaceType = '10086';
            //获取数据
            roleAll().then(res => {
                this.roles = res.data;
            })
        },
        add() {
            //获取选中权限
            this.formatCheckedKeys();
            //将数据添加到服务器中
            addAdmin(this.formData).then(res => {
                if(res.code == '200'){
                    ElMessage.success(res.msg);
                    //关闭抽屉效果
                    this.drawer = false;
                    //重新获取最新数据
                    this.adminList();
                }else{
                    ElMessage.error(res.msg);
                }
            });
        },
        editClick(row) {
            this.interfaceType = '10010'
            //打开抽屉
            this.drawer = true;

            this.formData.id = row.id;
            this.formData.username = row.username;
            this.formData.password = '';
            this.formData.clientId = row.clientId;

            //获取所有角色
            roleAll().then(res => {
                this.roles = res.data;
            })
            const checkedKeys = [];
            //获取当前用户已有角色
            getRoleByUserId(row.id).then(res => {
                res.data.forEach(item => {
                    checkedKeys.push(item.id);
                })
                this.defaultCheckedKeys = checkedKeys;
            });
        },
        update() {
            if(this.formData.adminname == '' || this.formData.password == '') {
                ElMessage.error("用户名、密码不可为空")
                return
            }
            //获取当前用户选中的权限
            this.formatCheckedKeys();
            //提交修改信息
            addAdmin(this.formData).then(res => {
                if(res.code == '200'){
                    ElMessage.success(res.message);
                    //关闭抽屉效果
                    this.drawer = false;
                    //重新获取最新数据
                    this.adminList();
                }else{
                    ElMessage.error(res.message);
                }
            });

        },
        deleteClick(row) {
            deleteAdmin(row.id).then(res => {
                if(res.code == '200'){
                    //成功
                    ElMessage.success(res.message);
                    //重新获取最新数据
                    this.adminList();
                }else{
                    ElMessage.error(res.message);
                }
            })
        },
        close() {
            //清空所有状态
            this.roles = [];
            this.formData = {
                id: '',
                username: '',
                password: '',
                clientId: '',
                roleList: []
            };
            this.defaultCheckedKeys = [];
        },
        handleSizeChange() {
            this.page.current = 1;
            this.adminList();
        },
        handleCurrentChange() {
            this.adminList();
        },
        adminList() {
            adminList(this.page, this.data).then(res => {
                this.tableData = res.data;
            })
        }

    },
    //生命同期函数
    mounted() {
        //获取管理员列表
        this.adminList();
    },
    //计算属性
    computed: {
    }
}
</script>

<template>
    <div>
        <div class="header">
            用户列表
            <el-button type="success" @click="addClick">添加用户</el-button>
        </div>

        <!-- 主页面 -->
        <el-table :data="tableData.records" style="width: 100%">
            <el-table-column prop="username" label="管理员名称" />
            <el-table-column prop="clientId" label="ClientId"  />
            
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
                <h4>{{ interfaceType == '10086' ? '添加用户' : '编辑用户' }}</h4>
            </template>

            <el-form label-width="120px">
                <el-form-item label="账号">
                    <el-input placeholder ="请输入账号" v-model="formData.username"/>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input placeholder ="请输入密码" v-model="formData.password"/>
                </el-form-item>
                <el-form-item label="ClientId">
                    <el-input placeholder ="用于标识发起访问令牌请求的客户端(admin-app/client-app)" v-model="formData.clientId"/>
                </el-form-item>
                <el-form-item>
                    <el-tree show-checkbox :default-checked-keys="defaultCheckedKeys" :default-expand-all="true" ref="treeRef" :data="roles" :props="{ id: 'id', label: 'name' }" node-key="id"/>
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
