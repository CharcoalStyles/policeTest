import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  console.log('store', store)
  createPersistedState({
    paths: ['pathway']
  })(store)
}
