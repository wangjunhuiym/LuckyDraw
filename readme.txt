使用说明：
1. 支持使用Chrome, Firefox, IE等浏览器，请使用浏览器打开index.html进行抽奖操作。
2. 可自由选择键盘或者鼠标进行所有抽奖操作。
3. 对于未到场人员，可以双击抽奖区域的人名，重新进行抽取。


配置说明：
所有可以配置的项，都在script/config.js文件中。
1. 奖项的等级、数量设置：
	请编辑PrizeSettings属性，格式是：
	{ name:"三等奖", count:5, style:"ipt5" }
	name为奖项名称；count为该奖项获奖人数；style为样式，可以选默认的ipt5即可。

2. 抽奖候选人设置：
	请编辑CandidateList属性，格式是：
	["艾利锋", "蔡博克", "蔡荣", "陈宏昊"]
	请将所有候选人的名字添加到此属性内。
	
3. 抽奖过程中，每个候选人名字滚动的停留时间：
	请编辑CandidateNameDspTime属性，默认为100毫秒。
	
4. 点击“停止”后，抽奖结果不立刻显示，需要继续将人名滚动一段时间：
	请编辑DrawingDelay属性，默认为500毫秒。

5. 点击“停止”后，抽奖结果会单独弹出一个提示框，然后自动消失。提示框的显示时间：
	请编辑ResultTipDspTime属性，默认为800毫秒。


程序文件组织：
1. index.html
	主页面
2. style
	样式文件
3. style/images
	UI资源文件
4. script
	代码文件
5. doc
	设计文档
	
	