<script setup>
import { ref } from 'vue';
const props = defineProps({
	text: {
		type: String,
		default: '',
	},
})

const showPopup = ref(true)

</script>
<template>
  <v-snackbar
      v-model="showPopup"
      timeout="1000"
      color="primary"
    >
    {{ text }}
    <template v-slot:actions>
      <v-btn
        color="pink"
        variant="text"
        @click="showPopup = false"
      >
        cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>
