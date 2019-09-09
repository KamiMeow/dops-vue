export default {
  loadTariff(id) {
    return this.apiClient.get(`tariffs/${id}`);
  },
  loadTariffs() {
    return this.apiClient.get('tariffs');
  },
};
