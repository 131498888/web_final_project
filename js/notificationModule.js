// js/notificationModule.js
/**
 * 通知功能模块
 */

/**
 * 显示通知
 * @param {string} message - 要显示的消息内容
 * @param {string} type - 通知类型（success或error）
 */
function showNotification(message, type = 'success') {
    // 移除现有的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建新通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 3秒后隐藏并移除通知
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 导出通知功能
export { showNotification };