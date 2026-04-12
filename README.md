中文 | [English](./README.en.md)

# unified-framework-kit

`unified-framework-kit` 是 Unified Framework 的公开镜像与可复用 kit 外壳，面向希望理解、评估或采用这套最小内核结构的团队与维护者。

它提供的是**公开可读的架构、边界说明与采用入口**，不是当前的 semantic truth source。当前语义真源仍然是内部 `codeSPEC` 工作区；在明确 cutover 之前，所有语义变化都继续遵循 **source-first**：先在 `codeSPEC` 中 author，再整理到这个 public-facing curated mirror。

## 这是什么

- Unified Framework 的公开、可审阅说明面
- 当前 minimum kernel 架构的 curated mirror
- 面向外部读者的 architecture / reference / adoption 入口
- 未来 `spec-kit` 与 `project-memory` kit export 的公开壳层

## 它帮助解决什么问题

这个仓库主要帮助团队更清楚地回答下面几件事：

- 项目规则、项目记忆、特性交付、执行行为分别由谁负责
- 如何在不制造第二 authority surface 的前提下公开介绍 Unified Framework
- 新项目或已有项目应该从哪里开始理解和接入这套最小内核
- 为什么 `examples`、`scripts`、文档摘要页不能反客为主变成真源

## 最小内核与边界

当前 minimum kernel 仍然是：

- **Project Rules Layer**：项目本地 `AGENTS.md` / constitution / repo rules
- **Project Memory Layer**：`longterm`
- **Feature Delivery Layer**：`spec规范`
- **Execution Layer**：`superpower`，但在本仓库中**只通过 execution bridge contract 出现**

`AgentTeam` 仍然是**可选 orchestration overlay**。它不是 minimum kernel 的一部分，也不进入当前首发顶层公开面。

## Authority model

- `codeSPEC` 仍是 semantic truth source
- 本仓库仍只是 public-facing curated mirror，不与 `codeSPEC` 平权
- 根 `AGENTS.md` 仍是本仓库**唯一** repo-governance authority
- `examples/`、`scripts/`、kit 子目录与说明文档都不是 authority surface
- `passes: true` 一类 durable completion signal 仍必须可追溯到 acceptance evidence 或等价验证证据

## 如何开始

1. 先读 `docs/architecture/overview.md`，建立整体层级视图
2. 再读 `docs/reference/source-of-truth-and-sync.md`，理解 source-first 与 mirror 关系
3. 再读 `docs/reference/authority-split.md` 与 `docs/reference/layer-contracts.md`，确认 authority boundary
4. 根据你的场景选择 `docs/guides/` 中的 adoption guide
5. 需要看 kit 壳层时，再进入 `kits/spec-kit/` 与 `kits/project-memory/longrun/`

如果你正在寻找正式示例，请先注意：`examples/README.md` 目前仍只是首发占位说明，不是主合同。

## 当前公开结构

- 根部公开壳层文档：`README.md`、`AGENTS.md`、`CONTRIBUTING.md`
- 架构说明：`docs/architecture/`
- 参考文档：`docs/reference/`
- 采用指引：`docs/guides/`
- kit 结构骨架：`kits/spec-kit/`、`kits/project-memory/longrun/`
- Batch 2 Wave 1 canonical docs：
  - `kits/spec-kit/canonical/`
  - `kits/project-memory/longrun/canonical/`
- Batch 2 Wave 2 seed exports：
  - `kits/spec-kit/seed/`
  - `kits/project-memory/longrun/seed/`
- Batch 2 Wave 3 method-only exports：
  - `kits/spec-kit/methods/`
  - `kits/project-memory/longrun/methods/`
- 只读 public manifest snapshot：`export-manifest.yaml`
- examples 占位入口：`examples/README.md`

## Batch 2 Wave 3 说明

当前已完成到：Batch 2 Wave 3。

目前已经实现：

- public placement skeleton
- `spec-kit` canonical export
- `longrun` canonical export
- `spec-kit` seed export
- `longrun` seed export
- `spec-kit` 的首批 method-only export
- `longrun` 的首批 method-only export
- 根部 / reference / guide 的最小同步增强

当前仍**不**实现：

- overlay 首发
- 正式 examples
- execution implementation 的公开复制
- raw prompt scaffolds 或 raw `.codex/` / `.specify/` authoring layout

## 当前不包含

- `overlays/agent-team/` 的首发导出
- 正式 example projects
- `.codex/skills/*` 实现
- internal handoff / audit / research / mispatch 等内部材料
- Batch 3 的完整迁移内容
- 任何 runtime implementation 的公开复制

## Contribution note

如果你要提出**语义层**变更，请继续遵守当前 source-first 模型：

1. 先在 `codeSPEC` 中 author 语义变化
2. 再把已确认的 public-safe 结果整理到本仓库
3. 最后检查公开镜像是否仍然准确表达当前 authority model
