
<template>
    <div class="container">
        <HeaderApp/>
        <AssetsComponent/>
        <FooterApp/>
    </div>
 

</template>

<script setup>

import FooterApp from '@/components/FooterApp.vue';
import AssetsComponent from '@/components/AssetsComponent.vue';
import HeaderApp from '@/components/HeaderApp.vue';

</script>
<style scoped>
.container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

</style>