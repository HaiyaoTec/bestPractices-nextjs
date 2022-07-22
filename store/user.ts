import {makeAutoObservable} from 'mobx'
import {makePersistable} from 'mobx-persist-store'
import {User} from "@/lib/example/Dto";
import {StorageController} from "mobx-persist-store/lib/esm2017/types";

export default class userStore {
  // 定义一个初始数据
  userInfo: User = {} as User

  constructor() {
    // 响应式处理
    makeAutoObservable(this)
    // makePersistable 数据持久化存储
    if (typeof window !== 'undefined'){
      makePersistable(this, {
        name: 'userStore',
        properties: ['userInfo'],
        storage: localStorage,
      })
    }
  }

  // 定义一个计算属性
  // get filterList() {
  //   return this.list.filter((item) => item > 4)
  // }

  updateUserInfo(userInfo: User) {
    this.userInfo = {...this.userInfo, ...userInfo}
  }
}
