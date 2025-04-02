```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>王力中学历险记</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
        }
        .game-container {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 80%;
            max-width: 600px;
        }
        .title {
            text-align: center;
            color: #333;
        }
        .character-creation {
            margin-bottom: 20px;
        }
        .game-area {
            display: none;
        }
        .status {
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
        }
        .progress-bar {
            height: 20px;
            background-color: #e0e0e0;
            border-radius: 10px;
            margin-top: 5px;
        }
        .progress {
            height: 100%;
            background-color: #4CAF50;
            border-radius: 10px;
            width: 0%;
        }
        .actions {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-top: 15px;
        }
        button {
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #45a049;
        }
        .popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            z-index: 1000;
        }
        .overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1 class="title">王力中学历险记</h1>
        
        <div class="character-creation" id="characterCreation">
            <h2>创建角色</h2>
            <div>
                <label for="nameInput">姓名:</label>
                <input type="text" id="nameInput" placeholder="请输入你的名字">
            </div>
            <div>
                <label for="schoolSelect">选择班主任:</label>
                <select id="schoolSelect">
                    <option value="">请选择班主任</option>
                    <option value="冬冬">冬冬</option>
                    <option value="大丽丽">大丽丽</option>
                    <option value="小谢">小谢</option>
                    <option value="刚哥">刚哥</option>
                </select>
            </div>
            <button id="startButton">开始游戏</button>
        </div>
        
        <div class="game-area" id="gameArea">
            <div class="status">
                <p>姓名: <span id="nameDisplay"></span></p>
                <p>学校: <span id="schoolDisplay"></span></p>
                <p>年级: <span id="gradeDisplay"></span></p>
                <p>学术能力: <span id="academicSkillDisplay"></span></p>
                <p>精力: <span id="energyDisplay"></span></p>
                <p>智力: <span id="intelligenceDisplay"></span></p>
                <p>年龄: <span id="ageDisplay"></span>岁</p>
                <p>学分: <span id="creditsDisplay"></span>/<span id="creditsToNextGradeDisplay"></span></p>
                <p>零花钱: <span id="moneyDisplay"></span>元</p>
                <p>健康值: <span id="healthDisplay"></span>/<span id="maxHealthDisplay"></span></p>
                <p>技能: <span id="skillsDisplay"></span></p>
                <p>物品: <span id="itemsDisplay"></span></p>
                <div class="progress-bar">
                    <div class="progress" id="healthProgressBar"></div>
                </div>
            </div>
            
            <div class="actions">
                <button id="studyButton">学习</button>
                <button id="clubButton">社团活动</button>
                <button id="taskButton">任务</button>
                <button id="conflictButton">解决问题</button>
                <button id="itemButton">物品</button>
                <button id="timeButton">度过半年</button>
                <button id="signinButton">签到</button>
            </div>
        </div>
    </div>
    
    <div class="overlay" id="overlay"></div>
    <div class="popup" id="popup">
        <h2 id="popupTitle"></h2>
        <p id="popupContent"></p>
        <button id="popupClose">关闭</button>
    </div>
    
    <script src="game.js"></script>
</body>
</html>
```



步骤 2：创建JavaScript文件
创建一个JavaScript文件`game.js`，用于实现游戏的逻辑。


```javascript
class Student {
    constructor(name, school) {
        this.name = name;
        this.school = school;
        this.grade = "高一新生";
        this.academic_skill = 50; // 学术能力
        this.energy = 50;         // 精力
        this.intelligence = 10;   // 智力
        this.age = 16;            // 年龄
        this.credits = 0;         // 学分
        this.credits_to_next_grade = 100;
        this.items = [];
        this.money = 50;          // 零花钱
        this.health = 100;        // 健康值
        this.max_health = 100;
        this.skills = ["王力传"];
        this.last_signin_date = null; // 用于记录上次签到日期
    }
    
    display_status() {
        document.getElementById('nameDisplay').textContent = this.name;
        document.getElementById('schoolDisplay').textContent = this.school;
        document.getElementById('gradeDisplay').textContent = this.grade;
        document.getElementById('academicSkillDisplay').textContent = this.academic_skill;
        document.getElementById('energyDisplay').textContent = this.energy;
        document.getElementById('intelligenceDisplay').textContent = this.intelligence;
        document.getElementById('ageDisplay').textContent = this.age;
        document.getElementById('creditsDisplay').textContent = this.credits;
        document.getElementById('creditsToNextGradeDisplay').textContent = this.credits_to_next_grade;
        document.getElementById('moneyDisplay').textContent = this.money;
        document.getElementById('healthDisplay').textContent = this.health;
        document.getElementById('maxHealthDisplay').textContent = this.max_health;
        document.getElementById('skillsDisplay').textContent = this.skills.join(', ');
        document.getElementById('itemsDisplay').textContent = this.items.join(', ');
        
        const healthPercentage = (this.health / this.max_health) * 100;
        document.getElementById('healthProgressBar').style.width = `${healthPercentage}%`;
    }
    
    study() {
        const base_gain = Math.floor(Math.random() * 11) + 5;
        const intelligence_bonus = Math.floor(this.intelligence / 5);
        const total_gain = base_gain + intelligence_bonus;
        
        this.credits += total_gain;
        this.energy = Math.max(0, this.energy - Math.floor(Math.random() * 4) + 2);
        
        this.check_grade_up();
        
        showPopup('学习结果', `你在图书馆认真学习，获得了${total_gain}点学分。\n消耗了${Math.floor(Math.random() * 4) + 2}点精力。`);
        
        this.display_status();
    }
    
    join_club() {
        if (this.energy < 10) {
            showPopup('精力不足', '精力不足，无法参加社团活动！');
            return;
        }
        
        const base_gain = Math.floor(Math.random() * 13) + 8;
        const intelligence_bonus = Math.floor(this.intelligence / 5);
        const total_gain = base_gain + intelligence_bonus;
        
        this.credits += total_gain;
        this.energy -= 10;
        this.health = Math.min(100, this.health + Math.floor(Math.random() * 4) + 3);
        
        this.check_grade_up();
        
        showPopup('社团活动结果', `你参加了社团活动，获得了${total_gain}点学分。\n消耗了10点精力，健康值提升了${Math.floor(Math.random() * 4) + 3}点。`);
        
        this.display_status();
    }
    
    check_grade_up() {
        if (this.credits >= this.credits_to_next_grade) {
            this.credits -= this.credits_to_next_grade;
            this.credits_to_next_grade = Math.floor(this.credits_to_next_grade * 1.5);
            
            const current_grade = this.grade;
            this.grade = this.get_next_grade();
            
            showPopup('恭喜', `你升级到了${this.grade}！\n你的学术能力提升了！`);
            
            this.academic_skill += 20;
            this.max_health += 20;
            this.health = this.max_health;
            
            this.display_status();
            
            if (this.grade.includes('毕业')) {
                showPopup('恭喜', '恭喜你毕业了！游戏胜利！');
            }
        }
    }
    
    get_next_grade() {
        const grades = [
            "高一新生", "高一学生", "高一优秀生",
            "高二新生", "高二学生", "高二优秀生",
            "高三新生", "高三学生", "高三优秀生",
            "保送生", "重点大学生", "名校研究生",
            "学术新星", "教授助理", "大学教授",
            "学术权威", "毕业"
        ];
        
        const current_index = grades.indexOf(this.grade);
        return current_index < grades.length - 1 ? grades[current_index + 1] : this.grade;
    }
    
    complete_task() {
        const tasks = [
            { name: "完成数学作业", difficulty: 1, reward_credits: 30, reward_money: 20, risk: 0.2 },
            { name: "参加辩论赛", difficulty: 2, reward_credits: 60, reward_money: 40, risk: 0.4 },
            { name: "准备考试", difficulty: 3, reward_credits: 100, reward_money: 10, risk: 0.1 },
            { name: "参加志愿者活动", difficulty: 4, reward_credits: 80, reward_money: 60, risk: 0.5 },
            { name: "完成小组项目", difficulty: 2, reward_credits: 50, reward_money: 30, risk: 0.3 }
        ];
        
        const task = tasks[Math.floor(Math.random() * tasks.length)];
        showPopup('任务', `你接到了一个任务：${task.name} (难度：${task.difficulty})`);
        
        if (Math.random() > task.risk) {
            this.credits += task.reward_credits;
            this.money += task.reward_money;
            this.check_grade_up();
            
            if (Math.random() > 0.7) {
                const items = ["教材", "笔记本", "咖啡", "耳机", "运动鞋"];
                const item = items[Math.floor(Math.random() * items.length)];
                this.items.push(item);
                showPopup('任务结果', `任务成功！获得了${task.reward_credits}点学分和${task.reward_money}元零花钱。\n你获得了物品：${item}！`);
            } else {
                showPopup('任务结果', `任务成功！获得了${task.reward_credits}点学分和${task.reward_money}元零花钱。`);
            }
        } else {
            const health_loss = Math.floor(Math.random() * 21) + 10;
            this.health = Math.max(0, this.health - health_loss);
            
            showPopup('任务结果', `任务失败！受到了${health_loss}点健康损失。`);
            
            if (this.health <= 0) {
                showPopup('警告', '你的健康状况太差，需要立即休息！');
                this.health = 1;
            }
        }
        
        this.display_status();
    }
    
    solve_conflict() {
        const conflicts = [
            { name: "和同学争论", level: 1, health: 50, attack: 10 },
            { name: "设备故障", level: 2, health: 70, attack: 15 },
            { name: "考试压力", level: 3, health: 100, attack: 20 },
            { name: "社团冲突", level: 4, health: 120, attack: 25 },
            { name: "家庭问题", level: 5, health: 150, attack: 30 }
        ];
        
        const conflict = conflicts[Math.floor(Math.random() * conflicts.length)];
        showPopup('挑战', `你遇到了一个挑战：${conflict.name} (难度：${conflict.level})`);
        
        while (conflict.health > 0 && this.health > 0) {
            const solve_power = 5 + Math.floor(this.academic_skill / 10) + conflict.level * 2;
            const damage = Math.max(1, solve_power - conflict.level);
            conflict.health -= damage;
            
            if (conflict.health <= 0) {
                const credits_gain = 20 + conflict.level * 10;
                const money_gain = 10 + conflict.level * 5;
                this.credits += credits_gain;
                this.money += money_gain;
                this.check_grade_up();
                showPopup('挑战结果', `你成功解决了${conflict.name}！\n获得了${credits_gain}点学分和${money_gain}元零花钱。`);
                break;
            }
            
            const conflict_damage = Math.max(1, conflict.attack - (this.grade.match(/高|大|研|教/g) || []).length);
            this.health -= conflict_damage;
            
            if (this.health <= 0) {
                showPopup('挑战结果', '你的压力太大了！');
                this.health = 1;
                this.credits = Math.max(0, this.credits - 10);
                break;
            }
        }
        
        this.display_status();
    }
    
    use_item() {
        if (this.items.length === 0) {
            showPopup('物品', '你没有物品可以使用。');
            return;
        }
        
        const itemsText = '可用物品：\n' + this.items.map((item, index) => `${index + 1}. ${item}`).join('\n');
        showPopup('物品', itemsText + '\n\n选择要使用的物品编号，或按0返回：');
    }
    
    age_up() {
        this.age += 1;
        
        if (this.age > 30 && !this.grade.includes('教授') && !this.grade.includes('毕业')) {
            showPopup('游戏结束', '你已经超过了正常毕业年龄，游戏结束！');
            return;
        }
        
        if (this.age % 2 === 0) {
            this.max_health = Math.max(20, this.max_health - 10);
            this.health = this.max_health;
            showPopup('时间流逝', `你度过了半年，现在${this.age}岁了。\n你的学术压力增加了，健康值下降了...`);
        } else {
            showPopup('时间流逝', `你度过了半年，现在${this.age}岁了。`);
        }
        
        this.display_status();
    }
    
    signin() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (this.last_signin_date && this.last_signin_date.getTime() === today.getTime()) {
            showPopup('签到', '你今天已经签到过了，明天再来吧！');
            return;
        }
        
        const campus_items = [
            "小卖部豆浆", "老师亲签", "考试答案", "电解质饮料", "心理辅导书",
            "学霸笔记", "电解质饮料瓶盖", "图书馆通行证", "王中校服", "教授推荐信"
        ];
        
        const reward_item = campus_items[Math.floor(Math.random() * campus_items.length)];
        this.items.push(reward_item);
        this.last_signin_date = today;
        
        showPopup('签到成功', `签到成功！你获得了校园特别物品：${reward_item}！`);
        
        this.display_status();
    }
}

let student = null;

function initGame() {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', createCharacter);
    
    document.getElementById('studyButton').addEventListener('click', () => student.study());
    document.getElementById('clubButton').addEventListener('click', () => student.join_club());
    document.getElementById('taskButton').addEventListener('click', () => student.complete_task());
    document.getElementById('conflictButton').addEventListener('click', () => student.solve_conflict());
    document.getElementById('itemButton').addEventListener('click', () => student.use_item());
    document.getElementById('timeButton').addEventListener('click', () => student.age_up());
    document.getElementById('signinButton').addEventListener('click', () => student.signin());
    
    document.getElementById('popupClose').addEventListener('click', closePopup);
}

function createCharacter() {
    const name = document.getElementById('nameInput').value;
    const school = document.getElementById('schoolSelect').value;
    
    if (!name) {
        showPopup('错误', '请输入名字！');
        return;
    }
    
    if (!school) {
        showPopup('错误', '请选择班主任！');
        return;
    }
    
    let intelligence_bonus = 0;
    let academic_bonus = 0;
    let health_bonus = 0;
    
    if (school === "冬冬") {
        intelligence_bonus = 2;
    } else if (school === "大丽丽") {
        academic_bonus = 20;
    } else if (school === "小谢") {
        health_bonus = 20;
    } else if (school === "刚哥") {
        intelligence_bonus = 3;
    }
    
    student = new Student(name, school);
    student.intelligence += intelligence_bonus;
    student.academic_skill += academic_bonus;
    student.health += health_bonus;
    student.max_health += health_bonus;
    
    document.getElementById('characterCreation').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    student.display_status();
}

function showPopup(title, content) {
    document.getElementById('popupTitle').textContent = title;
    document.getElementById('popupContent').textContent = content;
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}

window.onload = initGame;
```