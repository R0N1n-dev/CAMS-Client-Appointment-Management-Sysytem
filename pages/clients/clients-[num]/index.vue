<template>
    <div>
        <IButton @click="router.go(-1)">Back</IButton>
        <div v-if="pending" class="_display:flex!">
            <ILoader class="_margin-x:auto!" />
        </div>
        <div v-else>
            <p>{{ data.names }}</p>

            <IListGroup color="light">
                <IListGroupItem v-for="appointment in data.appointments" :key="appointment.id">
                    <nuxt-link :to="{ name: 'clients-clients-num-appointments-id', params: { id: appointment.id } }">
                        {{ dateBuilder(appointment.date) }}
                    </nuxt-link>
                </IListGroupItem>
            </IListGroup>
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