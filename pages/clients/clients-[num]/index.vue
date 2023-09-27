<template>
    <div>
        <IButton @click="router.go(-1)">Back</IButton>

        <div v-if="data">
            <p>{{ data.names }}</p>
            <nuxt-link v-for="appointment in data.appointments" :key="appointment.id"
                :to="{ name: 'clients-clients-num-appointments-id', params: { id: appointment.id } }">
                {{ dateBuilder(appointment.date) }}
            </nuxt-link>
        </div>
    </div>
</template>

<script setup>
import dateBuilder from '@/utils/dates';
const router = useRouter();
const route = useRoute();
const { data, pending, refresh } = await useLazyFetch(
    `/api/clients/${route.params.num}`
);
</script>