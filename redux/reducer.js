let reducer = (state=initialState, action) => {
	switch(action.type) {

	case 'FETCH_DATA':
		return Object.assign({}, state, {
        	userData: action.payload,
      	});


	default:
		return state;
	}
}

export default reducer