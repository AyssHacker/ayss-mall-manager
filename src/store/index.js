//入口文件
import {createStore} from 'vuex'
import getters from "./getters"
import app from './modules/app'
import user from "./modules/user"
import permission from "./modules/permission"
const store = createStore({
  modules: {
    app,
    user,
    permission
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
export default store