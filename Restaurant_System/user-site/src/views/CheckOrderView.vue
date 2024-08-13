<script setup>
    import {useOrderStore} from '@/stores/order'

    import {useRouter, RouterLink} from 'vue-router'
    import {ref, onMounted, watch} from 'vue'


    const orderStore = useOrderStore()
    const router = useRouter()

    const tableSelected = ref(-1)
    const customerName = ref('')

    onMounted(()=>{
        orderStore.loadOrder()
    })
    watch(()=> tableSelected.value, (newNumber) =>{
        customerName.value = ''
        let getOrder = []
        getOrder = orderStore.orderTaber(newNumber)
        if(getOrder[0]){
            customerName.value = getOrder[0].name
        }
    },)

    const checkOrderHandle = () =>{
        router.push({
            name:'order',
            params:{
                id:tableSelected.value
            }
        })
    }



</script>
<template>
        <div class="container mx-auto shadow-lg">
            
            <div class="flex flex-col items-center p-2 m-2 relative">
                <p class="text-center text-2xl font-bold">กรุณาเลือกโต๊ะอาหารที่ต้องการตรวจสอบ</p>
                <select v-model="tableSelected" class="select select-primary w-full max-w-xs my-8">
                    <option v-for = "tableNumber in 10">{{tableNumber}}</option>
                </select>
                <div v-if="customerName !== ''" class=" grid grid-cols-1 lg:flex lg:flex-row w-6/12 lg:justify-around lg:items-center">
                    <p>ซื่อลูกค้าเจ้าของโต๊ะ: {{ customerName }}</p>
                    <button class="btn btn-outline my-4 lg:my-0" @click="checkOrderHandle()">ตรวจสอบ</button>
                </div>
                <div v-else>
                    <p class="text-red-500">โต๊ะที่ท่านต้องการตรวจสอบยังไม่มีรายการอาหาร</p>
                </div>
                <RouterLink :to="{name:'home'}" class="btn btn-ghost rounded-full fixed left-0 top-0 absolute">
                    <IconList
                        icontype="leftarrow"
                        color="black"
                        size="20"
                    />
                </RouterLink>
            </div>
        </div>
</template>