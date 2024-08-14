<script setup>
    import {defineProps} from 'vue'


    defineProps({
        mode:'',
        showList:[],
        activities: Function
    })

</script>
<template>
    <div  v-if="showList.length <= 0" class="text-center text-xl text-red-500">ไม่มีรายการ</div>
    <div v-if="showList.length != 0" class="grid grid-cols-1 sm:grid-cols-2 xl:md:grid-cols-3 2xl:grid-cols-4  gap-4">
        <div v-for="menu,index in showList" class="card bg-base-100 w-full shadow-xl">
            <figure>
                <img class="w-full h-52 object-cover" :src="menu.imgUrl" />
            </figure>
            
            <div v-if="mode === 'menuview'" class="card-body items-center text-center">
                <h2 class="card-title">{{ menu.name }}</h2>
                <h2 class="card-title mb-4">{{ menu.price }} THB</h2>
                <div class="card-actions w-full">
                    <button @click="activities(menu)" class="btn btn-primary w-full">Select</button>
                </div>
            </div>

            <div v-if="mode === 'cartview'" class="card-body items-center text-center">
                <h2 class="card-title">{{ menu.name }}</h2>
                <h2 class="card-title mb-4">{{ menu.price * menu.quantity}} THB</h2>
                <div class="card-actions w-full ">
                    <div class="flex w-full justify-around items-center">
                        <button @click="activities('plus', index)" class="btn btn-ghost rounded-full">
                            <IconList 
                                icontype = "plus"
                                color="black"
                                size="20" 
                            />
                        </button>
                        <h2 class="mx-4 py-2 px-5 bg-gray-200 rounded-full">{{ menu.quantity }}</h2>
                        <button  @click="activities('minus', index)" class="btn btn-ghost rounded-full">
                            <IconList
                                v-if="menu.quantity > 1" 
                                icontype = "minus"
                                color="black"
                                size="20" 
                            />
                            <IconList
                                v-if="menu.quantity === 1" 
                                icontype = "trash"
                                color="red"
                                size="20" 
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="mode === 'orderview'" class="card-body items-center text-center">
                <h2 class="card-title">{{ menu.name }}</h2>
                <h2 class="card-title"> จำนวน: {{ menu.quantity }} ที่</h2>
                <h2 class="card-title"> รวม: {{ menu.price *  menu.quantity}} THB</h2>

                <h2 v-if="menu.status === 'รอดำเนินการ'" class="card-title mb-4 badge  badge-warning gap-2 p-4 rounded-lg">
                    {{ menu.status }}
                </h2>
                <h2 v-if="menu.status === 'กำลังทำ'" class="card-title mb-4 badge badge-info gap-2 p-4 rounded-lg">
                    {{ menu.status }}
                </h2>
                <h2 v-if="menu.status === 'เสิร์ฟแล้ว'" class="card-title mb-4 badge badge-success gap-2 p-4 rounded-lg">
                    {{ menu.status }}
                </h2>

                <div v-if="menu.status === 'รอดำเนินการ'" class="card-actions w-full">
                    <button class="btn btn-error w-full">ขอยกเลิกรายการ</button>
                </div>
            </div>
        </div>
    </div>
</template>