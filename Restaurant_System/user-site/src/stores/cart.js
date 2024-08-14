import {defineStore} from 'pinia'

export const useCartStore = defineStore('cart',{
    state:()=>({
        cartList:[]
    }),
    getters:{
        totalPrice(state){
            return state.cartList.reduce((acc, item) => { 
               return acc + (item.price * item.quantity)
            },0)
        },
        totalQuantity(state){
            return state.cartList.reduce((acc, item) => {
                return acc + (item.quantity)
            },0)
        }
    },
    actions:{
        loadCart(){
            const cartMenu = localStorage.getItem('cart-menu')
            if(cartMenu){
                this.cartList = JSON.parse(cartMenu)
            }else{
                this.cartList = []
                console.log("cart-empty")
            }
        },
        addToCart(menuItem){
            const filterCartItem = this.cartList.findIndex((item) => item.name === menuItem.name)
            if(filterCartItem < 0){
                menuItem.quantity = 1
                this.cartList.push(menuItem)
            }else{
                const sameMenu = this.cartList[filterCartItem]
                this.updateQuantity(sameMenu.quantity+1, filterCartItem)
            }
           
            localStorage.setItem('cart-menu', JSON.stringify(this.cartList))
        },
        removeitemInCart(index){
            this.cartList.splice(index,1)
            localStorage.setItem('cart-menu', JSON.stringify(this.cartList))
        },
        updateQuantity(newQuantity, index){
            this.cartList[index].quantity = newQuantity
            localStorage.setItem('cart-menu', JSON.stringify(this.cartList))
        }
        
    }
}) 