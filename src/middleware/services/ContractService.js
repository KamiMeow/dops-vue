export default {
  loadContract(id) {
    return this.apiClient.get(`contracts/${id}`);
  },
  loadContracts() {
    return this.apiClient.get('contracts');
  },
  addContract(data) {
    return this.apiClient.post('contracts', data);
  },
  editContract(data, id) {
    return this.apiClient.put(`contracts/${id}`, data);
  },
  deleteContract(id) {
    return this.apiClient.delete(`contracts/${id}`);
  },
};
