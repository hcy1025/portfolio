// // 等待整個頁面載入後再執行
// document.addEventListener("DOMContentLoaded", function () {
//     // 獲取導航欄中所有連結元素
//     const navLinks = document.querySelectorAll(".nav-links a");

//     // 遍歷所有連結元素，為每個連結添加點擊事件監聽器
//     navLinks.forEach(link => {
//         // 當連結被點擊時觸發的函數
//         link.addEventListener("click", function (event) {
//             event.preventDefault(); // 取消預設的連結行為

//             // 獲取目標內容區塊的ID
//             const targetId = link.getAttribute("href");

//             // 使用scrollIntoView()方法滾動到目標內容區塊，並留出偏移量
//             const targetElement = document.querySelector(targetId);
//             targetElement.scrollIntoView({
//                 behavior: "smooth", // 平滑滾動
//                 block: "start", // 對齊目標的上邊緣
//                 inline: "nearest" // 在水平方向上盡可能保持在視圖內
//             });

//             // 在目標內容區塊的 CSS 中設置 scroll-margin-top 屬性
//             const navBarHeight = 70; // 設置導航欄高度（偏移量）
//             targetElement.style.scrollMarginTop = `${navBarHeight}px`;
//         });
//     });
// });


document.addEventListener("DOMContentLoaded", function () {
    // 獲取導航欄中所有連結元素
    const navLinks = document.querySelectorAll(".nav-links a");

    // 遍歷所有連結元素，為每個連結添加點擊事件監聽器
    navLinks.forEach(link => {
        // 當連結被點擊時觸發的函數
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            // 如果連結是外部連結（包含 http 或 https），則不使用滾動效果，直接打開新頁面
            if (targetId.startsWith("http://") || targetId.startsWith("https://")) {
                return;
            }

            event.preventDefault(); // 取消預設的連結行為

            // 獲取目標內容區塊的ID
            const targetElement = document.querySelector(targetId);
            const navBarHeight = 70; // 設置導航欄高度（偏移量）

            // 使用scrollIntoView()方法滾動到目標內容區塊，並留出偏移量
            targetElement.scrollIntoView({
                behavior: "smooth", // 平滑滾動
                block: "start", // 對齊目標的上邊緣
                inline: "nearest" // 在水平方向上盡可能保持在視圖內
            });

            // 在目標內容區塊的 CSS 中設置 scroll-margin-top 屬性
            targetElement.style.scrollMarginTop = `${navBarHeight}px`;
        });
    });

    const contentSections = document.querySelectorAll(".fade-in");
    const observerOptions = {
        root: null,
        threshold: 0.5 // 當目標元素的50％可見時觸發回調
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("slide-in-from-bottom"); // 將slide-in-from-bottom類別添加到目標元素
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    contentSections.forEach(section => {
        observer.observe(section);
    });
});
