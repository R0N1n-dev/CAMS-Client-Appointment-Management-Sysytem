<template>
  <i-container>
    <div align="center">
      <p class="h2">Add client Data</p>
      <i-tooltip placement="right">
        <i-button class="_margin-y:1" circle size="lg" to="/new_client"
          ><i
            class="cap-icon ci-plus"
            style="cursor: pointer; font-size: 2rem"
          ></i
        ></i-button>
        <template #body>Add Client</template>
      </i-tooltip>
    </div>
    <div>
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
