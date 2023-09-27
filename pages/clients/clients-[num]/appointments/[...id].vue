<template>
    <div>
        <IButton @click="router.go(-1)">Appointments</IButton>
        <p v-if="data">{{ data.advice }}</p>
    </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const { pending, data, refresh } = await useLazyFetch(`/api/appointments/${route.params.id}`);
</script>
