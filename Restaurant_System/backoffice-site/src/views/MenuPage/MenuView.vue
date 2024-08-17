<script setup>
    import {useMenuOfficeStore} from '@/stores/menu'
    import { useRouter,RouterLink } from 'vue-router';
    import { onMounted,ref, computed } from 'vue';



    const router = useRouter()
    const menuStore = useMenuOfficeStore()


    const tableHeader = [
        '',
        'รูปภาพ',
        'ชื่อเมนู',
        'ราคา',
        'สถานะ',
        'stock',
        'actions'
    ]

    const showSubTypreSelector = ref(false)
    const menuTypeModel = ref('')
    const menuSubtypeModel = ref('')

    const getsubtype = ref([])

    // for pagination 
    const itemsPerPage = ref(5)
    const currentPage = ref(1)

    const selectorHander = (menutype) =>{
        if (menutype) {
            const getindex = menuStore.menuType.findIndex(menu => menu.type === menutype)
            if(menuStore.menuType[getindex].subtype){
                showSubTypreSelector.value = true
                getsubtype.value = menuStore.menuType[getindex].subtype

                menuSubtypeModel.value = menuStore.menuType[getindex].subtype[0]
            }else{
                showSubTypreSelector.value = false
                getsubtype.value = []
            }
        }
    }

    const paginationShow = computed(()=>{
        const getData = menuStore.filterMenuByType(menuTypeModel.value, menuSubtypeModel.value);
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return getData.slice(start, end);
    })

    const totalPages = computed(() => {
        const getData = menuStore.filterMenuByType(menuTypeModel.value, menuSubtypeModel.value);
        return Math.ceil(getData.length / itemsPerPage.value);
    });

    const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
    };

    const goToPreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

    onMounted(()=>{
        menuStore.loadMenuStore()
        menuStore.setMenuStore()
        menuTypeModel.value = menuStore.menuType[0].type
    })

    const editMenuhande = (menuName) =>{
       const getindex = menuStore.menuStore.findIndex(item => item.name === menuName)
       router.push({
        name:'menu-edit',
        params:{
            id:getindex
        }
       })
    }
    const deleteMenuHabdle = (menuName) =>{
        const getindex = menuStore.menuStore.findIndex(item => item.name === menuName)
        menuStore.removeMenuStore(getindex)
    }
</script>
<template>
    <Leyout>
        <div class="container mx-auto p-10">
            <div class="text-center text-2xl font-bold">รายการเมนูที่มีตอนนี้</div>
            <!-- option -->
            <div class="grid grid-cols-1 lg:grid-cols-3 my-10">
                <div class="flex flex-row items-end">
                    <RouterLink :to="{name:'menu-add'}" class="btn btn-primary">เพิ่มเมนู</RouterLink>
                </div>
                <div class="flex flex-col lg:flex-row gap-4 col-span-2">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">เลือกประเภทอาหาร</span>
                        </div>
                        <select v-model="menuTypeModel" @change="selectorHander(menuTypeModel)"
                            class="select select-bordered">
                            <option v-for="menutype in menuStore.menuType">{{ menutype.type }}</option>
                        </select>
                    </label>
                    <label v-if="showSubTypreSelector" class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">เลือกชนิดอาหาร</span>
                        </div>
                        <select v-model="menuSubtypeModel" class="select select-bordered">
                            <option v-for="menusubtype in getsubtype">{{ menusubtype }}</option>
                        </select>
                    </label>
                </div>
            </div>



            <div class="overflow-x-auto">
                <table class="table">
                    <TableShow :headerShow =  'tableHeader'/>

                    <tbody>
                        <tr v-for="menu, index in paginationShow" class="bg-base-100 text-center">
                            <th>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</th>
                            <td class="w-1/12 text-center">
                                <img class="w-full" :src="menu.imgUrl">
                            </td>
                            <td>{{ menu.name }}</td>
                            <td>{{menu.price}}</td>
                            <td>
                                <div class="dropdown dropdown-right dropdown-end">
                                    <div tabindex="0" role="button" class="btn m-1"
                                        :class="menu.status === menuStore.menuStatusType[0]? 'bg-green-300': 'bg-red-300'">
                                        {{menu.status}}</div>
                                    <ul tabindex="0"
                                        class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li v-for="statusType in menuStore.menuStatusType">
                                            <a
                                                @click="menuStore.editStatusMenuStore(menu.name, statusType)">{{statusType}}</a>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            <td>{{menu.stock}}</td>
                            <td>
                                <div class="flex flex-row justify-center gap-1">
                                    <button @click="editMenuhande(menu.name)" class="btn btn-primary"> Edit</button>
                                    <button @click="deleteMenuHabdle(menu.name)" class="btn btn-outline btn-error">
                                        <IconList icontype='trash' color='red' size='20' />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            
            <div>
                <div class="flex justify-center mt-2">
                    <div class="join">
                        <button  @click="goToPreviousPage" :disabled="currentPage === 1" class="join-item btn">«</button>
                        <button class="join-item btn">{{ currentPage }}</button>
                        <button @click="goToNextPage" :disabled="currentPage === totalPages" class="join-item btn">»</button>
                    </div>
                </div>
            </div>
        </div>

    </Leyout>
</template>