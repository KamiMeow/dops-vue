export default {
  loadType(id) {
    return this.apiClient.get(`contract-types/${id}`);
  },
  loadTypes() {
    return this.apiClient.get('contract-types');
  },
  addType(data) {
    return this.apiClient.post('contract-types', data);
  },
  editType(data, id) {
    return this.apiClient.put(`contract-types/${id}`, data);
  },
  deleteType(id) {
    return this.apiClient.delete(`contract-types/${id}`);
  },
};
