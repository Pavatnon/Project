<script setup>
    import { ref, watch } from 'vue';
    import { useRouter, useRoute } from 'vue-router'
    import {useServiceStore} from '@/stores/service'


    const router = useRouter()
    const route = useRoute()

    const serviceStore = useServiceStore()

    const currentMenu = ref('')
    const navBar = [
        {
            role: 'user',
            menu: ['ข้อมูลพนักงานทั้งหมด']
        },
        {
            role: 'admin',
            menu: ['ข้อมูลส่วนตัว', 'ข้อมูลพนักงานทั้งหมด']
        }
    ]
    watch(()=> route.name, (newpage)=>{
        switch (newpage) {
            case 'user-home':
                currentMenu.value = navBar[0]
                break;
            case 'admin-home':
                currentMenu.value = navBar[1]
                break;
        }
    }, {immediate:true})

    const changeTab = (newdata) => {
        switch (newdata) {
            case navBar[1].menu[0]:
                currentMenu.value = navBar[0]
                router.push({
                    name:'user-home'
                })
                break;
            case navBar[1].menu[1]:
                currentMenu.value = navBar[1]
                router.push({
                    name:'admin-home'
                })
                break
        }
    }
</script>
<template>
    <nav class="flex flex-row bg-slate-300 justify-center gap-4"> 
        <button v-if="serviceStore.userData.role === 'admin'"v-for="menu in navBar[1].menu" 
                class="btn btn-ghost"
                :class="currentMenu === menu? 'btn-active': ''"
                @click="changeTab(menu)"
        >
        {{ menu }}
        </button>
        <button v-if="serviceStore.userData.role === 'user'"v-for="menu in navBar[0].menu" 
                class="btn btn-ghost"
                :class="currentMenu === menu? 'btn-active': ''"
                @click="changeTab(menu)"
        >
        {{ menu }}
        </button>
    </nav>
    <div class="container mx-auto">
        <slot></slot>
    </div>

</template>