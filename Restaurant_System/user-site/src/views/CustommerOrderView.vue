<script setup>
    import{useOrderStore} from '@/stores/order'
    import{useCheckOutStore} from '@/stores/checkout'

    import { useRouter, useRoute,RouterLink } from 'vue-router';
    import { onMounted, reactive } from 'vue';

    const orderStore = useOrderStore()
    const checkoutStore = useCheckOutStore()

    const route = useRoute()
    const router = useRouter()
    const order = reactive({
        name:'',
        tableNumber:-1,
        orderList:[]
    })

    onMounted(()=>{
        orderStore.loadOrder();
        order.name = orderStore.orderTaber(route.params.id)[0].name
        order.tableNumber = orderStore.orderTaber(route.params.id)[0].tableNumber
        order.orderList = orderStore.orderTaber(route.params.id)[0].order
    })


    const checkOutHandle = ()=>{
        checkoutStore.getCheckout(order)
        router.push({
            name:'checkout',
            params:{
                id: order.tableNumber
            }
        })
    }

</script>
<template>
    <div class="flex flex-col container mx-auto pt-8 shadow-xl p-4">
        <p class="text-3xl font-bold mx-auto mb-8">รายการอาหาร</p>
        <div class="flex flex-row w-full justify-around items-center mb-10">
            <div class="text-xl">โต๊ะของคุณ: {{ order.name }} </div>
            <div class="text-xl">เลขที่โต๊ะ: {{ order.tableNumber }}</div>
        </div>
        <div class="w-11/12 mx-auto">
            <ShowItem
                 mode = 'orderview',
                 :showList = 'order.orderList'
            />
        </div>
        <div class="flex flex-row justify-around my-4">
            <RouterLink :to="{name:'home'}" class="btn btn-primary">
                <IconList 
                    icontype = 'leftarrow'
                    size="20"
                    color="white"
                />
                <p class="ml-2">กลับไปหน้าเมนู</p>
            </RouterLink>
            <button @click="checkOutHandle()" class="btn btn-outline">
                <p class="mr-2">จ่ายเงิน</p>
                <IconList 
                    icontype = 'rightarrow'
                    size="20"
                    color="black"
                />
            </button>
        </div>

    </div>
</template>