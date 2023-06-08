<template>
  <IContainer>
    <ICard v-if="data" class="_margin-y:1">
      <IButton
        @click.prevent="router.go(-1)"
        class="_display:flex _margin-x:auto"
        ><IIcon name="ink-chevron-down" /><span>Back</span></IButton
      >
      <h4 class="card-title">{{ data.names }}</h4>
      <p class="card-subtitle">{{ data.email }}</p>
      <div>
        <p v-if="(data.history.length = 1)">{{ data.history[0] }}</p>
        <ul v-else>
          <li v-for="i in data.history" :key="i">
            {{ data.history }}
          </li>
        </ul>
      </div>
      <IButton @click.prevent="showModal = !showModal">Add resolutions</IButton>
      <IModal v-model="showModal">
        <template #header>Update Client Appointment Info</template>
        <div class="_display-flex">
          <div class="_margin-x-auto">
            <p>Appointment monitor</p>
          </div>
        </div>
        <IForm class="form _padding-y-2">
          <IFormGroup>
            <IFormLabel>Advice</IFormLabel>
            <ITextarea v-model="advice">
              <template #append>
                <IButton @click.prevent="addAdvice">Add</IButton>
              </template>
            </ITextarea>
          </IFormGroup>
          <IFormGroup>
            <div v-if="resolution.advice.length !== 0" class="_margin-y:1">
              <i-badge
                class="_margin-right:1"
                v-for="(advice, index) in resolution.advice"
                :key="index"
                >{{ advice }}</i-badge
              >
            </div>
            <IFormLabel>Result</IFormLabel>
            <IInput v-model="result">
              <template #append>
                <IButton @click.prevent="addChange">Add</IButton>
              </template>
            </IInput>
          </IFormGroup>
          <div v-if="resolution.changes.length !== 0" class="_margin-y:1">
            <i-badge
              class="_margin-right:1"
              v-for="(change, index) in resolution.changes"
              :key="index"
              >{{ change }}</i-badge
            >
          </div>
          <IFormGroup class="_text-center">
            <IButton type="submit" @click.prevent="addResolution(data.id)"
              >Submit</IButton
            >
          </IFormGroup>
        </IForm>
      </IModal>
      <template #footer>
        <ITable responsive>
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
              <td>
                <ul v-for="i in advice" :key="i">
                  <li>{{ i }}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </ITable>
      </template>
    </ICard>
  </IContainer>
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
const result = ref("");
const resolution = ref({
  advice: [],
  changes: [],
});

function addChange() {
  if (result.value !== "") {
    resolution.value.changes.push(result.value);
    result.value = "";
  }
}

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
      //changes: resolution.value.changes,
    },
  });
  console.log("Response", res);
  resolution.value.advice = "";
  refresh();
}
</script>

<style lang="scss" scoped>
.inkline-icon {
  transform: rotate(90deg);
}
</style>
