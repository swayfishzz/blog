import{_ as s,c as i,o as a,a4 as t}from"./chunks/framework.BsJ0pqcO.js";const g=JSON.parse('{"title":"Server Sent Events","description":"","frontmatter":{},"headers":[],"relativePath":"blog/network/sse.md","filePath":"blog/network/sse.md"}'),e={name:"blog/network/sse.md"},n=t(`<h1 id="server-sent-events" tabindex="-1">Server Sent Events <a class="header-anchor" href="#server-sent-events" aria-label="Permalink to &quot;Server Sent Events&quot;">​</a></h1><p>Server Sent Events（SSE）是一种服务器向浏览器推送消息的方法。</p><p>HTTP 本质上无法实现服务器主动推送消息，SSE 是基于流的特性来完成的。浏览器识别到响应的内容为流，则不会关闭连接，一直等服务器发送新的消息。SSE 以这种变通的方式实现了服务器向客户端的消息推送。</p><p>相比于 WebSocket：</p><table><thead><tr><th>SSE</th><th>WebSocket</th></tr></thead><tbody><tr><td>HTTP 协议</td><td>WebSocket 协议</td></tr><tr><td>可发送字符串数据</td><td>字符串和二进制</td></tr><tr><td>单向通信: 服务器 -&gt; 客户端</td><td>双工通信</td></tr></tbody></table><p>SSE 的优点是更加轻量，配置简单，默认断线重连。</p><p>SEE 为单向的连接，所以不能从客户端向服务器发送消息。</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>浏览器有最大并行请求连接数，默认为 6，所以 SSE 会受到最大连接数的限制。</p><p>使用 HTTP/2，最大连接数量由客户端和服务器之间协商，默认为 100。</p></div><h2 id="连接" tabindex="-1">连接 <a class="header-anchor" href="#连接" aria-label="Permalink to &quot;连接&quot;">​</a></h2><p>客户端需要通过 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource" target="_blank" rel="noreferrer"><code>EventSource</code></a> 连接服务器：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> EventSource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(url[, options])</span></span></code></pre></div><p>如果跨域连接时要传递凭证，应将 <code>withCredentials</code> 设为 <code>true</code>：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> EventSource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/foo&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, { withCredentials: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span></code></pre></div><p><code>EventSource</code> 有如下静态属性：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">EventSource.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CONNECTING</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 连接中或者重连中</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">EventSource.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">OPEN</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 已连接</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">EventSource.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CLOSED</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 连接已关闭</span></span></code></pre></div><p><strong>实例属性</strong></p><ul><li><code>readyState</code>：代表连接状态的数字：CONNECTING（0）、OPEN（1）或 CLOSED（2）。</li><li><code>url</code>：事件源的 url。</li><li><code>withCredentials</code>：是否在跨域时携带 cookie。</li></ul><p><strong>事件</strong></p><ul><li><code>open</code>： 连接成功时触发</li><li><code>error</code>： 连接出错时触发，两种情况会导致浏览器重新发起连接：一种是时间间隔到期，二是由于网络错误等原因，导致连接出错。</li><li><code>message</code>： 接收到服务器推送的消息时触发。</li><li><code>自定义事件</code>： 接收到服务器自定义的事件时触发。</li></ul><p>可以通过实例方法 <code>close</code> 关闭连接，该方法会关闭连接并将 readyState 属性设置为 CLOSED。</p><h2 id="消息格式" tabindex="-1">消息格式 <a class="header-anchor" href="#消息格式" aria-label="Permalink to &quot;消息格式&quot;">​</a></h2><p>服务器收到请求后，需要设置响应头 <code>Content-Type</code> 为 <code>text/event-stream</code>。</p><p>然后以流的格式向客户端推送数据，每条消息由一行或多行文字组成，列出该消息的字段。</p><p>每个字段由字段名表示，后面是冒号，然后是该字段值的文本数据。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>field: content\\n</span></span></code></pre></div><p><code>field</code> 取值如下：</p><table><thead><tr><th>值</th><th>说明</th></tr></thead><tbody><tr><td>data</td><td>服务器向客户端推送的消息内容，客户端可以用 <code>message</code> 事件接收。</td></tr><tr><td>id</td><td>每条数据的编号；浏览器收到后，会将 EventSource 实例的 lastEventId 设置该 id。重新连接后，将请求头 Last-Event-ID 设置为该值，以便服务器正确地恢复连接。</td></tr><tr><td>event</td><td>event 字段可以自定义事件类型，客户端需要使用 <code>addEventListener</code> 监听，若不指定，则使用 <code>message</code> 事件接收。</td></tr><tr><td>retry</td><td>连接中断后，浏览器重新发起连接的时间间隔（毫秒）。</td></tr></tbody></table><p><code>content</code> 为要推送的文本数据。</p><p><code>\\n\\n</code> 表示单条消息的结尾。</p><p>此外，还有以冒号开头的行，表示注释。通常，服务器每隔一段时间就会向浏览器发送一个注释，保持连接不中断。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>: This is a comment</span></span></code></pre></div><p>下面是一些消息的例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>data: Message 1</span></span>
<span class="line"><span>id: 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>data: Message 2</span></span>
<span class="line"><span>data: of two lines</span></span>
<span class="line"><span>id: 2</span></span></code></pre></div><p>消息以双换行符 <code>\\n\\n</code> 分隔，要发送一个换行 <code>\\n</code>，我们可以在要换行的位置立即再发送一个 <code>data: </code></p><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><p>以下是一个使用 express 处理 SSE 连接的主要代码</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-wwVfm" id="tab-Tmfb52L" checked="checked"><label for="tab-Tmfb52L">server.js</label><input type="radio" name="group-wwVfm" id="tab-RLeqRFN"><label for="tab-RLeqRFN">client</label></div><div class="blocks"><div class="language-js vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> index </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/sse&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">req</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 设置响应头</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  res.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setHeader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Content-Type&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;text/event-stream&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  res.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setHeader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Cache-Control&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;no-cache&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  res.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setHeader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Connection&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;keep-alive&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 推送消息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  timer </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setInterval</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    res.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">write</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`data: 服务器推送的消息：\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">index</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">id: \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">index</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\n\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    index</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> es</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> EventSource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;http://localhost:3000/sse&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">es.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;open&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;连接成功&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">es.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;message&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">event</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(event.data) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 每隔一秒打印一条服务器的消息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div></div></div><p>自定义事件类型</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-zvN_O" id="tab-Ijwy8Ya" checked="checked"><label for="tab-Ijwy8Ya">server.js</label><input type="radio" name="group-zvN_O" id="tab-x1t8Mbh"><label for="tab-x1t8Mbh">client</label></div><div class="blocks"><div class="language-js vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">res.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">write</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`event: user-msg</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">data: 用户信息的数据</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">id:1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\n\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">es.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;user-msg&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">event</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(event.data)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div></div></div>`,39),p=[n];function h(l,k,d,r,E,o){return a(),i("div",null,p)}const y=s(e,[["render",h]]);export{g as __pageData,y as default};
