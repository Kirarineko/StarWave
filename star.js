
const 星空设置 = (() => {
    let 星空设置保存 = {};
    try {
        星空设置保存 = JSON.parse(localStorage.getItem('星空设置')) || {};
    } catch { }
    return {
        星星数量: 星空设置保存.星星数量 ?? 300,
        流星频率: 星空设置保存.流星频率 ?? 3,
        星星大小: 星空设置保存.星星大小 ?? 1,
        流星计时器: null
    };
})();

function 保存星空设置() {
    localStorage.setItem('星空设置', JSON.stringify({
        星星数量: 星空设置.星星数量,
        流星频率: 星空设置.流星频率,
        星星大小: 星空设置.星星大小
    }));
}
const 星星数量显示 = document.getElementById('星星数量显示');
const 流星频率显示 = document.getElementById('流星频率显示');
const 星星大小显示 = document.getElementById('星星大小显示');
const 星星密度滑块 = document.getElementById('星星密度');
const 流星频率滑块 = document.getElementById('流星频率');
const 星星大小滑块 = document.getElementById('星星大小');
const 菜单按钮 = document.getElementById('星空菜单按钮');
const 预设按钮组 = document.getElementById('预设按钮组');
const 星空容器 = document.getElementById('星光背景');
const 控制台 = document.getElementById('星空控制台');
const 关闭按钮 = document.querySelector('.关闭按钮');

async function 创建星空(星星数量) {

    星空容器.innerHTML = '';

    for (let i = 0; i < 星空设置.星星数量; i++) {
        const 星星 = document.createElement('div');
        星星.classList.add('星星');


        const 大小 = Math.random();

        if (大小 > 0.8) {//各种大小星星概率
            星星.classList.add('大');
        } else if (大小 > 0.5) {
            星星.classList.add('中');
        } else {
            星星.classList.add('小');
        }

        星星.style.transform = `scale(${星空设置.星星大小})`

        if (Math.random() > 0.9) {//彩色星星概率
            星星.classList.add('彩');
        }

        const X = Math.random() * 100;
        const Y = Math.random() * 100;
        星星.style.left = `${X}%`;
        星星.style.top = `${Y}%`;

        const 延迟 = Math.random() * 5;
        星星.style.animationDelay = `${延迟}s`;

        星空容器.appendChild(星星);

    }
}

window.addEventListener('load', () => {
    创建星空(250);

    setInterval(() => {
        if (Math.random() > 0.7) 创建流星();
    }, 1600);
});

function 创建流星() {
    const 流星 = document.createElement('div');

    流星.classList.add('流星');
    流星.style.left = `${Math.random() * 100}%`;
    流星.style.top = `${Math.random() * 30}%`;

    const 角度 = Math.random() * 30 + 30;
    流星.style.transform = `rotate(${角度}deg)`;

    星空容器.appendChild(流星);

    setTimeout(() => {
        流星.remove();
    }, 5000);
}

function 设置流星计时器() {
    if (星空设置.流星计时器) {
        clearInterval(星空设置.流星计时器);
    }
    星空设置.流星计时器 = setInterval(() => {
        if (Math.random() > 0.7) 创建流星();
    }, 星空设置.流星频率 * 1000);
}

let 星尘粒子 = [];

星空容器.addEventListener('mousemove', (事件) => {
    for (let i = 0; i < 1; i++) {
        const 粒子 = document.createElement('div');
        粒子.classList.add('星尘');

        const 偏移 = 15;
        const X = 事件.clientX + (Math.random() - 0.5) * 偏移;
        const Y = 事件.clientY + (Math.random() - 0.5) * 偏移;

        粒子.style.left = `${X}px`;
        粒子.style.top = `${Y}px`;

        const 大小 = Math.random() * 3 + 1;
        粒子.style.width = `${大小}px`;
        粒子.style.height = `${大小}px`;

        const 颜色 = Math.random() > 0.5 ? '#a0deffb8' : '#ff998eb8';
        粒子.style.backgroundColor = 颜色;

        document.body.appendChild(粒子);
        星尘粒子.push(粒子);

        setTimeout(() => {
            粒子.remove();
            星尘粒子 = 星尘粒子.filter(p => p !== 粒子);
        }, 2000);
    }
});

function 添加星座() {
    const 星座 = document.createElement('div');
    星座.classList.add('svg星座');
    星座.style.top = `${Math.random() * 80}%`;
    星座.style.left = `${Math.random() * 80}%`;
    星座.style.transform = `scale(${Math.random() * 0.5 + 0.8})`;
    document.getElementById('星光背景').appendChild(星座);
}

for (let i = 0; i < 5; i++) 添加星座();



菜单按钮.addEventListener('click', () => {
    控制台.classList.toggle('显示');
});

window.addEventListener('click', (e) => {
    if (!控制台.classList.contains('显示')) return;
    if (控制台.contains(e.target) || 菜单按钮.contains(e.target)) return;
    控制台.classList.remove('显示');
});

关闭按钮.addEventListener('click', () => {
    控制台.classList.remove('显示');
})

星星密度滑块.addEventListener('input', () => {
    星空设置.星星数量 = parseInt(星星密度滑块.value);
    星星数量显示.textContent = 星空设置.星星数量;
    保存星空设置();
    创建星空();
});

流星频率滑块.addEventListener('input', () => {
    星空设置.流星频率 = parseFloat(流星频率滑块.value);
    流星频率显示.textContent = 星空设置.流星频率;
    保存星空设置();
    设置流星计时器();
});

星星大小滑块.addEventListener('input', () => {
    星空设置.星星大小 = parseFloat(星星大小滑块.value);
    星星大小显示.textContent = 星空设置.星星大小;
    保存星空设置();
    document.querySelectorAll('.星星').forEach(星星 => {
        星星.style.transform = `scale(${星空设置.星星大小})`;
    });
});

预设按钮组.querySelectorAll('.预设按钮').forEach(按钮 => {
    按钮.addEventListener('click', () => {
        const 星星数量 = parseInt(按钮.dataset.stars);
        const 流星频率 = parseFloat(按钮.dataset.meteor);

        星星密度滑块.value = 星星数量;
        流星频率滑块.value = 流星频率;

        星星数量显示.textContent = 星星数量;
        流星频率显示.textContent = 流星频率;

        星空设置.星星数量 = 星星数量;
        星空设置.流星频率 = 流星频率;
        保存星空设置();
        创建星空();
        设置流星计时器();

        控制台.classList.remove('显示');
    });
});



window.addEventListener('load', () => {
    if (星星大小滑块) 星星大小滑块.value = 星空设置.星星大小;
    if (星星密度滑块) 星星密度滑块.value = 星空设置.星星数量;
    if (流星频率滑块) 流星频率滑块.value = 星空设置.流星频率;
    if (星星大小显示) 星星大小显示.textContent = 星空设置.星星大小;
    if (星星数量显示) 星星数量显示.textContent = 星空设置.星星数量;
    if (流星频率显示) 流星频率显示.textContent = 星空设置.流星频率;
    创建星空();
    设置流星计时器();
});


