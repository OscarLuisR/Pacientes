<!-- eslint-disable -->
<template>
    <div>
        <dashboard-header />

        <router-view></router-view>

        <dashboard-footer />
    </div>
</template>

<!-- eslint-disable -->
<script>
    export default {
        name: "DashboardIndex",

        components: {
            DashboardHeader: () => import(/* webpackChunkName: "Header" */ "../components/DashboardHeader"),
            DashboardFooter: () => import(/* webpackChunkName: "Footer" */ "../components/DashboardFooter")
        }
    };
</script>
