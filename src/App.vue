<script setup>
</script>

<template>
  <v-app>
    <v-container>
      <v-row
        align="start"
      >
        <v-col>
          <div>
            <img src="@/assets/plaza.png" alt="">
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
.container {

}
</style>
