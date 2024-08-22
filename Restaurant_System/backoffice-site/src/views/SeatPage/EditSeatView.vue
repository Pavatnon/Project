<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { useSeatStore} from '@/stores/seats'
    import { onMounted,ref} from 'vue';


    const seatStore = useSeatStore()
    const route = useRoute()
    const router = useRouter()

    const formData = ref([
        {
            name:'เลขที่โตะ',
            field:'tableNumber'
        },
        {
            name:'จำนวนที่นั้ง',
            field:'seatsCount'
        },
        {
            name:'สถานะ',
            field:'tableStatus'
        },
    ])

    onMounted(()=>{
        seatStore.tableByNumber = seatStore.tableList[route.params.id]

        formData.value[0].field = seatStore.tableList[route.params.id].tableNumber
        formData.value[1].field = seatStore.tableList[route.params.id].seatsCount
        formData.value[2].field = seatStore.tableList[route.params.id].tableStatus

        
    })
    const editFromHandle = () =>{
        const newData = {
            tableNumber:'',
            seatsCount:'',
            tableStatus:''
        }
        
        if (formData.value[0].field !== '') {
            newData.tableNumber = formData.value[0].field
        }else{
            newData.tableNumber = seatStore.tableList[route.params.id].tableNumber
        }
        if (formData.value[1].field !== '') {
            newData.seatsCount = formData.value[1].field
        }else{
            newData.seatsCount = seatStore.tableList[route.params.id].seatsCount
        }
        if (formData.value[2].field !== '') {
            newData.tableStatus = formData.value[2].field
        }else{
            newData.tableStatus = seatStore.tableList[route.params.id].tableStatus
        }
       
        
        seatStore.editSeat(seatStore.tableList[route.params.id].tableNumber, newData)
        router.push({
            name:'table'
        })
    }

</script>
<template>
    <Leyout>
        <div class="container mx-auto p-10">
            <div class="text-center text-2xl font-bold">แก้ไขข้อมูลของโต๊ะที่: {{ seatStore.tableByNumber.tableNumber }}
            </div>
            <!-- option -->
            <div class="grid grid-cols-1 lg:grid-cols-3 my-10">
                <div class="flex flex-row items-end">
                    <RouterLink :to="{name:'table'}" class="btn btn-primary">ย้อนกลับ</RouterLink>
                </div>
            </div>
            <div class=" w-11/12 lg:w-7/12 mx-auto shadow-xl p-8">
                <div class="grid grid-cols-1 lg:grid-cols-2">

                       <label  v-for="from, index in formData" class="form-control w-11/12 mx-auto max-w-xs">
                           <div class="label">
                               <span class="label-text">{{ from.name }}</span>
                           </div>
                           <input v-if="from.name !== 'สถานะ'" v-model="formData[index].field" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                           <select v-else v-model="formData[index].field" class="select select-bordered">
                               <option v-for="status in seatStore.statusList">{{status}}</option>
                           </select>
                       </label>
                       

                </div>
                <div class="flex justify-center">
                    <button @click="editFromHandle()" class="btn btn-outline w-9/12 mx-auto mt-8">ยืนยันการแก้ไข</button>
                </div>
            </div>
        </div>
    </Leyout>
</template>