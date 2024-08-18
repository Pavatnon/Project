<script setup>
    import { useRoute, useRouter, RouterLink } from 'vue-router';
    import { useEmployeeStore } from '@/stores/employee';
    import {ref, onMounted,watch } from 'vue';


    const route = useRoute()
    const router = useRouter()
    const employeeStore = useEmployeeStore()

    const isEdit = ref(false)

    const editForm = ref([
        {
            name:'Username',
            field:'name'
        },
        {
            name:'Id พนักงาน',
            field:'idNumber'
        },
        {
            name:'เบอร์ติดต่อ',
            field:'contact'
        },
        {
            name:'ชื่อจริง',
            field:'fullname'
        },
        {
            name:'ตำแหน่ง',
            field:'role'
        },
    ])

    const eployeeData = ref({})

    onMounted(()=>{
        employeeStore.loadEmployee()
        eployeeData.value = employeeStore.employeeList[route.params.id]
        employeeStore.employeeDetail = eployeeData

        editForm.value[0].field = employeeStore.employeeDetail.name
        editForm.value[1].field = employeeStore.employeeDetail.idNumber
        editForm.value[2].field = employeeStore.employeeDetail.contact
        editForm.value[3].field = employeeStore.employeeDetail.fullname
        editForm.value[4].field = employeeStore.employeeDetail.role
    })
    //รอทำ validation
    watch(()=>[editForm.value[0].field, editForm.value[1].field,
                editForm.value[2].field, editForm.value[3].field,
                editForm.value[4].field], 
                (newVal) => {
                    // console.log('name',newVal[0])
                    // console.log('idNumber',newVal[1])
                    // console.log('contact',newVal[2])
                    // console.log('fullname',newVal[3])
                    // console.log('role',newVal[4])

                })

    const submitForm = (mode) =>{
        let formData = {}
        if(mode === 'ยืนยันการแก้ไข'){
            formData = {
                name:editForm.value[0].field,
                idNumber:editForm.value[1].field,
                contact:editForm.value[2].field,
                fullname:editForm.value[3].field,
                role:editForm.value[4].field,
                imgUrl:employeeStore.employeeDetail.imgUrl
            }
        }else{
            formData = {
                name:employeeStore.employeeDetail.name,
                idNumber:employeeStore.employeeDetail.idNumber,
                contact:employeeStore.employeeDetail.contact,
                fullname:employeeStore.employeeDetail.fullname,
                role:employeeStore.employeeDetail.role,
                imgUrl:employeeStore.employeeDetail.imgUrl
            }
        }
        employeeStore.editEmployeeData(employeeStore.employeeDetail.name, formData)
        isEdit.value = !isEdit.value

        window.location.reload()
    }
    const deleteEmployee = () =>{
        employeeStore.removeEmployee(employeeStore.employeeDetail.name)
        router.push({
            name:'employee'
        })
    }
   


</script>
<template>
    <Leyout>
        <div class="container mx-auto p-10">
            <div class="text-center text-2xl font-bold">ข้อมูลคุณ: {{ employeeStore.employeeDetail.name }} </div>
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
                    <img class="w-full p-4 border border-black" :src="employeeStore.employeeDetail.imgUrl">
                </div>
                <div>
                    <p class="text-center text-xl font-bold mb-4">ข้อมูล</p>
                    <div class="grid grid-cols-1 lg:grid-cols-2 w-11/12 mx-auto gap-4">
                        <label v-for="detail,index in editForm" class="form-control w-full lg:max-w-xs">
                            <div class="label">
                                <span class="label-text">{{ detail.name }}</span>
                            </div>
                            <input v-if="isEdit && detail.name !== 'ตำแหน่ง'" type="text" :placeholder="detail.field"
                                class="input input-bordered w-full lg:max-w-xs" v-model="editForm[index].field" />

                            <select v-if="isEdit && detail.name === 'ตำแหน่ง'" class="select select-bordered w-full max-w-xs" v-model="editForm[index].field">
                                <option v-for="role in employeeStore.roleList">{{role}}</option>
                            </select>

                            <div v-if="!isEdit"class="border border-slate-300 px-4 py-3">
                                <p>{{ detail.field }}</p>
                            </div>

                        </label>
                    </div>
                    <div v-if="!isEdit" class="grid grid-cols-1 lg:grid-cols-2 w-11/12 mx-auto mt-8 gap-4">
                        <button @click="isEdit = !isEdit" class="btn btn-primary">แก้ไข</button>
                        <button @click="deleteEmployee()" class="btn btn-outline">ลบออกจากรายชื่อ</button>
                    </div>
                    <div v-if="isEdit" class="grid grid-cols-1 lg:grid-cols-2 w-11/12 mx-auto mt-8 gap-4">
                        <button @click="submitForm('ยืนยันการแก้ไข')" class="btn btn-primary">ยืนยันการแก้ไข</button>
                        <button @click="submitForm('ยกเลิก')" class="btn btn-outline">ยกเลิก</button>
                    </div>
                </div>
            </div>
        </div>
    </Leyout>
</template>