<template>
  <i-container>
    <h2 align="center">Client Registration</h2>
    <i-form @keyup.prevent.enter="addClient">
      <i-row class="_margin-y:1">
        <i-column xs="12" lg="4" md="4">
          <i-form-group>
            <i-form-label>Names</i-form-label>
            <i-input v-model="client.names" placeholder="names" clearable />
          </i-form-group>
        </i-column>
        <i-column xs="12" lg="4" md="4">
          <i-form-group>
            <i-form-label>Age</i-form-label>
            <i-input v-model="client.age" placeholder="Age e.g 42" clearable />
          </i-form-group>
        </i-column>
        <i-column>
          <i-form-group>
            <i-form-label>Contact</i-form-label>
            <i-input
              v-model="client.contact"
              placeholder="Phone e.g. 0772684848"
              clearable
            />
          </i-form-group>
        </i-column>
      </i-row>
      <i-row class="_margin-y:1">
        <i-column xs="12" md="6" lg="6">
          <i-form-group>
            <i-form-label>Email</i-form-label>
            <i-input
              v-model="client.email"
              type="email"
              placeholder="johndoe@mail.com"
              clearable
            />
          </i-form-group>
        </i-column>
        <i-column xs="12" md="6" lg="6">
          <i-form-group>
            <i-form-label>Profession</i-form-label>
            <i-input
              v-model="client.profession"
              type="text"
              placeholder="e.g doctor, teacher, accountant"
              clearable
            />
          </i-form-group>
        </i-column>
      </i-row>
      <i-row>
        <i-column>
          <i-form-group>
            <i-form-label>History of family health conditions</i-form-label>
            <i-checkbox-group v-model="client.history">
              <i-checkbox
                v-for="condition in conditions"
                :key="condition"
                :value="condition"
                >{{ condition }}</i-checkbox
              >
            </i-checkbox-group>
          </i-form-group>
        </i-column>
        <i-column
          xs="12"
          :md="client.illnesses.length === 0 ? '6' : '4'"
          :lg="client.illnesses.length === 0 ? '6' : '4'"
        >
          <i-form-group>
            <i-form-label>Any current illnesses</i-form-label>
            <i-input v-model="illness">
              <template #append>
                <i-button @click.prevent="addIllness">Add</i-button>
              </template>
            </i-input>
          </i-form-group>
        </i-column>

        <i-column>
          <div v-if="client.illnesses.length !== 0" class="_margin-y:l">
            <i-badge
              class="_margin-right:1"
              style="margin-block: 0.2rem"
              v-for="(illness, index) in client.illnesses"
              :key="index"
              >{{ illness }}</i-badge
            >
          </div>
        </i-column>
      </i-row>
      <i-row class="_margin-y:1">
        <i-column
          xs="12"
          md="12"
          :lg="client.diagnosis.length === 0 ? '12' : '6'"
        >
          <i-form-group>
            <i-form-label>Diagnosis</i-form-label>
            <i-input v-model="eachDiagnosis" placeholder="Diagnosis" clearable>
              <template #append>
                <i-button @click.prevent="addDiagnosis">Add</i-button>
              </template>
            </i-input>
          </i-form-group>
        </i-column>
        <i-column>
          <div v-if="client.diagnosis.length !== 0" class="_margin-y:1">
            <i-badge
              class="_margin-right:1"
              style="margin-block: 0.2rem"
              v-for="(diagnosis, index) in client.diagnosis"
              :key="index"
              >{{ diagnosis }}</i-badge
            >
          </div>
        </i-column>
      </i-row>
      <i-row>
        <i-column xs="12" md="12" :lg="client.advice.length === 0 ? '12' : '6'">
          <i-form-group>
            <i-form-label>Advice</i-form-label>
            <i-textarea
              v-model="advice"
              placeholder="Any advice/recommendations given"
              clearable
            >
              <template #append>
                <i-button @click.prevent="addAdvice">Add</i-button>
              </template>
            </i-textarea>
          </i-form-group>
        </i-column>
        <i-column>
          <div v-if="client.advice.length !== 0" class="_margin-y:1">
            <i-badge
              class="_margin-right:1"
              style="margin-block: 0.2rem"
              v-for="(advice, index) in client.advice"
              :key="index"
              >{{ advice }}</i-badge
            >
          </div>
        </i-column>
      </i-row>
      <i-button
        @click.prevent="addClient"
        class="_margin-x:auto _display:flex _margin-y:2"
        >Add Client</i-button
      >
    </i-form>
  </i-container>
</template>

<script setup>
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
