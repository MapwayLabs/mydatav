function RingMenu() {
    this.menus = [
        { id: 0, icon: '', name: '', submenu: null },
        { id: 0, icon: '', name: '', submenu: null }
    ];
    this.isCollapse = false;
}

RingMenu.prototype = {
    constructor: RingMenu,
    init: function() {
        this._initContainer();
        this._initRotateBg();
        this._initCenterEle();
        this._initMenuItem();
        this._initSubMenuContainer();

        this._initEvents();
    },
    _initContainer: function() {
        this._container = document.createElement('div');
        this._container.classList.add('ring-menu-container');
        if(this.isCollapse) this._container.classList.add('collapse');
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
        this._centerEle.innerHTML = `
            <div class="button" style="background:rgba(81,130,228,.4);border-radius: 50%;">
                <i><img src="./close.svg" alt=""></i>
            </div>
        `;
        this._container.appendChild(this._centerEle);
    },
    _initMenuItem: function() {
        this._menuItemContainer = document.createElement('div');
        this._menuItemContainer.classList.add('menu-item-contanier');
        this.menus.forEach(e => {
            var itemEle = document.createElement('div');
            itemEle.classList.add('menu-item');
            itemEle.innerHTML = `
            <div class="button" style="transform: translateY(-80px) rotate(-0deg);">
                <i><img src="./地图定位.svg" alt=""></i>
                <span>关系扩展</span>
            </div>
            `;
            this._menuItemContainer.appendChild(itemEle);
        });
        this._container.appendChild(this._menuItemContainer);
    },
    _initSubMenuContainer: function() {
        this._subMenuContainer = document.createElement('div');
        this._subMenuContainer.classList.add('menu-sub-container');
        this._container.appendChild(this._subMenuContainer);
    },
    _createSubMenu: function(submenus) {
        var fragement = document.createDocumentFragment();
        var subBgEle = document.createElement('div');
        subBgEle.classList.add('sub-menu-bg');
        subBgEle.innerHTML = `
          <div class="menubg" style="transform: translateY(-130px);"></div>
        `;
        fragement.appendChild(subBgEle);
        submenus.forEach(e => {
            var itemEle = document.createElement('div');
            itemEle.classList.add('menu-item');
            itemEle.innerHTML = `
            <div class="button" style="transform: translateY(-80px) rotate(-0deg);">
                <i><img src="./地图定位.svg" alt=""></i>
                <span>关系扩展</span>
            </div>
            `;
            fragement.appendChild(itemEle);
        });
        this._subMenuContainer.innerHTML = '';
        this._subMenuContainer.appendChild(fragement);
    },
    _initEvents: function() {
        this._centerEle.addEventListener('click', this._toggleEvtHandler.bind(this), false);
        var eles = this._menuItemContainer.querySelectorAll('.menu-item');
        Array.prototype.forEach.call(eles, e => {
            e.addEventListener('click', this._menuItemEvtHandler.bind(this), false);
        });
    },
    _toggleEvtHandler: function() {
        this.isCollapse = !this.isCollapse;
        if (this.isCollapse) {
            this._container.classList.add('collapse');
        } else {
            this._container.classList.remove('collapse');
        }
    },
    _menuItemEvtHandler: function() {},
    open: function() {},
    close: function() {}
};