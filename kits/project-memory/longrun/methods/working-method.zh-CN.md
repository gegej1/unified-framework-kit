# longrun 工作方法

这份文档说明 `longrun` 作为 Unified Framework 项目事实层时的公开工作方法。

## 为什么需要这份文档

canonical 文档负责解释 Project Memory Layer 的角色。

这份方法文档负责说明团队在日常会话中如何使用这一层，同时避免把 `longrun` 重新写成 Feature Delivery authority 或 Execution authority。

## 这份方法文档负责什么

它帮助团队持续维护以下项目事实：

- 当前项目方位与约束
- feature list 及其依赖状态
- 会话交接信息
- 与验证证据相连的长期写回目标

## 它不负责什么

它**不**负责：

- 主定义 `spec.md`、`plan.md`、`tasks.md`
- 取代 execution bridge
- 仅凭操作者口头判断就宣布 `passes: true`
- 取代项目本地规则层

## 推荐工作节奏

1. 先重新打开 durable project-memory surface。
2. 确认当前 feature、阻塞项与已知约束。
3. 如果需要定义或细化 feature，就把该 feature 交给 `spec-kit`。
4. 真正的运行时执行方法仍交给 execution layer。
5. 只有在已有证据时，才把 durable 状态写回项目事实层。

## 协作边界

### 与 spec-kit 的边界

`longrun` 提供当前 feature 的事实背景、项目方位与长期状态。

`spec-kit` 再把这个 feature 收束成 `spec.md`、`plan.md`、`tasks.md`。

### 与 execution bridge 的边界

execution layer 读取已收束的 feature 包，负责具体实现与验证行为。

`longrun` 不负责告诉 execution layer “怎么执行”，它只负责保存 durable context 与 write-back 目标。

## 证据规则

`passes: true` 这类 durable completion 仍必须能追溯到 acceptance evidence 或等价验证证据。

这些方法文档最多只是帮助团队把证据路径维持清楚，不会自己变成长期事实裁决层。

## Fallback

如果不使用这里的方法文档或 helper：

- 继续阅读 `../canonical/README.md`
- 继续从 `../seed/` 复制或改写 starter material
- 继续手工执行同样的 evidence-aware project-memory handshake

缺少这些 methods 只会降低便利性，不会改变层级边界。
