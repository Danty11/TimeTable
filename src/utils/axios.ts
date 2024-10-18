import axios from 'axios'

export const baseURL = 'https://k80sowk80c808s4cogk0woc0.158.220.126.158.sslip.io/'
const axiosIns = axios.create({
    baseURL: `${baseURL}api/`,
})

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
// TODO: remember to delete this
// accessToken = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJmOTE2OGM1ZS1jZWIyLTRmYWEtYjZiZi0zMjliZjM5ZmExZTQiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MTgyMTkyMDgsImV4cCI6MTcxODIyMTAwOCwiaWF0IjoxNzE4MjE5MjA4LCJpc3MiOiJUZXN0REJUZXN0REIiLCJhdWQiOiJBZG1pbiJ9.K1bAy-XLxQFA2_iSuqZbp2Tui_Qmsr0krVXh8RC-BIw
axiosIns.interceptors.request.use(config => {
    //FIX: please remove this peice of code
    //localStorage.setItem('accessToken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJmOTE2OGM1ZS1jZWIyLTRmYWEtYjZiZi0zMjliZjM5ZmExZTQiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MTgyMTkyMDgsImV4cCI6MTcxODIyMTAwOCwiaWF0IjoxNzE4MjE5MjA4LCJpc3MiOiJUZXN0REJUZXN0REIiLCJhdWQiOiJBZG1pbiJ9.K1bAy-XLxQFA2_iSuqZbp2Tui_Qmsr0krVXh8RC-BIw');
    const token = localStorage.getItem('accessToken')
    // const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjY2VkZjMxZi00NjdiLTRmYTktOTc4ZC03ZjIzN2M0Y2VhNTAiLCJpZCI6ImNjZWRmMzFmLTQ2N2ItNGZhOS05NzhkLTdmMjM3YzRjZWE1MCIsIlJvbGUiOiJBZG1pbiIsIkV4cGllckRhdGUiOiIxMC8xMi8yMDI0IDE5OjI0OjU4IiwibmJmIjoxNzI4NzYwMTk4LCJleHAiOjE3MjkzNjQ5OTgsImlhdCI6MTcyODc2MDE5OH0.9zZN7Iacf0YKp--KfuRedFaQyxukXA5oiQtahxtRLiYS8dMXwtZMK3pG8-pMgkji2R7UOQyYauMBdS0wPrLCKw"

    config.headers = config.headers || {}
    config.headers['Accept-Language'] = 'ar'
    config.headers.Authorization = token ? `Bearer ${token}` : ''


    return config
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(response => {
   
    return response
}, error => {
      // Handle error
      if (error.response.status === 401) {
        // ℹ️ Logout user and redirect to login page
        // Remove "userData" from localStorage
        localStorage.removeItem('userData')

        // Remove "accessToken" from localStorage
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userAbilities')
        window.location.assign("/login")
        
    }
})

export default axiosIns
