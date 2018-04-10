new Vue({
	el: '#table',
	data: {
		sortKey: 'name',
		reverse: false,
		search: '',
		columns: ['name', 'sku'],
		dataArray: []
	},
	mounted() {
		axios
			.get('./src/data.json')
			.then(response => {
				this.dataArray = response.data.data;
			})
	},
	computed: {
		orderedUsers: function () {
			if(!this.reverse) {
				return _.orderBy(this.dataArray, this.sortKey, 'asc')
			}
			return _.orderBy(this.dataArray, this.sortKey, 'desc')
		},
		filteredUsers: function () {
			return this.orderedUsers.filter((user) => {
				return user.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 || user.sku.indexOf(this.search) !== -1
			})
		}
	},
	methods: {
		sortBy(sortKey) {
			this.reverse = (this.sortKey == sortKey) ? !this.reverse : false;
			this.sortKey = sortKey;
		}
	}
});

