<template>
    <div class="container">
        <HeaderApp/>
        <SellComponent/>
        <FooterApp/>
    </div>
</template>
<script setup>
import HeaderApp from '@/components/HeaderApp.vue';
import FooterApp from '@/components/FooterApp.vue';
import SellComponent from '@/components/SellComponent.vue';
</script>

<style scoped>
.container {
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    min-height: 100vh;
}
</style>