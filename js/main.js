var elVue = new Vue({
    el: "#AppVue",
    data: {
        cantidad: 5,
        options: [
            { text: "Cinco", cantidad: 5 },
            { text: "Diez", cantidad: 10 },
            { text: "Quince", cantidad: 15 },
            { text: "Veinte", cantidad: 20 }
          ],
        clientes: [],
        aceptado: 0,
        rechazado: 0,
        search: "",
        checked1: true,
        checked2: true,
        checked3: true,
        checked4: true,
        checked5: true,
        checked6: true
    },
    methods: {
        obtenerClientes: function () {
            axios
                .get('https://randomuser.me/api/?results=' + this.cantidad)
                .then(response => {
                    this.clientes = response.data.results;

                })
        },
        aceptarCliente: function (posicion) {
            //aceptado++;

            this.aceptado++;
            this.clientes.splice(posicion, 1);
            //alert("cliente: "+ posicion);
        },

        rechazarCliente: function (posicion) {
            this.rechazado++;
            this.clientes.splice(posicion, 1);
        }
    },
    computed: {
        searchUser: function() {
    
          return this.clientes.filter(cliente => {
            return cliente.name.first.match(this.search)||cliente.name.last.match(this.search);
          });
        }
      }

})