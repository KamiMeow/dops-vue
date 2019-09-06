export default {
  loadType(id) {
    return this.apiClient.get(`contract-types/${id}`);
  },
  loadTypes() {
    return this.apiClient.get('contract-types');
  },
  addType(name) {
    return this.apiClient.post('contract-types', { name });
  },
  editType(name, id) {
    return this.apiClient.put(`contract-types/${id}`, { name });
  },
  deleteType(id) {
    return this.apiClient.delete(`contract-types/${id}`);
  },
};
