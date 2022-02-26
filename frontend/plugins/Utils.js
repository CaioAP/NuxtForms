export default ((context, inject) => {
  const utils = {
    formatDatetimeLastUpdated: (datetime) => {
      if (typeof datetime === 'string')
        datetime = new Date(datetime)

      const minutesToHours = 60
      const millisecondsToMinutes = 60000
      const now = new Date()
      const diff = Math.abs(now - datetime)
      
      const minutes = Math.round(diff / millisecondsToMinutes)
      if (minutes < 60) return `Last updated ${minutes} minutes ago`

      const hours = Math.round(minutes / minutesToHours)
      if (hours < 24) return `Last updated ${hours} hours ago`

      datetime = Intl.DateTimeFormat('pt-BR').format(datetime)
      return `Last updated at ${datetime}`
    }
  }

  inject('Utils', { ...utils })
})