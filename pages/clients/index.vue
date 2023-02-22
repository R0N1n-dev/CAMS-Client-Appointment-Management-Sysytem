<template>
  <i-container>
    <div v-if="data.length === 0" align="center">
      <p class="_text:bold _font-size:lg">Add client data, None found</p>

      <i-tooltip placement="right">
        <i-button circle size="lg" to="/new_client"
          ><i
            class="cap-icon ci-plus"
            style="cursor: pointer; font-size: 2rem"
          ></i
        ></i-button>
        <template #body>Add Client</template>
      </i-tooltip>
    </div>
    <div v-else>
      <h1 class="_text-align:center">
        No. of Clients
        <i-badge color="primary">{{ data.length }}</i-badge>
      </h1>
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
    </div>
  </i-container>
</template>

<script setup>
const { data, pending, refresh } = useLazyFetch("/api/clients");
async function deleteClient(num) {
  const res = await $fetch(`/api/clients/${num}`, { method: "DELETE" });
  refresh();
}
</script>

<style lang="scss" scoped>
button {
  --border-style: none;
}
</style>
