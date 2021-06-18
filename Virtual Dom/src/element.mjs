
//虚拟DOM元素的类,构建实例对象,用来描述DOM
class Element {
    constructor(type,props,children){
        this.props = props;
        this.type = type;
        this.children = children;
    }
}

//创建虚拟DOM,返回虚拟节点
function createElement(type,props,children){
    return new Element(type,props,children)
}

export {
    Element,
    createElement
}