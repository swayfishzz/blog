import{_ as s,c as i,o as a,a4 as e}from"./chunks/framework.DwILdc5J.js";const E=JSON.parse('{"title":"Node 全局对象","description":"","frontmatter":{},"headers":[],"relativePath":"blog/node/globals.md","filePath":"blog/node/globals.md"}'),l={name:"blog/node/globals.md"},n=e(`<h1 id="node-全局对象" tabindex="-1">Node 全局对象 <a class="header-anchor" href="#node-全局对象" aria-label="Permalink to &quot;Node 全局对象&quot;">​</a></h1><h2 id="global" tabindex="-1">global <a class="header-anchor" href="#global" aria-label="Permalink to &quot;global&quot;">​</a></h2><p>全局命名空间对象，所有全局变量和函数都是它的属性。例如可以通过 <code>global.console</code> 访问 <code>console</code> 对象。</p><h2 id="process" tabindex="-1">process <a class="header-anchor" href="#process" aria-label="Permalink to &quot;process&quot;">​</a></h2><p>提供有关进程的信息和控制。它是 <code>EventEmitter</code> 的实例。</p><ul><li><code>argv</code>：包含命令行参数的数组，第一项为 node 的安装路径，第二项为执行 node 的 js 的文件路径，后续项为传入的参数。<div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.js</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> one</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> two=foo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> three</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(process.argv)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;C:\\\\Program Files\\\\nodejs\\\\node.exe&#39;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;D:\\\\index.js&#39;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;one&#39;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;two=foo&#39;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &#39;three&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// ]</span></span></code></pre></div></li><li><code>env</code>：包含本机的环境变量的对象。</li><li><code>platform</code>：代表操作系统平台的字符串，如：<code>&#39;linux&#39;</code>、<code>&#39;win32&#39;</code>等。</li><li><code>version</code>：代表 nodejs 版本的字符串。</li><li><code>cwd()</code>：返回执行 node.js 的终端路径。</li><li><code>nextTick(cb)</code>：当前堆栈上的操作运行后执行 cb，在任何 I/O 发生之前。总是在微任务队列之前处理。</li><li><code>kill(pid)</code>：通过进程 id 杀死进程。</li><li><code>memoryUsage()</code>：返回进程的内存使用情况（单位：字节）。</li><li><code>on(&#39;beforeExit&#39;, cb)</code>：事件循环无任务时触发。显示调用的 <code>process.on(&#39;exit&#39;)</code> 不会触发此事件。</li><li><code>on(&#39;exit&#39;, cb)</code>：显示调用或事件循环无任务时触发。</li><li><code>on(&#39;unhandledRejection&#39;, (reason, promise) =&gt; {})</code>：<code>Promise</code> 被拒绝且未 <code>catch</code> 时触发。</li></ul><h2 id="其它" tabindex="-1">其它 <a class="header-anchor" href="#其它" aria-label="Permalink to &quot;其它&quot;">​</a></h2><ul><li><p><code>__dirname</code>：当前模块的目录名，ESM 中不可用。ESM 可用以下方法实现：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { dirname } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;node:path&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { fileURLToPath } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;node:url&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dirname</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fileURLToPath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">meta</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.url))</span></span></code></pre></div></li><li><p><code>__filename</code>：当前模块的文件名，ESM 中不可用。ESM 可用以下方法实现：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { fileURLToPath } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;node:url&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fileURLToPath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">meta</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.url)</span></span></code></pre></div></li><li><p><code>queueMicroTask(cb)</code>：将 cb 加入微队列等待执行。</p></li><li><p><code>structuredClone(value)</code>：使用<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm" target="_blank" rel="noreferrer">结构化克隆算法</a>对 value 进行深拷贝。</p></li><li><p><code>console</code>：控制台对象，如 <code>log</code>、<code>warn</code>、<code>error</code>、<code>time</code>、<code>timeEnd</code>、<code>trace</code> 等。</p></li></ul>`,8),o=[n];function t(h,p,d,c,r,k){return a(),i("div",null,o)}const u=s(l,[["render",t]]);export{E as __pageData,u as default};
