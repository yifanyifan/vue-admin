<script>
import { permissionList, addAdmin, updateAdmin, deletePermission, permissionAll, addPermission } from '@/api/user'

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
                id: null,
                name: null,
                authority: null,
                url: null,
                permissionType: '11',
                parentId: null
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
        addClick(param) {
            this.drawer = true;
            this.interfaceType = '10086';
            this.formData.parentId = (param == 0) ? '-1' : param;
        },

        add() {
            //将数据添加到服务器中
            addPermission(this.formData).then(res => {
                if(res.code == '200'){
                    ElMessage.success(res.msg);
                    //关闭抽屉效果
                    this.drawer = false;
                    //重新获取最新数据
                    this.parentMonth();
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
            this.formData.name = row.name;
            this.formData.authority = row.authority;
            this.formData.url = row.url;
            this.formData.permissionType = '11';
            this.formData.parentId = row.parentId;
        },
        update() {
            if(!this.formData.name || !this.formData.url) {
                ElMessage.error("名称和URL不可为空")
                return
            }
            //更新
            addPermission(this.formData).then(res => {
                if(res.code == '200'){
                    ElMessage.success(res.msg);
                    //关闭抽屉效果
                    this.drawer = false;
                    //重新获取最新数据
                    this.parentMonth();
                    if (this.$refs.treeTable) {
                        this.$refs.treeTable.load();
                    }
                }else{
                    ElMessage.error(res.msg);
                }
            });
        },
        deleteClick(row) {
            deletePermission(row.id).then(res => {
                if(res.code == '200'){
                    ElMessage.success(res.message);
                    //重新获取最新数据
                    this.parentMonth();
                }else{
                    ElMessage.error(res.message);
                }
            })
        },

        close() {
            //清空所有状态
            this.formData = {};
            this.defaultCheckedKeys = [];
        },
        handleSizeChange() {
            this.parentMonth();
        },
        handleCurrentChange() {
            this.parentMonth();
        },
        //父级列表（有分页）
        parentMonth() {
            permissionList(this.page, {parentId: '-1'}).then(res => {
                this.tableData = res.data;
            })
        },
        //加载子集列表
        load(tree, treeNode, resolve){
            permissionAll({parentId: tree.id}).then(res => {
                resolve(res.data);
            })
        }

    },
    //生命同期函数
    mounted() {
        //获取管理员列表
        //this.permissionList();
        this.parentMonth();
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
            <el-button type="success" @click="addClick('0')">添加父级菜单</el-button>
        </div>

        <el-table ref="treeTable" :data="tableData.records" style="width: 100%" row-key="id" lazy="true" :load="load" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column prop="name" label="菜单名称" />
            <el-table-column prop="authority" label="实体名称" />
            <el-table-column prop="url" label="URL" />
            <!-- <el-table-column prop="parentStr" label="父级" /> -->
            <el-table-column prop="role" label="操作" >
                <template #default="scope">
                    <el-button @click="editClick(scope.row)" size="small" type="primary">编辑</el-button>
                    <el-button @click="deleteClick(scope.row)" size="small" type="info">删除</el-button>
                    <el-button v-if="scope.row.parentId=='-1'" @click="addClick(scope.row.id)" size="small" type="success">新增子菜单</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 用来做分页显示-->
        <el-pagination v-model:current-page="page.current" v-model:page-size="page.size" :page-sizes="[1, 10, 20, 30]" :background="background" layout="sizes, prev, pager, next" :total="tableData.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

        <!-- 抽屉效果 -->
        <el-drawer @close="close" v-model="drawer">
            <template #header>
                <h4>{{ interfaceType == '10086' ? '添加菜单' : '编辑菜单' }}</h4>
            </template>

            <el-form label-width="120px">
                <el-form-item label="菜单名称">
                    <el-input placeholder ="请输入" v-model="formData.name"/>
                </el-form-item>

                <el-form-item v-if="this.formData.parentId!='-1'" label="实体名称">
                    <el-input placeholder ="请输入" v-model="formData.authority"/>
                </el-form-item>
                <el-form-item label="URL">
                    <el-input placeholder ="请输入" v-model="formData.url"/>
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
