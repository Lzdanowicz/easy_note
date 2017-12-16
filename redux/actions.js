import Request from 'superagent';

let actions = {

fetchData: function() {
		return (dispatch) => {
			var url = '/api/notes';

			Request.get(url)
				.then((response) => {
				console.log(response)
				var payload = response.body
				dispatch({
					type: "FETCH_DATA",
					payload: payload
				})
			})
		}
	},

}

export default actions