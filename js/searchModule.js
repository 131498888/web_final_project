// js/searchModule.js
/**
 * 搜索功能模块
 */

// 导入商品数据
import { products } from './productData.js';

// DOM元素引用
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

/**
 * 处理搜索功能
 */
function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        // 如果搜索框为空，重置所有筛选，显示所有商品
        const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allFilterBtn) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            allFilterBtn.classList.add('active');
        }
        
        // 显示所有商品
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.style.display = 'block';
        });
        
        return;
    }
    
    // 过滤商品
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
    
    // 更新商品显示
    updateProductDisplay(filteredProducts);
    
    // 返回搜索结果
    return {
        count: filteredProducts.length,
        term: searchTerm,
        products: filteredProducts
    };
}

/**
 * 更新商品显示
 * @param {Array} filteredProducts - 筛选后的商品数组
 */
function updateProductDisplay(filteredProducts) {
    const productCards = document.querySelectorAll('.product-card');
    
    // 获取所有商品ID
    const productIds = filteredProducts.map(p => p.id);
    
    productCards.forEach(card => {
        const addToCartBtn = card.querySelector('.add-to-cart');
        if (!addToCartBtn) return;
        
        const productId = parseInt(addToCartBtn.getAttribute('data-id'));
        
        if (productIds.includes(productId)) {
            card.style.display = 'block';
            // 添加高亮效果
            card.style.boxShadow = '0 0 0 2px rgba(74, 108, 247, 0.5)';
            setTimeout(() => {
                card.style.boxShadow = '';
            }, 1000);
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * 初始化搜索功能
 */
function initSearch() {
    // 为搜索按钮添加点击事件监听器
    searchBtn.addEventListener('click', handleSearch);
    
    // 为搜索框添加键盘事件监听器
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
            e.preventDefault();
        }
    });
}

// 导出搜索功能
export {
    initSearch,
    handleSearch,
    updateProductDisplay
};

// 初始化阶段：
// 主入口文件调用initSearch()
// 设置搜索按钮点击事件
// 设置搜索框回车键事件

// 用户搜索流程：

// 用户在搜索框输入关键词
// 点击搜索按钮或按回车键
// 触发handleSearch()函数
// 获取搜索词，转换为小写
// 如果是空搜索，重置显示所有商品
// 如果不是空搜索，过滤商品
// 更新页面显示匹配的商品
// 添加高亮效果
// 返回搜索结果信息