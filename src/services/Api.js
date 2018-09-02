const ContactsAPI = {
  contacts: [
    { number: 1, name: "Pepito", image: "https://bootdey.com/img/Content/avatar/avatar1.png" },
    { number: 2, name: "Emiliano", image: "https://bootdey.com/img/Content/avatar/avatar2.png" },
    { number: 3, name: "Tonga", image: "https://bootdey.com/img/Content/avatar/avatar7.png" },
    { number: 4, name: "Victoria", image: "https://bootdey.com/img/Content/avatar/avatar5.png" },
    { number: 5, name: "Dan", image: "https://bootdey.com/img/Content/avatar/avatar4.png" },
    { number: 6, name: "Agustín", image: "https://bootdey.com/img/Content/avatar/avatar6.png" }
  ],
  all: function () { return this.contacts },
  get: function (id) {
    const isContact = c => c.number === id
    return this.contacts.find(isContact)
  }
}

export default ContactsAPI