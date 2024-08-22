<script setup>
import { ref,reactive,watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter()
const passwordView = ref(false)
let isValid = [false, false, false]

const regisForm = ref([
    {
        name:'Username',
        field:'username'
    },
    {
        name:'Password',
        field:'password'
    },
    {
        name:'Confirm password',
        field:'confirmpassword'
    },

])
const regisData = reactive({
    username: '',
    password:'',
    confirmpassword:''
})
watch(()=>[regisData.username, regisData.password, regisData.confirmpassword],(newdata) => {
    isValid[0] = false
    isValid[1] = false
    isValid[2] = false

    if(!newdata[0]){
        isValid[0] = true
    }
    if (!newdata[1]) {
        isValid[1] = true
    }
    if (!newdata[2]) {
        isValid[2] = true
    }
    if(newdata[2]){
        isValid[2] = true
        if(newdata[2] === newdata[1]){
            isValid[2] = false
        }
    }
},{immediate:true})

const getRegisData = () =>{
    const data = {
        username: regisData.username,
        password: regisData.password
    }
    console.log(data)
    router.push({
        name:'login'
    })
}

</script>
<template>
    <div class="container mx-auto">
        <div class="flex flex-col w-full h-screen justify-center items-center">
            <div class="w-6/12 mx-auto bg-gray-400/20 p-8">
                <h1 class="text-2xl font-bold text-center">REGISTER</h1>
                <div class="flex flex-col items-center w-full gap-4 my-4">
                    <label v-for="form in regisForm" class="form-control w-full max-w-lg">
                        <div class="label">
                                <span class="label-text text-lg ">{{form.name}}</span>
                            </div>
                            <div class="flex flex-row gap-1">
                                <div class="flex flex-col w-full">
                                    <input v-model="regisData[form.field]" 
                                            :type="form.name === 'Password' && !passwordView ? 'password': 'text'"
                                            placeholder="Type here" class="input input-bordered w-full max-w-lg" />
                                    <div v-if="isValid[0] && form.name === 'Username'">
                                        <p class="text-red-500">**กรุรากรอก username**</p>
                                    </div>
                                    <div v-if="isValid[1] && form.name === 'Password'">
                                        <p class="text-red-500">**กรุรากรอก password**</p>
                                    </div>
                                    <div v-if="isValid[2] && form.name === 'Confirm password'">
                                        <p class="text-red-500">**กรุรากรอก password ให้ถูกต้อง**</p>
                                    </div>
    
                                </div>
    
                                <button @click="passwordView = !passwordView" v-if="form.name === 'Password'" class="btn btn-outline">view</button>
                            </div>
                    </label>
                </div>
                <div @click="getRegisData()" class="w-full max-w-lg mx-auto my-4">
                    <button :disabled="isValid[0] || isValid[1] || isValid[2]" class="btn btn-primary w-full">Register</button>
                </div>
                <div class="w-full max-w-lg mx-auto my-4">
                    <RouterLink :to="{name:'login'}" class="btn btn-outline w-full">Back</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>