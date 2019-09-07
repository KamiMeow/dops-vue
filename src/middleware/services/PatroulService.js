export default {
  loadPatroul(id) {
    return this.apiClient.get(`patrouls/${id}`);
  },
  loadPatrouls() {
    return this.apiClient.get('patrouls');
  },
  addPatroul(data) {
    return this.apiClient.post('patrouls', data);
  },
  editPatroul(data, id) {
    return this.apiClient.put(`patrouls/${id}`, data);
  },
  deletePatroul(id) {
    return this.apiClient.delete(`patrouls/${id}`);
  },
};
