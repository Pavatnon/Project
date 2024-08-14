<script setup >
    import { RouterLink } from 'vue-router';
    import { ref } from 'vue';


    const viewPasswordToggle = ref(false)

</script>

<template>
    <div class="container mx-w-8/12 mx-auto flex justify-center items-center h-screen">
        <div class="flex flex-col w-6/12 p-8 items-center bg-gray-200 rounded-2xl shadow-xl">
            <h1 class="text-3xl font-bold">Login</h1>
            <div class="flex flex-col w-8/12 my-10">
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text font-bold">Username</span>
                    </div>
                    <input type="text" placeholder="Type here" class="input input-bordered w-full" />
                    <div class="label">
                        <span class="label-text font-bold">Password</span>
                    </div>
                    <div class="join w-full">
                        <input :type="viewPasswordToggle === false ? 'password': 'text'" placeholder="Type here" class="input input-bordered w-full join-item" />
                        <button @click="viewPasswordToggle = !viewPasswordToggle" class="btn btn-primary join-item">
                            <IconList
                                icontype = 'view'
                                color = 'white'
                                size = '20'
                            />
                        </button>
                    </div>
                </label>
            </div>
            <RouterLink :to="{name:'home'}" class="btn btn-primary w-8/12 text-xl font-bold">
                Submit
            </RouterLink>
        </div>
    </div>
</template>