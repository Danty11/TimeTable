<script setup lang="ts">
import axios from 'axios';

const form = ref(false)
const loading = ref(false)
const info = ref({
    email: '',
    password: ''
})

const required = (v) => {
        return !!v || 'Field is required'
      }

const onSubmit = async() => {
    try{   const res = await axios.post('https://k80sowk80c808s4cogk0woc0.158.220.126.158.sslip.io/api/auth/login' , {
        email: info.value.email,
        password: info.value.password
    })
    console.log(res)

    localStorage.setItem('accessToken', res.data.token)
   window.location.assign("/")
}

   catch (error){
    alert('خطاء في المعلومات')
   }
}

</script>

<template>
    <v-sheet class="bg-white pa-12" style="height: 100%;" rounded>
      <v-card class="mx-auto px-6 py-8 bg-white elevation-12" max-width="344">
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
        >
        <p class="text-center mb-4" style="font-size: larger;">Login</p>
          <v-text-field
            v-model="info.email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            label="Email"
            clearable
          ></v-text-field>
  
          <v-text-field
            v-model="info.password"
            :readonly="loading"
            :rules="[required]"
            label="Password"
            placeholder="Enter your password"
            clearable
          ></v-text-field>
  
          <br>
  
          <v-btn
            :disabled="!form"
            :loading="loading"
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            block
          >
            Sign In
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </template>