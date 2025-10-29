import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const session = ref(null)
  const tickets = ref(JSON.parse(localStorage.getItem('tickets') || '[]'))

  function login(userData) {
    session.value = userData
    localStorage.setItem('session', JSON.stringify(userData))
  }

  function logout() {
    session.value = null
    localStorage.removeItem('session')
  }

  function addTicket(newTicket) {
    tickets.value.push(newTicket)
    localStorage.setItem('tickets', JSON.stringify(tickets.value))
  }

  // Initialize session from localStorage on store creation
  const storedSession = localStorage.getItem('session')
  if (storedSession) {
    session.value = JSON.parse(storedSession)
  }

  return {
    session,
    tickets,
    login,
    logout,
    addTicket
  }
})
