var app = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: {
    BASE_URL: "https://api.gnavi.co.jp",
    API_KEY: "bcf87231e8e94e460fa02afe8eae9e3b",
    selectPreId: "PREF01",
    selectCategoryId: "RSFST09000",
    freeWord: null,
    prefecturesObj: [],
    CategoriesObj: [],
    restaurants: [],
  },
  methods: {
    wordSearch: function () {
      this.searchRequest({
        keyid: this.API_KEY,
        pref: this.selectPreId,
        category_l: this.selectCategoryId,
        freeword: this.freeWord,
        offset_page: 1,
      });
    },
    searchRequest: function (params) {
      axios
        .get(`${this.BASE_URL}/RestSearchAPI/v3/`, {
          params,
        })
        .then((response) => {
          this.restaurants = [...this.restaurants, ...response.data.rest];
          console.log(this.restaurants);
        });
    },
  },
  created() {
    axios
      .get(`${this.BASE_URL}/master/PrefSearchAPI/v3/?keyid=${this.API_KEY}`)
      .then((response) => {
        this.prefecturesObj = response.data.pref;
      });
    axios
      .get(
        `${this.BASE_URL}/master/CategoryLargeSearchAPI/v3/?keyid=${this.API_KEY}`
      )
      .then((response) => {
        this.CategoriesObj = response.data.category_l;
      });
  },
});
