<script setup>
    import{useRouter, RouterLink  } from 'vue-router';
    import{useMenuOfficeStore} from '@/stores/menu'
    import{ watch,ref, computed } from 'vue';
    

    const menuStore = useMenuOfficeStore()

    const getmenuType = computed(()=>{
        return menuStore.menuType.filter(item => item.subtype)
    })
    const getsubType = computed(()=>{

        switch (formData.value.type) {
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

    const isValid = ref(false)

    const formData = ref({
        name: '',
        imgUrl: '',
        price: 0,
        stock: 0,
        type: '',
        subtype: '',
        status: '',
        id: '',
    })

    watch(() => [formData.value.name, formData.value.imgUrl,
                formData.value.price, formData.value.stock,
                formData.value.type, formData.value.subtype,
                formData.value.status, formData.value.id], 
                (newVal) =>{
                    isValid.value = true
                    if (newVal[0] !== '' && newVal[1] !== '' &&
                        newVal[2] > 0 && newVal[3]&&
                        newVal[4] !== '' && newVal[5] !== '' &&
                        newVal[6] !== '' && newVal[7] !== '') {
                        isValid.value = false
                    }
                },{immediate:true})

    const addMenuHandle = (menuData) =>{
        menuStore.addMenuStore(menuData)
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
                        <input v-model="formData.name" type="text" placeholder="Type here"
                            class="input input-bordered w-full max-w-xs" />
                    </label>
                </div>

                <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Link รูปภาพ</span>
                        </div>
                        <input v-model="formData.imgUrl" type="text" placeholder="Type here"
                            class="input input-bordered w-full max-w-xs" />
                    </label>
                </div>

                <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">ราคา</span>
                        </div>
                        <input v-model="formData.price" type="text" placeholder="Type here"
                            class="input input-bordered w-full max-w-xs" />
                    </label>
                </div>

                <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">stock</span>
                        </div>
                        <input v-model="formData.stock" type="text" placeholder="Type here"
                            class="input input-bordered w-full max-w-xs" />
                    </label>
                </div>

                <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">ประเภทอาหาร</span>
                        </div>
                        <select v-model="formData.type" class="select select-bordered">
                            <option v-for="type in getmenuType">{{ type.type }}</option>
                        </select>
                    </label>
                </div>

                <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">ชนิดอาหาร</span>
                        </div>
                        <select  v-model="formData.subtype" class="select select-bordered">
                            <option v-for="subtype in getsubType">{{subtype}}</option>
                        </select>
                    </label>
                </div>

                <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">status</span>
                        </div>
                        <select v-model="formData.status"  class="select select-bordered">
                            <option v-for="status in menuStore.menuStatusType">{{ status }}</option>
                        </select>
                    </label>
                </div>

                <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">ID</span>
                        </div>
                        <input  v-model="formData.id" type="text" placeholder="Type here"
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
                <button @click="addMenuHandle(formData)" :disabled="isValid" class="btn btn-primary w-full  max-w-xs">ยืนยัน</button>
            </div>
        </div>
    </Leyout>
</template>