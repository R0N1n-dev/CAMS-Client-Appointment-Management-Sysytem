<template>
  <i-container>
    <h2>Clients</h2>
    <i-row>
      <i-column v-for="client in data" :key="client.id" class="_margin-y:1">
        <nuxt-link
          class="_text-decoration:none"
          :to="{ name: 'clients-num', params: { num: client.clientNum } }"
        >
          <i-card>
            <h4 class="card-title">{{ client.names }}</h4>
            <p class="card-subtitle">{{ client.email }}</p>
            <template #footer>
              <i-button @click.prevent="deleteClient(client.clientNum)"
                >X</i-button
              >
            </template>
          </i-card>
        </nuxt-link>
      </i-column>
    </i-row>
  </i-container>
</template>

<script setup>
const { data, pending, refresh } = useLazyFetch("/api/clients");
async function deleteClient(num) {
  const res = await $fetch(`/api/clients/${num}`, { method: "DELETE" });
  //console.log("Response", res);
  refresh();
}
</script>

<style scoped></style>
