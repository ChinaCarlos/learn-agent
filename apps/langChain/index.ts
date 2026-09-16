import { createAgent, tool, initChatModel } from "langchain";
import { MemorySaver } from "@langchain/langgraph";
import * as z from "zod";

/**
 * ========== 为什么你感觉「没有打字机效果」？ ==========
 * 常见原因：
 * 1) 用了 streamEvents 时，中间有「工具调用」空档；工具跑完后最终回答往往很快吐完，
 *    短回复看起来像「整段刷出来」，不像逐字打字。
 * 2) 有些路径下 message.text 可能一次给一大段，而不是很多小 token。
 * 3) 终端刷新很快时，几十个 token 也会感觉「一瞬间」。
 *
 * 更稳的「打字机」做法：agent.stream + streamMode: "messages"
 * —— 模型每生成一点内容，就推一个 messageChunk 过来。
 */

const checkpointer = new MemorySaver();

const getWeather = tool(
  (input) => {
    return `The weather in ${input.city} is sunny`;
  },
  {
    name: "getWeather",
    description: "Get the weather of a city",
    schema: z.object({
      city: z.string().describe("The city to get the weather of"),
    }),
  },
);

// 密钥不要写进代码。运行前执行：export DEEPSEEK_API_KEY=你的密钥
// initChatModel / DeepSeek 会自动读取环境变量 DEEPSEEK_API_KEY
const model = await initChatModel("deepseek:deepseek-chat", {
  temperature: 0.5,
  timeout: 10000,
});

const agent = createAgent({
  model,
  tools: [getWeather],
  checkpointer,
  systemPrompt: "你是一个资深的前端开发工程师，回答请简洁。",
});

const threadConfig = {
  configurable: {
    thread_id: "demo-stream-2",
  },
};

/** 把 chunk.content 抽成纯文本（DeepSeek 有时返回 string，有时返回 [{type:'text', text}]） */
function chunkToText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part && typeof part === "object" && "text" in part) {
          return String((part as { text?: unknown }).text ?? "");
        }
        return "";
      })
      .join("");
  }
  return "";
}

console.log("========== 开始打字机流式输出 ==========\n");

/**
 * streamMode: "messages"
 * 每个 chunk 大致是：[messageChunk, metadata]
 * - messageChunk.content：这一小段新生成的文字（token / 片段）
 * - metadata：来自哪个节点等调试信息
 */
const tokenStream = await agent.stream(
  {
    messages: [
      {
        role: "user",
        // 问一个偏长的问题，更容易看出逐字效果
        content: "请用 5 句话介绍一下 React，每句话单独成行。不要调用工具。",
      },
    ],
  },
  {
    ...threadConfig,
    streamMode: "messages",
  },
);

let tokenCount = 0;

for await (const chunk of tokenStream) {
  // LangGraph messages 模式：chunk = [messageChunk, metadata]
  const [messageChunk, metadata] = chunk as [any, any];
  const text = chunkToText(messageChunk?.content);

  if (text) {
    tokenCount += 1;
    process.stdout.write(text); // 关键：边到边写，不换行
  }

  // 如果模型发起了工具调用，也可以在这里看到（可选调试）
  if (messageChunk?.tool_call_chunks?.length) {
    process.stdout.write(
      `\n[调试] 节点=${metadata?.langgraph_node ?? "?"} 工具调用中...\n`,
    );
  }
}

process.stdout.write(`\n\n========== 结束（共收到 ${tokenCount} 个文字片段）==========\n`);

/**
 * 对比：如果你仍想用 streamEvents(v3)，可以看文件历史；
 * 有工具调用时，最终回答阶段常会显得「一下子出来」，这是体感问题，不一定是没流式。
 * 想验证是否真的在流：看上面打印的「共收到 N 个文字片段」——
 * N 越大，说明拆得越细，打字机感越强。
 */
