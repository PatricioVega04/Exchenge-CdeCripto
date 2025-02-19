<template>
    <HeaderApp/>
    <TransactionDetail/>
    <FooterApp/>
</template>

<script setup>
    import HeaderApp from '@/components/HeaderApp.vue';
    import TransactionDetail from '@/components/TransactionDetail.vue';
    import FooterApp from '@/components/FooterApp.vue';
</script>

<style scoped>
.container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}
</style>