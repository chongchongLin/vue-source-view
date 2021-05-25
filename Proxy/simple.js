//Proxy 代理
//比较 Object.defineProperty
//例子 租客 中介 房东
//中介就是代理(proxy),
const user = {
    name: '租客'
}

Object.defineProperty(user, 'name', {
    get() {
        return user['name'] = '中介'
    }
})

//房东收钱
function giveMoney(user) {
    console.log(user.name)
    return '黑中介又自己私吞'
}

// console.log(giveMoney(user))

//proxy版本

const proxy = new Proxy(user, {
    get(target, key) {
        if (key == 'name') {
            return target[key]+'又赚到钱了'
        }
    }
})

console.log(giveMoney(proxy))