<template>
  <IContainer>
    <div align="center">
      <p class="h2">Add client Data</p>
      <ITooltip placement="right">
        <IButton class="_margin-y:1" circle size="lg" to="/new_client">
          <i-icon name="ink-plus" />
        </IButton>
        <template #body>Add Client</template>
      </ITooltip>
    </div>
    <div v-if="pending" class="_display:flex!">
      <ILoader class="_margin-x:auto!" />
    </div>
    <div v-else>
      <IRow>
        <IColumn v-for="client in data" :key="client.id" class="_margin-y:1">
          <nuxt-link class="_text-decoration:none!"
            :to="{ name: 'clients-clients-num', params: { num: client.clientNum } }">
            <ICard>
              <h4 class="card-title">{{ client.names }}</h4>
              <p class="card-subtitle">{{ client.email }}</p>
              <template #footer>
                <IButton @click.prevent="deleteClient(client.clientNum)">X</IButton>
              </template>
            </ICard>
          </nuxt-link>
        </IColumn>
      </IRow>
    </div>
  </IContainer>
</template>

<script setup>

const { data, pending, refresh } = useLazyFetch("/api/clients");
function clientDeleted() {
  toast.show({
    title: "Success",
    message: "Client Entry Deleted ",
    color: "danger",
  });
}
async function deleteClient(num) {
  const res = await $fetch(`/api/clients/${num}`, { method: "DELETE" });
  clientDeleted();
  refresh();
}
</script>

<style lang="scss" scoped>
button {
  --border-style: none;
}
</style>
