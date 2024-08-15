<script setup>
    import{ useRoute,useRouter, RouterLink  } from 'vue-router';
    import{useMenuOfficeStore} from '@/stores/menu'
    import{ onMounted,ref, computed } from 'vue';


    const route = useRoute()
    const router = useRouter()

    const menuStore = useMenuOfficeStore()

    const getIndex = ref(route.params.id)
    const menuData = ref({})
    const getmenuType = computed(()=>{
        return menuStore.menuType.filter(item => item.subtype)
    })
    const getsubType = computed(()=>{

        switch (menuData.value.type) {
            case menuStore.menuType[1].type:
                return menuStore.menuType[1].subtype.filter(item => item !== menuStore.menuType[1].subtype[0])
                break;
            case menuStore.menuType[2].type:
                return menuStore.menuType[2].subtype.filter(item => item !== menuStore.menuType[2].subtype[0])
                break;
            case menuStore.menuType[3].type:
                return menuStore.menuType[3].subtype.filter(item => item !== menuStore.menuType[3].subtype[0])
                break;
        }
    })

    

    onMounted(()=>{
        menuData.value = menuStore.menuStore[getIndex.value]
    })

    const editMenuHandle = (newData) =>{
        const formData = {
            name: newData.name,
            imgUrl: newData.imgUrl,
            price: newData.price,
            stock: newData.stock,
            type: newData.type,
            subtype: newData.subtype,
            status: newData.status,
            id: newData.id,

        }
        menuStore.editMenuStore(getIndex.value, formData)
        router.push({name:'menu'})
    }

</script>
<template>
    <Leyout>
        <div class="container mx-auto p-10">
            <div class="text-center text-2xl font-bold">แก้ไขรายการอาหาร</div>
            <div class="grid grid-cols-1 lg:grid-cols-2 my-10">
                <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">ชื่อเมนูอาหาร</span>
                        </div>
                        <input v-model="menuData.name" type="text" placeholder="Type here"
                            class="input input-bordered w-full max-w-xs" />
                    </label>
                </div>

                <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Link รูปภาพ</span>
                        </div>
                        <input v-model="menuData.imgUrl" type="text" placeholder="Type here"
                            class="input input-bordered w-full max-w-xs" />
                    </label>
                </div>

                <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">ราคา</span>
                        </div>
                        <input v-model="menuData.price" type="text" placeholder="Type here"
                            class="input input-bordered w-full max-w-xs" />
                    </label>
                </div>

                <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">stock</span>
                        </div>
                        <input v-model="menuData.stock" type="text" placeholder="Type here"
                            class="input input-bordered w-full max-w-xs" />
                    </label>
                </div>

                <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">ประเภทอาหาร</span>
                        </div>
                        <select v-model="menuData.type" class="select select-bordered">
                            <option v-for="type in getmenuType">{{ type.type }}</option>
                        </select>
                    </label>
                </div>

                <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">ชนิดอาหาร</span>
                        </div>
                        <select class="select select-bordered">
                            <option v-for="subtype in getsubType">{{subtype}}</option>
                        </select>
                    </label>
                </div>

                <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">status</span>
                        </div>
                        <select v-model="menuData.status" class="select select-bordered">
                            <option v-for="status in menuStore.menuStatusType">{{ status }}</option>
                        </select>
                    </label>
                </div>

                <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">ID</span>
                        </div>
                        <input v-model="menuData.id" type="text" placeholder="Type here"
                            class="input input-bordered w-full max-w-xs" />
                    </label>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 p-10 gap-4 lg:gap-0">
            <div class="flex justify-center">
                <RouterLink :to="{name:'menu'}" class="btn btn-outline w-full max-w-xs">ยกเลิก</RouterLink>
            </div>
            <div class="flex justify-center">
                <button @click="editMenuHandle(menuData)" class="btn btn-primary w-full  max-w-xs">ยืนยัน</button>
            </div>
        </div>
    </Leyout>
</template>