<script setup>
    import {useEmployeeStore} from '@/stores/employee'
    import { RouterLink, useRouter } from 'vue-router';
    import { ref, watch } from 'vue';

    const employeeStore = useEmployeeStore()
    const router = useRouter()

    const regisForm = ref([
        {
            name:'Username',
            field:''
        },
        {
            name:'Id พนักงาน',
            field:''
        },
        {
            name:'เบอร์ติดต่อ',
            field:''
        },
        {
            name:'ชื่อจริง',
            field:''
        },
        {
            name:'ตำแหน่ง',
            field:''
        },
    ])
    const isValid = ref(false)
    watch(() => [regisForm.value[0].field, regisForm.value[1].field,
                regisForm.value[2].field, regisForm.value[3].field,
                regisForm.value[4].field], 
                (newVal) => {
                    isValid.value = false
                    if(newVal[0] && newVal[1] && newVal[2] && newVal[3] && newVal[4]){
                        isValid.value = true
                    }
                })

    const submitForm = () =>{
        const formData = {
                name:regisForm.value[0].field,
                idNumber:regisForm.value[1].field,
                contact:regisForm.value[2].field,
                fullname:regisForm.value[3].field,
                role:regisForm.value[4].field,
                imgUrl:employeeStore.employeeImgDefault
            }
        employeeStore.registerEmployee(formData)
        router.push({
            name:'employee'
        })
    }
</script>
<template>
    <Leyout>
        <div class="container mx-auto p-10">
            <div class="text-center text-2xl font-bold">เพิ่มพนักงานใหม่</div>
            <div class="grid grid-cols-1 lg:grid-cols-2 my-8 p-8 bg-base-200 shadow-xl relative">
                <RouterLink :to="{name:'employee'}" class="btn btn-ghost absolute top-0 left-0">
                <IconList 
                    icontype = 'leftarrow'
                    color = 'black'
                    size='25'
                />
                </RouterLink>
                <div class="w-8/12 mx-auto bordep-10">
                    <p class="text-center text-xl font-bold mb-4">รูปภาพ</p>
                    <img class="w-full p-4 border border-black" :src="employeeStore.employeeImgDefault">
                </div>
                <div>
                    <p class="text-center text-xl font-bold mb-4">กรอกข้อมูล</p>
                    <div class="grid grid-cols-1 lg:grid-cols-2 w-11/12 mx-auto gap-4">
                        <label v-for="regis,index in regisForm" class="form-control w-full lg:max-w-xs">
                            <div class="label">
                                <span class="label-text">{{ regis.name }}</span>
                            </div>
                            <input v-if="regis.name !== 'ตำแหน่ง'" type="text" placeholder="type here"
                                class="input input-bordered w-full lg:max-w-xs" v-model="regisForm[index].field" />

                            <select v-if="regis.name === 'ตำแหน่ง'" class="select select-bordered w-full max-w-xs" v-model="regisForm[index].field">
                                <option v-for="role in employeeStore.roleList">{{role}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="grid grid-cols-1 w-11/12 mx-auto mt-8 gap-4">
                        <button :disabled="!isValid" @click="submitForm()" class="btn btn-primary">เพิ่มพนักงาน</button>
                    </div>
                </div>
            </div>
        </div>
    </Leyout>
</template>