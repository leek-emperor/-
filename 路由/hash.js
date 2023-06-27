class HashRouter {


    // constructor的目标就是给hashchange事件添加监听，回调函数refresh的逻辑就是更改页面需要展示的内容
    constructor(routes = []) {
        this.routes = routes; // 路由映射数组
        this.currentHash = ""; // 记录当前地址栏中的hash字符串，也就对应了应该展示的路由组件
        // 这里需要永久改变一下refresh的指向，改为HashRouter实例，因为它作为事件回调传递给addEventListener之后的调用就跟HashRouter实例没关系了，但是refresh方法里又要用到其他类方法，如执行this.matchComponent()，所以需要让this始终指向HashRouter实例，才能正确访问类方法与类属性
        this.refresh = this.refresh.bind(this);
        // 因为我们的页面一上来加载并没有触发hashchange事件，为了让一开始路由组件也正常显示出来一个，这里我们也监听一下load事件让首屏不空白（本玩具的边缘情况😄）
        window.addEventListener("load", this.refresh);
        // 监听hashchange事件，这才是核心，---------- 下面我们看this.refresh方法 ----------
        window.addEventListener("hashchange", this.refresh);
    }


    // refresh方法作为hashchange和load事件的回调函数，自然可以接收到一个事件对象event，但是逻辑里需要区别一下load与hashchange不同的事件对象的处理
    refresh(event) {
        console.log(event)
        if (event.newURL) { // 对于hashchange事件的event存在newURL属性，即为整个浏览器地址栏里的url字符串，截取一下#后面的部分记录到this.currentHash属性上
            this.currentHash = event.newURL.split("#")[1];
        } else { // 对于load事件的event，可以通过window.location.hash访问到当前url里#(包括#)往后的部分，截取一下记录到this.currentHash属性上
            this.currentHash = window.location.hash.slice(1);
        }
        // 有了最新的this.currentHash属性，就可以执行matchComponent方法进行页面内容的展示了 ---------- 下面看matchComponent方法 ----------
        this.matchComponent();
    }


    matchComponent() {
        // 这里逻辑就很简单了，主打一个丐版为了突出核心，路由配置数组中component就是一个html字符串，我们拿到之后通过innerHTML修改一下dom内容就ok了
        const { component } = this.routes.find(route => route.path === this.currentHash);
        document.querySelector(".page-content").innerHTML = component;
    }
}


window.location.hash = '/'

// 传入一个路由配置数组实例化HashRouter，即执行constructor函数
new HashRouter([
    {
        path: '/',
        component: '<div>首页</div>'
    },
    {
        path: '/center',
        component: '<div>个人中心</div>'
    },
    {
        path: '/about',
        component: '<div>关于</div>'
    },
]);