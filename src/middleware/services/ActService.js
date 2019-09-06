export default {
  loadActs(id) {
    return this.apiClient.get(`acts/${id}`);
  },
  loadActss() {
    return this.apiClient.get('acts');
  },
  addActs(data) {
    return this.apiClient.post('acts', data);
  },
  editActs(data, id) {
    return this.apiClient.put(`acts/${id}`, data);
  },
  deleteActs(id) {
    return this.apiClient.delete(`acts/${id}`);
  },
};
