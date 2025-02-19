<template>
    <div class="container"> 
        <HeaderApp/>
        <TransactionEdit/>
        <FooterApp/>
    </div>
</template>

<script setup>
    import TransactionEdit from '../components/TransactionEdit.vue'
    import HeaderApp from '@/components/HeaderApp.vue';
    import FooterApp from '@/components/FooterApp.vue';
</script>

<style scoped>
.container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}
</style>