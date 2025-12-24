// js/cartModule.js
/**
 * 购物车功能模块
 */

// 导入商品数据
import { products } from './productData.js';

// 购物车数据
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// DOM元素引用
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCountElement = document.querySelector('.cart-count');
const totalPriceElement = document.querySelector('.total-price');
const emptyCartElement = document.querySelector('.empty-cart');
const checkoutBtn = document.querySelector('.checkout-btn');
const productGrid = document.querySelector('.product-grid');


// cart：空数组，用来存储购物车中的商品
// cartCount：购物车中商品总数量，初始为0
// cartTotal：购物车中商品总金额，初始为0
// DOM元素引用：这些是页面中HTML元素的引用，通过CSS类名获取：
// cartIcon：购物车图标，点击会打开购物车
// cartSidebar：购物车侧边栏
// cartOverlay：遮罩层，点击会关闭购物车
// closeCartBtn：关闭购物车按钮
// cartItemsContainer：购物车商品列表容器
// cartCountElement：显示购物车商品数量的元素
// totalPriceElement：显示购物车总金额的元素
// emptyCartElement：购物车为空时的提示元素
// checkoutBtn：结算按钮
// productGrid：商品网格容器（虽然代码中没有用到，但定义了）






/**
 * 初始化购物车
 */
function initCart() {
    // 从本地存储加载购物车数据
    const savedCart = localStorage.getItem('simpleShopCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// 【初始化购物车】作用：页面加载时初始化购物车
// localStorage：浏览器的本地存储，可以保存数据（即使关闭浏览器也不会丢失）
// getItem('simpleShopCart')：从本地存储中获取名为'simpleShopCart'的数据
// JSON.parse(savedCart)：将字符串转换为JavaScript对象（因为localStorage只能存储字符串）
// 如果有保存的数据，就更新购物车显示




/**
 * 打开购物车
 */
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * 关闭购物车
 */
function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// 【打开购物车,关闭购物车】作用：控制购物车侧边栏的显示和隐藏

// classList.add('active')：给元素添加'active'类，通常这个类有CSS样式让元素显示出来

// classList.remove('active')：移除'active'类，隐藏元素

// document.body.style.overflow = 'hidden'：禁止页面滚动（防止购物车打开时页面还可以滚动）

// document.body.style.overflow = 'auto'：恢复页面滚动



/**
 * 添加商品到购物车
 * @param {number} productId - 商品ID
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // 检查商品是否已在购物车中
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();

// 【添加商品到购物车】参数：productId - 要添加的商品ID
// products.find(p => p.id === productId)：在商品数组中查找ID匹配的商品
// if (!product) return;：如果没找到商品，直接退出函数
// cart.find(item => item.id === productId)：检查购物车中是否已经有这个商品
// 如果已存在：数量加1
// 如果不存在：添加新商品到购物车，初始数量为1
// ...product：展开运算符，复制商品的所有属性
// updateCart()：更新购物车显示
// 返回值：商品名称（可以在其他地方显示添加成功的提示）
    
    // 返回商品名称用于显示通知
    return product.name;
}

/**
 * 从购物车移除商品
 * @param {number} productId - 商品ID
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// 【从购物车移除商品】参数：productId - 要移除的商品ID
// • cart.filter(...)：过滤购物车数组，只保留ID不匹配的商品
// • filter方法：创建一个新数组，包含所有通过测试的元素
// • 更新购物车显示

/**
 * 更新商品数量
 * @param {number} productId - 商品ID
 * @param {number} change - 数量变化值
 */
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}

// 【更新商品数量】参数：
// productId：要更新的商品ID
// change：数量的变化值（如+1或-1）
// 找到对应的商品
// 更新数量：item.quantity += change
// 如果数量<=0，从购物车中移除该商品
// 否则，更新购物车显示

/**
 * 更新购物车显示
 */
function updateCart() {
    // 更新购物车计数和总价
    cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // 更新UI
    cartCountElement.textContent = cartCount;
    totalPriceElement.textContent = `￥${cartTotal}`;
    
    // 更新购物车项目列表
    renderCartItems();
    
    // 保存到本地存储
    localStorage.setItem('simpleShopCart', JSON.stringify(cart));
}

// 【更新购物车显示】：核心函数：每当购物车变化时调用，更新所有数据
// cart.reduce(...)：计算购物车中商品总数量
// reduce方法：对数组中的每个元素执行一个函数，将其减少为单个值
// (sum, item) => sum + item.quantity：累加每个商品的数量
// 0：初始值
// 同样的方法计算总金额：item.price * item.quantity

// 更新页面显示：
// cartCountElement.textContent：更新购物车图标上的数字
// totalPriceElement.textContent：更新总价显示

// renderCartItems()：重新渲染购物车商品列表
// localStorage.setItem(...)：将购物车数据保存到本地存储
// JSON.stringify(cart)：将JavaScript对象转换为字符串



/**
 * 渲染购物车项目
 */
function renderCartItems() {
    if (cart.length === 0) {
        emptyCartElement.style.display = 'block';
        cartItemsContainer.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>购物车是空的</p></div>';
        return;
    }
    
    emptyCartElement.style.display = 'none';
    
    const cartItemsHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">￥${item.price}</div>
                <div class="cart-item-actions">
                    <button class="quantity-btn decrease">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase">+</button>
                    <button class="remove-item">移除</button>
                </div>
            </div>
        </div>
    `).join('');
    
    cartItemsContainer.innerHTML = cartItemsHTML;
}

// 【渲染购物车项目】作用：根据购物车数据生成HTML并显示
// 如果购物车为空：
// 显示空购物车提示
// 设置innerHTML为提示信息
// 退出函数

// 如果购物车不为空：

// 隐藏空购物车提示
// cart.map(item => ...)：遍历购物车中的每个商品，生成对应的HTML字符串
// map方法：创建一个新数组，其结果是该数组中的每个元素调用一次函数
// 模板字符串：使用反引号`可以方便地插入变量
// data-id="${item.id}"：自定义属性，保存商品ID，方便后续操作
// .join('')：将数组中的所有字符串连接成一个字符串
// cartItemsContainer.innerHTML = cartItemsHTML：将生成的HTML插入到页面中



/**
 * 结算功能
 * @returns {object} 包含结算成功状态和总金额
 */
function checkout() {
    if (cart.length === 0) {
        return { success: false, message: '购物车为空，无法结算' };
    }
    
    const total = cartTotal;
    
    // 清空购物车
    cart = [];
    updateCart();
    closeCart();
    
    return { success: true, message: `成功结算！总计：￥${total}，感谢您的购买！`, total: total };
}

// 【结算功能】作用：模拟结算过程
// 检查购物车是否为空：如果为空，返回失败信息
// 获取总金额
// 清空购物车：重置cart数组，更新显示，关闭购物车侧边栏
// 返回值：包含结算结果的JavaScript对象



/**
 * 设置购物车事件监听器
 */
function setupCartEventListeners() {
    cartIcon.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    // 购物车项目的事件委托
    cartItemsContainer.addEventListener('click', (e) => {
        const cartItem = e.target.closest('.cart-item');
        if (!cartItem) return;
        
        const productId = parseInt(cartItem.getAttribute('data-id'));
        
        if (e.target.classList.contains('remove-item')) {
            removeFromCart(productId);
        } else if (e.target.classList.contains('decrease')) {
            updateQuantity(productId, -1);
        } else if (e.target.classList.contains('increase')) {
            updateQuantity(productId, 1);
        }
    });
}

// 【设置购物车事件监听器】：作用：设置所有购物车相关的事件监听

// 前三个事件：
// 点击购物车图标：打开购物车
// 点击关闭按钮：关闭购物车
// 点击遮罩层：关闭购物车
// 事件委托：给购物车容器添加一个点击事件监听器，处理里面所有按钮的点击
// e.target：实际被点击的元素
// closest('.cart-item')：找到最近的具有'cart-item'类的父元素
// parseInt(...)：将字符串转换为整数（获取商品ID）
// 根据点击的按钮类型执行相应操作

/**
 * 获取购物车数据
 */
function getCartData() {
    return {
        items: cart,
        count: cartCount,
        total: cartTotal
    };
}

// 【获取购物车数据】：作用：
// 返回当前购物车的完整数据
// 返回值：包含购物车所有信息的对象

// 导出购物车功能
export {
    initCart,
    setupCartEventListeners,
    addToCart,
    checkout,
    getCartData,
    openCart,
    closeCart
};

// 【export】作用：将这些函数暴露给其他JavaScript文件使用
// 其他文件可以通过import { ... } from './cartModule.js'来使用这些函数