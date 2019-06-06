function RingMenu(el, data, options) {
    this._el = el;
    this.menus = data || [];
    this.options = Object.assign({
        mainMenuRadius: 80, // px
        subMenuRadius: 130,
        width: 256,
        height: 256,
        menuClickCallback: function() {}
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
        this._el.appendChild(this._container);
        this._initEvents();
    },
    destory: function() {
        this._container.parentElement.removeChild(this._container);
        this._centerEle.removeEventListener('click', this._toggleEvtHandler.bind(this), false);

        var menuEles = this._menuItemContainer.querySelectorAll('.menu-item');
        menuEles.forEach(e => {
            e.removeEventListener('click', this._menuItemEvtHandler.bind(this), false);
        });

        var subEles = this._menuItemContainer.querySelectorAll('.sub-menu-item');
        subEles.forEach(e => {
            e.removeEventListener('click', this._subMenuItemEvtHandler.bind(this), false);
        });
    },
    open: function(x, y) {
        if (x != null && y != null) {
            this._container.style.left = `${ x - this.options.width / 2 }px`;
            this._container.style.top = `${ y - this.options.height / 2 }px`;
        }
        this._container.classList.remove('collapse');
        this.isCollapse = false;
    },
    close: function() {
        this._container.classList.add('collapse');
        this.isCollapse = true;
        this.closeSubMenu();
    },
    closeSubMenu: function() {
        var mainMenuEles = this._menuItemContainer.querySelectorAll('.menu-item');
        mainMenuEles.forEach(e => {
            e.classList.remove('active');
        });
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
    _initContainer: function() {
        this._container = document.createElement('div');
        this._container.classList.add('ring-menu-container');
        if(this.isCollapse) {
            this._container.classList.add('collapse');
        }
        this._container.style = `width:${this.options.width}px;height:${this.options.height}px;`;
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
        subBgEle.style.transform = `translateY(${ -this.options.subMenuRadius }px)`;
        subMenuContainer.appendChild(subBgEle);

        var start = -45 + deg;
        var type = 1;
        if (start > 180) { // 超过180度时，顺序相反
            start = -(360 - start - 90);
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
            <div class="button" style="transform: translateY(${ -this.options.subMenuRadius-30 }px) rotate(${ -angel }deg);">
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
        this.close();
        // this.isCollapse = !this.isCollapse;
        // if (this.isCollapse) {
        //     this._container.classList.add('collapse');
        // } else {
        //     this._container.classList.remove('collapse');
        // }
    },
    _menuItemEvtHandler: function(e) {
        e.stopPropagation();
        var ele = e.currentTarget;
        var id = ele.dataset.id;
        var currentItem = this.getMenuItemById(id);
        console.log(currentItem);
        this.options.menuClickCallback.call(this, {
            type: 'level-1',
            target: ele,
            item: currentItem
        });

        [...ele.parentNode.children].filter(e => e !== ele).forEach(e => e.classList.remove('active'));
        ele.classList.toggle('active');
    },
    _subMenuItemEvtHandler: function(e) {
        e.stopPropagation();
        var id = e.currentTarget.dataset.id;
        var currentItem = this.getMenuItemById(id);
        console.log(currentItem);
        this.options.menuClickCallback.call(this, {
            type: 'level-2',
            target: e.currentTarget,
            item: currentItem
        });
    }
};