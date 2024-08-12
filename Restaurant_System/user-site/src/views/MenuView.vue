<script setup>
    import {useRoute} from 'vue-router'
    import {ref, watch, computed} from 'vue';
    
    import {useMenuStore} from '@/stores/menu'
    import { useCartStore } from '@/stores/cart';

    
    const menuStore = useMenuStore()
    const cartStore = useCartStore()

    const route = useRoute()


    let showMenu =[]


    watch(() => [route.query.type, route.query.id], (newQuery) => {
        if(newQuery[0] || newQuery[1]){
            showMenu = menuStore.fillerMenu(newQuery[0],newQuery[1])
        }else{
            menuTypeSelected.value = 'รายการอาหารทั้งหมด'
        }
    }, {immediate: true})


    const addCart = (menu) =>{
        cartStore.addToCart(menu)
    }

</script>
<template>
    <Leyout>
        <h1 class="text-2xl font-bold mb-10">Menu: {{ menuTypeSelected }} </h1>
        <ShowItem 
            mode = "menuview"
            :showList='showMenu'
            :activities = 'addCart'
        />
    </Leyout>
</template>