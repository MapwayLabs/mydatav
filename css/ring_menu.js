function RingMenu(el, data, options) {
    this._el = el;
    // this.menus = data;
    this.menus = [
        { id: '0', icon: '', name: '关系扩展', submenus: [
            { id: '0-1', icon: '', name: '相关人' },
            { id: '0-2', icon: '', name: '组合扩展' },
            { id: '0-3', icon: '', name: '相关物' }
        ] },
        { id: '1', icon: '', name: '关系收回', submenus: [
            { id: '1-1', icon: '', name: '一键收回' },
            { id: '1-2', icon: '', name: '相关人' },
            { id: '1-3', icon: '', name: '相关物' }
        ] },
        { id: '2', icon: '', name: '关联实体', submenus: [
            { id: '2-1', icon: '', name: '人物' },
            { id: '2-2', icon: '', name: '物品' },
            { id: '2-3', icon: '', name: '地点' },
            { id: '2-4', icon: '', name: '虚拟身份' },
            { id: '2-5', icon: '', name: '机构' }
        ] },
        { id: '3', icon: '', name: '查看gis', submenus: null },
        { id: '4', icon: '', name: '删除已选', submenus: null },
        { id: '5', icon: '', name: '保留已选', submenus: null },
        { id: '6', icon: '', name: '节点选择', submenus: [
            { id: '6-1', icon: '', name: '一层节点' },
            { id: '6-2', icon: '', name: '两层节点' },
            { id: '6-3', icon: '', name: '全部节点' }
        ] },
        { id: '7', icon: '', name: '一键扩展', submenus: null },
    ];
    this.options = Object.assign({
        mainMenuRadius: 80, // px
        subMenuRadius: 150
    }, options || {});
    this.isCollapse = true;
    this.init();
}

RingMenu.prototype = {
    constructor: RingMenu,
    init: function() {
        this._initContainer();
        this._initRotateBg();
        this._initCenterEle();
        this._initMenuItem();
        document.body.appendChild(this._container);
        this._initEvents();
    },
    _initContainer: function() {
        this._container = document.createElement('div');
        this._container.classList.add('ring-menu-container');
        if(this.isCollapse) {
            this._container.classList.add('collapse');
        }
    },
    _initRotateBg: function() {
        this._bgEle = document.createElement('div');
        this._bgEle.classList.add('menu-rotate-bg');
        this._bgEle.innerHTML = `
            <div class="bg-item bg-item-out"></div>
            <div class="bg-item bg-item-in"></div>
        `;
        this._container.appendChild(this._bgEle);
    },
    _initCenterEle: function() {
        this._centerEle = document.createElement('div');
        this._centerEle.classList.add('menu-center-btn');
        this._container.appendChild(this._centerEle);
    },
    _initMenuItem: function() {
        this._menuItemContainer = document.createElement('div');
        this._menuItemContainer.classList.add('menu-item-contanier');
        var step = 360 / this.menus.length;
        this.menus.forEach((e,i) => {
            var angle = step * i;
            var itemEle = document.createElement('div');
            itemEle.classList.add('menu-item');
            itemEle.dataset.id = e.id;
            itemEle.style.transform = `rotate(${ angle }deg)`;
            itemEle.innerHTML = `
                <div class="button" style="transform: translateY(${ -this.options.mainMenuRadius }px) rotate(${ -angle }deg);">
                    <i><img src="./地图定位.svg" alt=""></i>
                    <span>${ e.name }</span>
                </div>
            `;
            this._menuItemContainer.appendChild(itemEle);

            if (e.submenus && e.submenus.length) {
                this._initSubMenu(itemEle, e.submenus, angle);
            }
        });
        this._container.appendChild(this._menuItemContainer);
    },
    _initSubMenu: function(parentMenuEle, submenus, deg) {
        var subMenuContainer = document.createElement('div');
        subMenuContainer.classList.add('menu-sub-container');

        var subBgEle = document.createElement('div');
        subBgEle.classList.add('sub-menu-bg');
        subBgEle.style.transform = "translateY(-120px)";
        subMenuContainer.appendChild(subBgEle);

        var start = -45 + deg;
        var type = 1;
        if (start > 180) { // 超过180度时，顺序相反
            start = -(start - 180);
            type = -1;
        }
        var step = 90 / (submenus.length+1);
        var stepHead = step;
        if (submenus.length >= 4) { // 子菜单数超过4个，通过减小两端距离增加项目距离
            stepHead = 0;
            step = (90 - stepHead * 2) / (submenus.length-1);
        }
        submenus.forEach((e, i) => {
            var itemEle = document.createElement('div');
            itemEle.classList.add('sub-menu-item');
            itemEle.dataset.id = e.id;
            var angel = i===0 ? ( start + type * (stepHead * (i+1)) ) : ( start + type * (step * i + stepHead) );
            itemEle.style.transform = `rotate(${ angel }deg) rotate(-${ deg }deg)`;
            itemEle.innerHTML = `
            <div class="button" style="transform: translateY(${ -this.options.subMenuRadius }px) rotate(${ -angel }deg);">
                <i><img src="./地图定位.svg" alt=""></i>
                <span>${ e.name }</span>
            </div>
            `;
            subMenuContainer.appendChild(itemEle);
        });

        parentMenuEle.appendChild(subMenuContainer);
    },
    _initEvents: function() {
        this._centerEle.addEventListener('click', this._toggleEvtHandler.bind(this), false);

        var menuEles = this._menuItemContainer.querySelectorAll('.menu-item');
        menuEles.forEach(e => {
            e.addEventListener('click', this._menuItemEvtHandler.bind(this), false);
        });

        var subEles = this._menuItemContainer.querySelectorAll('.sub-menu-item');
        subEles.forEach(e => {
            e.addEventListener('click', this._subMenuItemEvtHandler.bind(this), false);
        });

        var subMenuContainers = this._menuItemContainer.querySelectorAll('.menu-sub-container');
        subMenuContainers.forEach(e => {
            e.addEventListener('click', e => {
                e.stopPropagation();
            }, false);
        });
    },
    _toggleEvtHandler: function(e) {
        e.stopPropagation();
        this.isCollapse = !this.isCollapse;
        if (this.isCollapse) {
            this._container.classList.add('collapse');
        } else {
            this._container.classList.remove('collapse');
        }
    },
    _menuItemEvtHandler: function(e) {
        e.stopPropagation();
        var eles = this._menuItemContainer.querySelectorAll('.menu-item');
        var ele = e.currentTarget;
        var id = ele.dataset.id;
        var currentItem = this.getMenuItemById(id);
        console.log(currentItem);

        eles.forEach(e => {
            if (e !== ele) e.classList.remove('active');
        });
        ele.classList.contains('active') ? ele.classList.remove('active') : ele.classList.add('active');
    },
    _subMenuItemEvtHandler: function(e) {
        e.stopPropagation();
        var id = e.currentTarget.dataset.id;
        var currentItem = this.getMenuItemById(id);
        console.log(currentItem);
    },
    getMenuItemById: function(id) {
        // 广度优先遍历
        var root = { id: 'root', submenus: this.menus };
        var queue = [];
        queue.push(root);
        while(queue.length) {
            var current = queue.shift();
            if (current.id === id) {
                return current;
            }
            if (current.submenus && current.submenus.length) {
                queue.push(...current.submenus);
            }
        } 
    },
    open: function() {
        this._container.classList.remove('collapse');
        this.isCollapse = false;
    },
    close: function() {
        this._container.classList.add('collapse');
        this.isCollapse = true;
    }
};