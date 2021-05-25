//实现一个监听对象的功能分别用Object.defineProperty和proxy
const obj = observe({
        name: '子君',
        sex: '男'
    },
    (key, value) => {
        console.log(`属性[${key}]的值被修改为[${value}]`)
    }
)

// 这段代码执行后，输出 属性[name]的值被修改为[妹纸]
obj.name = '妹纸'

// 这段代码执行后，输出 属性[sex]的值被修改为[女]
obj.sex = '女'


//Object.defineProperty
function observe(obj, callback) {
    let newObj = {};
    Object.keys(obj).forEach((key) => {
        console.log(key)
        Object.defineProperty(newObj,key,{
            enumerable:true,
            configurable:true,
            get(){
                return obj[key]
            },
            set(newVal){
                obj[key] = newVal
                callback(key,obj[key])
            }
        })
    })
    return newObj
}


//Proxy

function observeProxy(obj,callback){
    return new Proxy(obj,{
        get(target,key){
            return Reflect.get(target,key)
            // return target[key]
        },
        set(target,key,val){
             target[key] = val;
             callback(key,val)
        }
    })
}

//实现一个监听对象的功能分别用Object.defineProperty和proxy
const objProxy = observeProxy({
    name: '子君',
    sex: '男'
},
(key, value) => {
    console.log(`属性[${key}]的值被修改为[${value}]`)
}
)

objProxy.name = '妹纸Proxy'

objProxy.sex = '女Proxy'

obj.age = 19;
objProxy.age = 19;

//区别:1.Object.defineProperty 无法监听到新增的对象属性,但Proxy可以
//    2.Object.defineProperty 监听的是每个对象的属性,所以需要遍历去监听,而Proxy监听的直接是对象