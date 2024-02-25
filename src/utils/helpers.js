import Swal from 'sweetalert2'
import toastMsg from './toast-messages'

export const toast = (status, title, text) => {
  if (!status) return

  Swal.fire({
    toast: true,
    position: "top",
    icon: status,
    title: title || status,
    text: text || null,
    showConfirmButton: false,
    showCloseButton: true,
    timer: status === 'success' ? 1500 : 9000
  })
}

export const getAuthConfig = () => {
  const token = localStorage.getItem('authToken')
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export const handleDelete = async (id, cb, locale) => {
  if (!id) return
  const lang = locale || 'en'

  Swal.fire({
    title: toastMsg.delete[lang]?.title || 'Delete?',
    text: toastMsg.delete[lang]?.text || 'You will not be able to recover it!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: toastMsg.delete[lang]?.confirm || 'Yes, delete it!',
    cancelButtonText: toastMsg.delete[lang]?.cancel || 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      cb(id)
    }
  })
}
