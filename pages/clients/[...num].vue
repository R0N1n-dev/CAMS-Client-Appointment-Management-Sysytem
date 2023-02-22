<template>
  <i-container>
    <i-card v-if="data" class="_margin-y:1">
      <i-button
        @click.prevent="router.go(-1)"
        class="_display:flex _margin-x:auto"
        >Back</i-button
      >
      <h4 class="card-title">{{ data.names }}</h4>
      <p class="card-subtitle">{{ data.email }}</p>
      <i-button @click.prevent="showModal = !showModal"
        >Add resolutions</i-button
      >
      <i-modal v-model="showModal">
        <template #header>Update Client Appointment Info</template>
        <div class="_display-flex">
          <div class="_margin-x-auto">
            <p>Appointment monitor</p>
          </div>
        </div>
        <i-form class="form _padding-y-2">
          <i-form-group>
            <i-form-label>Advice</i-form-label>
            <i-textarea v-model="advice">
              <template #append>
                <i-button @click.prevent="addAdvice">Add</i-button>
              </template>
            </i-textarea>
          </i-form-group>
          <i-form-group class="_text-center">
            <i-button type="submit" @click.prevent="addResolution(data.id)"
              >Submit</i-button
            >
          </i-form-group>
        </i-form>
      </i-modal>
      <template #footer>
        <i-table responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Resolution</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ date, advice, id } in data.appointments" :key="id">
              <td>
                {{ dateBuilder(date) }}
              </td>
              <td v-for="i in advice" :key="i">
                {{ i }}
              </td>
            </tr>
          </tbody>
        </i-table>
      </template>
    </i-card>
  </i-container>
</template>

<script setup>
import dateBuilder from "~/utils/dates";
const router = useRouter();
const route = useRoute();
const showModal = ref(false);

const { data, pending, refresh } = await useLazyFetch(
  `/api/clients/${route.params.num}`
);
const advice = ref("");
const resolution = ref({
  date: "",
  advice: [],
});
function addAdvice() {
  if (advice.value !== "") {
    resolution.value.advice.push(advice.value);
    advice.value = "";
  }
}
async function addResolution(num) {
  const res = await $fetch(`/api/clients/${num}`, {
    method: "PUT",
    body: {
      advice: resolution.value.advice,
    },
  });
  console.log("Response", res);
  resolution.value.advice = "";
  refresh();
}
</script>

<style></style>
