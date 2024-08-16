<script setup>
    import {useSeatStore} from '@/stores/seats'
    import {useRouter, RouterLink} from 'vue-router'
    import { onMounted, ref, computed } from 'vue';


    const seatStore = useSeatStore()
    const router = useRouter()

    const currentStatusView = ref('')

    const statusView = ref([
        'โต๊ะทั้งหมด',
        'โต๊ะว่าง',
        'โต๊ะไม่ว่าง',
        'โต๊ะติดจอง'
    ])

    onMounted(()=>{
        seatStore.loadSeat()
        seatStore.setSeat()
        currentStatusView.value = statusView.value[0]
    })
    
    const showTable = computed(()=>{
        let getData = seatStore.tableList
        if(currentStatusView.value === statusView.value[1]){
            getData = seatStore.enableTable
        }
        if(currentStatusView.value === statusView.value[2]){
            getData = seatStore.unableTable
        }
        if(currentStatusView.value === statusView.value[3]){
            getData = seatStore.bookTable
        }
        return getData
    })

    const selectStatusViewHandle = (status) =>{
        currentStatusView.value = status
    }

    const changeStatushandle = (name, status) =>{
        seatStore.changeStatusSeat(name, status)
    }
    const detailViewHandle = (tabename) =>{
        router.push({
            name:'table-detail',
            params:{
                id: seatStore.getindexByName(tabename)
            }
        })
    }
    const editViewHandle = (tabename) =>{
        router.push({
            name:'table-edit',
            params:{
                id: seatStore.getindexByName(tabename)
            }
        })
    }
    const deleteTableHandle = (tabename) =>{
        seatStore.removeSeat(tabename)
    }

</script>
<template>
    <Leyout>
        <div class="container mx-auto p-10">
            <div class="text-center text-2xl font-bold">ข้อมูลที่นั่ง</div>
            <!-- option -->
            <div class="grid grid-cols-1 lg:grid-cols-3 my-10">
                <div class="flex flex-row items-end">
                    <RouterLink :to="{name:'table-add'}" class="btn btn-primary">เพิ่มโต๊ะ</RouterLink>
                </div>
                <div class="flex items-center">
                    <p class="text-xl font-bold">จำนวนโต๊ะทั้งหมด: {{ seatStore.tableList.length}}</p>
                </div>
                <div class="flex items-center">
                    <p class="text-xl font-bold">จำนวนที่ว่างทั้งหมด: {{ seatStore.enableTable.length}}</p>
                </div>
            </div>
            <div class="join grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
                <button v-for="statusview in statusView" 
                        class="join-item btn btn-outline  "
                        :class="statusview === currentStatusView? 'btn-active': ''"
                        @click="selectStatusViewHandle(statusview)">
                    {{statusview}}
                </button>
            </div>
            <!-- show -->
            <div v-if="showTable.length > 0" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <div v-for="table in showTable" class="card bg-base-300 w-full shadow-xl rounded-b-xl join join-vertical">
                    <div v-if="table != []" class="p-4">
                        <p class="card-title">เลขที่โต๊ะ: {{ table.tableNumber }}</p>
                        <p class="mt-4 text-md">รองรับ: {{ table.seatsCount }} ที่นั่ง</p>

                        <div class="dropdown dropdown-right my-4">
                            <div tabindex="0" role="button" class="btn bg-green-300 m-1"
                            v-if="table.tableStatus === seatStore.statusList[0]">
                                {{table.tableStatus}}
                            </div>
                            <div tabindex="0" role="button" class="btn bg-red-300 m-1"
                            v-if="table.tableStatus === seatStore.statusList[1]">
                                {{table.tableStatus}}
                            </div>
                            <div tabindex="0" role="button" class="btn bg-yellow-300 m-1"
                            v-if="table.tableStatus === seatStore.statusList[2]">
                                {{table.tableStatus}}
                            </div>
                            <ul tabindex="0"
                                class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li v-for="status in seatStore.statusList">
                                    <a @click="changeStatushandle(table.tableNumber, status)">{{status}}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="join grid grid-cols-3">
                        <button class="btn btn-info rounded-bl-xl" @click="detailViewHandle(table.tableNumber)">Detail</button>
                        <button class="btn btn-warning" @click="editViewHandle(table.tableNumber)">แก้ไข</button>
                        <button class="btn btn-error rounded-br-xl" @click="deleteTableHandle(table.tableNumber)">ลบ</button>
                    </div>
                </div>
            </div>

            <div v-if="showTable.length === 0 ">
                <p class="text-center text-xl font-bold text-red-400">ไม่พบข้อมูล{{ currentStatusView }}</p>
            </div>
        </div>



    </Leyout>
</template>