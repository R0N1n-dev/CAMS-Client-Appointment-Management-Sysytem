<template>
  <IContainer>
    <h2 align="center">Client Registration</h2>
    <IForm @keyup.prevent.enter="addClient">
      <IRow class="_margin-y:1">
        <IColumn xs="12" lg="4" md="4">
          <IFormGroup>
            <IFormLabel>Names</IFormLabel>
            <IInput v-model="client.names" placeholder="names" clearable />
          </IFormGroup>
        </IColumn>
        <IColumn xs="12" lg="4" md="4">
          <IFormGroup>
            <IFormLabel>Age</IFormLabel>
            <IInput v-model="client.age" placeholder="Age e.g 42" clearable />
          </IFormGroup>
        </IColumn>
        <IColumn>
          <IFormGroup>
            <IFormLabel>Contact</IFormLabel>
            <IInput
              v-model="client.contact"
              placeholder="Phone e.g. 0772684848"
              clearable
            />
          </IFormGroup>
        </IColumn>
      </IRow>
      <IRow class="_margin-y:1">
        <IColumn xs="12" md="6" lg="6">
          <IFormGroup>
            <IFormLabel>Email</IFormLabel>
            <IInput
              v-model="client.email"
              type="email"
              placeholder="johndoe@mail.com"
              clearable
            />
          </IFormGroup>
        </IColumn>
        <IColumn xs="12" md="6" lg="6">
          <IFormGroup>
            <IFormLabel>Profession</IFormLabel>
            <IInput
              v-model="client.profession"
              type="text"
              placeholder="e.g doctor, teacher, accountant"
              clearable
            />
          </IFormGroup>
        </IColumn>
      </IRow>
      <IRow>
        <IColumn>
          <IFormGroup>
            <IFormLabel>History of family health conditions</IFormLabel>
            <ICheckboxGroup v-model="client.history">
              <ICheckbox
                v-for="condition in conditions"
                :key="condition"
                :value="condition"
                >{{ condition }}</ICheckbox
              >
            </ICheckboxGroup>
          </IFormGroup>
        </IColumn>
        <IColumn
          xs="12"
          :md="client.illnesses.length === 0 ? '6' : '4'"
          :lg="client.illnesses.length === 0 ? '6' : '4'"
        >
          <IFormGroup>
            <IFormLabel>Any current illnesses</IFormLabel>
            <IInput v-model="illness">
              <template #append>
                <IButton @click.prevent="addIllness">Add</IButton>
              </template>
            </IInput>
          </IFormGroup>
        </IColumn>

        <IColumn>
          <div v-if="client.illnesses.length !== 0" class="_margin-y:l">
            <IBadge
              class="_margin-right:1"
              style="margin-block: 0.2rem"
              v-for="(illness, index) in client.illnesses"
              :key="index"
              >{{ illness }}</IBadge
            >
          </div>
        </IColumn>
      </IRow>
      <IRow class="_margin-y:1">
        <IColumn
          xs="12"
          md="12"
          :lg="client.diagnosis.length === 0 ? '12' : '6'"
        >
          <IFormGroup>
            <IFormLabel>Diagnosis</IFormLabel>
            <IInput v-model="eachDiagnosis" placeholder="Diagnosis" clearable>
              <template #append>
                <IButton @click.prevent="addDiagnosis">Add</IButton>
              </template>
            </IInput>
          </IFormGroup>
        </IColumn>
        <IColumn>
          <div v-if="client.diagnosis.length !== 0" class="_margin-y:1">
            <IBadge
              class="_margin-right:1"
              style="margin-block: 0.2rem"
              v-for="(diagnosis, index) in client.diagnosis"
              :key="index"
              >{{ diagnosis }}</IBadge
            >
          </div>
        </IColumn>
      </IRow>
      <IRow>
        <IColumn xs="12" md="12" :lg="client.advice.length === 0 ? '12' : '6'">
          <IFormGroup>
            <IFormLabel>Advice</IFormLabel>
            <ITextarea
              v-model="advice"
              placeholder="Any advice/recommendations given"
              clearable
            >
              <template #append>
                <IButton @click.prevent="addAdvice">Add</IButton>
              </template>
            </ITextarea>
          </IFormGroup>
        </IColumn>
        <IColumn>
          <div v-if="client.advice.length !== 0" class="_margin-y:1">
            <IBadge
              class="_margin-right:1"
              style="margin-block: 0.2rem"
              v-for="(advice, index) in client.advice"
              :key="index"
              >{{ advice }}</IBadge
            >
          </div>
        </IColumn>
      </IRow>
      <IButton
        @click.prevent="addClient"
        class="_margin-x:auto _display:flex _margin-y:2"
        >Add Client</IButton
      >
    </IForm>
  </IContainer>
</template>

<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
definePageMeta({
  keepalive: true,
});
import { init } from "@paralleldrive/cuid2";
const length = 5;
const cuid = init({ length });
const eachDiagnosis = ref("");
const advice = ref("");
const conditions = ref([
  "Cancer",
  "Diabetes",
  "Hypertension/High blood pressure",
  "Heart disease",
]);
const illness = ref("");
const client = ref({
  names: "",
  clientNum: null,
  contact: null,
  age: null,
  email: "",
  history: [],
  illnesses: [],
  profession: "",
  diagnosis: [],
  advice: [],
});

function addIllness() {
  if (illness.value !== "") {
    client.value.illnesses.push(illness.value);
    illness.value = "";
  }
}

function addAdvice() {
  if (advice.value !== "") {
    client.value.advice.push(advice.value);
    advice.value = "";
  }
}

function addDiagnosis() {
  if (eachDiagnosis.value !== "") {
    client.value.diagnosis.push(eachDiagnosis.value);
    eachDiagnosis.value = "";
  }
}

async function addClient() {
  const res = await $fetch("/api/clients", {
    method: "POST",
    body: {
      names: client.value.names,
      clientNum: cuid(),
      age: parseInt(client.value.age),
      contact: client.value.contact,
      history: client.value.history,
      illnesses: client.value.illnesses,
      email: client.value.email,
      profession: client.value.profession,
      diagnosis: client.value.diagnosis,
      advice: client.value.advice,
    },
  });
  toast.success("Successfully added", { timeout: 2000 });
  console.log("Response", res);
  client.value.names = "";
  client.value.clientNum = null;
  client.value.contact = null;
  client.value.age = null;
  client.value.history = [];
  client.value.illnesses = [];
  client.value.email = "";
  client.value.profession = "";
  client.value.diagnosis = [];
  client.value.advice = "";
}
</script>

<style></style>
