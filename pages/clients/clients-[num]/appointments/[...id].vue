<template>
    <div>
        <IButton @click="router.go(-1)">Appointments</IButton>
        <div v-if="pending" class="_display:flex!">
            <ILoader class="_margin-x:auto!" />
        </div>
        <p v-else>{{ data.advice }}</p>
    </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const { pending, data, refresh } = await useLazyFetch(`/api/appointments/${route.params.id}`);
</script>
