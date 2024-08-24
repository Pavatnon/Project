<script setup>
    import HomeView from './HomeView.vue';
    import {useServiceStore} from '@/stores/service'
    import { onMounted } from 'vue';
    const serviceStore = useServiceStore()

    onMounted(async () => {
        await serviceStore.getSelf()
    })
    
</script>
<template>
    <HomeView>
        <div class="flex flex-col items-center my-10">
            <div>{{ serviceStore.userData.username }}</div>
            <div>{{ serviceStore.userData.role }}</div>

        </div>
    </HomeView>
</template>