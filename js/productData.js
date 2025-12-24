// js/productData.js
/**
 * 商品数据模块
 */

const products = [
    {
        id: 1,
        name: "无线蓝牙耳机",
        price: 299,
        category: "electronics",
        description: "高品质音质，降噪功能，续航时间长",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 2,
        name: "纯棉时尚T恤",
        price: 89,
        category: "clothing",
        description: "100%纯棉材质，舒适透气，多种颜色可选",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 3,
        name: "智能手机",
        price: 2999,
        category: "electronics",
        description: "高性能处理器，超清摄像头，长续航",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
    },
    {
        id: 4,
        name: "网页设计指南",
        price: 59,
        category: "books",
        description: "现代网页设计技巧与最佳实践",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
    },
    {
        id: 5,
        name: "轻便运动鞋",
        price: 199,
        originalPrice: 299,
        category: "clothing",
        description: "舒适缓震，透气设计，适合多种运动",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
        id: 6,
        name: "美食烹饪全书",
        price: 78,
        category: "books",
        description: "包含100道经典菜谱，详细步骤说明",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    }
];

// 导出商品数据供其他模块使用
export { products };