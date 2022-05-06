# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



### 医嘱单

- 归属项目：webui-inpatient-nursingtask
- 页面包含功能模块
  - 左边功能模块
    - 筛选功能模块
      - 未签收
        - 新开医嘱
        - 医嘱停止
        - 医嘱作废
      - 今日执行
      - 全部医嘱
      - 长期/临时（医嘱）
      - 联合条件筛选（医嘱分类，临床服务，给药途径，时间范围）
      - 打印按钮
        - 医嘱打印
        - 变更单打印
      - 刷新按钮
      - 全选，全清，签收按钮
    - 未签收数据表格
      - 医嘱状态hover的时候会有医嘱变更记录显示，未处理的可签收，提疑问，操作中也有签收和提疑问
    - 今日执行收据表格
      - 状态中可更改签收时间
      - 可更改申请标志（普通，急送，基数药
      - 操作申请和预申请
  - 右边功能模块
    - 包括 诊疗卡，执行单，发要查询，费用查询按钮，点击每个按钮弹出抽屉，又刷新关闭按钮，现在点开都是空数据



### 医嘱执行
  - 归属项目：webui-inpatient-nursingtask
  - 上部筛选查询按钮，通过筛选条件请求数据展示在下面表格：
    - 通过执行状态
      - 待执行，已执行，已取消
    - 联合查询
      - 全部，长期，临时
      - 临床服务：服务器返回选择数据
      - 给药途径：服务器返回选择数据
      - 时间范围：选择时间范围
  
  - 刷新按钮：点击属性表格数据
  - 全选，全清，执行医嘱按钮功能啊扭
  - 表格：
    - 展示了计划状态，类型，处置内容，执行科室，嘱托，计划执行时间，操作员，操作时间等展示内容和执行，撤销申请功能按钮
    - 计划状态，hover展示执行链路，执行人和执行时间
    - 执行和撤销申请功能按钮
      - 待执行的点击执行走执行流程，请求执行接口数据流到已执行表格里
      - 已执行表格可以修改时间，执行人，剂量，可以撤销

### 医技报告
  - 归属项目：webui-medtech-report
  - 上部筛选功能区
    - 根据第几次就诊筛选
    - 报告查询
    - 检查筛选
    - 检验筛选
    - 联合查询
      - 送检时间范围
      - 送检医生
      - 送检科室（危及值报告，传染病报告）
      - 报告标志
  - 刷新页面：点击刷新列表数据
  - 表格
    - 展示性数据： 状态，处置内容，送检时间（可排序），送检医生，送检科室，申请日期（可排序），报告类别，报告单号，发布日期（可排序），报告医生，实验室，检查目的，临床摘要
    - 操作功能
       - 查看报告按钮：点击弹出报告详情抽屉（没找到有数据的页面）






### 患者出区
  - 归属项目：webui-inpatient-dischargeoutarea
  - 流程：点击下一步进行 ->项目核对-> 费用核对 ->办理出区
  - 核对项目
    - 未退药项目列表
    - 未发药查询
    - 待处理医嘱列表
    - 未计费项目 
  - 费用核对
    - 在院费用->核对操作
    - 已结费用->核对操作 
  - 办理出区
    - 核对信息，填写选填出区时间，病情转归
    - 办理出区
### 转科转区
  - 归属项目：webui-inpatient-dischargeoutarea
    - 流程：点击下一步进行 ->项目核对-> 费用核对 ->办理出区
    - 只有医生下了转科转区医嘱才能进行下一步操作
    - 核对项目
      - 未退药项目列表
      - 未发药查询
      - 待处理医嘱列表
    - 费用核对
      - 在院费用->核对操作
      - 已结费用->核对操作 
    - 办理转区
      - 核对信息，填写选填出区时间，病情转归
      - 办理转区
    - 历史记录 
### 新生儿登记
  - 归属项目：webui-inpatient-bedcard
  - 只有患者为女性时才展示这个菜单
  - 左侧时新生儿列表，可操作新建 
  - 右边区域，上部，保存，取消，作废操作
  - 右边区域，下部新生儿的信息

### 床位信息
  - 归属项目：webui-inpatient-bedcard
  - 床位变更记录
    - 打印功能需要在混合框架下
    - 筛选：按类型，病区进行联合查询
    - 表格展示了：类型，床号，科室，病区，开始时间，结束时间，操作员

  - 床位自动滚费记录
    - 筛选
      - 按 床号，床位费日期，计费结果，是否在本病区进行联合查询
    - 表格展示了： 床号（可排序），床位费日期（可排序），占用方式，床位费服务名称，单价，服务此时，金额，所属科室，所属病区

### 过敏信息 
  - 归属项目：webui-inpatient-bedcard
  - 页面上部功能：
     - 根据过敏源筛选数据
     - 新增按钮
     - 打印按钮（只能在混合框架下打印）
     - 刷新页面按钮
  - 新增功能：
    - 需要选填过敏源，过敏物，过敏结果，过敏症状，过敏程度，确诊时间
  - 表格：展示了 过敏源， 过敏物，过敏结果，过敏症状，过敏程度，确诊时间，记录来源，操作员，操作
    - 操作:
    - 编辑
    - 删除

### 皮试管理
- 归属项目：webui-inpatient-bedcard
  - 筛选功能：
    - 按皮试业务分类筛选（全部，普通皮试，结核菌素试验），按状态筛选（全部，待皮试，皮试中，皮试结束，已审核，已过期）
    - 审核功能按钮：点击弹出审核弹框，须要选填审核护士，审核时间，密码
    - 修改记录功能按钮：点击弹出记录弹框
    - 打印功能按钮：在混合框架下进行打印操作
    - 刷新功能按钮：点击刷新表格数据
    - 皮试数据表格：包含了 药品名称，药品编码，药品规格，药品单位，药品批号，药品分类，皮试业务分类，皮试开始时间，皮试结束时间，皮试结果，皮试有效截止时间，执行护士，审核护士，审核时间，状态展示内容和操作功能
      - 表格操作：
        - 审核：点击弹出审核弹框，须要选填审核护士，审核时间，密码
        - 修改：只有皮试中或皮试结束的状态才能修改


### 我的收藏
- 项目归属：插件webui-inpatient-bedcard/lib/js/InpOutPatientList.js
- 每个菜单右侧有···的按钮，hover时出现收藏按钮，点击请求收藏接口，同时该菜单展示在我的收藏列表下，可从我的收藏列表菜单快捷跳转页面，
- 同时我的收藏列表的菜单右侧也有···按钮，hover时出现取消收藏按钮，点击时请求取消收藏接口；该接口从我的收藏列表里移除


### 护士工作站中接触的费用流程
欠费查询->催交金额设置->欠费打印，催交打印
保险计算：页面报错
全院补记账 ->通过住院号查出病人->选填收费项目->点击记账->产生费用
医嘱单->签收->申请->药房工作站->供药->住院发药->产生费用
物资管理->退药申请->选择要退的药->点击提交申请->药房工作站->住院退药->选择退药申请-退药确认->完成退费
补记账 ->通过住院号查出病人->选填收费项目->点击记账->产生费用
费用查询->查看->点击退费->完成退费
费用核对->在院费用/已结费用->费用核对->核对成功
担保信息维护->添加-》填写担保信息->保存
患者出区->项目核对->费用核对->办理出区
住院医生工作站->出院医嘱签署->住院护士站->医嘱单->签收医嘱->申请出院->执行医嘱->转科转区->项目核对->费用核对->办理出区





护士工作站中接触的费用流程
欠费查询->催交金额设置->欠费打印，催交打印
保险计算：页面报错
全院补记账 ->通过住院号查出病人->选填收费项目->点击记账->产生费用
医嘱单->签收->申请->药房工作站->供药->住院发药->产生费用
物资管理->退药申请->选择要退的药->点击提交申请->药房工作站->住院退药->选择退药申请-退药确认->完成退费
补记账 ->通过住院号查出病人->选填收费项目->点击记账->产生费用
费用查询->查看->点击退费->完成退费
费用核对->在院费用/已结费用->费用核对->核对成功
担保信息维护->添加-》填写担保信息->保存
患者出区->项目核对->费用核对->办理出区
住院医生工作站->出院医嘱签署->住院护士站->医嘱单->签收医嘱->申请出院->执行医嘱->转科转区->项目核对->费用核对->办理出区
产生费用的所有节点
护士站全院补记账
补记账
药房发药
药房退药
费用的逆向流程和分支流程
补记账和全院补记账的费用可在费用查询了退费
退药需要提出退药申请区药房工作站退费

费用的产生的工程中数据的流转



### 检查结果分析

  - 筛选功能区
    - 质控级别：一级，二级，三级
    - 部门计划：接口获取
    - 检查病区：接口获取
    - 检查表单：接口获取
    - 检查周期：选择时间段
    - 重置按钮，查询按钮
  - 表格
    - 根据不同病区不同评分标准展示总分，平均分，问题个数
      - 总分：点击弹出表格：
        - 表格展示了序号，检查时间，得分，扣分分值，责任人，被检查者，实际检查者
      - 问题个数：点击弹出弹窗
        - 表格：展示了序号，质量标准，扣分原因，问题个数，占比字段
        - 展示坐标和一次函数图
        - 问题分析饼状图
### 检查结果下发
  - 筛选功能区
    - 质控级别：一级，二级，三级
    - 检查病区：接口获取
    - 检查表单：接口获取
    - 检查时间：选择时间段
    - 整改方式：及时整改，书面整改
    - 重置按钮，查询按钮
    - 按未下发，已下发，已撤回筛选
  - 批量下发按钮

  - 表格：展示状态，质控级别，检查病区，检查完成日期，实际检查人，整改要点，整改方式，检查表单，检查项目，质量标准，扣分原因等展示项

    - 操作：
      - 未下发情况：整改下发按钮
        - 点击后跳转页面
          - 基本信息：下发人，下发时间
          - 存在问题表格，包含检查病区，检查表单，问题数量，质量标准，扣分原因，整改接收人（可编辑），整改方式（可编辑），整改要点（输入文字）
          - 取消按钮：点击返回列表页面
          - 保存并下发按钮：点击请求下发接口，完成后返回列表
      - 已下发情况：整改撤回按钮
        - 点击按钮 跳转页面，页面包含内用与未下发原因，但不能编辑填写
        - 取消按钮：点击返回列表页
        - 撤回按钮：点击
          - 整改任务已经开始执行，不能再撤回！
          - 没开始执行的请求撤回接口，然后返回列表
      - 已撤回情况：整改下发按钮
       - 内容，操作与未下发一样


#### 质量持续改进

  - 筛选功能区
    - 质控级别：一级，二级，三级
    - 检查表单：接口获取
    - 整改方式：及时整改，书面整改
    - 检查时间：选择时间段
    - 重置按钮，查询按钮
    - 按未完成，已完成，已撤回筛选
  - 表格：展示状态，质控级别，检查日期，整改方式，整改要点，检查表单，质量标准，扣分原因，被检查者，责任人，原因分析，整改措施字段
  - 操作：未完成情况
    - 整改分析按钮点击跳转页面
      - 基本信息：下发人，下发时间，整改接收人
      - 存在问题表格：问题数量，检查表单，质量标准，扣分原因，整改要点展示项
      - 分析整改
        - 简单分析表格
           - 扣分原因：展示数据
           - 原因分析：点图标添加，可手写，可点击引用按钮出来弹框请求数据供勾选，可搜索
           - 整改措施：同原因分析
           - 整改效果：可编辑填写
           - 时间：可选择日期时间
           - 执行整改人：select选择
        - 鱼骨图分析
          - 鱼骨节点根据图的节点统计
          - 编辑鱼骨节点：增删改节点
          - 整改自评表格：包含自评状态，自评更新时间，自评人
          - 操作
            - 编辑：可编辑自评状态和自评时间
            - 删除：删除这一条自评
            - 保存：编辑完可保存
        - 取消按钮：点击返回列表页
        - 保存按钮：请求保存接口，保存本页面修改数据
        - 提交按钮：请求完成接口完成后返回列表
    - 已完成情况下
       - 详情按钮：点击跳转详情页面
       - 跟未完成一样单不能编辑修改
    - 已撤回：整改分析按钮
      - 跟未完成状态一样
      



#### 质量跟踪与评价
 - 筛选功能区
    - 质控级别：一级，二级，三级
    - 检查表单：接口获取
    - 整改方式：及时整改，书面整改
    - 检查时间：选择时间段
    - 重置按钮，查询按钮
    - 按未评价，已评价，已完成筛选
  - 表格：整改状态，质控级别，检查病区，整改方式，整改要点，检查表单，质量标准，扣分原因，原因分析,整改措施, 评价结果，评价内容字段
  - 操作
    - 未评价状态：评价按钮
      - 点击跳转页面
         - 基本信息：下发人，下发时间，整改接收人
         - 存在问题列表包含问题数量，检查表单，质量标准，扣分原因，整改要点展示数据
         - 原因分析：
          - 简单分析表格：包含扣分原因，原因分析，整改措施，整改效果，时间，执行整改人展示数据
          - 鱼骨图分析：功能没做
          - 评价：表格
            - 评价内容：可填写
            - 评价日期：选日期和时间
            - 评价人：展示数据
        - 取消按钮： 点击返回列表
        - 完成整改按钮：点击请求评价接口完成后返回列表
    - 已评价状态：无数据
    - 已完成状态下
       - 撤回按钮：点击请求撤回按钮数据返回未评价状态，页面返回列表
       - 详情按钮：跳转页面
         - 与未评价展示一样数据不可改
            

### 统计分析
- 筛选功能区：
  - 组织结构：select选择框，数据从接口获取
  - 时间选择筛选
  - 查询按钮：点击后请求数据展示最新数据
- 可视化图表数据展示
  - 全院综合数据：展示了风险上报率，上报单总人数，风险上报人数，平均追踪天数，最长最总天数，结束追踪单总数
  - 上报类型分布饼状图：展示不同类型上报数据
  - 上报时间月份统计：折线图
  - 病区分布

### 报告管理
#### 病区上报
- 筛选功能区：
  - 上报类型：select 选择框，数据接口请求来
  - 病区：select 选择框，数据接口请求来
  - 上报时间：选择日期
  - 查询按钮
- 新增按钮
  - 点击按钮没有反应，要看代码进一步确认
  - 点击相应风险类型（接口请求）弹出选择患者弹框选择患者
  - 选完患者展示患者信息，风险报告单，风险评估，病区跟踪，科室跟踪，护理部跟踪（目前都没有相应数据，并且不能新增）
  - 取消按钮：点击返回列表页
  - 保存草稿按钮：点击请求保存草稿按钮，返回列表页
  - 上报按钮：点击请求上报接口返回列表页（但是列表接口返回仍然没有数据）
- 批量忽略按钮：暂时没有数据为置灰状态
- 表格：无数据，新增数据请求后没有请求回来

#### 上级待审核

- 筛选功能区：
  - 上报类型：select 选择框，数据接口请求来
  - 病区：select 选择框，数据接口请求来
  - 上报时间：选择日期
  - 查询按钮
  - 切换表格或卡片展示按钮：默认下面为表格展示，点击切换为卡片展示患者
  - 批量撤回按钮：选择一名或多名患者，点击该按钮请求撤回接口，撤回所选上报

- 表格展示了病区，科室，床号，姓名，患者年龄，住院号，性别，上报时间，上报项目，上报护士长数据
- 操作：
   - 详情：  - 选完患者展示患者信息，风险报告单，风险评估，病区跟踪，科室跟踪，护理部跟踪（目前都没有相应数据，并且不能新增）
  - 取消按钮：点击返回列表页
  - 撤回：点击请求撤回接口返回列表页
  - 保存按钮：点击请求保存接口返回列表页
  - 撤回：点击请求撤回接口
####
- 筛选功能区：
  - 上报类型：select 选择框，数据接口请求来
  - 病区：select 选择框，数据接口请求来
  - 上报时间：选择日期
  - 查询按钮
  - 切换表格或卡片展示按钮：默认下面为表格展示，点击切换为卡片展示患者
  - 批量关闭按钮：选择一名或多名患者，点击该按钮请求关闭接口，关闭所选上报


  - 表格：暂没有数据
