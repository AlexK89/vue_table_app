new Vue({
	el: '#table-container',
	data: {
		sortKey: 'name',
		reverse: false,
		search: '',
		columns: ['id', 'name', 'sku'],
		dataArray: []
	},
	mounted() {
		//AJAx request
		axios
			.get('./src/data.json')
			.then(response => {
				this.dataArray = response.data.data;
			})
	},
	computed: {
		// Sort items
		orderedUsers() {
			if (!this.reverse) {
				return _.orderBy(this.dataArray, this.sortKey, 'asc')
			}
			return _.orderBy(this.dataArray, this.sortKey, 'desc')
		},

		// Filter items
		filteredUsers() {
			return this.orderedUsers.filter((user) => {
				return user.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 || user.sku.indexOf(this.search) !== -1
			})
		}
	},
	methods: {
		// Define sorting order
		sortBy(sortKey) {
			this.reverse = (this.sortKey == sortKey) ? !this.reverse : false;
			this.sortKey = sortKey;
		}
	}
});

