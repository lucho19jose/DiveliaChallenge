<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const form = ref(null);

const valid = ref(true);

const perfil = ref([]);
const perfilImg = [
    (value) => {
          if(!value[0]?.name){
            return 'Se requiere una foto para el perfil';
          }
          return true;
        },
]

const name = ref('');
const nameRules = [
        v => !!v || 'El campo nombre es requerido',
        /* v => (v && v.length <= 10) || 'Name must be less than 10 characters', */
      ]
const email = ref('');

const emailRules = [
        v => !!v || 'El campo apellido es requerido',
       /*  v =>  /.+@.+\..+/.test(v) || 'Name must be less than 10 characters', */
      ]

async function validate(){
  const { valid } = await form.value.validate()

  if (valid){
    // next
    router.push({ name: 'Promotions' })
  } 
}


</script>
<template>
  <div>
    <v-row justify="center">
      <img src="@/assets/plaza-vea-logo.png" alt="logo">
    </v-row>
    <div class="text-center mt-4">
      <span class="text-red font-weight-bold">Registrate para ingresar</span>
    </div>
    <v-row
      justify="center"    
    >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="form-class"
      >
        <div class="perfil">
          <div class="perfil-container">
            <div class="perfilwraper">
              <v-file-input 
                v-model="perfil"
                class="fileinput"
                accept="image/*"
                label="Foto de Perfil"
                required
                :rules="perfilImg"
              >
              </v-file-input>
            </div>
          </div>
        </div>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Nombres"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Apellidos"
          required
        ></v-text-field>

        <v-row justify="center" class="mt-3 btn-container" >
          <v-btn
            rounded="pill"
            class="mr-4 btn"
            @click="validate"
          >
            Ingresar
          </v-btn>
        </v-row>
      </v-form>
    </v-row>
  </div>
</template>
<style scoped>
.perfil {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.perfil-upload {
  width: 100%;
}
.form-class{
  width: 100%;
}
/* .btn-container {
  width: 100;
} */
.btn {
  background-color: #FFE81E;
  width: 90%;
}

.perfil-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  background-color: red;
  border-radius: 50%;
}

.perfilwraper {
  width: 250px;
}

.fileinput {
  height: 100px;
  width: 150px;
}

</style>