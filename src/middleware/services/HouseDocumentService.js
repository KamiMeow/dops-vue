export default {
  loadHouseDocument(id) {
    return this.apiClient.get(`house-documents/${id}`);
  },
  loadHouseDocuments() {
    return this.apiClient.get('house-documents');
  },
  addHouseDocument(data) {
    return this.apiClient.post('house-documents', data);
  },
  editHouseDocument(data, id) {
    return this.apiClient.put(`house-documents/${id}`, data);
  },
  deleteHouseDocument(id) {
    return this.apiClient.delete(`house-documents/${id}`);
  },
};
