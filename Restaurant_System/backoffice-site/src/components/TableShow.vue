<script setup>
    import { defineProps } from 'vue';
    defineProps({
        headerShow:Array,

    })
</script>
<template>
    <thead>
        <tr class="text-center">
            <th v-for="header in headerShow">{{ header }}</th>
        </tr>
    </thead>

</template>