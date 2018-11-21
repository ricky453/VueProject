var footer = new Vue({
    el: ".footer"
  });
  Vue.filter( "dateonly", function ( str ) {
    return _.chain( str ).split( ' ' ).head().value();
  });
  Vue.filter( "textcapitalized", function( str ) {
    return _.capitalize( str );
  });
  Vue.filter( "titlecase", function( str ) {
    return _.startCase( str );
  });
  Vue.component( "person-name", {
    props: [ "first", "last" ],
    template: "#template-person-name"
  });
  var personLookup = new Vue({
    el: "#app",
    data: {
      search: "",
      people: null,
      person: null,
      apiUrl: "https://randomuser.me/api/?seed=person-lookup&nat=us&exc=login&results=250"
    },
    created: function() {
      this.getPeople();
    },
    methods: {
      getPeople: function() {
        this.$http.get( this.apiUrl )
        .then( function( response ) {
            return response.json();
          }, function( response ) {
            console.warn( response );
        })
        .then( function( json ) {
          this.people = json.results;
        });
      },
      selectPerson: function( p ) {
        this.person = p;
      }
    },
    computed: {
      filteredPeople: function () {
        if ( this.search ) {
          var searchQuery = this.search;
          return this.people.filter( function( person ) {
            if ( person.name.first.indexOf( searchQuery ) !== -1 || person.name.last.indexOf( searchQuery ) !== -1 ) {
              return person;
            }
          });
        } else {
         return this.people;
        }
      }
    }
  });