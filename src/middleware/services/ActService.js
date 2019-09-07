export default {
  loadAct(id) {
    return this.apiClient.get(`acts/${id}`);
  },
  loadActs() {
    return this.apiClient.get('acts');
  },
  addAct(data) {
    return this.apiClient.post('acts', data);
  },
  editAct(data, id) {
    return this.apiClient.put(`acts/${id}`, data);
  },
  deleteAct(id) {
    return this.apiClient.delete(`acts/${id}`);
  },
};
