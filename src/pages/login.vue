<script setup lang="ts">
import axios from 'axios';

const visible = ref(false)
const form = ref(false)
const loading = ref(false)
const info = ref({
    email: '',
    password: ''
})

const height = ref(window.innerHeight) 

const required = (v:any) => {
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
  <div dir="rtl"class="d-flex" style="height: 100%;">
  <div class="d-flex justify-center align-center " :style="`background-color:#90B7FF; width:100%; height: ${height};`">
    <div style="margin-bottom: 180px;">
    <img src="../assets/logo.png" style="height: 387px; width:400px;" class="">
    <p class="text-center" style="font-size: 48px; font-weight: bolder; color: #e9f1ff">جدول الامن السيبراني</p>
  </div>
  </div>

  <div class=" align-center elevation-4" :style="`width: 40%; height:  ${height} ; background-color: #F7F7F7;`">
  
    <div class="" style="height: 100px;"></div>
    <p class="text-center mt-16 mb-10" style="font-size: 50px; color: black;">تسجيل الدخول</p>
      <v-card class="mx-auto px-6 py-8 elevation-0" style="background-color: #F7F7F7;" max-width="450">
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
        >
       
          <v-text-field
            v-model="info.email"
            :readonly="loading"
            :rules="[required]"
            dir="rtl"
            class="mb-5"
            placeholder="البريد الاكتروني"
            clearable
            variant="outlined"
            style="color: black;"
            
          ></v-text-field>
  
          <v-text-field
            v-model="info.password"
            :readonly="loading"
            :rules="[required]"
            placeholder="الرمز"
            clearable
            :prepend-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            dir="rtl"
            variant="outlined"
             @click:prepend-inner="visible = !visible"
            style="color: black;"
          ></v-text-field>
  
          <br>
  
          <v-btn
            
            :loading="loading"
            style="background: rgb(103,135,194); background: linear-gradient(90deg, rgba(103,135,194,1) 0%, rgba(144,183,255,1) 100%);"
            :size="60"
            type="submit"
            variant="elevated"
            block
          >
            <span style="font-size: 20px;">تسجيل الدخول</span> 
          </v-btn>
        </v-form>
      </v-card>
   
  </div>
</div>
  </template>

  <style></style>