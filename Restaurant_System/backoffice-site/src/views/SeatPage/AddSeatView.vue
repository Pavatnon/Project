<script setup>
    import { useRouter } from 'vue-router';
    import { useSeatStore} from '@/stores/seats'
    import { ref, watch} from 'vue';



    const seatStore = useSeatStore()
    const router = useRouter()

    const formData = ref([
        {
            name:'เลขที่โตะ',
            field:''
        },
        {
            name:'จำนวนที่นั้ง',
            field:''
        },
        {
            name:'สถานะ',
            field:'ว่าง'
        },
    ])
    
    const isValid = ref(false)

    watch(()=>[formData.value[0].field, formData.value[1].field, formData.value[2].field], (newVal) =>{
        isValid.value = true
        if(newVal[0] && newVal[1] && newVal[2] ){
            isValid.value = false
        }
        
    }, {immediate:true})

    const addTableHandle = () =>{
        const newData = {
            tableNumber: formData.value[0].field ,
            seatsCount:formData.value[1].field ,
            tableStatus:formData.value[2].field
        }
        seatStore.addNewSeat(newData)
        router.push({
            name:'table'
        })
    }

</script>
<template>
    <Leyout>
        <div class="container mx-auto p-10">
            <div class="text-center text-2xl font-bold">
                เพิ่มที่นั่ง
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
                    <button @click="addTableHandle()" 
                            class="btn btn-outline w-9/12 mx-auto mt-8"
                            :disabled = isValid
                    >
                        ยืนยันข้อมูล
                    </button>
                </div>
            </div>
        </div>
    </Leyout>
</template>