// ==UserScript==
// @name         Floating Menu with Progress Text (ImGui Styling)
// @namespace    https://www.zbschools.sg/
// @version      1.0.0
// @description  Adds a floating menu with a button, progress text, and checkboxes in a black and dark blue ImGui-like theme.
// @match        https://www.zbschools.sg/stories*
// @match        https://www.zbschools.sg/cos/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let floatingMenu;  // Define floatingMenu here
    let menuVisible = true;

    // Function to update the progress text and handle scrolling
    const updateProgressText = (text) => {
        // Append the text to the progress text area
        progressText.value += '\n' + text;

        // Auto-scroll to the bottom to show the latest progress
        progressText.scrollTop = progressText.scrollHeight;
    };

    // Function to toggle menu visibility
    const toggleMenuVisibility = () => {
        menuVisible = !menuVisible;
        floatingMenu.style.display = menuVisible ? 'block' : 'none';
        localStorage.setItem('visibility_stat', menuVisible);
    };

    // Check if the menu was visible in the last session
    if (localStorage.getItem('visibility_stat')) {
        menuVisible = localStorage.getItem('visibility_stat') === 'true';
    }

    // Create the floating menu
    floatingMenu = document.createElement('div');
    floatingMenu.style.position = 'fixed';
    floatingMenu.style.top = '20px';
    floatingMenu.style.right = '20px';
    floatingMenu.style.backgroundColor = '#1e2124';  // Dark blue
    floatingMenu.style.padding = '10px';
    floatingMenu.style.border = '1px solid #000000';  // Black border
    floatingMenu.style.borderRadius = '5px';
    floatingMenu.style.zIndex = "999999999999999999999";
    document.body.appendChild(floatingMenu);

    // Create the header
    const header = document.createElement('div');
    header.innerText = '| 早报解码器 | 内测版 | V1.0.0 |' + '\n';
    header.style.color = '#ffffff';  // White text
    header.style.fontWeight = 'bold';
    header.style.marginBottom = '10px';
    floatingMenu.appendChild(header);

    const subtext = document.createElement('div');
    subtext.innerText = '点击 [ctrl] [shift] [h] 隐藏/显示界面' + "\n" + "\n" + ">>此版本只可解码拼音类题目";
    subtext.style.color = '#ffffff';  // White text
    subtext.style.marginBottom = '7px';
    floatingMenu.appendChild(subtext);

    // Create the button
    const button = document.createElement('button');
    button.innerText = '开启辅助'; // "Enable Assistance" in Chinese
    button.style.backgroundColor = '#000000';  // Black button
    button.style.color = '#ffffff';  // White text
    button.style.padding = '10px';
    button.style.border = '1px solid #00008b';  // Dark blue border
    button.addEventListener('click', () => {
        // Delay for 1 second before executing each step
        setTimeout(() => {
            // Function to process the quiz questions
            function processQuizQuestions() {
                const optionsContainers = document.querySelectorAll('.mcq_options_container');
                const optionTextsArray = [];
                const pinyinText = []; // Array to store pinyin text

                optionsContainers.forEach((optionsContainer, index) => {
                    const radioButtons = optionsContainer.querySelectorAll('input[type="radio"]');
                    const optionTexts = [];

                    radioButtons.forEach(radioButton => {
                        const textElement = radioButton.nextElementSibling;
                        const optionText = textElement ? textElement.textContent.trim() : '';
                        optionTexts.push(optionText);
                    });

                    const questionElements = document.querySelectorAll('.PTBN_heading');
                    const questionElement = questionElements[index].querySelector('u');
                    const questionText = questionElement ? questionElement.textContent : '';

                    const chineseCharacterQuestion = optionTexts.some(text => /[\u4e00-\u9fa5]/.test(text));

                    if (chineseCharacterQuestion) {
                        optionTextsArray.push({ type: 'sentence', options: optionTexts });
                    } else {
                        pinyinText.push(questionText); // Store pinyin text
                        optionTextsArray.push({ type: 'pinyin', options: optionTexts });
                    }
                });

                // Store the pinyinText array in local storage
                localStorage.setItem('pinyinText', JSON.stringify(pinyinText));
                // Store the optionTextsArray in local storage
                localStorage.setItem('quizData', JSON.stringify(optionTextsArray));
            }

            // Call the function to process quiz questions
            processQuizQuestions();

            // Output the optionTextsArray to console
            console.log(JSON.parse(localStorage.getItem('quizData')));
            console.log(JSON.parse(localStorage.getItem('pinyinText')));
            setTimeout(function () {
                updateProgressText('题目函数提取完成');
            }, 1000);
            ////////////////////////////////////////////////////////////////

            const pinyinMap = { "阿": "ā", "啊": "ā", "哀": "āi", "唉": "āi", "挨": "āi", "矮": "ǎi", "爱": "ài", "碍": "ài", "安": "ān", "岸": "àn", "按": "àn", "案": "àn", "暗": "àn", "昂": "áng", "袄": "ǎo", "傲": "ào", "奥": "ào", "八": "bā", "巴": "bā", "扒": "bā", "吧": "bā", "疤": "bā", "拔": "bá", "把": "bǎ", "坝": "bà", "爸": "bà", "罢": "bà", "霸": "bà", "白": "bái", "百": "bǎi", "柏": "bǎi", "摆": "bǎi", "败": "bài", "拜": "bài", "班": "bān", "般": "bān", "斑": "bān", "搬": "bān", "板": "bǎn", "版": "bǎn", "办": "bàn", "半": "bàn", "伴": "bàn", "扮": "bàn", "拌": "bàn", "瓣": "bàn", "帮": "bāng", "绑": "bǎng", "榜": "bǎng", "膀": "bǎng", "傍": "bàng", "棒": "bàng", "包": "bāo", "胞": "bāo", "雹": "báo", "宝": "bǎo", "饱": "bǎo", "保": "bǎo", "堡": "bǎo", "报": "bào", "抱": "bào", "暴": "bào", "爆": "bào", "杯": "bēi", "悲": "bēi", "碑": "bēi", "北": "běi", "贝": "bèi", "备": "bèi", "背": "bèi", "倍": "bèi", "被": "bèi", "辈": "bèi", "奔": "bēn", "本": "běn", "笨": "bèn", "蹦": "bèng", "逼": "bī", "鼻": "bí", "比": "bǐ", "彼": "bǐ", "笔": "bǐ", "鄙": "bǐ", "币": "bì", "必": "bì", "毕": "bì", "闭": "bì", "毙": "bì", "弊": "bì", "碧": "bì", "蔽": "bì", "壁": "bì", "避": "bì", "臂": "bì", "边": "biān", "编": "biān", "鞭": "biān", "扁": "biǎn", "便": "biàn", "变": "biàn", "遍": "biàn", "辨": "biàn", "辩": "biàn", "辫": "biàn", "标": "biāo", "表": "biǎo", "别": "bié", "宾": "bīn", "滨": "bīn", "冰": "bīng", "兵": "bīng", "丙": "bǐng", "柄": "bǐng", "饼": "bǐng", "并": "bìng", "病": "bìng", "拨": "bō", "波": "bō", "玻": "bō", "剥": "bāo", "脖": "bó", "菠": "bō", "播": "bō", "伯": "bó", "驳": "bó", "泊": "bó", "博": "bó", "搏": "bó", "膊": "bó", "薄": "báo", "卜": "bo", "补": "bǔ", "捕": "bǔ", "不": "bù", "布": "bù", "步": "bù", "怖": "bù", "部": "bù", "擦": "cā", "猜": "cāi", "才": "cái", "材": "cái", "财": "cái", "裁": "cái", "采": "cǎi", "彩": "cǎi", "睬": "cǎi", "踩": "cǎi", "菜": "cài", "参": "cān", "餐": "cān", "残": "cán", "蚕": "cán", "惭": "cán", "惨": "cǎn", "灿": "càn", "仓": "cāng", "苍": "cāng", "舱": "cāng", "藏": "cáng", "操": "cāo", "槽": "cáo", "草": "cǎo", "册": "cè", "侧": "cè", "厕": "cè", "测": "cè", "策": "cè", "层": "céng", "叉": "chā", "插": "chā", "查": "chá", "茶": "chá", "察": "chá", "岔": "chà", "差": "chà", "拆": "chāi", "柴": "chái", "馋": "chán", "缠": "chán", "产": "chǎn", "铲": "chǎn", "颤": "chàn", "昌": "chāng", "长": "cháng", "肠": "cháng", "尝": "cháng", "偿": "cháng", "常": "cháng", "厂": "chǎng", "场": "chǎng", "敞": "chǎng", "畅": "chàng", "倡": "chàng", "唱": "chàng", "抄": "chāo", "钞": "chāo", "超": "chāo", "朝": "cháo", "潮": "cháo", "吵": "chǎo", "炒": "chǎo", "车": "chē", "扯": "chě", "彻": "chè", "撤": "chè", "尘": "chén", "臣": "chén", "沉": "chén", "辰": "chén", "陈": "chén", "晨": "chén", "闯": "chuǎng", "衬": "chèn", "称": "chēng", "趁": "chèn", "撑": "chēng", "成": "chéng", "呈": "chéng", "承": "chéng", "诚": "chéng", "城": "chéng", "乘": "chéng", "惩": "chéng", "程": "chéng", "秤": "chèng", "吃": "chī", "驰": "chí", "迟": "chí", "持": "chí", "池": "chí", "匙": "chí", "尺": "chǐ", "齿": "chǐ", "耻": "chǐ", "斥": "chì", "赤": "chì", "翅": "chì", "充": "chōng", "冲": "chōng", "虫": "chóng", "崇": "chóng", "抽": "chōu", "仇": "chóu", "绸": "chóu", "愁": "chóu", "稠": "chóu", "筹": "chóu", "酬": "chóu", "丑": "chǒu", "臭": "chòu", "出": "chū", "初": "chū", "除": "chú", "厨": "chú", "锄": "chú", "础": "chǔ", "储": "chǔ", "楚": "chǔ", "处": "chǔ", "触": "chù", "畜": "chù", "川": "chuān", "穿": "chuān", "传": "chuán", "船": "chuán", "喘": "chuǎn", "串": "chuàn", "疮": "chuāng", "窗": "chuāng", "床": "chuáng", "创": "chuàng", "吹": "chuī", "炊": "chuī", "垂": "chuí", "锤": "chuí", "春": "chūn", "纯": "chún", "唇": "chún", "蠢": "chǔn", "词": "cí", "慈": "cí", "辞": "cí", "磁": "cí", "此": "cǐ", "次": "cì", "刺": "cì", "从": "cóng", "匆": "cōng", "葱": "cōng", "聪": "cōng", "丛": "cóng", "凑": "còu", "粗": "cū", "促": "cù", "醋": "cù", "窜": "cuàn", "催": "cuī", "摧": "cuī", "脆": "cuì", "翠": "cuì", "村": "cūn", "存": "cún", "寸": "cùn", "错": "cuò", "曾": "céng", "搭": "dā", "dá": "dá", "达": "dá", "答": "dá", "dǎ": "dǎ", "打": "dǎ", "大": "dà", "呆": "dāi", "代": "dài", "带": "dài", "待": "dài", "怠": "dài", "贷": "dài", "袋": "dài", "逮": "dǎi", "戴": "dài", "丹": "dān", "单": "dān", "担": "dān", "耽": "dān", "胆": "dǎn", "旦": "dàn", "但": "dàn", "诞": "dàn", "弹": "dàn", "淡": "dàn", "蛋": "dàn", "当": "dāng", "挡": "dǎng", "党": "dǎng", "荡": "dàng", "档": "dàng", "刀": "dāo", "叨": "dāo", "导": "dǎo", "岛": "dǎo", "倒": "dǎo", "蹈": "dǎo", "到": "dào", "悼": "dào", "盗": "dào", "道": "dào", "稻": "dào", "得": "dé", "德": "dé", "的": "de", "灯": "dēng", "登": "dēng", "等": "děng", "凳": "dèng", "低": "dī", "堤": "dī", "滴": "dī", "敌": "dí", "笛": "dí", "底": "dǐ", "抵": "dǐ", "地": "dì", "弟": "dì", "帝": "dì", "递": "dì", "第": "dì", "颠": "diān", "典": "diǎn", "点": "diǎn", "电": "diàn", "店": "diàn", "垫": "diàn", "殿": "diàn", "叼": "diāo", "雕": "diāo", "吊": "diào", "钓": "diào", "调": "diào", "掉": "diào", "爹": "diē", "跌": "diē", "叠": "dié", "蝶": "dié", "丁": "dīng", "叮": "dīng", "盯": "dīng", "钉": "dìng", "顶": "dǐng", "订": "dìng", "定": "dìng", "丢": "diū", "东": "dōng", "冬": "dōng", "董": "dǒng", "懂": "dǒng", "动": "dòng", "冻": "dòng", "栋": "dòng", "洞": "dòng", "都": "dōu", "斗": "dòu", "抖": "dǒu", "陡": "dǒu", "豆": "dòu", "逗": "dòu", "督": "dū", "毒": "dú", "读": "dú", "独": "dú", "堵": "dǔ", "赌": "dǔ", "杜": "dù", "肚": "dù", "度": "dù", "渡": "dù", "端": "duān", "短": "duǎn", "段": "duàn", "断": "duàn", "缎": "duàn", "锻": "duàn", "堆": "duī", "队": "duì", "对": "duì", "吨": "dūn", "蹲": "dūn", "盾": "dùn", "顿": "dùn", "多": "duō", "夺": "duó", "朵": "duǒ", "躲": "duǒ", "惰": "duò", "鹅": "é", "蛾": "é", "额": "é", "恶": "è", "饿": "è", "恩": "ēn", "儿": "ér", "而": "ér", "耳": "ěr", "发": "fā", "乏": "fá", "伐": "fá", "罚": "fá", "阀": "fá", "法": "fǎ", "帆": "fān", "番": "fān", "翻": "fān", "凡": "fán", "烦": "fán", "繁": "fán", "反": "fǎn", "返": "fǎn", "犯": "fàn", "泛": "fàn", "饭": "fàn", "范": "fàn", "贩": "fàn", "方": "fāng", "坊": "fāng", "芳": "fāng", "防": "fáng", "妨": "fáng", "房": "fáng", "仿": "fǎng", "访": "fǎng", "纺": "fǎng", "放": "fàng", "飞": "fēi", "非": "féi", "肥": "féi", "匪": "fěi", "废": "fèi", "沸": "fèi", "肺": "fèi", "费": "fèi", "分": "fēn", "吩": "fēn", "纷": "fēn", "芬": "fēn", "坟": "fén", "粉": "fěn", "份": "fèn", "奋": "fèn", "愤": "fèn", "粪": "fèn", "丰": "fēng", "风": "fēng", "封": "fēng", "疯": "fēng", "峰": "fēng", "锋": "fēng", "蜂": "fēng", "逢": "féng", "缝": "féng", "讽": "fěng", "凤": "fèng", "奉": "fèng", "佛": "fó", "否": "fǒu", "夫": "fū", "肤": "fū", "伏": "fú", "扶": "fú", "服": "fú", "俘": "fú", "浮": "fú", "符": "fú", "幅": "fú", "福": "fú", "抚": "fǔ", "府": "fǔ", "斧": "fǔ", "俯": "fǔ", "辅": "fǔ", "腐": "fǔ", "父": "fù", "付": "fù", "妇": "fù", "负": "fù", "附": "fù", "咐": "fù", "复": "fù", "赴": "fù", "副": "fù", "傅": "fù", "富": "fù", "腹": "fù", "覆": "fù", "该": "gāi", "改": "gǎi", "盖": "gài", "溉": "gài", "概": "gài", "干": "gàn", "甘": "gān", "杆": "gǎn", "肝": "gān", "竿": "gān", "秆": "gǎn", "赶": "gǎn", "敢": "gǎn", "感": "gǎn", "冈": "gāng", "刚": "gāng", "岗": "gǎng", "纲": "gāng", "缸": "gāng", "钢": "gāng", "港": "gǎng", "杠": "gàng", "高": "gāo", "膏": "gāo", "糕": "gāo", "搞": "gǎo", "稿": "gǎo", "告": "gào", "哥": "gē", "胳": "gē", "鸽": "gē", "割": "gē", "搁": "gē", "歌": "gē", "阁": "gé", "革": "gé", "格": "gé", "葛": "gě", "隔": "gé", "个": "gè", "各": "gè", "给": "gěi", "根": "gēn", "跟": "gēn", "更": "gèng", "耕": "gēng", "工": "gōng", "弓": "gōng", "公": "gōng", "功": "gōng", "攻": "gōng", "供": "gòng", "宫": "gōng", "恭": "gōng", "躬": "gōng", "巩": "gǒng", "共": "gòng", "贡": "gòng", "勾": "gōu", "沟": "gōu", "钩": "gōu", "狗": "gǒu", "构": "gòu", "购": "gòu", "够": "gòu", "估": "gū", "姑": "gū", "孤": "gū", "辜": "gū", "古": "gǔ", "谷": "gǔ", "股": "gǔ", "骨": "gǔ", "鼓": "gǔ", "固": "gù", "故": "gù", "顾": "gù", "瓜": "guā", "刮": "guā", "挂": "guà", "乖": "guāi", "拐": "guǎi", "怪": "guài", "关": "guān", "观": "guān", "官": "guān", "冠": "guàn", "馆": "guǎn", "管": "guǎn", "贯": "guàn", "惯": "guàn", "灌": "guàn", "罐": "guàn", "光": "guāng", "广": "guǎng", "归": "guī", "龟": "guī", "规": "guī", "轨": "guǐ", "鬼": "guǐ", "柜": "guì", "贵": "guì", "桂": "guì", "跪": "guì", "滚": "gǔn", "棍": "gùn", "锅": "guō", "国": "guó", "果": "guǒ", "裹": "guǒ", "过": "guò", "哈": "hā", "孩": "hái", "海": "hǎi", "害": "hài", "含": "hán", "寒": "hán", "喊": "hǎn", "汉": "hàn", "汗": "hàn", "旱": "hàn", "航": "háng", "毫": "háo", "豪": "háo", "好": "hǎo", "号": "hào", "浩": "hào", "耗": "hào", "喝": "hē", "禾": "hé", "合": "hé", "何": "hé", "和": "hé", "河": "hé", "核": "hé", "荷": "hé", "盒": "hé", "贺": "hè", "黑": "hēi", "痕": "hén", "很": "hěn", "狠": "hěn", "恨": "hèn", "恒": "héng", "横": "héng", "衡": "héng", "轰": "hōng", "哄": "hǒng", "烘": "hōng", "红": "hóng", "宏": "hóng", "洪": "hóng", "虹": "hóng", "喉": "hóu", "猴": "hóu", "吼": "hǒu", "后": "hòu", "厚": "hòu", "候": "hòu", "乎": "hū", "呼": "hū", "忽": "hū", "狐": "hú", "胡": "hú", "壶": "hú", "湖": "hú", "糊": "hú", "蝴": "hú", "虎": "hǔ", "互": "hù", "户": "hù", "护": "hù", "花": "huā", "华": "huá", "哗": "huá", "滑": "huá", "猾": "huá", "化": "huà", "划": "huá", "画": "huà", "话": "huà", "怀": "huái", "槐": "huái", "坏": "huài", "欢": "huān", "还": "hái", "环": "huán", "缓": "huǎn", "幻": "huàn", "唤": "huàn", "换": "huàn", "患": "huàn", "荒": "huāng", "慌": "huāng", "皇": "huáng", "黄": "huáng", "煌": "huáng", "晃": "huàng", "谎": "huǎng", "灰": "huī", "恢": "huī", "挥": "huī", "辉": "huī", "回": "huí", "悔": "huǐ", "汇": "huì", "会": "huì", "绘": "huì", "贿": "huì", "惠": "huì", "毁": "huǐ", "慧": "huì", "昏": "hūn", "婚": "hūn", "浑": "hún", "魂": "hún", "混": "hùn", "活": "huó", "火": "huǒ", "伙": "huǒ", "或": "huò", "货": "huò", "获": "huò", "祸": "huò", "击": "jī", "饥": "jī", "圾": "jī", "机": "jī", "肌": "jī", "鸡": "jī", "迹": "jì", "积": "jī", "基": "jī", "绩": "jì", "激": "jī", "及": "jí", "吉": "jí", "级": "jí", "即": "jí", "极": "jí", "急": "jí", "疾": "jí", "集": "jí", "籍": "jí", "几": "jǐ", "己": "jǐ", "挤": "jǐ", "脊": "jǐ", "计": "jì", "记": "jì", "纪": "jì", "忌": "jì", "技": "jì", "际": "jì", "剂": "jì", "季": "jì", "既": "jì", "济": "jì", "继": "jì", "寄": "jì", "加": "jiā", "夹": "jiā", "佳": "jiā", "家": "jiā", "嘉": "jiā", "甲": "jiǎ", "价": "jià", "驾": "jià", "架": "jià", "假": "jiǎ", "嫁": "jià", "稼": "jià", "奸": "jiān", "尖": "jiān", "坚": "jiān", "歼": "jiān", "间": "jiān", "肩": "jiān", "艰": "jiān", "兼": "jiān", "监": "jiān", "煎": "jiān", "拣": "jiǎn", "俭": "jiǎn", "茧": "jiǎn", "捡": "jiǎn", "减": "jiǎn", "剪": "jiǎn", "检": "jiǎn", "简": "jiǎn", "见": "jiàn", "件": "jiàn", "建": "jiàn", "剑": "jiàn", "荐": "jiàn", "贱": "jiàn", "健": "jiàn", "舰": "jiàn", "渐": "jiàn", "践": "jiàn", "鉴": "jiàn", "键": "jiàn", "箭": "jiàn", "江": "jiāng", "姜": "jiāng", "将": "jiāng", "浆": "jiāng", "僵": "jiāng", "疆": "jiāng", "讲": "jiǎng", "奖": "jiǎng", "桨": "jiǎng", "匠": "jiàng", "降": "jiàng", "酱": "jiàng", "交": "jiāo", "郊": "jiāo", "娇": "jiāo", "浇": "jiāo", "骄": "jiāo", "胶": "jiāo", "椒": "jiāo", "焦": "jiāo", "蕉": "jiāo", "角": "jiǎo", "狡": "jiǎo", "绞": "jiǎo", "饺": "jiǎo", "脚": "jiǎo", "搅": "jiǎo", "缴": "jiǎo", "叫": "jiào", "轿": "jiào", "较": "jiào", "教": "jiào", "阶": "jiē", "皆": "jiē", "接": "jiē", "揭": "jiē", "街": "jiē", "节": "jié", "劫": "jié", "杰": "jié", "洁": "jié", "结": "jié", "捷": "jié", "截": "jié", "竭": "jié", "姐": "jiě", "解": "jiě", "介": "jiè", "戒": "jiè", "届": "jiè", "界": "jiè", "借": "jiè", "巾": "jīn", "今": "jīn", "斤": "jīn", "金": "jīn", "津": "jīn", "筋": "jīn", "仅": "jǐn", "紧": "jǐn", "谨": "jǐn", "锦": "jǐn", "尽": "jìn", "劲": "jìn", "近": "jìn", "进": "jìn", "晋": "jìn", "浸": "jìn", "禁": "jìn", "京": "jīng", "经": "jīng", "茎": "jīng", "惊": "jīng", "晶": "jīng", "睛": "jīng", "精": "jīng", "井": "jǐng", "颈": "jǐng", "景": "jǐng", "警": "jǐng", "净": "jìng", "径": "jìng", "竞": "jìng", "竟": "jìng", "敬": "jìng", "境": "jìng", "静": "jìng", "镜": "jìng", "纠": "jiū", "究": "jiū", "揪": "jiū", "九": "jiǔ", "久": "jiǔ", "酒": "jiǔ", "旧": "jiù", "救": "jiù", "就": "jiù", "舅": "jiù", "居": "jū", "拘": "jū", "鞠": "jū", "局": "jú", "菊": "jú", "橘": "jú", "举": "jǔ", "矩": "jǔ", "句": "jù", "巨": "jù", "拒": "jù", "具": "jù", "俱": "jù", "剧": "jù", "惧": "jù", "据": "jù", "距": "jù", "锯": "jù", "聚": "jù", "捐": "juān", "卷": "juàn", "倦": "juàn", "绢": "juàn", "决": "jué", "绝": "jué", "觉": "jué", "掘": "jué", "卡": "kǎ", "开": "kāi", "凯": "kǎi", "慨": "kǎi", "刊": "kān", "堪": "kān", "砍": "kǎn", "看": "kàn", "康": "kāng", "糠": "kāng", "扛": "káng", "抗": "kàng", "炕": "kàng", "考": "kǎo", "烤": "kǎo", "靠": "kào", "科": "kē", "棵": "kē", "颗": "kē", "壳": "ké", "咳": "ké", "可": "kě", "渴": "kě", "克": "kè", "刻": "kè", "客": "kè", "课": "kè", "肯": "kěn", "垦": "kěn", "恳": "kěn", "坑": "kēng", "空": "kōng", "孔": "kǒng", "恐": "kǒng", "控": "kòng", "口": "kǒu", "扣": "kòu", "寇": "kòu", "枯": "kū", "哭": "kū", "苦": "kǔ", "库": "kù", "裤": "kù", "酷": "kù", "夸": "kuā", "垮": "kuǎ", "挎": "kuà", "跨": "kuà", "块": "kuài", "快": "kuài", "宽": "kuān", "款": "kuǎn", "筐": "kuāng", "狂": "kuáng", "况": "kuàng", "旷": "kuàng", "矿": "kuàng", "框": "kuàng", "亏": "kuī", "葵": "kuí", "愧": "kuì", "昆": "kūn", "捆": "kǔn", "困": "kùn", "扩": "kuò", "括": "kuò", "阔": "kuò", "垃": "lā", "拉": "lā", "啦": "lā", "喇": "lǎ", "腊": "là", "蜡": "là", "辣": "là", "来": " lái", "赖": "lài", "兰": "lán", "拦": "lán", "栏": "lán", "蓝": "lán", "篮": "lán", "览": "lǎn", "懒": "lǎn", "烂": "làn", "滥": "làn", "郎": "láng", "狼": "láng", "廊": "láng", "朗": "lǎng", "浪": "làng", "捞": "lāo", "劳": "láo", "牢": "láo", "老": "lǎo", "姥": "lǎo", "涝": "lào", "乐": "lè", "勒": "lè", "雷": "léi", "垒": "lěi", "泪": "lèi", "类": "lèi", "累": "lèi", "冷": "lěng", "厘": "lí", "梨": "lí", "狸": "lí", "离": "lí", "犁": "lí", "鹂": "lì", "璃": "lí", "黎": "lí", "礼": "lǐ", "李": "lǐ", "里": "lǐ", "理": "lǐ", "力": "lì", "历": "lì", "厉": "lì", "立": "lì", "丽": "lì", "利": "lì", "励": "lì", "例": "lì", "隶": "lì", "栗": "lì", "粒": "lì", "俩": "liǎng", "连": "lián", "帘": "lián", "怜": "lián", "莲": "lián", "联": "lián", "廉": "lián", "镰": "lián", "脸": "liǎn", "练": "liàn", "炼": "liàn", "恋": "liàn", "链": "liàn", "良": "liáng", "凉": "liáng", "梁": "liáng", "粮": "liáng", "粱": "liáng", "两": "liǎng", "亮": "liàng", "谅": "liàng", "辆": "liàng", "量": "liàng", "辽": "liáo", "疗": "liáo", "僚": "liáo", "了": "le", "料": "liào", "列": "liè", "劣": "liè", "烈": "liè", "猎": "liè", "裂": "liè", "邻": "lín", "林": "lín", "临": "lín", "淋": "lín", "伶": "líng", "灵": "líng", "岭": "lǐng", "铃": "líng", "陵": "líng", "零": "líng", "龄": "líng", "领": "lǐng", "令": "lìng", "另": "lìng", "溜": "liū", "刘": "liú", "流": "liú", "留": "liú", "榴": "liú", "柳": "liǔ", "六": "liù", "龙": "lóng", "笼": "lóng", "聋": "lóng", "隆": "lóng", "垄": "lǒng", "拢": "lǒng", "楼": "lóu", "搂": "lǒu", "漏": "lòu", "露": "lù", "芦": "lú", "炉": "lú", "虏": "lǔ", "鲁": "lǔ", "陆": "lù", "录": "lù", "鹿": "lù", "滤": "lǜ", "碌": "lù", "路": "lù", "驴": "lǘ", "旅": "lǚ", "屡": "lǚ", "律": "lǚ", "虑": "lǜ", "率": "lǜ", "绿": "lǜ", "卵": "luǎn", "乱": "luàn", "掠": "lüě", "略": "lüè", "轮": "lún", "论": "lùn", "罗": "luó", "萝": "luó", "锣": "luó", "箩": "luó", "骡": "luó", "螺": "luó", "络": "luò", "骆": "luò", "落": "luò", "妈": "mā", "麻": "má", "马": "mǎ", "码": "mǎ", "蚂": "mǎ", "骂": "mà", "吗": "ma", "埋": "mái", "买": "mǎi", "迈": "mài", "麦": "mài", "卖": "mài", "脉": "mài", "蛮": "mán", "馒": "mán", "瞒": "mán", "满": "mǎn", "慢": "màn", "漫": "màn", "忙": "máng", "芒": "máng", "盲": "máng", "茫": "máng", "猫": "māo", "毛": "máo", "矛": "máo", "茅": "máo", "茂": "mào", "冒": "mào", "贸": "mào", "帽": "mào", "貌": "mào", "么": "me", "没": "méi", "眉": "méi", "梅": "méi", "煤": "méi", "霉": "méi", "每": "měi", "美": "měi", "妹": "mèi", "门": "mén", "闷": "mèn", "们": "mén", "萌": "méng", "盟": "méng", "猛": "měng", "蒙": "méng", "孟": "mèng", "梦": "mèng", "迷": "mí", "谜": "mí", "米": "mǐ", "眯": "mī", "秘": "mì", "密": "mì", "蜜": "mì", "眠": "mián", "绵": "mián", "棉": "mián", "免": "miǎn", "勉": "miǎn", "面": "miàn", "苗": "miáo", "描": "miáo", "秒": "miǎo", "妙": "miào", "庙": "miào", "灭": "miè", "蔑": "miè", "民": "mín", "敏": "mǐn", "名": "míng", "明": "míng", "鸣": "míng", "命": "mìng", "摸": "mō", "模": "mó", "膜": "mó", "摩": "mó", "磨": "mó", "魔": "mó", "抹": "mò", "末": "mò", "沫": "mò", "莫": "mò", "漠": "mò", "墨": "mò", "默": "mò", "谋": "móu", "某": "mǒu", "母": "mǔ", "亩": "mǔ", "木": "mù", "目": "mù", "牧": "mù", "墓": "mù", "幕": "mù", "慕": "mù", "暮": "mù", "拿": "ná", "哪": "nǎ", "内": "nèi", "那": "nà", "纳": "nà", "乃": "nǎi", "奶": "nǎi", "耐": "nai", "男": "nán", "南": "nán", "难": "nán", "囊": "náng", "挠": "náo", "恼": "nǎo", "脑": "nǎo", "闹": "nào", "呢": "ne", "嫩": "nèn", "能": "néng", "尼": "ní", "泥": "ní", "你": "nǐ", "逆": "nì", "年": "nián", "念": "niàn", "娘": "niáng", "酿": "niàng", "鸟": "niǎo", "尿": "niào", "捏": "niē", "您": "nín", "宁": "níng", "凝": "níng", "牛": "niú", "扭": "niǔ", "纽": "niǔ", "农": "nóng", "浓": "nóng", "弄": "nòng", "奴": "nú", "努": "nǔ", "怒": "nù", "女": "nǚ", "暖": "nuǎn", "挪": "nuó", "欧": "ōu", "偶": "ǒu", "辟": "pì", "趴": "pā", "爬": "pá", "怕": "pà", "拍": "pāi", "牌": "pái", "派": "pai", "攀": "pān", "盘": "pán", "判": "pàn", "叛": "pàn", "盼": "pàn", "乓": "pāng", "旁": "páng", "胖": "pàng", "抛": "pāo", "炮": "pào", "袍": "páo", "跑": "pǎo", "泡": "pào", "陪": "péi", "培": "péi", "赔": "péi", "佩": "pèi", "配": "pèi", "喷": "pēn", "盆": "pén", "朋": "péng", "棚": "péng", "蓬": "péng", "膨": "péng", "捧": "pěng", "碰": "pèng", "批": "pī", "披": "pī", "劈": "pī", "皮": "pí", "疲": "pí", "脾": "pí", "匹": "pǐ", "僻": "pì", "片": "piàn", "偏": "piān", "篇": "piān", "骗": "piàn", "漂": "piāo", "飘": "piāo", "票": "piào", "撇": "piě", "拼": "pīn", "贫": "pín", "品": "pǐn", "乒": "pīng", "平": "píng", "评": "píng", "凭": "píng", "苹": "píng", "瓶": "píng", "萍": "píng", "坡": "pō", "泼": "pō", "婆": "pó", "迫": "pò", "破": "pò", "魄": "pò", "剖": "pōu", "仆": "pú", "扑": "pū", "铺": "pù", "葡": "pú", "朴": "pǔ", "普": "pǔ", "谱": "pǔ", "七": "qī", "妻": "qī", "戚": "qī", "期": "qī", "欺": "qī", "漆": "qī", "齐": "qí", "其": "qí", "奇": "qí", "骑": "qí", "棋": "qí", "旗": "qí", "乞": "qǐ", "企": "qǐ", "岂": "qǐ", "启": "qǐ", "起": "qǐ", "气": "qì", "弃": "qì", "汽": "qì", "砌": "qì", "器": "qì", "恰": "qià", "洽": "qià", "千": "qiān", "迁": "qiān", "牵": "qiān", "铅": "qiān", "谦": "qiān", "签": "qiān", "前": "qián", "钱": "qián", "钳": "qián", "潜": "qián", "浅": "qiǎn", "遣": "qiǎn", "欠": "qiàn", "歉": "qiàn", "枪": "qiāng", "腔": "qiāng", "强": "qiáng", "墙": "qiáng", "抢": "qiǎng", "悄": "qiāo", "敲": "qiāo", "锹": "qiāo", "乔": "qiáo", "侨": "qiáo", "桥": "qiáo", "瞧": "qiáo", "巧": "qiǎo", "切": "qiē", "茄": "qié", "且": "qiě", "窃": "qiè", "亲": "qīn", "侵": "qīn", "芹": "qín", "琴": "qín", "禽": "qín", "勤": "qín", "青": "qīng", "轻": "qīng", "倾": "qīng", "清": "qīng", "蜻": "qīng", "情": "qíng", "晴": "qíng", "顷": "qǐng", "请": "qǐng", "庆": "qìng", "穷": "qióng", "丘": "qiū", "秋": "qiū", "求": "qiú", "球": "qiú", "区": "qū", "曲": "qǔ", "驱": "qū", "屈": "qū", "趋": "qū", "渠": "qú", "取": "qǔ", "去": "qù", "趣": "qù", "圈": "quān", "全": "quán", "权": "quán", "泉": "quán", "拳": "quán", "犬": "quǎn", "劝": "quàn", "券": "quàn", "缺": "quē", "却": "què", "雀": "què", "确": "què", "鹊": "què", "裙": "qún", "群": "qún", "然": "rán", "燃": "rán", "染": "rǎn", "嚷": "rǎng", "壤": "rǎng", "让": "ràng", "饶": "ráo", "扰": "rǎo", "绕": "rào", "惹": "rě", "热": "rè", "人": "rén", "仁": "rén", "忍": "rěn", "刃": "rèn", "认": "rèn", "任": "rèn", "扔": "rēng", "仍": "réng", "日": "rì", "绒": "róng", "荣": "róng", "容": "róng", "熔": "róng", "融": "róng", "柔": "róu", "揉": "róu", "肉": "ròu", "如": "rú", "乳": "rǔ", "辱": "rǔ", "入": "rù", "软": "ruǎn", "锐": "ruì", "瑞": "ruì", "润": "rùn", "若": "ruò", "弱": "ruò", "撒": "sā", "洒": "sǎ", "塞": "sāi", "赛": "sài", "三": "sān", "伞": "sǎn", "散": "sàn", "桑": "sāng", "嗓": "sǎng", "丧": "sàng", "扫": "sǎo", "嫂": "sǎo", "色": "sè", "森": "sēn", "杀": "shā", "沙": "shā", "纱": "shā", "傻": "shǎ", "筛": "shāi", "晒": "shai", "山": "shān", "删": "shān", "衫": "shān", "闪": "shǎn", "陕": "shǎn", "扇": "shàn", "善": "shàn", "伤": "shāng", "商": "shāng", "裳": "shang", "晌": "shǎng", "赏": "shǎng", "上": "shàng", "尚": "shàng", "捎": "shāo", "梢": "shāo", "烧": "shāo", "稍": "shāo", "勺": "sháo", "少": "shǎo", "绍": "shào", "哨": "shào", "舌": "shé", "蛇": "shé", "舍": "shě", "设": "shè", "社": "shè", "射": "shè", "涉": "shè", "摄": "shè", "申": "shēn", "伸": "shēn", "身": "shēn", "深": "shēn", "神": "shén", "沈": "shěn", "审": "shěn", "婶": "shěn", "肾": "shèn", "甚": "shèn", "渗": "shèn", "慎": "shèn", "升": "shēng", "生": "shēng", "声": "shēng", "牲": "shēng", "胜": "shèng", "绳": "shéng", "省": "shěng", "圣": "shèng", "盛": "shèng", "剩": "shèng", "尸": "shī", "失": "shī", "师": "shī", "诗": "shī", "施": "shī", "狮": "shī", "湿": "shī", "十": "shí", "什": "shí", "石": "shí", "时": "shí", "识": "shí", "实": "shí", "拾": "shí", "蚀": "shí", "食": "shí", "史": "shǐ", "使": "shǐ", "始": "shǐ", "驶": "shǐ", "士": "shì", "氏": "shì", "世": "shì", "市": "shì", "示": "shì", "式": "shì", "事": "shì", "侍": "shì", "势": "shì", "视": "shì", "试": "shì", "饰": "shì", "室": "shì", "是": "shì", "柿": "shì", "适": "shì", "逝": "shì", "释": "shì", "誓": "shì", "收": "shōu", "手": "shǒu", "守": "shǒu", "首": "shǒu", "寿": "shòu", "受": "shòu", "兽": "shòu", "售": "shòu", "授": "shòu", "瘦": "shòu", "苏": "sū", "俗": "sú", "诉": "sù", "肃": "sù", "素": "sù", "速": "sù", "宿": "sù", "塑": "sù", "酸": "suān", "蒜": "suàn", "算": "suàn", "虽": "suī", "随": "suí", "岁": "suì", "碎": "suì", "穗": "suì", "孙": "sūn", "损": "sǔn", "笋": "sǔn", "缩": "suō", "所": "suǒ", "索": "suǒ", "她": "tā", "他": "tā", "它": "tā", "塌": "tā", "塔": "tǎ", "踏": "tà", "台": "tái", "抬": "tái", "太": "tai", "态": "tai", "泰": "tai", "贪": "tān", "摊": "tān", "滩": "tān", "坛": "tán", "谈": "tán", "痰": "tán", "坦": "tǎn", "毯": "tǎn", "叹": "tàn", "炭": "tàn", "探": "tàn", "汤": "tāng", "唐": "táng", "堂": "táng", "塘": "táng", "膛": "táng", "糖": "táng", "倘": "tǎng", "躺": "tǎng", "烫": "tàng", "趟": "tàng", "涛": "tāo", "掏": "tāo", "滔": "tāo", "逃": "táo", "桃": "táo", "陶": "táo", "淘": "táo", "萄": "táo", "讨": "tǎo", "套": "tào", "特": "tè", "疼": "téng", "腾": "téng", "梯": "tī", "踢": "tī", "提": "tí", "题": "tí", "蹄": "tí", "体": "tǐ", "剃": "tì", "惕": "tì", "替": "tì", "天": "tiān", "添": "tiān", "田": "tián", "甜": "tián", "填": "tián", "挑": "tiāo", "条": "tiáo", "跳": "tiào", "贴": "tiē", "铁": "tiě", "帖": "tiē", "厅": "tīng", "听": "tīng", "亭": "tíng", "庭": "tíng", "停": "tíng", "挺": "tǐng", "艇": "tǐng", "通": "tōng", "同": "tóng", "桐": "tóng", "铜": "tóng", "童": "tóng", "统": "tǒng", "桶": "tǒng", "筒": "tǒng", "痛": "tòng", "偷": "tōu", "头": "tóu", "投": "tóu", "透": "tòu", "秃": "tū", "突": "tū", "图": "tú", "徒": "tú", "涂": "tú", "途": "tú", "屠": "tú", "土": "tǔ", "吐": "tǔ", "兔": "tù", "团": "tuán", "推": "tuī", "腿": "tuǐ", "退": "tuì", "吞": "tūn", "屯": "tún", "托": "tuō", "拖": "tuō", "脱": "tuō", "驼": "tuó", "妥": "tuǒ", "娃": "wá", "挖": "wā", "蛙": "wā", "瓦": "wǎ", "袜": "wà", "歪": "wāi", "外": "wai", "弯": "wān", "湾": "wān", "丸": "wán", "完": "wán", "玩": "wán", "顽": "wán", "挽": "wǎn", "晚": "wǎn", "碗": "wǎn", "万": "wàn", "汪": "wāng", "亡": "wáng", "王": "wáng", "网": "wǎng", "往": "wǎng", "妄": "wàng", "忘": "wàng", "旺": "wàng", "望": "wàng", "危": "wēi", "威": "wēi", "微": "wēi", "为": "wéi", "围": "wéi", "违": "wéi", "唯": "wéi", "维": "wéi", "伟": "wěi", "伪": "wěi", "尾": "wěi", "委": "wěi", "卫": "wèi", "未": "wèi", "位": "wèi", "味": "wèi", "畏": "wèi", "胃": "wèi", "喂": "wèi", "慰": "wèi", "温": "wēn", "文": "wén", "纹": "wén", "闻": "wén", "蚊": "wén", "稳": "wěn", "问": "wèn", "翁": "wēng", "窝": "wō", "我": "wǒ", "沃": "wò", "卧": "wò", "握": "wò", "乌": "wū", "污": "wū", "呜": "wū", "屋": "wū", "无": "wú", "吴": "wú", "五": "wǔ", "午": "wǔ", "伍": "wǔ", "武": "wǔ", "侮": "wǔ", "舞": "wǔ", "勿": "wù", "务": "wù", "物": "wù", "误": "wù", "悟": "wù", "雾": "wù", "夕": "xī", "西": "xī", "吸": "xī", "希": "xī", "析": "xī", "息": "xī", "牺": "xī", "悉": "xī", "惜": "xī", "稀": "xī", "溪": "xī", "锡": "xī", "熄": "xī", "膝": "xī", "习": "xí", "席": "xí", "袭": "xí", "洗": "xǐ", "喜": "xǐ", "戏": "xì", "系": "xì", "细": "xì", "隙": "xì", "虾": "xiā", "瞎": "xiā", "峡": "xiá", "狭": "xiá", "霞": "xiá", "下": "xià", "吓": "xià", "夏": "xià", "厦": "xià", "仙": "xiān", "先": "xiān", "纤": "xiān", "掀": "xiān", "鲜": "xiān", "闲": "xián", "弦": "xián", "贤": "xián", "咸": "xián", "衔": "xián", "嫌": "xián", "显": "xiǎn", "险": "xiǎn", "县": "xiàn", "现": "xiàn", "线": "xiàn", "限": "xiàn", "宪": "xiàn", "陷": "xiàn", "馅": "xiàn", "羡": "xiàn", "献": "xiàn", "乡": "xiāng", "相": "xiāng", "香": "xiāng", "箱": "xiāng", "详": "xiáng", "祥": "xiáng", "享": "xiǎng", "响": "xiǎng", "想": "xiǎng", "向": "xiàng", "巷": "xiàng", "项": "xiàng", "象": "xiàng", "像": "xiàng", "橡": "xiàng", "削": "xuē", "宵": "xiāo", "消": "xiāo", "销": "xiāo", "小": "xiǎo", "晓": "xiǎo", "孝": "xiào", "效": "xiào", "校": "xiào", "笑": "xiào", "些": "xiē", "歇": "xiē", "协": "xié", "邪": "xié", "胁": "xié", "斜": "xié", "携": "xié", "鞋": "xié", "写": "xiě", "泄": "xiè", "泻": "xiè", "卸": "xiè", "屑": "xiè", "械": "xiè", "谢": "xiè", "心": "xīn", "辛": "xīn", "欣": "xīn", "新": "xīn", "薪": "xīn", "信": "xìn", "兴": "xīng", "星": "xīng", "腥": "xīng", "刑": "xíng", "行": "xíng", "形": "xíng", "型": "xíng", "醒": "xǐng", "杏": "xìng", "姓": "xìng", "幸": "xìng", "性": "xìng", "凶": "xiōng", "兄": "xiōng", "胸": "xiōng", "雄": "xióng", "熊": "xióng", "休": "xiū", "修": "xiū", "羞": "xiū", "朽": "xiǔ", "秀": "xiù", "绣": "xiù", "袖": "xiù", "锈": "xiù", "须": "xū", "虚": "xū", "需": "xū", "徐": "xú", "许": "xǔ", "序": "xù", "叙": "xù", "绪": "xù", "续": "xù", "絮": "xù", "蓄": "xù", "宣": "xuān", "悬": "xuán", "旋": "xuán", "选": "xuǎn", "穴": "xué", "学": "xué", "雪": "xuě", "血": "xuè", "寻": "xún", "巡": "xún", "旬": "xún", "询": "xún", "循": "xún", "训": "xùn", "讯": "xùn", "迅": "xùn", "压": "yā", "呀": "ya", "押": "yā", "鸦": "yā", "鸭": "yā", "牙": "yá", "芽": "yá", "崖": "yá", "哑": "yǎ", "雅": "yǎ", "亚": "yà", "咽": "yān", "烟": "yān", "淹": "yān", "延": "yán", "严": "yán", "言": "yán", "岩": "yán", "沿": "yán", "炎": "yán", "研": "yán", "盐": "yán", "蜒": "yán", "颜": "yán", "掩": "yǎn", "眼": "yǎn", "演": "yǎn", "厌": "yàn", "宴": "yàn", "艳": "yàn", "验": "yàn", "焰": "yàn", "雁": "yàn", "燕": "yàn", "央": "yāng", "殃": "yāng", "秧": "yāng", "扬": "yáng", "羊": "yáng", "阳": "yáng", "杨": "yáng", "洋": "yáng", "仰": "yǎng", "养": "yǎng", "氧": "yǎng", "痒": "yǎng", "样": "yàng", "妖": "yāo", "腰": "yāo", "邀": "yāo", "窑": "yáo", "谣": "yáo", "摇": "yáo", "遥": "yáo", "咬": "yǎo", "药": "yào", "要": "yào", "耀": "yào", "爷": "yé", "也": "yě", "冶": "yě", "野": "yě", "业": "yè", "叶": "yè", "页": "yè", "夜": "yè", "液": "yè", "一": "yī", "衣": "yī", "医": "yī", "依": "yī", "仪": "yí", "宜": "yí", "姨": "yí", "移": "yí", "遗": "yí", "疑": "yí", "乙": "yǐ", "已": "yǐ", "以": "yǐ", "蚁": "yǐ", "倚": "yǐ", "椅": "yǐ", "义": "yì", "亿": "yì", "忆": "yì", "艺": "yì", "议": "yì", "亦": "yì", "异": "yì", "役": "yì", "译": "yì", "易": "yì", "疫": "yì", "益": "yì", "谊": "yì", "意": "yì", "毅": "yì", "翼": "yì", "因": "yīn", "阴": "yīn", "姻": "yīn", "音": "yīn", "银": "yín", "引": "yǐn", "饮": "yǐn", "隐": "yǐn", "印": "yìn", "应": "yīng", "英": "yīng", "樱": "yīng", "鹰": "yīng", "迎": "yíng", "盈": "yíng", "营": "yíng", "蝇": "yíng", "赢": "yíng", "影": "yǐng", "映": "yìng", "硬": "yìng", "佣": "yòng", "拥": "yōng", "庸": "yōng", "永": "yǒng", "咏": "yǒng", "泳": "yǒng", "勇": "yǒng", "涌": "yǒng", "用": "yòng", "优": "yōu", "忧": "yōu", "悠": "yōu", "尤": "yóu", "由": "yóu", "犹": "yóu", "邮": "yóu", "油": "yóu", "游": "yóu", "友": "yǒu", "有": "yǒu", "又": "yòu", "右": "yòu", "幼": "yòu", "诱": "yòu", "于": "yú", "予": "yǔ", "余": "yú", "鱼": "yú", "娱": "yú", "渔": "yú", "愉": "yú", "愚": "yú", "榆": "yú", "与": "yǔ", "宇": "yǔ", "屿": "yǔ", "羽": "yǔ", "雨": "yǔ", "语": "yǔ", "玉": "yù", "育": "yù", "郁": "yù", "狱": "yù", "浴": "yù", "预": "yù", "域": "yù", "欲": "yù", "御": "yù", "裕": "yù", "遇": "yù", "愈": "yù", "誉": "yù", "冤": "yuān", "元": "yuán", "员": "yuán", "园": "yuán", "原": "yuán", "圆": "yuán", "援": "yuán", "缘": "yuán", "源": "yuán", "远": "yuǎn", "怨": "yuàn", "院": "yuàn", "愿": "yuàn", "约": "yuē", "月": "yuè", "钥": "yào", "悦": "yuè", "阅": "yuè", "跃": "yuè", "越": "yuè", "云": "yún", "匀": "yún", "允": "yǔn", "孕": "yùn", "运": "yùn", "晕": "yūn", "韵": "yùn", "杂": "zá", "灾": "zāi", "栽": "zāi", "宰": "zǎi", "载": "zǎi", "再": "zài", "在": "zài", "咱": "zán", "暂": "zàn", "赞": "zàn", "脏": "zāng", "葬": "zàng", "遭": "zāo", "糟": "zāo", "早": "zǎo", "枣": "zǎo", "澡": "zǎo", "灶": "zào", "皂": "zào", "造": "zào", "燥": "zào", "躁": "zào", "则": "zé", "择": "zé", "泽": "zé", "责": "zé", "贼": "zéi", "怎": "zěn", "增": "zēng", "赠": "zèng", "渣": "zhā", "扎": "zhā", "轧": "zhá", "闸": "zhá", "眨": "zhǎ", "炸": "zhà", "榨": "zhà", "摘": "zhāi", "宅": "zhái", "窄": "zhǎi", "债": "zhai", "寨": "zhai", "沾": "zhān", "粘": "zhān", "斩": "zhǎn", "展": "zhǎn", "盏": "zhǎn", "崭": "zhǎn", "占": "zhàn", "战": "zhàn", "站": "zhàn", "张": "zhāng", "章": "zhāng", "涨": "zhǎng", "掌": "zhǎng", "丈": "zhàng", "仗": "zhàng", "帐": "zhàng", "胀": "zhàng", "障": "zhàng", "招": "zhāo", "找": "zhǎo", "召": "zhào", "兆": "zhào", "赵": "zhào", "照": "zhào", "罩": "zhào", "遮": "zhē", "折": "zhé", "哲": "zhé", "者": "zhě", "这": "zhè", "浙": "zhè", "贞": "zhēn", "针": "zhēn", "侦": "zhēn", "珍": "zhēn", "真": "zhēn", "诊": "zhěn", "枕": "zhěn", "阵": "zhèn", "振": "zhèn", "镇": "zhèn", "震": "zhèn", "争": "zhēng", "征": "zhēng", "挣": "zhèng", "睁": "zhēng", "筝": "zhēng", "蒸": "zhēng", "整": "zhěng", "正": "zhèng", "证": "zhèng", "郑": "zhèng", "政": "zhèng", "症": "zhèng", "之": "zhī", "支": "zhī", "汁": "zhī", "芝": "zhī", "枝": "zhī", "知": "zhī", "织": "zhī", "肢": "zhī", "脂": "zhī", "蜘": "zhī", "执": "zhí", "侄": "zhí", "直": "zhí", "值": "zhí", "职": "zhí", "植": "zhí", "殖": "zhí", "止": "zhǐ", "只": "zhī", "旨": "zhǐ", "址": "zhǐ", "纸": "zhǐ", "指": "zhǐ", "至": "zhì", "志": "zhì", "制": "zhì", "帜": "zhì", "治": "zhì", "质": "zhì", "秩": "zhì", "致": "zhì", "智": "zhì", "置": "zhì", "中": "zhōng", "忠": "zhōng", "终": "zhōng", "钟": "zhōng", "肿": "zhǒng", "种": "zhǒng", "众": "zhòng", "重": "zhòng", "州": "zhōu", "舟": "zhōu", "周": "zhōu", "洲": "zhōu", "粥": "zhōu", "宙": "zhòu", "昼": "zhòu", "皱": "zhòu", "骤": "zhòu", "朱": "zhū", "株": "zhū", "珠": "zhū", "诸": "zhū", "猪": "zhū", "蛛": "zhū", "竹": "zhú", "烛": "zhú", "逐": "zhú", "主": "zhǔ", "煮": "zhǔ", "嘱": "zhǔ", "住": "zhù", "助": "zhù", "注": "zhù", "驻": "zhù", "柱": "zhù", "祝": "zhù", "著": "zhù", "筑": "zhù", "铸": "zhù", "抓": "zhuā", "爪": "zhǎo", "专": "zhuān", "砖": "zhuān", "转": "zhuǎn", "赚": "zuàn", "庄": "zhuāng", "装": "zhuāng", "壮": "zhuàng", "状": "zhuàng", "撞": "zhuàng", "追": "zhuī", "准": "zhǔn", "捉": "zhuō", "桌": "zhuō", "浊": "zhuó", "啄": "zhuó", "着": "zhe", "仔": "zǎi", "姿": "zī", "资": "zī", "滋": "zī", "子": "zǐ", "紫": "zǐ", "字": "zì", "自": "zì", "宗": "zōng", "棕": "zōng", "踪": "zōng", "总": "zǒng", "纵": "zòng", "走": "zǒu", "奏": "zòu", "租": "zū", "足": "zú", "族": "zú", "阻": "zǔ", "组": "zǔ", "祖": "zǔ", "钻": "zuàn", "嘴": "zuǐ", "最": "zuì", "罪": "zuì", "醉": "zuì", "尊": "zūn", "遵": "zūn", "昨": "zuó", "左": "zuǒ", "作": "zuò", "坐": "zuò", "座": "zuò", "做": "zuò" };

            setTimeout(function () {
                updateProgressText('pyLib处理器加载完成');
            }, 1000);
            // Function to convert a single Chinese character to Pinyin
            function convertToPinyin(character) {
                return pinyinMap[character] || character;
            }

            // Function to convert a Chinese sentence to Pinyin
            function sentenceToPinyin(sentence) {
                const characters = sentence.split("");
                const pinyinArray = characters.map(convertToPinyin);
                return pinyinArray.join(" ");
            }

            // Get the pinyinText array from local storage
            const pinyinTextArray = JSON.parse(localStorage.getItem('pinyinText')) || [];
            const pinyinConvertedText = [];

            // Convert each element in pinyinTextArray to Pinyin
            pinyinTextArray.forEach(sentence => {
                if (sentence) {
                    const pinyinSentence = sentenceToPinyin(sentence);
                    pinyinConvertedText.push(pinyinSentence);
                }
            });

            // Print the Pinyin converted text
            console.log(pinyinConvertedText);
            localStorage.setItem('pinyinConvertedText', JSON.stringify(pinyinConvertedText));
            setTimeout(function () {
                updateProgressText('提取文字拼音');
            }, 1000);
            ////////////////////////////////////////////////////////////////

            // Select all option elements
            const optionElements = document.querySelectorAll('.quiz_question .mcq_options_container input[type="radio"]');

            // Initialize a two-dimensional array to store option text and "name" attribute
            const optionsArray = [];

            // Iterate through each option element and extract information
            optionElements.forEach((optionElement) => {
                // Traverse to find the option text
                const optionTextElement = optionElement.closest('tr').querySelector('.mcq_option_text.vedit_text');

                if (optionTextElement) {
                    // Get the option text
                    const optionText = optionTextElement.textContent.trim();

                    // Get the "name" attribute value
                    const nameAttribute = optionElement.getAttribute('name');

                    // Store option text and "name" attribute in an array
                    optionsArray.push([optionText, nameAttribute]);
                } else {
                    console.error('Error: Unable to find option text element for an option element');
                }
            });

            console.log('Options Array:', optionsArray);
            localStorage.setItem('optionsArray', JSON.stringify(optionsArray));
            setTimeout(function () {
                updateProgressText('选项及回复函数提取完成');
            }, 1000);
            ////////////////////////////////////////////////////////////////

            // Retrieve pinyinConvertedText array and optionsArray from local storage
            const pinyinConvertedText_final = JSON.parse(localStorage.getItem('pinyinConvertedText')) || [];
            const optionsArray_final = JSON.parse(localStorage.getItem('optionsArray')) || [];

            // Iterate through pinyinConvertedText array and optionsArray and adjust matching indices
            const adjustedIndices = [];
            pinyinConvertedText_final.forEach((pinyinText, pinyinIndex) => {
                optionsArray_final.forEach((option, optionIndex) => {
                    if (option[0] === pinyinText) {
                        let adjustedIndex = optionIndex;
                        if (adjustedIndex < 3) {
                            adjustedIndex += 1;
                        } else {
                            adjustedIndex = (adjustedIndex + 1) % 4;
                        }
                        adjustedIndices.push({ optionIndex: adjustedIndex, option: optionsArray[optionIndex][1] });
                    }
                });
            });

            console.log('Adjusted Indices:', adjustedIndices);


            //console.log(firstElement.option); // Accessing the 'option' property
            //console.log(firstElement.optionIndex); // Accessing the 'optionIndex' property


            for (var i = 0; i < adjustedIndices.length; i++) {
                const firstElement = adjustedIndices[i];
                //document.querySelectorAll(firstElement.option)[firstElement.optionIndex].checked = true;
                //document.querySelectorAll('input[name="resp[251015]"]')[1].checked = true;   --sample
                //document.querySelectorAll('input[name="resp[251012]]"]')[3].checked = true;  --testcase
                const respValue = firstElement.option;
                const index = firstElement.optionIndex - 1;
                const statement = `document.querySelectorAll('input[name="${respValue}"]')[${index}].checked = true;`;

                console.log(statement);
                eval(statement); //--may be blocked by:  <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline'">

                /*alternative method*/
                /*
                
                const executeStatement = new Function(statement);  // Create a function
                    executeStatement();  // Call the function
                */
                updateProgressText('结算完成');
            }



            // Delay for 1 second before proceeding to the next step


        }, 1000);
    });
    floatingMenu.appendChild(button);

    // Create a line break for spacing
    const lineBreak = document.createElement('br');
    floatingMenu.appendChild(lineBreak);

const namespace = document.createElement('div');
namespace.innerText = '基址功能 [无效重启即可]';
namespace.style.color = '#ffffff';  // White text
namespace.style.fontWeight = 'bold';
namespace.style.marginBottom = '10px';
floatingMenu.appendChild(namespace);


    // Create the "维持分数" checkbox
    const checkbox1 = document.createElement('input');
    checkbox1.type = 'checkbox';
    checkbox1.id = 'checkbox1';
    const label1 = document.createElement('label');
    label1.htmlFor = 'checkbox1';
    label1.innerText = '维持分数';
    label1.style.color = '#ffffff';  // White text
    label1.style.marginRight = '10px';
    checkbox1.checked = localStorage.getItem('checkbox1_checked') === 'true';
    checkbox1.addEventListener('change', () => {
        localStorage.setItem('checkbox1_checked', checkbox1.checked);
        if (checkbox1.checked) {
            $(function() {
                setTimeout(updateScore, 100);
            });
            
            function updateScore() {
                if ($(".cscore").length > 0) {
                    // Set the score to 100
                    var cscore = 100;
                    $(".cscore").text(cscore);
                    setTimeout(updateScore, 100);
                }
            }
            alert('运行中');
            updateProgressText('额外分数将维持在100分');
        } 
    });
    floatingMenu.appendChild(checkbox1);
    floatingMenu.appendChild(label1);

    // Create the "清理后台" checkbox
    const checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.id = 'checkbox2';
    const label2 = document.createElement('label');
    label2.htmlFor = 'checkbox2';
    label2.innerText = '清理后台';
    label2.style.color = '#ffffff';  // White text
    checkbox2.checked = localStorage.getItem('checkbox2_checked') === 'true';
    checkbox2.addEventListener('change', () => {
        localStorage.setItem('checkbox2_checked', checkbox2.checked);
        if (checkbox2.checked) {
            console.clear();
            alert('运行中');
            updateProgressText('后台数据已清除');
        }
    });
    floatingMenu.appendChild(checkbox2);
    floatingMenu.appendChild(label2);

    // Create the progress text area
    const progressText = document.createElement('textarea');
    progressText.style.width = '100%';
    progressText.style.height = '100px';
    progressText.style.marginTop = '10px';
    progressText.placeholder = '进度表'; // Placeholder text
    progressText.style.backgroundColor = '#000000';  // Black background
    progressText.style.color = '#ffffff';  // White text
    progressText.style.border = '1px solid #00008b';  // Dark blue border
    floatingMenu.appendChild(progressText);

    // Create the footer
    const footer = document.createElement('div');
    footer.innerText = '@pw-hxss/zaobaoLibExploit';
    footer.style.color = '#ffffff';  // White text
    footer.style.marginTop = '10px';
    floatingMenu.appendChild(footer);

    // Toggle menu visibility based on the saved state
    floatingMenu.style.display = menuVisible ? 'block' : 'none';

    // Event listener to toggle menu visibility on "Ctrl + Shift + H"
    window.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'H') {
            toggleMenuVisibility();
        }
    });

})();

