
let 当前搜索引擎 = '必应';
const 搜索引擎列表 = {
    必应: {
        name: '必应',
        url: k => `https://www.bing.com/search?q=${encodeURIComponent(k)}`
    },
    谷歌: {
        name: 'google',
        url: k => `https://www.google.com/search?q=${encodeURIComponent(k)}`
    },
    百度: {
        name: '百度',
        url: k => `https://www.baidu.com/s?wd=${encodeURIComponent(k)}`
    },
    知乎: {
        name: '知乎',
        url: k => `https://www.zhihu.com/search?type=content&q=${encodeURIComponent(k)}`
    }
};

function 搜索() {
    const 关键词 = document.getElementById('搜索输入').value.trim();
    if (!关键词) return;
    const 搜索引擎 = 搜索引擎列表[当前搜索引擎] || 搜索引擎列表.baidu;
    window.open(搜索引擎.url(关键词));
}

function 切换搜索引擎(引擎名) {
    if (搜索引擎列表[引擎名]) {
        当前搜索引擎 = 引擎名;

    }
}
function 更新时间() {
    const 现在 = new Date();
    const 小时 = 现在.getHours();
    const 分钟 = 现在.getMinutes().toString().padStart(2, '0');

    document.getElementById('当前时间').textContent = `${小时}:${分钟}`;

    const 日期 = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    document.getElementById('完整日期').textContent = 现在.toLocaleDateString('zh-CN', 日期);

    更新日历(现在);
}

function 更新日历(当前日期) {
    const 日历容器 = document.getElementById('日历');
    const 年份 = 当前日期.getFullYear();
    const 月份 = 当前日期.getMonth();

    const 月初 = new Date(年份, 月份, 1);
    const 月末 = new Date(年份, 月份 + 1, 0);

    const 月初周几 = 月初.getDay();
    const 总天数 = 月末.getDate();

    const 标题 = 日历容器.querySelector('.日历标题');
    标题.textContent = (月份 + 1) + '月 ' + 年份;

    const 日期网格 = 日历容器.querySelector('.日期网格');
    日期网格.innerHTML = '';

    for (let i = 0; i < 月初周几; i++) {
        const 空白日期项 = document.createElement('div');
        空白日期项.className = '日期项 空白日期';
        日期网格.appendChild(空白日期项);
    }

    const 今天 = 当前日期.getDate();
    for (let i = 1; i <= 总天数; i++) {
        const 日期项 = document.createElement('div');
        日期项.className = '日期项';
        日期项.textContent = i;

        if (i === 今天) {
            日期项.classList.add('今天');
        }

        日期网格.appendChild(日期项);
    }
}

setInterval(更新时间, 1000);
更新时间();



function 更新问候语() {

    const 现在 = new Date();
    const 小时 = 现在.getHours();
    const 早晨问候语输入 = document.getElementById('早晨问候语');
    const 上午问候语输入 = document.getElementById('上午问候语');
    const 中午问候语输入 = document.getElementById('中午问候语');
    const 下午问候语输入 = document.getElementById('下午问候语');
    const 晚上问候语输入 = document.getElementById('晚上问候语');
    const 深夜问候语输入 = document.getElementById('深夜问候语');

    const 早晨问候语 = 早晨问候语输入.value;
    const 上午问候语 = 上午问候语输入.value;
    const 中午问候语 = 中午问候语输入.value;
    const 下午问候语 = 下午问候语输入.value;
    const 晚上问候语 = 晚上问候语输入.value;
    const 深夜问候语 = 深夜问候语输入.value;



    let 问候 = '';
    if (小时 >= 5 && 小时 < 9) 问候 = 早晨问候语;
    else if (小时 >= 9 && 小时 < 12) 问候 = 上午问候语;
    else if (小时 >= 12 && 小时 < 14) 问候 = 中午问候语;
    else if (小时 >= 14 && 小时 < 18) 问候 = 下午问候语;
    else if (小时 >= 18 && 小时 < 23) 问候 = 晚上问候语;
    else 问候 = 深夜问候语;


    //    let 问候 = '';
    //if(小时 >=5 && 小时<9 ) 问候='晨光熹微,新的一天开始啦~';
    //else if(小时 >=9 && 小时<12 ) 问候='上午好！保持专注哦~';
    //else if(小时 >=12 && 小时<14 ) 问候='午安,记得补充能量!';
    //else if(小时 >=14 && 小时<18 ) 问候='下午好,继续加油哦~';
    //else if(小时 >=18 && 小时<23 ) 问候='晚上好,放松一下吧~';
    //else 问候='夜深了,早点休息吧~';

    document.getElementById('问候语').textContent = 问候;
}
setInterval(更新问候语, 1000);
更新问候语();


window.addEventListener('DOMContentLoaded', () => {
    const 搜索引擎按钮映射 = [
        { id: '切换bing', 名称: '必应' },
        { id: '切换谷歌', 名称: '谷歌' },
        { id: '切换百度', 名称: '百度' },
        { id: '切换知乎', 名称: '知乎' }
    ];
    搜索引擎按钮映射.forEach(({ id, 名称 }) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                切换搜索引擎(名称);
            });
        }
    });

    const 快捷键信息 = [
        { id: '自定义快捷键0', 类型: '大' },
        { id: '自定义快捷键1', 类型: '小' },
        { id: '自定义快捷键2', 类型: '小' },
        { id: '自定义快捷键3', 类型: '大' },
        { id: '自定义快捷键4', 类型: '小' },
        { id: '自定义快捷键5', 类型: '小' },
        { id: '自定义快捷键6', 类型: '小' },
        { id: '自定义快捷键7', 类型: '小' },
        { id: '自定义快捷键8', 类型: '小' },
        { id: '自定义快捷键9', 类型: '小' },
        { id: '自定义快捷键10', 类型: '小' },
        { id: '自定义快捷键11', 类型: '小' },
        { id: '自定义快捷键12', 类型: '小' },
        { id: '自定义快捷键13', 类型: '小' }
    ];


    let 快捷键数据 = {};
    try {
        快捷键数据 = JSON.parse(localStorage.getItem('快捷键数据')) || {};
    } catch { }

    function 获取网站图标(url) {
        try {
            const u = new URL(url);
            return u.origin + '/favicon.ico';
        } catch {
            return '';
        }
    }

    function 获取网站标题(url, 回调) {

        try {
            const u = new URL(url);
            回调(u.hostname.replace(/^www\./, ''));
        } catch {
            回调('');
        }
    }

    快捷键信息.forEach(({ id, 类型 }) => {
        const 按钮 = document.getElementById(id);
        if (!按钮) return;
        const 数据 = 快捷键数据[id];

        let 右键定时器 = null;
        按钮.addEventListener('contextmenu', e => e.preventDefault());
        按钮.addEventListener('mousedown', function (e) {
            if (e.button === 2) {
                右键定时器 = setTimeout(() => {
                    if (confirm('是否清除该快捷键？')) {
                        delete 快捷键数据[id];
                        localStorage.setItem('快捷键数据', JSON.stringify(快捷键数据));
                        location.reload();
                    }
                }, 600);
            }
        });
        按钮.addEventListener('mouseup', function (e) {
            if (e.button === 2 && 右键定时器) {
                clearTimeout(右键定时器);
                右键定时器 = null;
            }
        });
        按钮.addEventListener('mouseleave', function () {
            if (右键定时器) {
                clearTimeout(右键定时器);
                右键定时器 = null;
            }
        });
        if (数据 && 数据.链接) {
            按钮.innerHTML = '';
            if (id === '自定义快捷键3') {
                const 图标 = document.createElement('img');
                图标.src = 获取网站图标(数据.链接);
                图标.alt = 'icon';
                图标.style.width = '42px';
                图标.style.height = '42px';
                图标.style.verticalAlign = 'middle';

                图标.onerror = function () {
                    const url = new URL(数据.链接);
                    const hostname = url.hostname.replace(/^www\./, '');
                    this.outerHTML = `<div style="display:inline-block; width:42px; height:42px; line-height:42px; text-align:center; vertical-align:middle; font-size:24px; color:white;">${hostname[0].toUpperCase()}</div>`;
                };

                按钮.appendChild(图标);
                if (类型 === '大') {
                    const 标题 = document.createElement('span');
                    标题.style.marginLeft = '8px';
                    标题.style.fontSize = '14px';
                    标题.style.color = '#fff';
                    标题.textContent = 数据.标题 || '';
                    按钮.appendChild(标题);
                }
            } else {
                const 图标 = document.createElement('img');
                图标.src = 获取网站图标(数据.链接);
                图标.alt = 'icon';
                图标.style.width = '42px';
                图标.style.height = '42px';
                图标.style.display = 'block';
                图标.style.margin = '0 auto 4px auto';

                图标.onerror = function () {
                    const url = new URL(数据.链接);
                    const hostname = url.hostname.replace(/^www\./, '');
                    this.outerHTML = `<div style="width:42px; height:42px; line-height:42px; text-align:center; margin:0 auto 4px auto; font-size:24px; color:white; border-radius:50%;">${hostname[0].toUpperCase()}</div>`;
                };

                按钮.appendChild(图标);
                if (类型 === '大') {
                    const 标题 = document.createElement('span');
                    标题.style.display = 'block';
                    标题.style.textAlign = 'center';
                    标题.style.fontSize = '15px';
                    标题.style.color = '#fff';
                    标题.textContent = 数据.标题 || '';
                    按钮.appendChild(标题);
                }
            }
            按钮.title = 数据.链接;
            按钮.onclick = () => { window.open(数据.链接); };
        } else {
            按钮.innerHTML = '＋';
            按钮.title = '点击添加快捷方式';
            按钮.onclick = () => {
                let 链接 = prompt('请输入网址：(长按右键删除)');
                if (链接) {
                    链接 = 链接.trim();
                    if (!/^https?:\/\//i.test(链接)) {
                        链接 = 'https://' + 链接;
                    }
                    try {
                        new URL(链接);
                        获取网站标题(链接, (标题) => {
                            快捷键数据[id] = { 链接, 标题 };
                            localStorage.setItem('快捷键数据', JSON.stringify(快捷键数据));
                            location.reload();
                        });
                    } catch {
                        alert('请输入有效的网址(http://需要完整输入,如http://awa.com)');
                    }
                }
            };
        }
    });

    const 搜索输入 = document.getElementById('搜索输入');
    if (搜索输入) {
        搜索输入.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                搜索();
                this.value = '';
            }
        });
    }

    const 搜索推荐列表 = document.getElementById('搜索推荐列表');


    搜索输入.addEventListener('input', function () {
        const 输入值 = this.value.trim();
        if (!输入值) {
            搜索推荐列表.innerHTML = '';
            搜索推荐列表.classList.remove('显示');
            return;
        }
        const 回调名 = '百度推荐回调_' + Math.random().toString(36).substr(2, 8);
        window[回调名] = function (res) {
            let 推荐 = (res && res.s) ? res.s : [];
            if (!推荐.length) {
                搜索推荐列表.innerHTML = '';
                搜索推荐列表.classList.remove('显示');
                return;
            }
            搜索推荐列表.innerHTML = 推荐.map(k => `<div class="搜索推荐项">${k}</div>`).join('');
            搜索推荐列表.classList.add('显示');
            setTimeout(() => { delete window[回调名]; }, 1000);
        };
        const 脚本 = document.createElement('script');
        脚本.src = `https://suggestion.baidu.com/su?wd=${encodeURIComponent(输入值)}&cb=${回调名}`;
        脚本.async = true;
        脚本.onload = function () { setTimeout(() => { 脚本.remove(); }, 1000); };
        document.body.appendChild(脚本);
    });

    搜索推荐列表.addEventListener('mousedown', function (e) {
        if (e.target.classList.contains('搜索推荐项')) {
            搜索输入.value = e.target.textContent;
            搜索();
            搜索推荐列表.classList.remove('显示');
        }
    });

    搜索输入.addEventListener('blur', function () {
        setTimeout(() => {
            搜索推荐列表.classList.remove('显示');
        }, 100);
    });

    const 背景label = document.querySelector('#背景图片面板 label');
    const 背景input = document.getElementById('背景图片输入');
    const 星光背景 = document.getElementById('星光背景');
    const 删除背景图片 = document.getElementById('重置背景');

    删除背景图片.addEventListener('click', () => {
        localStorage.removeItem('bgImage')
        星光背景.style.backgroundImage = '';
    });

    if (背景label && 星光背景) {

        背景label.addEventListener('dragover', e => {
            e.preventDefault();
            背景label.style.opacity = 0.8;
        });
        背景label.addEventListener('dragleave', e => {
            背景label.style.opacity = 1;
        });
        背景label.addEventListener('drop', e => {
            e.preventDefault();
            背景label.style.opacity = 1;
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function (evt) {
                    星光背景.style.backgroundImage = `url('${evt.target.result}')`;
                    localStorage.setItem('bgImage', evt.target.result);
                };
                reader.readAsDataURL(file);
            }
        });

        if (背景input) {
            背景input.addEventListener('change', e => {
                const 文件 = 背景input.files[0];
                if (文件 && file.type.startsWith('image/')) {
                    const 渲染 = new FileReader();
                    reader.onload = function (evt) {
                        星光背景.style.backgroundImage = `url('${evt.target.result}')`;
                        localStorage.setItem('背景图片', evt.target.result);
                    };
                    渲染.readAsDataURL(文件);
                }
            });
        }

        const saved = localStorage.getItem('bgImage');
        if (saved) {
            星光背景.style.backgroundImage = `url('${saved}')`;
        }
    }
    const map = [
        ['早晨问候语', '晨光熹微,新的一天开始啦~'],
        ['上午问候语', '上午好！保持专注哦~'],
        ['中午问候语', '午安,记得补充能量!'],
        ['下午问候语', '下午好,继续加油哦~'],
        ['晚上问候语', '晚上好,放松一下吧~'],
        ['深夜问候语', '夜深了,早点休息吧~']
    ];
    map.forEach(([id, def]) => {
        const input = document.getElementById(id);
        if (input) {
            const val = localStorage.getItem(id);
            input.value = (val !== null && val !== undefined && val !== '') ? val : def;
        }
    });

    map.forEach(([id]) => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', () => {
                localStorage.setItem(id, input.value);
            });
        }
    });
});

const 设置倒计时 = document.getElementById('设置倒计时');
设置倒计时.addEventListener('click', () => {
    const 倒计时日期 = document.getElementById('倒计时日期');
    const 倒计时时间 = document.getElementById('倒计时时间');
    const 倒计时事件 = document.getElementById('倒计时事件');


    localStorage.setItem('倒计时日期', 倒计时日期.value);
    localStorage.setItem('倒计时时间', 倒计时时间.value);

    if (倒计时事件.value) {
        localStorage.setItem('倒计时事件', 倒计时事件.value);
    } else {
        localStorage.setItem('倒计时事件', 倒计时日期.value);
    };

    更新倒计时();
});

function 更新倒计时() {
    const 倒计时日期 = localStorage.getItem('倒计时日期');
    const 倒计时时间 = localStorage.getItem('倒计时时间');
    const 倒计时事件1 = localStorage.getItem('倒计时事件');

    if (!倒计时日期) return;

    const 目标日期 = new Date(倒计时日期 + ' ' + (倒计时时间 || '00:00'));
    const 现在 = new Date();
    const 时间差 = 目标日期 - 现在; // 毫秒差

    const 天数 = Math.floor(时间差 / (1000 * 60 * 60 * 24));
    const 小时数 = Math.floor((时间差 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const 分钟数 = Math.floor((时间差 % (1000 * 60 * 60)) / (1000 * 60));

    const 倒计时天 = document.getElementById('倒计时天');
    if (倒计时天) 倒计时天.textContent = `${天数}`;

    const 倒计时时 = document.getElementById('倒计时时');
    if (倒计时时) 倒计时时.textContent = `${小时数}`;

    const 倒计时分 = document.getElementById('倒计时分');
    if (倒计时分) 倒计时分.textContent = `${分钟数}`;

    const 倒计时事件 = document.getElementById('倒计时事件显示');
    if (倒计时事件) 倒计时事件.textContent = 倒计时事件1;
}


setInterval(() => {
    更新倒计时()
}, 1000);
更新倒计时()


function awa() { } function qwq() { } function OvO() { } function TwT() { } function XmX() { } function UwU() { } function XmX() { }

function 呼出自定义问候语菜单() {
    const 呼出自定义问候语面板 = document.getElementById('自定义问候语按钮');
    const 自定义问候语面板 = document.getElementById('自定义问候语面板');

    呼出自定义问候语面板.addEventListener('click', () => {
        自定义问候语面板.classList.toggle('显示');
    });

    window.addEventListener('click', (e) => {
        if (!自定义问候语面板.classList.contains('显示')) return;
        if (自定义问候语面板.contains(e.target) || 呼出自定义问候语面板.contains(e.target)) return;
        自定义问候语面板.classList.remove('显示');
    });
}
呼出自定义问候语菜单();

function 呼出自定义背景菜单() {
    const 呼出自定义背景图片面板 = document.getElementById('背景图片按钮');
    const 自定义背景图片面板 = document.getElementById('背景图片面板');

    呼出自定义背景图片面板.addEventListener('click', () => {
        自定义背景图片面板.classList.toggle('显示');
    });

    window.addEventListener('click', (e) => {
        if (!自定义背景图片面板.classList.contains('显示')) return;
        if (自定义背景图片面板.contains(e.target) || 呼出自定义背景图片面板.contains(e.target)) return;
        自定义背景图片面板.classList.remove('显示');
    });
}
呼出自定义背景菜单();

function 搜索引擎菜单() {
    const 搜索引擎面板 = document.getElementById('切换搜索引擎按钮');
    const 自定义搜索引擎面板 = document.getElementById('切换搜索引擎面板');

    搜索引擎面板.addEventListener('click', () => {
        自定义搜索引擎面板.classList.toggle('显示');
    });

    window.addEventListener('click', (e) => {
        if (!自定义搜索引擎面板.classList.contains('显示')) return;
        if (自定义搜索引擎面板.contains(e.target) || 搜索引擎面板.contains(e.target)) return;
        自定义搜索引擎面板.classList.remove('显示');
    });
}
搜索引擎菜单();

function 倒计时菜单() {
    const 倒计时面板 = document.getElementById('倒计时设置按钮');
    const 自定义倒计时面板 = document.getElementById('倒计时设置面板');

    倒计时面板.addEventListener('click', () => {
        自定义倒计时面板.classList.toggle('显示');
    });

    window.addEventListener('click', (e) => {
        if (!自定义倒计时面板.classList.contains('显示')) return;
        if (自定义倒计时面板.contains(e.target) || 倒计时面板.contains(e.target)) return;
        自定义倒计时面板.classList.remove('显示');
    });
}
倒计时菜单();

const 任务列表 = document.getElementById('任务列表');
const LOCAL_KEY = '任务列表数据';

function 读取任务数据() {
    try {
        const data = JSON.parse(localStorage.getItem(LOCAL_KEY));
        if (Array.isArray(data)) return data;
    } catch { }

    return [
        { 内容: "点击编辑任务...", 完成: false },
        { 内容: "点击'添加待办事项'添加任务", 完成: false },
        { 内容: "长按右键删除", 完成: false },
        { 内容: "项目过多时上下滚动查看", 完成: true },
    ];
}

function 保存任务数据(任务数组) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(任务数组));
}

let 当前任务数据 = 读取任务数据();

function 渲染任务列表() {
    任务列表.innerHTML = '';
    当前任务数据.forEach((任务, idx) => {
        任务列表.appendChild(创建任务项(任务.内容, 任务.完成, idx));
    });
}

function 创建任务项(任务内容, 是否完成 = false, 索引 = -1) {
    const 任务项 = document.createElement('div');
    任务项.className = '任务项' + (是否完成 ? ' 完成' : '');
    任务项.innerHTML = `
        <label class="勾选框">
            <input type="checkbox" ${是否完成 ? 'checked' : ''}>
            <span class="自定义勾"></span>
        </label>
        <div class="可编辑文本" contenteditable="true">${任务内容}</div>
    `;

    const 复选框 = 任务项.querySelector('input[type="checkbox"]');
    复选框.addEventListener('change', () => {
        任务项.classList.toggle('完成', 复选框.checked);
        if (索引 > -1) {
            当前任务数据[索引].完成 = 复选框.checked;
            保存任务数据(当前任务数据);
        }
    });

    const 文本区域 = 任务项.querySelector('.可编辑文本');
    文本区域.addEventListener('blur', () => {
        if (索引 > -1) {
            当前任务数据[索引].内容 = 文本区域.textContent;
            保存任务数据(当前任务数据);
        }
    });

    let 右键定时器 = null;
    任务项.addEventListener('contextmenu', e => e.preventDefault());
    任务项.addEventListener('mousedown', function (e) {
        if (e.button === 2) {
            右键定时器 = setTimeout(() => {
                if (confirm('是否删除该任务？')) {
                    if (索引 > -1) {
                        当前任务数据.splice(索引, 1);
                        保存任务数据(当前任务数据);
                        渲染任务列表();
                    }
                }
            }, 600);
        }
    });
    任务项.addEventListener('mouseup', function (e) {
        if (e.button === 2 && 右键定时器) {
            clearTimeout(右键定时器);
            右键定时器 = null;
        }
    });
    任务项.addEventListener('mouseleave', function () {
        if (右键定时器) {
            clearTimeout(右键定时器);
            右键定时器 = null;
        }
    });

    return 任务项;
}

渲染任务列表();

document.getElementById('添加任务').addEventListener('click', () => {
    当前任务数据.unshift({ 内容: '点击编辑任务...', 完成: false });
    保存任务数据(当前任务数据);
    渲染任务列表();
    setTimeout(() => {
        const 文本区域 = 任务列表.querySelector('.可编辑文本');
        if (文本区域) {
            文本区域.focus();
            const range = document.createRange();
            range.selectNodeContents(文本区域);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    });
});

const 删除已完成任务 = document.getElementById('删除已完成任务');
删除已完成任务.addEventListener('click', () => {
    当前任务数据 = 当前任务数据.filter(任务 => !任务.完成);
    保存任务数据(当前任务数据);
    渲染任务列表();
});