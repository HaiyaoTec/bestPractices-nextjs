import {makeAutoObservable} from 'mobx'
import {User} from "@/lib/example/Dto";

export default class userStore {
  // 定义一个初始数据
  userInfo: User = {} as User

  constructor() {
    // 响应式处理
    makeAutoObservable(this)
  }

  // 定义一个计算属性
  // get filterList() {
  //   return this.list.filter((item) => item > 4)
  // }

  updateUserInfo(userInfo: User) {
    this.userInfo = {...this.userInfo, ...userInfo}
  }
}
