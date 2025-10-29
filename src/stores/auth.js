import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const session = ref(null)
  
  // Safe localStorage access with error handling
  const getStoredTickets = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return JSON.parse(localStorage.getItem('tickets') || '[]')
      }
    } catch (error) {
      console.warn('Failed to parse stored tickets:', error)
    }
    return []
  }
  
  const tickets = ref(getStoredTickets())

  function login(userData) {
    session.value = userData
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('session', JSON.stringify(userData))
      }
    } catch (error) {
      console.warn('Failed to save session:', error)
    }
  }

  function logout() {
    console.log('Auth store logout called, current session:', session.value)
    session.value = null
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('session')
        console.log('Session removed from localStorage')
      }
    } catch (error) {
      console.warn('Failed to remove session:', error)
    }
    console.log('Logout completed, session is now:', session.value)
  }

  function addTicket(newTicket) {
    tickets.value.push(newTicket)
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('tickets', JSON.stringify(tickets.value))
      }
    } catch (error) {
      console.warn('Failed to save tickets:', error)
    }
  }

  // Initialize session from localStorage on store creation
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedSession = localStorage.getItem('session')
      if (storedSession) {
        session.value = JSON.parse(storedSession)
      }
    }
  } catch (error) {
    console.warn('Failed to load stored session:', error)
  }

  return {
    session,
    tickets,
    login,
    logout,
    addTicket
  }
})
