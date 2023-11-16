<script>
import { mapGetters, mapState } from 'vuex'

export default {
    computed: {
        ...mapGetters(['getListCount']),
        ...mapState(['student'])
    },
    mounted() {
        // 先找全局状态，然后 点模块名，再 点属性名
        // console.log(this.$store.state.student.name);
    }
}
</script>

<template>
    {{ $store.getters.getListCount }}

    <h1>{{ getListCount }}</h1>

    <h1>{{ student.name }}</h1>
</template>