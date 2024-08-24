<script setup>
    import HomeView from './HomeView.vue';
    import {useServiceStore} from '@/stores/service'
    import { onMounted } from 'vue';
    const serviceStore = useServiceStore()

    onMounted(async () => {
        await serviceStore.getAllUser()
    })

</script>
<template>
    <HomeView>
        <div class="grid grid-cols-4 gap-4 my-10">
            <div v-for="user in serviceStore.userData" class="card shadow-md bg-slate-50">
                <div>{{user.username}}</div>
                <div>{{user.role}}</div>
            </div>
        </div>
    </HomeView>
</template>