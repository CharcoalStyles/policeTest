import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    paths: ['pathway', 'skills', 'capabilities']
  })(store)
}
