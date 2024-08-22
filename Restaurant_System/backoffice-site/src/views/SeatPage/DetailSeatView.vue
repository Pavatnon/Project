<script setup>
    import { useRoute } from 'vue-router';
    import { useSeatStore} from '@/stores/seats'
    import { onMounted} from 'vue';

    const seatStore = useSeatStore()
    const route = useRoute()

    onMounted(()=>{
        seatStore.tableByNumber = seatStore.tableList[route.params.id]
    })

    
    
</script>
<template>
    <Leyout>
        <div class="container mx-auto p-10">
            <div class="text-center text-2xl font-bold">ข้อมูลของโต๊ะที่: {{ seatStore.tableByNumber.tableNumber }} </div>
            <!-- option -->
            <div class="grid grid-cols-1 lg:grid-cols-3 my-10">
                <div class="flex flex-row items-end">
                    <RouterLink :to="{name:'table'}" class="btn btn-primary">ย้อนกลับ</RouterLink>
                </div>
            </div>
            
        </div>
    </Leyout>
</template>