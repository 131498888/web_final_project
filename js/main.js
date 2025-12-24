// js/main.js
/**
 * 主入口文件 - 整合所有功能模块
 */

// 导入所有模块
import { products } from './productData.js';
import { 
    initCart, 
    setupCartEventListeners, 
    addToCart, 
    checkout 
} from './cartModule.js';
import { initSearch, handleSearch } from './searchModule.js';
import { initFilter } from './filterModule.js';
import { showNotification } from './notificationModule.js';

// DOM元素引用
const productGrid = document.querySelector('.product-grid');
const checkoutBtn = document.querySelector('.checkout-btn');

/**
 * 设置商品相关事件监听器
 */
function setupProductEventListeners() {
    // 添加商品到购物车的事件委托
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const productName = addToCart(productId);
            
            if (productName) {
                showNotification(`${productName} 已添加到购物车`);
            }
        }
    });
}

// 【设置商品相关事件监听器】作用：
// 监听productGrid元素内的点击事件
// e：事件对象，包含事件相关信息
// 使用箭头函数 => 定义回调函数
//     判断是否点击了"添加到购物车"按钮：e.target：实际被点击的元素；classList.contains('add-to-cart')：检查被点击元素是否有add-to-cart类
//         1、获取商品ID：getAttribute('data-id')：获取按钮的data-id属性值；
//         parseInt()：将字符串转换为整数；
//         2、调用购物车函数：addToCart(productId)：将商品添加到购物车；
//         返回值：返回商品名称（我们在cartModule.js中看到addToCart返回了product.name）
    
//     显示通知：已添加到购物车
//     模板字符串：使用反引号和${}插入变量

/**
 * 初始化整个应用
 */
function initApp() {
    // 初始化购物车
    initCart();
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化筛选功能
    initFilter();
    
    // 设置购物车相关事件监听器
    setupCartEventListeners();
    
    // 设置商品相关事件监听器
    setupProductEventListeners();
    
    // 设置结算按钮事件
    checkoutBtn.addEventListener('click', () => {
        const result = checkout();
        if (result.success) {
            showNotification(result.message, 'success');
        } else {
            showNotification(result.message, 'error');
        }
    });
    
    console.log('应用初始化完成');
}

// 当DOM完全加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);