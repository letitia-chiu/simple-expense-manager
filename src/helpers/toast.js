import Swal from 'sweetalert2'

const toast = (status, title, text) => {
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

export default toast
