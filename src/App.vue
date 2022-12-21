<script setup>
</script>

<template>
  <v-app>
    <v-container>
      <v-row
        align="start"
      >
        <v-col class="plazaimg-container">
          <div>
            <img src="@/assets/plaza.png" alt="" class="plazaimg">
          </div>
        </v-col>
        <v-col>
          <div>
            <router-view />
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- <div class="container">
      <div>
        <img src="@/assets/plaza.png" alt="">
      </div>
      <div>
        <router-view />
      </div>
    </div> -->
  </v-app>
</template>

<style scoped>
.plazaimg {
  width: 100%;
}

.plazaimg-container {
  display: none;
}
@media only screen and (min-width: 850px) {
  .plazaimg-container {
    display: block;
  }
}
</style>
