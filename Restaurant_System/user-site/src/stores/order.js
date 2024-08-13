import {defineStore} from 'pinia'
import {useCartStore} from '@/stores/cart'

const cartStore = useCartStore()

export const useOrderStore = defineStore('oder',{
    state:()=>({
        orderList:[]
    }),
    getters:{
        orderTaber:(state) => (tableNumber) =>{
            return state.orderList.filter(item => item.tableNumber === tableNumber)
        }
    },
    actions:{
        loadOrder(){
            const orderData = localStorage.getItem('order-data')
            if(orderData){
                this.orderList = JSON.parse(orderData)
            }else{
                console.log('Not have order')
            }
        },
        getOrder(cartData){
            this.loadOrder()
            const orderBody = {}
            orderBody.name = cartData.name
            orderBody.todo = cartData.todo,
            orderBody.tableNumber = cartData.number,
            orderBody.order = cartData.order

            for (let i = 0; i < orderBody.order.length; i++) {
                orderBody.order[i].status = 'รอดำเนินการ'
                
            }

            this.orderList.push(orderBody)
            localStorage.setItem('order-data', JSON.stringify(this.orderList))
            cartStore.cartList = []
            localStorage.removeItem('cart-menu')
        },
        getOderSameTable(cartData){
            this.loadOrder()
            const filterTable = this.orderList.findIndex((item) => item.tableNumber === cartData.number)

            for (let i = 0; i < cartData.order.length; i++) {
                this.updateOrder(cartData.order[i], filterTable)
                
            }
            
            cartStore.cartList = []
            localStorage.removeItem('cart-menu')
            
        },
        updateOrder(data, index){
            this.orderList[index].order.push(data)
            localStorage.setItem('order-data', JSON.stringify(this.orderList))
        }
    }
})