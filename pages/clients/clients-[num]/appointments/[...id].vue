<template>
    <div>
        <IToastContainer />
        <IButton @click="router.go(-1)">Appointments</IButton>
        <div v-if="pending" class="_display:flex!">
            <ILoader class="_margin-x:auto!" />
        </div>
        <p v-else>{{ data.advice }}</p>
        <IForm>
            <IFormGroup>
                <IFormLabel>Anything to report from previous recommendations</IFormLabel>
                <IInput v-model="recap">
                    <template #append>
                        <IButton @click.prevent="addResult">Add</IButton>
                    </template>
                </IInput>
            </IFormGroup>



            <div v-if="results.length !== 0" class="_margin-y:l">
                <IBadge class="_margin-right:1" style="margin-block: 0.2rem" v-for="(result, index) in results"
                    :key="index">
                    {{ result }}</IBadge>
            </div>
            <IButton @click.prevent="addFeedback">Update</IButton>
        </IForm>
    </div>
</template>

<script setup>
import { useToast } from "@inkline/inkline/composables";
const toast = useToast();

const route = useRoute();
const router = useRouter();
const { pending, data, refresh } = await useLazyFetch(`/api/appointments/${route.params.id}`);
const recap = ref("");
const results = ref([]);

function appointmentUpdated() {
    toast.show({
        title: "Successfully updated",
        message: "Results Added",
        color: "info",
    });
}

function addResult() {
    if (recap.value !== "") {
        results.value.push(recap.value);
        recap.value = "";
    }
}
async function addFeedback() {
    const res = await $fetch(`/api/appointments/${route.params.id}`, {
        method: 'PUT',
        body: {
            feedback: results.value
        }
    });
    appointmentUpdated();
    console.log('Response', res);
    recap.value = '';
    results.length = 0;
    refresh();
}
</script>
