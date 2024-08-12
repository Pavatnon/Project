import {defineStore} from 'pinia'




export const useCheckOutStore = defineStore('checkout',{
    state:()=>({
        checkOutList:[],
        tableCheckout:{
            name:'',
            orderList:[],
            tableNumber:-1
        }
    }),
    getters:{
        totalPrice(state){
            return state.tableCheckout.orderList.reduce((acc, item) => {
                return acc + (item.price * item.quantity)
            },0)
        }
    },
    actions:{
        loadCheckout(){  
            const allcheckout = localStorage.getItem('checkout-data')
            if(allcheckout){
                this.checkOutList = JSON.parse(allcheckout)
            }
        },
        loadCheckoutBytable(tablenumber){
            this.loadCheckout()
            const getIndexfromtable = this.checkOutList.findIndex((item) => item.tableNumber === tablenumber)
          
            this.tableCheckout.name = this.checkOutList[getIndexfromtable].name
            this.tableCheckout.orderList = this.checkOutList[getIndexfromtable].orderList
            this.tableCheckout.tableNumber = this.checkOutList[getIndexfromtable].tableNumber
            

        },
        getCheckout(orderData){
            this.loadCheckout()
            this.checkOutList.push(orderData)
            localStorage.setItem('checkout-data', JSON.stringify(this.checkOutList))
        }
    }
})