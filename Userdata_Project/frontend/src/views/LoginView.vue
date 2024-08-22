<script setup>
import { ref,reactive,watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter()

const passwordView = ref(false)

let isValid = [false, false]

const loginForm = ref([
    {
        name:'Username',
        field:'username'
    },
    {
        name:'Password',
        field:'password'
    },

])
const loginData = reactive({
    username: '',
    password:''
})

watch(()=>[loginData.username, loginData.password],(newdata) => {
    isValid[0] = false
    isValid[1] = false

    if(!newdata[0]){
        isValid[0] = true
    }
    if (!newdata[1]) {
        isValid[1] = true
    }
},{immediate:true})

const getLoginData = () =>{
    console.log(loginData)
    router.push({
        name:'userdata'
    })
}

</script>
<template>
    <div class="container mx-auto">
        <div class="flex flex-col w-full h-screen justify-center items-center">
            <div class="w-6/12 mx-auto bg-gray-400/20 p-8">
                <h1 class="text-2xl font-bold text-center">LOGIN</h1>
                <div class="flex flex-col items-center w-full gap-4 my-4">
                    <label v-for="form in loginForm" class="form-control w-full max-w-lg">
                        <div class="label">
                            <span class="label-text text-lg ">{{form.name}}</span>
                        </div>
                        <div class="flex flex-row gap-1">
                            <div class="flex flex-col w-full">
                                <input v-model="loginData[form.field]" 
                                        :type="form.name === 'Password' && !passwordView ? 'password': 'text'"
                                        placeholder="Type here" class="input input-bordered w-full max-w-lg" />
                                <div v-if="isValid[0] && form.name === 'Username'">
                                    <p class="text-red-500">**กรุรากรอก username**</p>
                                </div>
                                <div v-if="isValid[1] && form.name === 'Password'">
                                    <p class="text-red-500">**กรุรากรอก password**</p>
                                </div>

                            </div>

                            <button @click="passwordView = !passwordView" v-if="form.name === 'Password'" class="btn btn-outline">view</button>
                        </div>
                    </label>
                </div>
                <div @click="getLoginData()" class="w-full max-w-lg mx-auto my-4">
                    <button :disabled="isValid[0] || isValid[1]" class="btn btn-primary w-full">Login</button>
                </div>
                <div class="w-full max-w-lg mx-auto">
                    <RouterLink :to="{name:'register'}" class="btn btn-outline w-full">Register</RouterLink>
                </div>

            </div>
        </div>
    </div>
</template>