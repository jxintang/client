function Queue () {};

Queue.prototype = {
    list: [],
    maxNumber: 5,
    init: ()=> {},
    push: function(item) {
        let {list,list:{length},maxNumber} = this;
        list = list.slice(length - maxNumber,length); // 对当前队列进行截断，只取最后5个
        this.list.push(item);
    },
    deleteById: function(id) {
        this.list = this.list.filter((item)=> item.id !== id);
    },
    getById: function(id) {
        let item = this.list.filter((item)=> item.id == id);
        return item;
    }
}

export default new Queue();
