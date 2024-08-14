<script setup>
    import {useRouter, useRoute} from 'vue-router'
    import { ref, watch, onMounted} from 'vue';

    const router = useRouter()
    const route = useRoute()

    const roleList = [
        'Admin',
        'Chef',
        'Casheir',
    ]
    const menuList = {
        // เงื่อไขการเพิ่มหน้า และเมนู: ต้องเพิ่มที่ admin ก่อนเดี๋ยว loopเพี้ยน
        admin:[
            {page:'ยอดขาย',link:'home'},
            {page:'ที่นั่ง',link:'table'},
            {page:'พนักงาน',link:'employee'},
            {page:'รายการเมนู',link:'menu'},
            {page:'ออเดอร์',link:'order'},
            {page:'รายการเก็บเงิน',link:'checkout'},
        ],
        chef:[
            {page:'ออเดอร์',link:'order'},
        ],
        casheir:[
            {page:'รายการเก็บเงิน',link:'checkout'},
            {page:'ที่นั่ง',link:'table'},
        ],
    }

    const curentRole = ref('')
    const currentPage = ref('')

    
    watch(()=> curentRole.value, (newRole) =>{
        
        if(!curentRole.value){
            curentRole.value = roleList[0]
        }else{
            curentRole.value = newRole
        }
    },{immediate:true})

    onMounted(()=>{
        for (let i = 0; i < menuList.admin.length; i++) {
            if(route.name === menuList.admin[i].link){
                currentPage.value = menuList.admin[i].page
            }
            
        }
    })
    
    const pageHandle = (page) =>{
        currentPage.value = page
        for (let j = 0; j < menuList.admin.length; j++) {
            if (currentPage.value === menuList.admin[j].page) {
                router.push({
                    name: menuList.admin[j].link
                })
                
            }   
        }
    }
</script>
<template>
    <div class="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <!-- Page content here -->

            <div class="navbar bg-base-100 flex justify-between lg:hidden">
                <div>
                    <label for="my-drawer-2" class="btn btn-ghost drawer-button">
                        <IconList icontype='menu' color='black' size='20' />
                    </label>
                </div>
                <div>
                    <p class="text-xl">Restuarant</p>
                </div>
                <div>
                    <h1>{{ curentRole }}</h1>
                </div>
            </div>

            <slot></slot>

        </div>
        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <div class="text-center text-2xl font-bold p-4">Restuarant</div>
                <select  v-model="curentRole" class="select select-bordered w-full max-w-xs my-4">
                    <option v-for="role in roleList">{{ role }}</option>
                </select>
                <div v-if="curentRole === roleList[0]">
                    <label for="my-drawer-2" aria-label="close sidebar">
                        <li v-for ="menu in menuList.admin">
                            <a @click="pageHandle(menu.page)" class="text-lg" :class="currentPage === menu.page ? 'active': ''">{{ menu.page }}</a>
                        </li>
                    </label>
                </div>
                <div v-if="curentRole === roleList[1]">
                    <label for="my-drawer-2" aria-label="close sidebar">
                        <li v-for ="menu in menuList.chef">
                            <a @click="pageHandle(menu.page)" class="text-lg" :class="currentPage === menu.page ? 'active': ''">{{ menu.page }}</a>
                        </li>
                    </label>
                </div>
                <div v-if="curentRole === roleList[2]">
                    <label for="my-drawer-2" aria-label="close sidebar">
                        <li v-for ="menu in menuList.casheir">
                            <a @click="pageHandle(menu.page)" class="text-lg" :class="currentPage === menu.page ? 'active': ''">{{ menu.page }}</a>
                        </li>
                    </label>
                </div>
                       
            </ul>
        </div>
    </div>


</template>