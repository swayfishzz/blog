import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8048b864.js";const p="/md/vue3-contextmenu.png",o="/md/v-contextmenu.png",v=JSON.parse('{"title":"Vue3 右键菜单","description":"","frontmatter":{},"headers":[],"relativePath":"package/vue3-contextmenu.md","filePath":"package/vue3-contextmenu.md"}'),e={name:"package/vue3-contextmenu.md"},t=l('<h1 id="vue3-右键菜单" tabindex="-1">Vue3 右键菜单 <a class="header-anchor" href="#vue3-右键菜单" aria-label="Permalink to &quot;Vue3 右键菜单&quot;">​</a></h1><p>用于 Vue3 项目的右键菜单库，下面将介绍两款此类型的库：</p><ul><li><a href="https://imengyu.top/pages/vue3-context-menu-docs/" target="_blank" rel="noreferrer">vue3-context-menu</a></li><li><a href="https://www.npmjs.com/package/v-contextmenu" target="_blank" rel="noreferrer">v-contextmenu</a></li></ul><h2 id="vue3-context-menu" tabindex="-1">vue3-context-menu <a class="header-anchor" href="#vue3-context-menu" aria-label="Permalink to &quot;vue3-context-menu&quot;">​</a></h2><p>效果图</p><img src="'+p+`" alt="vue3-contextmenu"><h3 id="开始" tabindex="-1">开始 <a class="header-anchor" href="#开始" aria-label="Permalink to &quot;开始&quot;">​</a></h3><p>安装 vue3-context-menu</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@imengyu/vue3-context-menu</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@imengyu/vue3-context-menu</span></span></code></pre></div><p>在项目中引入</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// main.js</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@imengyu/vue3-context-menu/lib/vue3-context-menu.css&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ContextMenu </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@imengyu/vue3-context-menu&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(ContextMenu)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// main.js</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@imengyu/vue3-context-menu/lib/vue3-context-menu.css&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ContextMenu </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@imengyu/vue3-context-menu&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(ContextMenu)</span></span></code></pre></div><h3 id="使用示例" tabindex="-1">使用示例 <a class="header-anchor" href="#使用示例" aria-label="Permalink to &quot;使用示例&quot;">​</a></h3><p>此示例使用函数形式配置右键菜单，它还支持<a href="https://imengyu.top/pages/vue3-context-menu-docs/api/ContextMenu.html" target="_blank" rel="noreferrer">组件形式</a></p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">&lt;!-- 使用 .prevent 修饰符阻止默认事件 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">@contextmenu.prevent</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;openMenu&quot;</span><span style="color:#E1E4E8;">&gt;打开右键菜单&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ContextMenu </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@imengyu/vue3-context-menu&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">openMenu</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  ContextMenu.</span><span style="color:#B392F0;">showContextMenu</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    x: e.x,</span></span>
<span class="line"><span style="color:#E1E4E8;">    y: e.y,</span></span>
<span class="line"><span style="color:#E1E4E8;">    closeWhenScroll: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 鼠标滚轮滚动时，是否关闭菜单，默认 true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">onClose</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(item), </span><span style="color:#6A737D;">// 关闭回调</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 使用 items 配置菜单项</span></span>
<span class="line"><span style="color:#E1E4E8;">    items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        label: </span><span style="color:#9ECBFF;">&#39;你好&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// iconFontClass: &#39;your-font-class&#39;, // 可以使用字体图标类名</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">onClick</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">alert</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;你好！&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        label: </span><span style="color:#9ECBFF;">&#39;菜单项1&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        disabled: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 禁用</span></span>
<span class="line"><span style="color:#E1E4E8;">        divided: </span><span style="color:#9ECBFF;">&#39;down&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 下方显示分割线</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        label: </span><span style="color:#9ECBFF;">&#39;菜单项3&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        children: [{ label: </span><span style="color:#9ECBFF;">&#39;3-1&#39;</span><span style="color:#E1E4E8;"> }, { label: </span><span style="color:#9ECBFF;">&#39;3-2&#39;</span><span style="color:#E1E4E8;"> }, { label: </span><span style="color:#9ECBFF;">&#39;3-3&#39;</span><span style="color:#E1E4E8;"> }]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">&lt;!-- 使用 .prevent 修饰符阻止默认事件 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">@contextmenu.prevent</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;openMenu&quot;</span><span style="color:#24292E;">&gt;打开右键菜单&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ContextMenu </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@imengyu/vue3-context-menu&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">openMenu</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">e</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  ContextMenu.</span><span style="color:#6F42C1;">showContextMenu</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    x: e.x,</span></span>
<span class="line"><span style="color:#24292E;">    y: e.y,</span></span>
<span class="line"><span style="color:#24292E;">    closeWhenScroll: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 鼠标滚轮滚动时，是否关闭菜单，默认 true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">onClose</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">item</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(item), </span><span style="color:#6A737D;">// 关闭回调</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 使用 items 配置菜单项</span></span>
<span class="line"><span style="color:#24292E;">    items: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        label: </span><span style="color:#032F62;">&#39;你好&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// iconFontClass: &#39;your-font-class&#39;, // 可以使用字体图标类名</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">onClick</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">alert</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;你好！&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        label: </span><span style="color:#032F62;">&#39;菜单项1&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        disabled: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 禁用</span></span>
<span class="line"><span style="color:#24292E;">        divided: </span><span style="color:#032F62;">&#39;down&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 下方显示分割线</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        label: </span><span style="color:#032F62;">&#39;菜单项3&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        children: [{ label: </span><span style="color:#032F62;">&#39;3-1&#39;</span><span style="color:#24292E;"> }, { label: </span><span style="color:#032F62;">&#39;3-2&#39;</span><span style="color:#24292E;"> }, { label: </span><span style="color:#032F62;">&#39;3-3&#39;</span><span style="color:#24292E;"> }]</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="v-contextmenu" tabindex="-1">v-contextmenu <a class="header-anchor" href="#v-contextmenu" aria-label="Permalink to &quot;v-contextmenu&quot;">​</a></h2><p>效果图</p><img src="`+o+`" alt="v-contextmenu"><h3 id="开始-1" tabindex="-1">开始 <a class="header-anchor" href="#开始-1" aria-label="Permalink to &quot;开始&quot;">​</a></h3><p>安装 v-contextmenu</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v-contextmenu</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v-contextmenu</span></span></code></pre></div><p>在项目中引入</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> contextmenu </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;v-contextmenu&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;v-contextmenu/dist/themes/default.css&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(contextmenu)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> contextmenu </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;v-contextmenu&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;v-contextmenu/dist/themes/default.css&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(contextmenu)</span></span></code></pre></div><h3 id="使用示例-1" tabindex="-1">使用示例 <a class="header-anchor" href="#使用示例-1" aria-label="Permalink to &quot;使用示例&quot;">​</a></h3><p>与 vue3-context-menu 不同的是：</p><ul><li>支持横向菜单按钮组</li><li>不支持函数形式配置</li></ul><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-contextmenu:contextmenu</span><span style="color:#E1E4E8;">&gt;打开右键菜单&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">v-contextmenu</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;contextmenu&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">v-contextmenu-item</span><span style="color:#E1E4E8;">&gt;菜单1&lt;/</span><span style="color:#85E89D;">v-contextmenu-item</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!-- 菜单分割线 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">v-contextmenu-divider</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!-- 按钮组 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">v-contextmenu-item-group</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">v-contextmenu-item</span><span style="color:#E1E4E8;">&gt;Github&lt;/</span><span style="color:#85E89D;">v-contextmenu-item</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">v-contextmenu-item</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">disabled</span><span style="color:#E1E4E8;">&gt;支付宝&lt;/</span><span style="color:#85E89D;">v-contextmenu-item</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">v-contextmenu-item-group</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!-- 子菜单 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">v-contextmenu-subitem</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">title</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;子菜单&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">v-contextmenu-item</span><span style="color:#E1E4E8;">&gt;子菜单1&lt;/</span><span style="color:#85E89D;">v-contextmenu-item</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">v-contextmenu-item</span><span style="color:#E1E4E8;">&gt;子菜单2&lt;/</span><span style="color:#85E89D;">v-contextmenu-item</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">v-contextmenu-subitem</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">v-contextmenu</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;ts&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineComponent } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">directive</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Contextmenu</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">ContextmenuItem</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">ContextmenuDivider</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">ContextmenuSubmenu</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">ContextmenuGroup</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> VContextmenu</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Example</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineComponent</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  directives: { contextmenu: directive },</span></span>
<span class="line"><span style="color:#E1E4E8;">  components: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    [Contextmenu.name]: Contextmenu,</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ContextmenuItem.name]: ContextmenuItem,</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ContextmenuDivider.name]: ContextmenuDivider,</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ContextmenuSubmenu.name]: ContextmenuSubmenu,</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ContextmenuGroup.name]: ContextmenuGroup</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> Example</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-contextmenu:contextmenu</span><span style="color:#24292E;">&gt;打开右键菜单&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">v-contextmenu</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;contextmenu&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">v-contextmenu-item</span><span style="color:#24292E;">&gt;菜单1&lt;/</span><span style="color:#22863A;">v-contextmenu-item</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!-- 菜单分割线 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">v-contextmenu-divider</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!-- 按钮组 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">v-contextmenu-item-group</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">v-contextmenu-item</span><span style="color:#24292E;">&gt;Github&lt;/</span><span style="color:#22863A;">v-contextmenu-item</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">v-contextmenu-item</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">disabled</span><span style="color:#24292E;">&gt;支付宝&lt;/</span><span style="color:#22863A;">v-contextmenu-item</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">v-contextmenu-item-group</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!-- 子菜单 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">v-contextmenu-subitem</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">title</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;子菜单&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">v-contextmenu-item</span><span style="color:#24292E;">&gt;子菜单1&lt;/</span><span style="color:#22863A;">v-contextmenu-item</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">v-contextmenu-item</span><span style="color:#24292E;">&gt;子菜单2&lt;/</span><span style="color:#22863A;">v-contextmenu-item</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">v-contextmenu-subitem</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">v-contextmenu</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;ts&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineComponent } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">directive</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">Contextmenu</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">ContextmenuItem</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">ContextmenuDivider</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">ContextmenuSubmenu</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">ContextmenuGroup</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> VContextmenu</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Example</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineComponent</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  directives: { contextmenu: directive },</span></span>
<span class="line"><span style="color:#24292E;">  components: {</span></span>
<span class="line"><span style="color:#24292E;">    [Contextmenu.name]: Contextmenu,</span></span>
<span class="line"><span style="color:#24292E;">    [ContextmenuItem.name]: ContextmenuItem,</span></span>
<span class="line"><span style="color:#24292E;">    [ContextmenuDivider.name]: ContextmenuDivider,</span></span>
<span class="line"><span style="color:#24292E;">    [ContextmenuSubmenu.name]: ContextmenuSubmenu,</span></span>
<span class="line"><span style="color:#24292E;">    [ContextmenuGroup.name]: ContextmenuGroup</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> Example</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,26),c=[t];function r(E,y,i,u,m,d){return n(),a("div",null,c)}const F=s(e,[["render",r]]);export{v as __pageData,F as default};
