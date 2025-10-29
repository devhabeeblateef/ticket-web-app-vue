import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const session = ref(null)
  const user = ref(null)

  function logout() {
    session.value = null
    user.value = null
  }

  function login(userSession) {
    session.value = userSession
    user.value = userSession?.user || null
  }

  return {
    session,
    user,
    logout,
    login
  }
})
      }
      this.tickets.push(newTicket)
      localStorage.setItem('tickets', JSON.stringify(this.tickets))
    },

    updateTicket(updated) {
      const index = this.tickets.findIndex(t => t.id === updated.id)
      if (index !== -1) {
        this.tickets[index] = updated
        localStorage.setItem('tickets', JSON.stringify(this.tickets))
      }
    },

    deleteTicket(id) {
      this.tickets = this.tickets.filter(t => t.id !== id)
      localStorage.setItem('tickets', JSON.stringify(this.tickets))
    }
  }
})
