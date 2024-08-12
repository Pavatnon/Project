<script setup>
    import {useCheckOutStore} from '@/stores/checkout'

    import { useRoute } from 'vue-router';
    import { onMounted } from 'vue';

    const checkouteStore = useCheckOutStore()

    const route = useRoute()

    const tableHeader = [
        'id',
        'รายการอาหาร',
        'จำนวนที่สั่ง',
        'ราคาตามรายการ'
    ]

    onMounted(()=>{
        checkouteStore.loadCheckoutBytable(route.params.id)
    })
</script>
<template >
    <div class="flex flex-col container mx-auto pt-8 shadow-xl p-4 lg:p-8">
        <p class="text-center text-2xl font-bold my-4">สรุปรายการอาหารที่ต้องจ่าย</p>
        <div class="divider"></div>
        <p class="text-center font-bold text-xl ">ข้อมูลบิล</p>
        <div class="grid grid-cols-1 lg:grid-cols-2 my-4">
            <div class="flex flex-col items-start lg:items-center">
                <p>ชื่อลูกค้า: {{checkouteStore.tableCheckout.name}}</p>
            </div>
            <div class="flex flex-col items-start lg:items-center">
                <p>เลขที่โต๊ะ: {{checkouteStore.tableCheckout.tableNumber}}</p>
            </div>
        </div>
        <div class="divider"></div>
        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr class="text-center">
                        <th v-for="header in tableHeader">{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr class="text-center" v-for="order in checkouteStore.tableCheckout.orderList">
                        <td>{{order.id}}</td>
                        <td>{{order.name}}</td>
                        <td>{{order.quantity}}</td>
                        <td>{{ order.price *  order.quantity}}</td>
                    </tr>
                </tbody>
            </table>
            
        </div>
        <div class="divider"></div>
        <div class="grid gridcols-1 lg:grid-cols-2">
            <div class="text-center">ราคาอาหารทั้งหมด: {{checkouteStore.totalPrice}}</div>
            <div class="text-center">ช่องทางการจ่ายเงิน</div>
        </div>
    </div>
</template>
