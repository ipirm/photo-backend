import Vue from 'vue'
import Vuex from 'vuex'

import api from '@/utils/apiRequest'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null
	},

	mutations: {
		setUser (state, user) {
			state.user = user;
		},

		removeUser (state) {
			state.user = null;
		}
	},

	actions: {
		async getUser({ commit }) {
			const res = await api.get('api/auth/profile', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			});
			if (res && res.data) {
				commit('setUser', res.data);
			}
		}
	}
});