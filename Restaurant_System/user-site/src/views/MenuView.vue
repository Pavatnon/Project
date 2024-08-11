<script setup>
    import {useRoute} from 'vue-router'
    import {ref, watch, computed} from 'vue';
    
    import {useMenuStore} from '@/stores/menu'
    import { useCartStore } from '@/stores/cart';

    
    const menuStore = useMenuStore()
    const cartStore = useCartStore()

    const route = useRoute()

    const menuTypeSelected = ref('รายการอาหารทั้งหมด')

    const showMenu = computed(()=>{
        let getMenu = []
        if(menuTypeSelected.value === 'รายการอาหารทั้งหมด'){
            getMenu = menuStore.menulist
        }else{
            getMenu = menuStore.fillerMenu(menuTypeSelected.value)
        }
        return getMenu
    })


    watch(() => route.query.type, (newQuery) => {
        if(newQuery){
            menuTypeSelected.value = newQuery
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