import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userID:'',
    //点击开关用到的信息
    nfName:"",
    nfState:"",
    middleList:{
      AMF: 0,
      AUSF:0,
      NRF: 0,
      NSSF:0,
      PCF: 0,
      SMF: 0,
      UDM: 0,
      UDR: 0,
      UPF: 0,
      BSF: 0,
    }
  },
  getters: {
    get_userID(state){
      return state.userID || localStorage.getItem("userID")
    },
    get_nfSwitch(state){
      return [( state.nfName),(state.nfState )]
    },
    get_middleList(state){
      return state.middleList
    },
  },
  mutations: {
    set_userID(state,userID){
      state.userID = userID
      localStorage.setItem("userID", userID)
    },
    set_nfSwitch(state,list){
      console.log(list)
      state.nfName = list[0]
      state.nfState = list[1]
    },
    delete_nfSwitch(state){
      state.nfName = ""
      state.nfState =""
    },
    set_middleList(state,list){
      console.log(list)
      state.middleList = list
    },
  },
})
