<script setup>
    import {useCartStore} from '@/stores/cart'
    import { useOrderStore } from '@/stores/order';
    import { RouterLink, useRouter } from "vue-router"
    import { onMounted , watch, reactive, ref} from 'vue';

    const orderStore = useOrderStore()
    const cartStore = useCartStore()
    const router = useRouter()


    const selectToDo = [
        {
            todo: 'เปิดบิลใหม่'
        },
        {
            todo: 'เพิ่มจากบิลเดิม'
        }
    ]
    
    const isValid = ref(false)
    const formCheck = ref([false,false])

    const customerData = reactive({
        name:'',
        todo:'',
        number:''
    })

    
    watch(() => [customerData.todo, customerData.name, customerData.number, cartStore.cartList], (newVal) =>{
        isValid.value = false
        formCheck.value[0] = false
        formCheck.value[1] = false

        if(newVal[0] && newVal[1] && newVal[2] && newVal[3].length != 0){
            isValid.value = true
        }
        if(newVal[0] === 'เปิดบิลใหม่'){
            formCheck.value[0] = true
            formCheck.value[1] = true
            if(newVal[0] && newVal[1] && newVal[2] && newVal[3].length != 0){
            isValid.value = true
        }
        }
        if(newVal[0] === 'เพิ่มจากบิลเดิม'){
            formCheck.value[0] = false
            formCheck.value[1] = true

            if(newVal[0] && newVal[2] && newVal[3].length != 0){
            isValid.value = true
        }

        }
    },{immediate:true})

    onMounted(()=>{
        cartStore.loadCart()
        
    })

    



    const changeQuntity = (mode, index) =>{
        if(mode === 'plus'){
            cartStore.updateQuantity(cartStore.cartList[index].quantity + 1, index)
        }
        if(mode === 'minus'){
            cartStore.updateQuantity(cartStore.cartList[index].quantity - 1, index)
            if(cartStore.cartList[index].quantity <= 0){
                cartStore.removeitemInCart(index)
            }
            
        }
    }
    const handleToOrderpage = () =>{
        const orderBody = {
                name: customerData.name,
                todo: customerData.todo,
                number: customerData.number,
                order: cartStore.cartList
            }

        if(customerData.todo === 'เปิดบิลใหม่'){
            orderStore.getOrder(orderBody)
        }
        if(customerData.todo === 'เพิ่มจากบิลเดิม'){
            orderStore.getOderSameTable(orderBody)
        }
        router.push({
                name:'order',
                params:{
                    id:customerData.number
                }
            })
    }
</script>
<template>
    <div class="flex flex-col container mx-auto pt-8 shadow-xl p-4">
        <p class="text-3xl font-bold mx-auto mb-8">ตะกร้าการอาหาร</p>
        <div class="grid grid-cols-1 md:grid-cols-3 mb-10">
            <label class="form-control w-full max-w-xs mx-auto">
                <div class="label">
                    <span class="label-text text-xl">รายการที่ต้องการทำ</span>
                </div>
                <select v-model="customerData.todo" class="select select-bordered">
                    <option v-for="select in selectToDo">{{ select.todo }}</option>
                </select>
            </label>
            <label v-if="formCheck[0]" class="form-control w-full max-w-xs mx-auto">
                <div class="label">
                    <span class="label-text text-xl">ชื่อลูกค้า</span>
                </div>
                <input v-model="customerData.name" type="text" placeholder="Type here"
                    class="input input-bordered w-full max-w-xs" />
            </label>
            <label v-if="formCheck[1]" class="form-control w-full max-w-xs mx-auto">
                <div class="label">
                    <span class="label-text text-xl">เลขที่โต๊ะ</span>
                </div>
                <select v-model="customerData.number" class="select select-bordered">
                    <!-- จำนวนโต๊ะ -->
                    <option v-for="number in 10">{{ number }}</option>
                </select>
            </label>
            
        </div>
        <div class="grid grid-cols-1 w-full md:w-11/12 mx-auto">
            <div class="w-full bg-base-200 md:p-8">
                <div class="w-full text-center">
                    <p class="text-xl font-bold mb-4">สรุปรายการอาหาร</p>
                </div>
                <!-- mockup card -->
                <ShowItem mode="cartview" :showList='cartStore.cartList' :activities='changeQuntity' />

                <div class="w-full grid grid-cols-1 md:grid-cols-3 mt-10">

                    <RouterLink :to="{name:'home'}" class="btn btn-active w-11/12 md:max-w-56 mx-auto">
                        <IconList icontype="leftarrow" color="white" size="25" />
                        <p class="ml-4">กลับไปหน้าเมนู</p>
                    </RouterLink>


                    <div class="text-xl max-w-56 mx-auto my-5">รวมราคา: {{ cartStore.totalPrice }}</div>


                    <button @click="handleToOrderpage()" v-if="isValid" class="btn btn-active w-11/12 md:max-w-56 mx-auto">
                        <p>ยืนยันรายการ</p>
                        <IconList icontype="rightarrow" color="white" size="25" />
                    </button>

                    <button v-if="!isValid" disabled class="btn btn-active w-11/12 md:max-w-56 mx-auto">
                        <p>ยืนยันรายการ</p>
                        <IconList icontype="rightarrow" color="white" size="25" />
                    </button>

                </div>
            </div>
        </div>

    </div>
</template>