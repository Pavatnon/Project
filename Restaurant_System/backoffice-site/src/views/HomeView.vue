<script setup>
    const options = {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['จันทร์', 'อังหาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์']
        }
      }
     const series = [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70]
      }]
    

</script>
<template>
    <Leyout>
        <div class="container mx-auto p-10">
            <div class="text-center text-2xl font-bold">ยอดขาย</div>
            <div class="stats stats-vertical lg:stats-horizontal shadow-xl border w-full mx-auto my-4">
                <div class="stat">
                    <div class="stat-title">ยอดขายวันนี้</div>
                    <div class="stat-value">0</div>
                    <div class="stat-desc">วันที่ --/--/--</div>
                </div>

                <div class="stat">
                    <div class="stat-title">ยอดขายรวมที้งสัปดาห์</div>
                    <div class="stat-value">0</div>
                    <div class="stat-desc">วันที่ --/--/-- - --/--/--</div>
                </div>
            </div>
            <div class="flex flex-col  xl:flex-row w-full gap-4">
                <div class="flex flex-col flex-1 justify-center items-center">
                    <p class="mb-4 text-md xl:text-xl font-bold">รายวัน</p>
                    <apexchart class="w-full" type="bar" :options="options" :series="series"></apexchart>
                </div>
                <div class="flex flex-col xl:text-xl flex-1 justify-center items-center">
                    <p class="mb-4 text-md font-bold">รายสัปดาห์</p>
                    <apexchart class="w-full" type="bar" :options="options" :series="series"></apexchart>
                </div>
            </div>
        </div>
    </Leyout>
</template>