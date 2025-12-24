// js/filterModule.js
/**
 * 商品分类筛选模块
 */

// DOM元素引用
const filterButtons = document.querySelectorAll('.filter-btn');

// 【DOM元素引用】作用：获取页面中所有筛选按钮
// document.querySelectorAll('.filter-btn')：
// document：代表整个HTML文档
// querySelectorAll：选择所有匹配CSS选择器的元素
// '.filter-btn'：CSS类选择器，选择所有具有filter-btn类的元素
// 返回结果：一个NodeList（类似于数组的集合），包含所有筛选按钮
// 注意：const表示常量，定义后不能再重新赋值（但可以修改其内部属性）



/**
 * 筛选商品
 * @param {string} filter - 筛选条件
 */

// 1、《函数声明和参数》：函数名：filterProducts；参数：filter - 一个字符串，表示筛选条件（如"all"、"category1"等；文档注释：@param {string} filter - 筛选条件，说明参数类型和用途
function filterProducts(filter) {

// 2、《获取商品卡片》：作用：获取页面上所有的商品卡片；'.product-card'：CSS类选择器，选择所有具有product-card类的元素；注意：商品卡片应该预先存在于HTML中
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 【筛选商品】：
// 1. forEach方法
// 作用：遍历productCards集合中的每个元素
// card：当前遍历到的商品卡片元素
// =>：箭头函数，等同于function(card) { ... }

// 2. 筛选条件判断
// 条件1：filter === 'all' - 如果筛选条件是"全部"
// 条件2：card.getAttribute('data-category') === filter - 如果卡片的分类等于筛选条件
// ||：逻辑或运算符，只要有一个条件为真就执行

// 3. 获取自定义属性
// 作用：获取商品卡片上名为data-category的自定义属性值
// *data- 属性**：HTML5允许开发者自定义属性，格式为data-xxx

// 4. 显示/隐藏控制
// 作用：通过CSS的display属性控制元素的显示和隐藏
// 'block'：元素显示为块级元素
// 'none'：元素不显示，不占用空间

/**
 * 初始化筛选功能
 */
function initFilter() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新活动按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 筛选商品
            const filter = button.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
}

// 【初始化筛选功能】：
// 1、遍历所有筛选按钮：作用：为每个筛选按钮添加点击事件监听器；button：当前遍历到的按钮元素
// 2、添加点击事件监听器：作用：当按钮被点击时执行箭头函数内的代码
// addEventListener：为元素添加事件监听器；'click'：监听的事件类型（点击事件）

// 3、更新活动按钮状态：
//     1. 移除所有按钮的active类：
//     作用：先移除所有按钮的active类，确保只有一个按钮被激活
//     classList.remove('active')：从元素的类列表中移除active类
//     2. 为当前按钮添加active类：通常通过.active类给活动按钮添加特殊样式（如背景色变化）

// 4、获取筛选条件并执行筛选：获取按钮的data-filter属性值


// 导出筛选功能
export {
    initFilter,
    filterProducts
};

// 作用：将这两个函数暴露给其他JavaScript文件使用
// 导出方式：命名导出，可以导出多个变量/函数