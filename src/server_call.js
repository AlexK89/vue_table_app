mounted() {
	axios
		.get('./src/data.json')
		.then(response => {
			this.dataArray = response.data.data;
		})
},