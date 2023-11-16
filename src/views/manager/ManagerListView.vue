<script>
import { adminList, addAdmin, updateAdmin, deleteAdmin } from '@/api/user'

import { routes } from '@/router/index.js'
import { ElMessage } from 'element-plus'
import { now } from 'lodash'

export default {
    data() {
        return {
            tableData: [],
            //当前页
            currentPage: 1,
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
            interfaceType: '10086', // 10086添加管理员 10010编辑管理员
        }
    },
    methods: {
        addClick() {
            this.drawer = true;
            this.interfaceType = '10086'
        },
        //获取树形结构中选中的值
        formatCheckedKeys() {
            //console.log(this.$refs.treeRef.getCheckedNodes(true));

            //根据选中的值得到父级路由
            const list = this.$refs.treeRef.getCheckedNodes(true);

            //用来放父级路由的 label 用的
            const tempList = []
            //最终结果
            const result = []

            // list: 是我们先中的子路由
            list.forEach(item => {
                // parent: 选中后子路由的父级路由
                const parent = this.menus.find(mitem => {
                    return mitem.children.some(child => child.label == item.label)
                });

                // console.log(parent);
                //判断当前父级路由是否在 tempList 中已经有了
                // 2. 第二次遍历用户列表时，发现 tempList 已经有了父级路由
                if(tempList.includes(parent.label)) {
                    // 就直接找到父级路由，在子路由中再添加一个子路由
                    result.find(item => item.label == parent.label).children.push(item);
                } else {
                    //将对应的内容放在tempList中
                    // console.log('1111111',parent.label);
                    tempList.push(parent.label);

                    // 1. 第一次执行时将管理员列表添加进去
                    result.push({
                        label: parent.label,
                        path: parent.path,
                        children: [item]
                    })
                }

                // console.log(result);
                // 将路由权限添加到 formData中
                this.formData.checkedKeys = result;
            })
        },
        add() {
            this.interfaceType = '10086'

            //将管理员数据发送到服务器
            //1. 收集数据
            
            //获取所有的权限路由
            this.formatCheckedKeys();

            //2. 将数据发给服务器
            // console.log(this.formData);
            this.formData.role= this.formData.role == '管理员' ? '1' : '2';

            //将数据添加到服务器中
            addAdmin(this.formData).then(res => {
                //console.log(res);
                if(res.code == '200'){
                    //成功
                    ElMessage.success(res.message);
                    //关闭抽屉效果
                    this.drawer = false;
                    //重新获取最新数据
                    adminList().then(res => {
                        this.tableData = res.data;
                    })
                }else{
                    ElMessage.error(res.message);
                }
                
            });
        },
        editClick(row) {
            this.interfaceType = '10010'

            //打开抽屉
            this.drawer = true;
            //获取当前行数据
            // console.log(row);

            this.formData.adminname = row.adminname;
            this.formData.password = '';
            this.formData.role = row.role == '1' ? '管理员' : '超级管理员';

            // console.log(row);

            const checkedKeys = [];
            row.checkedKeys.forEach(parent => {
                parent.children.forEach(item => {
                    checkedKeys.push(item.path);
                })
            })
            // console.log(checkedKeys);
            this.defaultCheckedKeys = checkedKeys;

        },
        update() {
            // 获取表单数据
            // console.log(this.formData);

            if(this.formData.adminname == '' || this.formData.password == '') {
                ElMessage.error("用户名、密码不可为空")
                return
            }

            this.formData.role = this.formData.role == '管理员' ? '1' : '2'

            //获取当前用户选中的权限
            this.formatCheckedKeys();

            //提交修改信息
            updateAdmin(this.formData).then(res => {
                // console.log(res);
                if(res.code == '200'){
                    //成功
                    ElMessage.success(res.message);
                    //关闭抽屉效果
                    this.drawer = false;
                    //重新获取最新数据
                    adminList().then(res => {
                        this.tableData = res.data;
                    })
                }else{
                    ElMessage.error(res.message);
                }
            });

        },
        deleteClick(row) {
            // console.log(row);
            deleteAdmin({ adminid: row.adminid }).then(res => {
                if(res.code == '200'){
                    //成功
                    ElMessage.success(res.message);
                    //重新获取最新数据
                    adminList().then(res => {
                        this.tableData = res.data;
                    })
                }else{
                    ElMessage.error(res.message);
                }
            })
        },
        close() {
            //清空所有状态
            this.formData = {};
            this.defaultCheckedKeys = [];
            if(this.$refs.treeRef){
                this.$refs.treeRef.setCheckedKeys([])
            }
        }
    },
    //生命同期函数
    mounted() {
        //获取管理员列表
        adminList().then(res => {
            // console.log(res.data);
            this.tableData = res.data;
        })
    },
    computed: {
        computedTableData() {
            return this.tableData.slice((this.currentPage - 1) * 10, ((this.currentPage - 1) * 10) + 10)
        }
    }
}
</script>

<template>
    <div>
        <div class="header">
            管理员列表
            <el-button type="success" @click="addClick">添加管理员</el-button>
        </div>

        <el-table :data="computedTableData" style="width: 100%">
            <!-- type="index" 标记当前为索引序号 -->
            <!-- label 列标题 -->
            <el-table-column type="index" :index="(currentPage - 1) * 10 + 1" label="序号" width="80" />
            <!-- prop 列的数据字段 -->
            <el-table-column prop="adminname" label="管理员名称" width="180" />
            <el-table-column prop="role" label="管理员权限" >
                <template #default="scope">
                    <div>
                        <!-- {{ scope.row.role == 1 ? '管理员' : '超级管理员' }} -->
                        <el-tag :type="scope.row.role == 1 ? '' : 'success'">
                            {{ scope.row.role == 1 ? '管理员' : '超级管理员' }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="role" label="操作" >
                <template #default="scope">
                    <el-button @click="editClick(scope.row)" size="small" type="primary">编辑</el-button>
                    <el-button @click="deleteClick(scope.row)" size="small" type="success">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- {{ currentPage }} -->
        <!-- 用来做分页显示-->
        <el-pagination background v-model:current-page="currentPage" layout="prev, pager, next" :total="tableData.length" />

        <!-- 抽屉效果 -->
        <el-drawer @close="close" v-model="drawer">
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
                    <!--  -->
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
