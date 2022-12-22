<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const form = ref(null);

const valid = ref(true);

const perfil = ref([]);
const URLimageUploaded = ref(null);
const showAvatar = ref(false);
const perfilImg = [
    (value) => {
          if(perfil.value[0]){
            URLimageUploaded.value = URL.createObjectURL(perfil.value[0]);
            showAvatar.value = true;
          }
          if(!value[0]?.name){
            return 'Se requiere una foto para el perfil';
          }
          return true;
        },
]

const name = ref('');
const nameRules = [
        v => !!v || 'El campo nombre es requerido',
      ]
const Lastname = ref('');

const LastnameRules = [
        v => !!v || 'El campo apellido es requerido',
      ]

async function validate(){
  const { valid } = await form.value.validate()

  if (valid){
    // next
    localStorage.setItem("login", JSON.stringify([{perfil:URL.createObjectURL(perfil.value[0]), name: name.value, lastanme: Lastname.value}]));
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
        <v-row v-show="!showAvatar" justify="center" class="my-10">
          <v-avatar class="avatar" size="180">
            <v-file-input 
                v-model="perfil"
                class="fileinput"
                accept="image/*"
                label="Foto de Perfil"
                required
                :rules="perfilImg"
              >
              </v-file-input>
          </v-avatar>
        </v-row>
        <v-row v-show="showAvatar" justify="center" class="my-10">
          <v-avatar class="avatar" :image="URLimageUploaded" size="180">
          </v-avatar>
        </v-row>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Nombres"
          required
        ></v-text-field>

        <v-text-field
          v-model="Lastname"
          :rules="LastnameRules"
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
.form-class{
  width: 100%;
}
.btn {
  background-color: #FFE81E;
  width: 90%;
  color: #FC2016;
}

.fileinput {
  position: absolute;
  top: 50px;
  left: -30px;
  width: 200px;
  /* height: 100px;
  width: 150px; */
}

.avatar {
  background-color: rgba(240, 240, 240, 1);
}

</style>