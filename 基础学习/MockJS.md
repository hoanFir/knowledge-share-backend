# Mock.js 
其最初的灵感来自 Elijah Manor 的博文 Mocking Introduction，语法参考了 mennovanslooten/mockJSON，随机数据参考了 victorquinn/chancejs。

Mokc.js的语法规范包括两部分：
1. 数据模板定义规范
2. 数据占位符定义规范

- 数据模板定义规范
数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：
'name|rule': value
'name|min-max': string

生成规则和示例：
1. 属性值是字符串 String
'name|min-max': string
通过重复 string 生成一个字符串，重复次数大于等于 min，小于等于 max。

'name|count': string
通过重复 string 生成一个字符串，重复次数等于 count。

2. 属性值是数字 Number
'name|+1': number
属性值自动加 1，初始值为 number。

'name|min-max': number
生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。

'name|min-max.dmin-dmax': number
生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位。

Mock.mock({
    'number1|1-100.1-10': 1,
    'number2|123.1-10': 1,
    'number3|123.3': 1,
    'number4|123.10': 1.123
})
// =>
{
    "number1": 12.92,
    "number2": 123.51,
    "number3": 123.777,
    "number4": 123.1231091814
}

3. 属性值是布尔型 Boolean
'name|1': boolean
随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。

'name|min-max': value
随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)。

4. 属性值是对象 Object
'name|count': object
从属性值 object 中随机选取 count 个属性。

'name|min-max': objec
从属性值 object 中随机选取 min 到 max 个属性。

5. 属性值是数组 Array
'name|1': array
从属性值 array 中随机选取 1 个元素，作为最终值。

'name|+1': array
从属性值 array 中顺序选取 1 个元素，作为最终值。

'name|min-max': array
通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max。

'name|count': array
通过重复属性值 array 生成一个新数组，重复次数为 count。

6. 属性值是函数 Function
'name': function
执行函数 function，取其返回值作为最终的属性值，函数的上下文为属性 'name' 所在的对象。

7. 属性值是正则表达式 RegExp
'name': regexp
根据正则表达式 regexp 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。

Mock.mock({
    'regexp1': /[a-z][A-Z][0-9]/,
    'regexp2': /\w\W\s\S\d\D/,
    'regexp3': /\d{5,10}/
})
// =>
{
    "regexp1": "pJ7",
    "regexp2": "F)\fp1G",
    "regexp3": "561659409"
}

- 数据占位符定义规范
占位符只是在属性字符串中占个位置，并不出现在最终的属性值中。
占位符的格式为：
@占位符
@占位符(参数[, 参数])

tips：
1. 用@来标识其后的字符串是占位符
2. 占位符引用的是Mock.Random中的方法
3. 可以通过Mock.Random.extend()来扩展自定义占位符
4. 占位符也可以引用数据模板中的属性
5. 占位符会优先引用数据模板中的属性
6. 占位符支持相对路径和绝对路径

```
Mock.mock({
    name: {
        first: '@FIRST',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
})
// =>
// mockJSNO：res
{
    "name": {
        "first": "Charles",
        "middle": "Brenda",
        "last": "Lopez",
        "full": "Charles Brenda Lopez"
    }
}