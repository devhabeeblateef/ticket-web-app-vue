import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    session: JSON.parse(localStorage.getItem('ticketapp_session')) || null,
    tickets: JSON.parse(localStorage.getItem('tickets')) || []
  }),

  actions: {
    login(email) {
      const session = { email, logged_in: true, login_time: Date.now() }
      localStorage.setItem('ticketapp_session', JSON.stringify(session))
      this.session = session
    },

    logout() {
      localStorage.removeItem('ticketapp_session')
      this.session = null
    },

    addTicket(ticket) {
      const newTicket = {
        id: Date.now(),
        ...ticket
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
