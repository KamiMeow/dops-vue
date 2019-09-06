export default {
  loadDocument(id) {
    return this.apiClient.get(`house-documents/${id}`);
  },
  loadDocuments() {
    return this.apiClient.get('house-documents');
  },
  addDocument(data) {
    return this.apiClient.post('house-documents', data);
  },
  editDocument(data, id) {
    return this.apiClient.put(`house-documents/${id}`, data);
  },
  deleteDocument(id) {
    return this.apiClient.delete(`house-documents/${id}`);
  },
};
