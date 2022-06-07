//数据请求的接口列表
//引入封装的axios实例
import axios from './http'
import da from "element-ui/src/locale/lang/da";
const Api = {
    //页面初始化的接口
    init(userID){
        return axios('/login/init',{
            method:'post',
            params: {"userID":userID}
        })
    },
    //保存网元配置并运行网元
    saveNFConfig(configJson,nfName,userID){
        return axios('/login/saveNFConfig',{
            method:'post',
            data:configJson,
            params:{"nfName":nfName,"userID":userID},
            header:{
                'Content-Type':'application/json'
            }
        })
    },
    deleteNF(nfName,userID){
        return axios('login/deleteNF',{
            method:'post',
            params:{
                "nfName" : nfName,
                "userID":userID
            }
        })
    },
    //获取网元的配置信息
    getNF(nfName,userID,nfType){
        return axios('login/getNF',{
            method:'post',
            params:{
                "nfName" : nfName,
                "userID":userID,
                "nfType":nfType
            }
        })
    },
    //获取日志
    getLog(nfName,userID){
        return axios('login/getLog',{
            method:'post',
            params:{
                "nfName" : nfName,
                "userID":userID
            }
        })
    },
    //运行网元
    startNF(nfName,userID,nfType){
        return axios('login/startNF',{
            method:'post',
            params:{
                "nfName" : nfName,
                "userID":userID,
                "nfType":nfType
            }
        })
    },
    stopNF(nfName){
        return axios('login/stopNF',{
            method:'post',
            params:{
                "nfName" : nfName,
            }
        })
    },
    getIndex(userID) {
        return axios("/login/getNFIndex", {
            method:'get',
            params:{"userID":userID}
        })
    },
    getMongoUser(){
        return axios('login/getAllO5gUsers', {
        method: 'get',
    })
    },
    // 用户相关的接口
    getSqlAllUser() {
        return axios('/login/getAllSqlUser', {
            method: 'get',
        })
    },
    getGnb() {
        return axios('/login/getGnb', {
            method: 'get',
        })
    },
    getSqlUser(gnbID){
        return axios('login/getSqlUser', {
            method: 'post',
            params:{
                "gnbID" : gnbID,
            }
        })
    },
    addMongoUser(data) {
        return axios('login/addO5gUser', {
            method: 'post',
            data:data
        })
    },
    deleteSingleUser(imsi){
        return axios('login/delO5gUser',{
            method:"post",
            params:{
                "imsi":imsi
            }
        })
    },
    userLogin(user){
        return axios('login',{
            method:"post",
            data:user
        })
    },


}
export default Api
