<script setup>
    import {useCartStore} from '@/stores/cart'
    
    import { useRoute, useRouter, RouterLink } from 'vue-router'
    import { onMounted, ref } from 'vue';


    const cartStore = useCartStore()

    const router = useRouter()
    const route = useRoute()

    const menutype = [
        {
            type: 'รายการอาหารทั้งหมด'
        },
       
        {
            type: 'อาหารจานหลัก',
            subtype: ['อาหารจานเดี่ยว','เมนูทอด', 'เมนูย่าง', 'เมนูต้ม', 'เมนูนึ่ง']
        },
        {
            type: 'เมนูทานเล่น',
            subtype: ['ของหวาน', 'ขนม', 'ของทอด']
        },
        {
            type: 'เครื่องดื่ม',
            subtype: ['น้ำดื่ม' ,'กาแฟ', 'น้ำอัดลม', 'แอลกอฮอล์']
        },
    ]
    const systemmenutype = [
        {
            type: 'ระบบ',
            subtype: ['ตรวจสอบ Order']
        },
    ]

    const searchText = ref('')
    const showSearchbar = ref(false)

    onMounted(()=>{
        router.push({query:{type:'รายการอาหารทั้งหมด'}})
        cartStore.loadCart()
    })

    const selectType = (type) =>{
        router.push({query:{type:type}})
    }
    const searchHanddle = (event) =>{
       router.push({query:{
            type:route.query.type,
            id:searchText.value
        }})
        if(event.isTrusted){
            showSearchbar.value = !showSearchbar.value
        }
    }

    
</script>
<template>
    <div class="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <!-- nav bor -->
            <div class="flex flex-row items-center justify-between bg-base-200 p-4 h-12 lg:hidden">
                <!-- menuToggle -->
                <label for="my-drawer-2" class="drawer-button">
                    <IconList icontype="menu" color="black" size="25" />
                </label>
                <!-- logo -->
                <div v-if="!showSearchbar" class="text-2xl font-bold">
                    Restuarant
                </div>
                <div class="flex mx-4">
                    <!-- searchicon -->
                    <label v-if="showSearchbar" class="input input-bordered flex items-center gap-2">
                        <input v-model="searchText" type="text" class="grow" placeholder="Search"
                            @keyup="searchHanddle()" />
                        <button @click="searchHanddle($event)" class="btn btn-ghost">
                            <IconList icontype="search" color="black" size="25" />
                        </button>
                    </label>
                    <div v-if="!showSearchbar">
                        <button class="btn btn-ghost" @click="showSearchbar = !showSearchbar">
                            <IconList icontype='search' color='black' size='25' />
                        </button>
                    </div>
                    <!-- cartoption -->
                    <div>
                        <RouterLink :to="{name:'cart'}" class="btn btn-ghost relative">
                            <div v-if="cartStore.totalQuantity !== 0" class="bg-red-500 text-white absolute top-0 right-0 p-1 rounded-full">{{ cartStore.totalQuantity}}</div>
                            <IconList icontype="cart" color="black" size="25" />
                        </RouterLink>
                    </div>
                </div>
            </div>
            <!-- sidebar -->
            <div class="fixed z-10 top-0 right-0 hidden lg:block">
                <div class="flex w-full bg-base-200 px-8 items-center gap-4">
                    <label class="input input-bordered flex items-center gap-2">
                        <input v-model="searchText" type="text" class="grow" placeholder="Search"
                            @keyup="searchHanddle()" />
                        <button @click="searchHanddle()" class="btn btn-ghost">
                            <IconList icontype="search" color="black" size="25" />
                        </button>
                    </label>
                    <RouterLink :to="{name:'cart'}" class="btn btn-ghost relative">
                        <div v-if="cartStore.totalQuantity !== 0" class="bg-red-500 text-white absolute top-0 right-0 p-1 rounded-full">{{ cartStore.totalQuantity}}</div>
                        <IconList icontype="cart" color="black" size="25" />
                    </RouterLink>
                    <div class="text-2xl font-bold">
                        Restuarant
                    </div>
                </div>
            </div>
            <!-- maincontent -->
            <div class="p-4 sm:p-10">
                <slot></slot>
            </div>


        </div>
        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class=" menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <!-- Sidebar content here -->
                <div class="text-2xl font-bold mx-auto my-4">
                    ประเภทอาหาร
                </div>
                <div class="flex flex-col gap-96">
                    <div>
                        <li v-for="menu in menutype" :key="menu.type">
                            <details v-if="menu.subtype" class="dropdown">
                                <summary class="text-xl">{{ menu.type }}</summary>
                                <ul class="bg-base-100 rounded-box w-64 p-2">
                                    <li v-for="submenu in menu.subtype" :key="submenu">
                                        <a @click="selectType(submenu)" class="text-lg"
                                            :class="route.query.type === submenu? 'active': ''">{{ submenu }}</a>
                                    </li>
                                </ul>
                            </details>
                            <div v-if="!menu.subtype" class="text-xl"
                                :class="route.query.type === menu.type ?'active': ''">
                                <summary @click="selectType('รายการอาหารทั้งหมด')">{{ menu.type }}</summary>
                            </div>
                        </li>

                    </div>
                    <div>
                        <li v-for="systemMenu in systemmenutype">
                            <details v-if="systemMenu.subtype" class="dropdown">
                                <summary class="text-xl">{{ systemMenu.type }}</summary>
                                <ul class="bg-base-100 rounded-box w-64 p-2">
                                    <li v-for="submenu in systemMenu.subtype" :key="submenu">
                                        <RouterLink :to="{name:'order-select'}" class="text-lg"
                                            :class="route.query.type === submenu? 'active': ''">{{ submenu }}
                                        </RouterLink>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </div>
                </div>

            </ul>
        </div>
    </div>
</template>