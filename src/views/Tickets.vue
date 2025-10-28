<template>
<section class="max-w-[1440px] mx-auto py-6 md:py-10 px-4 lg:px-8">
    
    <div class="flex flex-wrap justify-start items-center gap-x-8 gap-y-2 text-base text-gray-500 mb-8 
                font-mono tracking-widest bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
        
        <span class="text-gray-400">Total: <strong class="font-bold text-cyan-400">{{ totalCount }}</strong></span>
        
        <span class="text-gray-400">Open: <strong class="font-bold text-green-400">{{ openCount }}</strong></span>
        
        <span class="text-gray-400">Closed: <strong class="font-bold text-gray-500">{{ closedCount }}</strong></span>
        
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-cyan-800/50 mb-10">
        <h2 class="text-3xl font-extrabold text-white mb-4 sm:mb-0 tracking-wide">
            Ticket Log // Active
        </h2>
        
        <div class="flex space-x-4">
            <button @click="showNewTicketForm" class="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-lg
                                            bg-gradient-to-r from-purple-600 to-cyan-500 text-white 
                                            shadow-lg shadow-cyan-500/30 transform transition duration-300 
                                            hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-400/40">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                New Ticket
            </button>
            
            <button @click="logout" class="px-5 py-2 text-red-400 border border-red-500 rounded-lg 
                                           hover:bg-red-500/10 transition duration-200 font-semibold">
                Logout
            </button>
        </div>
    </div>

    <div v-if="showForm" class="p-8 mb-8 rounded-2xl border border-cyan-800/50 
                                       bg-gray-900/60 backdrop-blur-lg shadow-2xl shadow-cyan-900/30">
        <h3 class="text-2xl font-extrabold mb-6 text-white border-b border-gray-700/50 pb-3">
            {{ editingTicket ? 'System Update // Edit Ticket' : 'System Input // Create Ticket' }}
        </h3>
        
        <form @submit.prevent="editingTicket ? updateTicket() : createTicket()" class="space-y-4">
            
            <label class="block">
                <span class="text-sm font-medium text-gray-400 mb-1 block">Title</span>
                <input v-model="title" required 
                       class="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-xl 
                              bg-gray-800 text-white placeholder-gray-500 transition duration-300
                              focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-base">
            </label>
            
            <label class="block">
                <span class="text-sm font-medium text-gray-400 mb-1 block">Status</span>
                <select v-model="status" required 
                        class="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-xl 
                               bg-gray-800 text-white placeholder-gray-500 transition duration-300
                               focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-base">
                    <option value="" class="bg-gray-800">Select status</option>
                    <option value="open" class="bg-gray-800 text-purple-400">Open</option>
                    <option value="in_progress" class="bg-gray-800 text-cyan-400">In Progress</option>
                    <option value="closed" class="bg-gray-800 text-gray-500">Closed</option>
                </select>
            </label>
            
            <label class="block">
                <span class="text-sm font-medium text-gray-400 mb-1 block">Description</span>
                <textarea v-model="description" maxlength="1000" rows="5"
                          class="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-xl 
                                 bg-gray-800 text-white placeholder-gray-500 transition duration-300
                                 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-base"></textarea>
            </label>
            
            <div class="flex justify-end space-x-3 pt-4">
                <button type="button" @click="hideForm" class="px-5 py-2 text-gray-500 border border-gray-700 rounded-lg hover:bg-gray-800 transition duration-150">
                    Cancel
                </button>
                <button type="submit" class="px-6 py-2 font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition duration-150">
                    {{ editingTicket ? 'Update Ticket' : 'Execute Save' }}
                </button>
            </div>
        </form>
    </div>

    <div class="space-y-4">
        <div v-if="tickets.length === 0" class="p-6 rounded-2xl border border-gray-700/50 bg-gray-900/60 backdrop-blur-md text-center text-gray-500">
            No tickets found. Create your first ticket above.
        </div>
        
        <div v-for="ticket in tickets" :key="ticket.id" 
             class="p-6 rounded-2xl border border-gray-700/50 bg-gray-900/60 backdrop-blur-md 
                    hover:border-cyan-700/50 transition duration-300">
            
            <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                    <h4 class="text-xl font-semibold text-white mb-2">{{ ticket.title }}</h4>
                    <div class="flex items-center space-x-4 text-sm">
                        <span :class="['px-3 py-1 rounded-full border text-xs font-medium uppercase tracking-wider', getStatusColor(ticket.status)]">
                            {{ ticket.status.replace('_', ' ') }}
                        </span>
                        <span class="text-gray-500">ID: {{ ticket.id }}</span>
                        <span v-if="ticket.createdAt" class="text-gray-500">
                            Created: {{ new Date(ticket.createdAt).toLocaleDateString() }}
                        </span>
                    </div>
                </div>
                
                <div class="flex space-x-2 ml-4">
                    <button @click="editTicket(ticket)" 
                            class="px-3 py-1 text-cyan-400 border border-cyan-500 rounded hover:bg-cyan-500/10 transition duration-150 text-sm">
                        Edit
                    </button>
                    <button @click="confirmDelete(ticket.id)" 
                            class="px-3 py-1 text-red-400 border border-red-500 rounded hover:bg-red-500/10 transition duration-150 text-sm">
                        Delete
                    </button>
                </div>
            </div>
            
            <div v-if="ticket.description" class="text-gray-300 text-sm bg-gray-800/50 p-3 rounded-lg">
                {{ ticket.description }}
            </div>
        </div>
    </div>
</section>

<div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-950/70 backdrop-blur-sm z-50 transition-opacity duration-300" role="dialog" aria-modal="true">
    <div class="p-8 rounded-xl shadow-2xl max-w-sm w-full 
                bg-gray-900/80 border border-red-800/50 
                transform transition-all duration-300 ease-out scale-100">
        
        <h4 class="text-xl font-bold text-red-400 mb-4 border-b border-red-800 pb-2">ALERT // Confirm Action</h4>
        <p class="text-gray-300 text-base mb-8">{{ modalMessage }}</p>
        
        <div class="flex justify-end space-x-3 modal-actions">
            <button @click="showModal = false" class="px-5 py-2 text-gray-500 border border-gray-700 rounded-lg hover:bg-gray-800" type="button">
                Abort
            </button>
            
            <button @click="handleModalConfirm" class="px-5 py-2 font-semibold rounded-lg bg-red-600 text-white hover:bg-red-500 transition duration-150" type="button">
                Affirmative
            </button>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

// Form data
const title = ref('')
const status = ref('open')
const description = ref('')
const showForm = ref(false)
const editingTicket = ref(null)

// Modal data
const showModal = ref(false)
const modalMessage = ref('')
const modalAction = ref(null)

// Reactive trigger for localStorage updates
const ticketsUpdateTrigger = ref(0)

// Load tickets from localStorage on mount
onMounted(() => {
  if (auth.loadTickets) {
    auth.loadTickets()
  }
})

// Computed properties
const tickets = computed(() => {
  // This dependency ensures the computed updates when we change tickets
  ticketsUpdateTrigger.value
  try {
    return JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]')
  } catch (e) {
    return []
  }
})

const totalCount = computed(() => tickets.value.length)
const openCount = computed(() => tickets.value.filter(t => t.status === 'open').length)
const closedCount = computed(() => tickets.value.filter(t => t.status === 'closed').length)

// Form functions
function showNewTicketForm() {
  editingTicket.value = null
  title.value = ''
  status.value = 'open'
  description.value = ''
  showForm.value = true
}

function hideForm() {
  showForm.value = false
  editingTicket.value = null
}

function createTicket() {
  if (!title.value || !status.value) {
    return window.$toast('Invalid input. Please check title and status.', 'error')
  }
  
  const newTicket = {
    id: Date.now(),
    title: title.value,
    status: status.value,
    description: description.value,
    createdAt: new Date().toISOString()
  }
  
  const currentTickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]')
  currentTickets.push(newTicket)
  localStorage.setItem('ticketapp_tickets', JSON.stringify(currentTickets))
  
  // Trigger reactivity update
  ticketsUpdateTrigger.value++
  
  hideForm()
  window.$toast('Ticket created successfully', 'success')
}

function editTicket(ticket) {
  editingTicket.value = ticket
  title.value = ticket.title
  status.value = ticket.status
  description.value = ticket.description || ''
  showForm.value = true
}

function updateTicket() {
  if (!title.value || !status.value) {
    return window.$toast('Title and status are required', 'error')
  }

  const currentTickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]')
  const index = currentTickets.findIndex(t => t.id === editingTicket.value.id)
  
  if (index !== -1) {
    currentTickets[index] = {
      ...currentTickets[index],
      title: title.value,
      status: status.value,
      description: description.value,
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem('ticketapp_tickets', JSON.stringify(currentTickets))
    
    // Trigger reactivity update
    ticketsUpdateTrigger.value++
  }

  hideForm()
  window.$toast('Ticket updated successfully', 'success')
}

function confirmDelete(ticketId) {
  modalMessage.value = 'Are you sure you want to delete this ticket?'
  modalAction.value = () => deleteTicket(ticketId)
  showModal.value = true
}

function deleteTicket(id) {
  const currentTickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]')
  const filteredTickets = currentTickets.filter(t => t.id !== id)
  localStorage.setItem('ticketapp_tickets', JSON.stringify(filteredTickets))
  
  // Trigger reactivity update
  ticketsUpdateTrigger.value++
  
  showModal.value = false
  window.$toast('Ticket deleted successfully', 'success')
}

function logout() {
  auth.logout()
  window.$toast('Logged out successfully', 'info')
  router.push('/auth/login')
}

function handleModalConfirm() {
  if (modalAction.value) {
    modalAction.value()
  }
  showModal.value = false
}

function getStatusColor(status) {
  switch (status) {
    case 'open': return 'text-green-400 border-green-500'
    case 'in_progress': return 'text-cyan-400 border-cyan-500'
    case 'closed': return 'text-gray-500 border-gray-600'
    default: return 'text-gray-400 border-gray-600'
  }
}
</script>
