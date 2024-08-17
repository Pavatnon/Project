<script setup>
    import { RouterLink, useRouter } from 'vue-router';
    import {useEmployeeStore} from '@/stores/employee'
    import { ref, onMounted, computed, watch} from 'vue';

    const router = useRouter()
    const employeeStore = useEmployeeStore()

    const tableHeader = [
        'ชื่อ',
        'เบอร์ติดต่อ',
        'ตำแหน่ง',
        ''
    ]
    
    const currentRoleModel = ref('ทั้งหมด')

    const showEmployee = computed(()=>{
       switch (currentRoleModel.value) {
        case 'admin':
            return employeeStore.filterEmployeeRole('admin')
            break;
        case 'chef':
            return employeeStore.filterEmployeeRole('chef')
            break;
        case 'chashiar':
            return employeeStore.filterEmployeeRole('chashiar')
            break;
       
        default:
            return employeeStore.employeeList
            break;
       }
    })

    const itemsPerPage = ref(5)
    const currentPage = ref(1)

    const pagination = computed(()=>{
        const getData = showEmployee.value
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return getData.slice(start, end);
    })
    const totalPages = computed(() => {
        const getData = showEmployee.value
        return Math.ceil(getData.length / itemsPerPage.value);
    });

    const goToNextPage = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
        }
    };

    const goToPreviousPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--;
        }
    }

    onMounted(()=>{
        employeeStore.loadEmployee()
        employeeStore.setEmployee()
    })

    const detailEmployeeHande = (name) =>{
        router.push({
            name:'employee-detail',
            params:{
                id:employeeStore.getindexByName(name)
            }
        })
    }

</script> 
<template>
    <Leyout>
        <div class="container mx-auto p-10">
            <div class="text-center text-2xl font-bold">ข้อมูลรายชื่อพนักงาน</div>
            <!-- option -->
            <div class="grid grid-cols-1 lg:grid-cols-2 my-10">
                <div class="flex flex-row items-end">
                    <RouterLink :to="{name:'employee-add'}" class="btn btn-primary">เพิ่มพนักงานใหม่</RouterLink>
                </div>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">Search by role</span>
                    </div>
                    <select v-model="currentRoleModel" class="select select-bordered">
                        <option>ทั้งหมด</option>
                        <option v-for="role in employeeStore.roleList">{{ role }}</option>
                    </select>
                </label>
            </div>

            <div class="overflow-x-auto">
                <table class="table">
                    <TableShow :headerShow='tableHeader' />

                    <tbody>
                        <tr v-for="employee in pagination" class="bg-base-100 text-center">
                            <th>{{ employee.name }}</th>
                            <td>{{ employee.contact }}</td>
                            <td>
                                <div class="dropdown dropdown-right dropdown-end w-36">
                                    <div tabindex="0" role="button" class="btn w-full">
                                        <p>{{employee.role}}</p>
                                    </div>
                                    <ul tabindex="0"
                                        class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li v-for="role in employeeStore.roleList">
                                            <a @click="employeeStore.changeRole(employee.name, role)">
                                                {{role}}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <button @click="detailEmployeeHande(employee.name)"
                                    class="btn btn-outline">Detail</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div class="join flex justify-center mt-4">
                    <button @click="goToPreviousPage" :disabled="currentPage === 1" class="join-item btn">«</button>
                    <button class="join-item btn">{{ currentPage }}</button>
                    <button @click="goToNextPage" :disabled="currentPage === totalPages" class="join-item btn">»</button>
            </div>

        </div>
    </Leyout>
</template>