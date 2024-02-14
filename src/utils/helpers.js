import Swal from 'sweetalert2'

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
