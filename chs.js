/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'every': '每个 ',
    'Cost to launch': '启动费用',
    'Cost to upgrade': '升级费用',
    'Cocaine Workshop': '可卡因车间',
    'False Money Factory': '假币工厂',
    'False Papers Factory': '假证件厂',
    'Grocery Store Robbing': '抢劫杂货店',
    'Hangar': '机库',
    'Meth Workshop': '冰毒车间',
    'Pickpocketing': '扒窃',
    'Street Race': '街道赛车',
    'Union Depository Robbing': '抢劫联邦储蓄银行',
    'Bunker': '地堡',
    'Armored Vans': '装甲货车',
    'Vehicle Trafficking': '车辆贩运',
    'Weed Farm': '大麻农场',
    'Rank': '等级',
    'upgrades': '升级',
    'Produce': '产量',
    'Organization': '组织',
    'Maze Bank': '迷宫银行',
    'missions': '任务',
    'missions completed': '任务完成',
    'missions in progress (': '进行中的任务 (',
    'missions stats': '任务统计',
    'Missions Listing': '任务列表',
    'office': '办公室',
    'none': '无',
    'Price': '价格',
    'idlefive': '铁拳放置',
    'Prices multiplied by': '价格倍数 ',
    'save editor': '存档编辑器',
    'stock Market': '股票市场',
    'statistics': '统计',
    'stocks management': '股票管理',
    'upgrades bought': '购买的升级',
    'Version': '版本',
    'game infos': '游戏信息',
    'Blog': '博客',
    'can product': '可以生产 ',
    'and reduce time by': '并减少时间',
    'Welcome to IdleFive': '欢迎来到铁拳放置',
    'Hello sir, welcome to Los Santos !': '您好先生，欢迎来到洛斯桑托斯！',
    'My name is Lamar, i\'m here to help you to start your new company.': '我叫拉马尔，我是来帮你创办新公司的。',
    'Owned actions': '已有操作',
    'Reputation needed': '需要声誉',
    'Rob a Grocery Store': '抢杂货店',
    'Rob an Armored Van': '抢劫装甲车',
    'Rob the Union Depository': '抢劫联邦储蓄银行',
    'So first thing i need to know is the name of your new company': '所以我要知道的第一件事就是你们新公司的名字',
    'stocks values': '股票价值',
    'IN DEVLOPPEMENT': '开发中',
    'Lamar': '拉马尔',
    'The first thing that you can do is to launch the mission called': '你能做的第一件事就是启动任务叫做',
    'Okay so, let me help you.': '好吧，我来帮你。',
    'Do you have a method to make some money ?.. A way to get it ?': '你有办法赚钱吗?得到它的方法?',
    'Los Santos City': '洛斯桑托斯城',
    'Multiply rewards by': '奖励倍数 ',
    'multiply cash gained by': '获得的现金倍数 ',
    'multiply RP gained by': '获得的RP倍数 ',
    'and give': '并且给予 ',
    'to upgrade the rentability!': '升级收益性!',
    'you have to find a way in your': '你必须在你的 ',
    'Product': '生产 ',
    'produce': '生产 ',
    'Now that you started this mission, you can gain money.': '既然你开始了这个任务，你就可以赚钱了。',
    'But i think it\'ll not be enough for now so,': '但我认为现在还不够，',
    'Good job !': '干得好!',
    'in': '需要 ',
    'Excellent job, i think that you can now live by your own,': '干得好，我想你现在可以独立生活了，',
    'have fun in Los Santos !': '在洛斯桑托斯玩得开心!',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',

    //原样
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    " ": "",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^x?\d+(\.\d+)?[A-Za-z%]{0,2}(\s.C)?\s*$/, //12.34K,23.4 °C
    /^x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /^\s*$/, //纯空格
    /^\d+(\.\d+)?[A-Za-z]{0,2}.?\(?([+\-]?(\d+(\.\d+)?[A-Za-z]{0,2})?)?$/, //12.34M (+34.34K
    /^(\d+(\.\d+)?[A-Za-z]{0,2}\/s)?.?\(?([+\-]?\d+(\.\d+)?[A-Za-z]{0,2})?\/s\stot$/, //2.74M/s (112.4K/s tot
    /^\d+(\.\d+)?(e[+\-]?\d+)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?$/, //2.177e+6 (+4.01+4
    /^(\d+(\.\d+)?(e[+\-]?\d+)?\/s)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?\/s\stot$/, //2.177e+6/s (+4.01+4/s tot
];
var cnExcludePostfix = [
    /:?\s*x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /:?\s*x?\d+(\.\d+)?[A-Za-z]{0,2}$/, //: 12.34K, x1.5
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
var cnRegReplace = new Map([
    [/^You started the (.+) and played for$/, '你在 $1 开始玩游戏，并且玩了 '],
    [/^Loading...\n(.+)$/, '加载中...'],
    [/^(.+) Stores$/, '$1 商店'],
    [/^(.+) seconds$/, '$1 秒'],
    [/^(.+) second$/, '$1 秒'],
    [/^(.+) minute (.+) seconds$/, '$1 分 $2 秒'],
    [/^(.+) minutes (.+) seconds$/, '$1 分 $2 秒'],
    [/^(.+) minute (.+) second$/, '$1 分 $2 秒'],
    [/^(.+) minutes (.+) second$/, '$1 分 $2 秒'],
    [/^(.+) RP$/, '$1 RP'],
    [/^Bunker (.+)$/, '地堡 $1'],
    [/^Weed Farm (.+)$/, '大麻农场 $1'],
    [/^Armored Vans (.+)$/, '装甲货车 $1'],
    [/^Street Race (.+)$/, '街道赛车 $1'],
    [/^Street Races (.+)$/, '街道赛车 $1'],
    [/^Vehicle Trafficking (.+)$/, '车辆贩运 $1'],
    [/^Union Depository Robbing (.+)$/, '联合存款抢劫 $1'],
    [/^Pickpocketing (.+)$/, '扒窃 $1'],
    [/^Meth Workshop (.+)$/, '冰毒车间 $1'],
    [/^Cocaine Workshop (.+)$/, '可卡因车间 $1'],
    [/^False Money Factory (.+)$/, '假币工厂 $1'],
    [/^False Papers Factory (.+)$/, '假证件厂 $1'],
    [/^Grocery Store Robbing (.+)$/, '抢劫杂货店 $1'],
    [/^Hangar (.+)$/, '机库 $1'],
    [/^(\d+) Royal points$/, '$1 皇家点数'],
    [/^Cost: (\d+) RP$/, '成本：$1 皇家点数'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);