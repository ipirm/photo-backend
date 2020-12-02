import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '../locales'
import lsService from '../services/lsService'

import api from '@/utils/apiRequest'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
		concert: null,
		participants: null,
		lastQuery: null,
		locale: lsService.getLocale(),

		page: 0
	},

	mutations: {
		setUser (state, user) {
			state.user = user;
		},

		removeUser (state) {
			state.user = null;
		},

		setConcert (state, concert) {
			state.concert = concert;
		},

		setParticipants (state, participants) {
			state.page = 0;
			state.participants = participants;
		},

		addParticipants (state, participants) {
			state.participants.items.push(...participants.items);
		},

		increasePage(state) {
			state.page++;
		},

		setTotal(state, data) {
			state.total = data;
		},

		setLocale (state, locale) {
			state.locale = locale;
			lsService.setLocale(locale);
			i18n.locale = locale;
		}
	},

	actions: {
		async getUser({ commit }) {
			const res = await api.get('api/auth/profile', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			});
			if (res.data) {
				commit('setUser', res.data);
			}
		},

		async getConcert({ commit }) {
			const res = await api.get('api/concerts/1');
			if (res.data) {
				commit('setConcert', res.data);
			}
		},

		async getParticipants({ commit, state }, query) {
			state.lastQuery = query || null;

			let res;
			if (state.user) {
				res = await api.get('api/concerts/concertUsers/1' + (query ? `?sort_by=${query}` : ''));
			} else {
				res = await api.get('api/concerts/concertUsersWithOutAuth/1' + (query ? `?sort_by=${query}` : ''));
			}
			commit('setParticipants', res.data);
		},

		async getMoreParticipants({ commit, state }, query) {
			state.lastQuery = query;

			let res;
			if (state.user) {
				res = await api.get('api/concerts/concertUsers/1');
			} else {
				res = await api.get('api/concerts/concertUsersWithOutAuth/1');
			}

			commit('addParticipants', res.data);
		},

		// eslint-disable-next-line no-empty-pattern
		async like({dispatch, state}, data) {
			if (state.user) {
				await api.post(data.isLike ? 'api/like' : 'api/like/delete', {
					concertId: '1',
					userId: data.userId.toString()
				}).then(() => {
					dispatch('getParticipants', state.lastQuery);
				}).catch(e => {
					this._vm.$toasted.error('Произошла ошибка при попытке поставить лайк/дизлайк');
					console.log(e);
				});
			}
		},

		// eslint-disable-next-line no-empty-pattern
		async participate({dispatch, state}, payload) {
			let formData = new FormData();
			formData.append('concertId', '1');
			payload.map(f => f.file).forEach(f => {
				formData.append('files', f);	
			});

			await api.postFormData('api/participation', formData)
				.then(res => {
					if (res.status === 201) this._vm.$toasted.error('Вы уже участвуете на данном концерце');
					else {
						this._vm.$toasted.success('После модерации мы сообщим вам о вашем статусе участия');
						dispatch('getParticipants', state.lastQuery);
					}
				})
				.catch(e => {
					this._vm.$toasted.error('Произошла ошибка при попытке добавления в список участников');
					console.log(e);
				});
		}
	}
});