// 模拟目录和内容数据
var catalogData = [
    { name: 'tmp general review', link: 'general_review.html' },
    { name: 'semiconductor parameters', link: 'semiconductor_parameters.html' },
    { name: 'MicroelctronicDevice_summary', link: 'MicroelectronicDevice_summary\\MicroelectronicDevice_summary.html' },
    { name: '/       /', link: 'temporary.html' }
];

// var catalogData = [
//     { name: '目录1', link: 'page1.html', children: ['子目录1.1', '子目录1.2'] },
//     { name: '目录2', link: 'page2.html', children: ['子目录2.1', '子目录2.2'] }
// ];

// var contentData = {
//     '子目DAD录1.1': '这是子目录1.1的内容。',
//     '子目录1.2': '这是子目录1.2的内容。',
//     '子目录2.1': '这是子目录2.1的内容。',
//     '子目录2.2': '这是子目录2.2的内容。'
// };

// 生成目录
var catalogElement = document.getElementById('catalog');
catalogData.forEach(function (item) {
    var listItem = document.createElement('div');

    // 创建超链接
    var link = document.createElement('a');
    link.textContent = item.name;
    link.href = item.link;

//     // 为超链接添加点击事件监听器
//     link.addEventListener('click', function (event) {
//         event.preventDefault(); // 阻止默认的超链接行为
//         displayContent(item.children); // 调用显示内容的函数
//     });

    // 添加到列表项
    listItem.appendChild(link);
    listItem.classList.add('catalog-item');
    catalogElement.appendChild(listItem);
});

// // 显示内容
// function displayContent(children) {
//     var contentElement = document.getElementById('content');
//     contentElement.innerHTML = ''; // 清空内容

//     children.forEach(function (child) {
//         var contentItem = document.createElement('div');
//         contentItem.textContent = contentData[child];
//         contentElement.appendChild(contentItem);
//     });
// }
