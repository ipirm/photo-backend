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
		},

		// eslint-disable-next-line no-empty-pattern
		async participate({}, payload) {
			let formData = new FormData();
			formData.append('concertId', '1');
			payload.map(f => f.file).forEach(f => {
				formData.append('files', f);	
			});

			await api.postFormData('api/participation', formData)
				.then(res => {
					if (res.status === 201) this._vm.$toasted.error('Вы уже участвуете на данном концерце');
					else this._vm.$toasted.success('После модерации мы сообщим вам о вашем статусе участия');
				})
				.catch(e => {
					this._vm.$toasted.error('Произошла ошибка при попытке добавления в список участников');
					console.log(e);
				});
		}
	}
});