export default {
  getItem(name: string) {
    return JSON.parse(localStorage.getItem(name) || "");
  },

  setItem(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value));
  },

  clearStorage() {
    localStorage.clear();
  },

  removeItem(name: string) {
    localStorage.removeItem(name);
  }
};
