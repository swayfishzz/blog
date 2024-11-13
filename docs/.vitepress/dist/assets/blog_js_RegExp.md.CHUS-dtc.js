import{_ as s,c as t,o as i,a4 as a}from"./chunks/framework.DwILdc5J.js";const F=JSON.parse('{"title":"正则表达式","description":"","frontmatter":{},"headers":[],"relativePath":"blog/js/RegExp.md","filePath":"blog/js/RegExp.md"}'),e={name:"blog/js/RegExp.md"},d=a(`<h1 id="正则表达式" tabindex="-1">正则表达式 <a class="header-anchor" href="#正则表达式" aria-label="Permalink to &quot;正则表达式&quot;">​</a></h1><p>正则表达式是一种强大的工具，用于定义文本模式，你可以使用它们来进行文本搜索、验证输入、替换文本等操作</p><h2 id="创建正则表达式" tabindex="-1">创建正则表达式 <a class="header-anchor" href="#创建正则表达式" aria-label="Permalink to &quot;创建正则表达式&quot;">​</a></h2><p>可以使用字面量或构造函数来创建正则表达式</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 使用字面量</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> reg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">abc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 使用构造函数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> reg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RegExp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;abc&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h2 id="修饰符" tabindex="-1">修饰符 <a class="header-anchor" href="#修饰符" aria-label="Permalink to &quot;修饰符&quot;">​</a></h2><p>可以修改正则表达式的匹配行为</p><ul><li><strong><code>i</code></strong>：忽略大小写</li><li><strong><code>g</code></strong>：全局匹配，匹配所有符合条件的情况</li><li><strong><code>m</code></strong>：多行匹配</li></ul><p>使用修饰符：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> reg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">abc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">g</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> reg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RegExp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;abc&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;g&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h2 id="匹配规则" tabindex="-1">匹配规则 <a class="header-anchor" href="#匹配规则" aria-label="Permalink to &quot;匹配规则&quot;">​</a></h2><p><strong>符号类</strong></p><table><thead><tr><th>规则</th><th>含义</th><th>示例</th></tr></thead><tbody><tr><td>字面匹配</td><td>按照字面意义匹配自身</td><td><code>/abc/</code>，匹配字符串中的 &quot;abc&quot;</td></tr><tr><td><code>.</code></td><td>匹配除换行符 <code>\\n</code> 之外的任何单个字符</td><td><code>a.c</code>，匹配 &quot;abc&quot;、&quot;axc&quot; 等字符串</td></tr><tr><td><code>[]</code></td><td>匹配方括号内的任何一个字符</td><td><code>[abc]</code>，匹配 &quot;a&quot;、&quot;b&quot; 或 &quot;c&quot;</td></tr><tr><td><code>[]</code>指定范围</td><td>使用连字符 <code>-</code> 来指定字符范围，用于匹配连续的字符</td><td><code>[0-9]</code>，匹配任意一个数字字符<br><code>[a-z]</code>，匹配任意一个小写字母</td></tr><tr><td><code>[^]</code></td><td>否定字符，匹配不在方括号内的任何一个字符</td><td><code>[^0-9]</code>,匹配任意一个非数字字符</td></tr><tr><td><code>|</code></td><td>或者，表示匹配左侧或右侧的模式</td><td><code>cat|dog</code>，匹配 &quot;cat&quot; 或 &quot;dog&quot;</td></tr><tr><td><code>()</code></td><td>分组，将多个模式组合成一个整体，并可以对组内的内容应用量词</td><td><code>(ab)+</code>，匹配 &quot;ab&quot;、&quot;abab&quot;、&quot;ababab&quot; 等</td></tr><tr><td><code>^</code></td><td>开始锚点，用于匹配字符串的开头</td><td><code>^start</code>，匹配以 &quot;start&quot; 开头的字符串</td></tr><tr><td><code>$</code></td><td>开始锚点，用于匹配字符串的结尾</td><td><code>end$</code>，匹配以 &quot;end&quot; 结尾的字符串</td></tr></tbody></table><p><strong>量词类</strong></p><table><thead><tr><th>字符</th><th>含义</th><th>补充</th></tr></thead><tbody><tr><td><code>{}</code></td><td>量词，指定匹配次数</td><td><code>{3}</code>匹配 3 次<br><code>{1,}</code>匹配 1 次及以上<br><code>{1,3}</code>匹配 1 到 3 次</td></tr><tr><td><code>*</code></td><td>匹配零次或多次</td><td>相当于 <code>{0,}</code></td></tr><tr><td><code>+</code></td><td>匹配一次或多次</td><td>相当于 <code>{1,}</code></td></tr><tr><td><code>?</code></td><td>匹配零次或一次</td><td>相当于 <code>{0,1}</code></td></tr></tbody></table><p><strong>预定义字符类</strong></p><table><thead><tr><th>字符</th><th>含义</th><th>补充</th></tr></thead><tbody><tr><td><code>\\d</code></td><td>匹配任何数字字符</td><td>等效于 <code>[0-9]</code></td></tr><tr><td><code>\\D</code></td><td>匹配任何非数字字符</td><td>等效于 <code>[^0-9]</code></td></tr><tr><td><code>\\w</code></td><td>匹配任何单词字符，包括字母、数字和下划线</td><td>等效于 <code>[a-zA-Z0-9_]</code></td></tr><tr><td><code>\\W</code></td><td>匹配任何非单词字符</td><td>等效于 <code>[^a-zA-Z0-9_]</code></td></tr><tr><td><code>\\s</code></td><td>匹配任何空白字符，包括空格、制表符、换行符等</td><td></td></tr><tr><td><code>\\S</code></td><td>匹配任何非空白字符</td><td></td></tr><tr><td><code>\\n</code></td><td>表示换行符</td><td></td></tr><tr><td><code>\\t</code></td><td>表示制表符</td><td></td></tr><tr><td><code>\\</code></td><td>转义符，将普通字符转义为特殊字符，或者将特殊字符转义为普通字符</td><td><code>\\.</code>：匹配字符 <code>.</code><br><code>\\\\</code>：匹配字符 <code>\\</code></td></tr></tbody></table><h2 id="常用方法" tabindex="-1">常用方法 <a class="header-anchor" href="#常用方法" aria-label="Permalink to &quot;常用方法&quot;">​</a></h2><p>JavaScript 中正则表达式对象具有一些常用的方法，用于在字符串中执行匹配、替换和其他操作</p><h3 id="test-string" tabindex="-1">test(string) <a class="header-anchor" href="#test-string" aria-label="Permalink to &quot;test(string)&quot;">​</a></h3><p>用于测试字符串 str 是否匹配正则表达式。返回一个布尔值</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> reg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">abc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> result</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> reg.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;abcdef&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre></div><h3 id="match-reg" tabindex="-1">match(reg) <a class="header-anchor" href="#match-reg" aria-label="Permalink to &quot;match(reg)&quot;">​</a></h3><p>在字符串中查找匹配正则的字符串，并将匹配的字符串作为数组返回。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> res</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;abc---abc&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">match</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">abc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">g</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [&#39;abc&#39;, &#39;abc&#39;]</span></span></code></pre></div><h3 id="replace-reg-replacement" tabindex="-1">replace(reg, replacement) <a class="header-anchor" href="#replace-reg-replacement" aria-label="Permalink to &quot;replace(reg, replacement)&quot;">​</a></h3><p>语法 <code>str.replace(reg, replacement)</code>，将 str 中的 reg 字符串替换为 replacement 字符串，返回替换后的新字符串</p><ul><li>reg：可以是字符串，可以是正则表达式</li><li>replacement：可以是字符串，可以是函数 <ul><li>match：为函数时，参数 match 为每一次被匹配到的字符串</li></ul></li></ul><p>reg为字符串时，字符只会被替换一次。要执行全局搜索和替换，请使用带有 <code>g</code> 标志的正则表达式或使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll" target="_blank" rel="noreferrer"><code>replaceAll()</code></a>。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> str</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;hello, abc, abc is abcd&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> newStr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">abc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">g</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ABC&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// hello, ABC, ABC is ABCd</span></span></code></pre></div><h3 id="search-reg" tabindex="-1">search(reg) <a class="header-anchor" href="#search-reg" aria-label="Permalink to &quot;search(reg)&quot;">​</a></h3><p>搜索字符串中匹配正则表达式的第一个子字符串，并返回第一个匹配的索引位置。如果没有找到匹配，返回 <code>-1</code>。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> text</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Hello, my name is John.&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> index</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> text.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">search</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 13</span></span></code></pre></div>`,33),h=[d];function l(n,p,k,r,o,c){return i(),t("div",null,h)}const y=s(e,[["render",l]]);export{F as __pageData,y as default};
