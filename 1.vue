<template>
  <div v-contextmenu:contextmenu>打开右键菜单</div>

  <v-contextmenu ref="contextmenu">
    <v-contextmenu-item>菜单1</v-contextmenu-item>
    <!-- 菜单分割线 -->
    <v-contextmenu-divider />
    <!-- 按钮组 -->
    <v-contextmenu-item-group>
      <v-contextmenu-item>Github</v-contextmenu-item>
      <v-contextmenu-item disabled>支付宝</v-contextmenu-item>
    </v-contextmenu-item-group>
    <!-- 子菜单 -->
    <v-contextmenu-subitem title="子菜单">
      <v-contextmenu-item>子菜单1</v-contextmenu-item>
      <v-contextmenu-item>子菜单2</v-contextmenu-item>
    </v-contextmenu-subitem>
  </v-contextmenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const { directive, Contextmenu, ContextmenuItem, ContextmenuDivider, ContextmenuSubmenu, ContextmenuGroup } =
  VContextmenu

const Example = defineComponent({
  directives: { contextmenu: directive },
  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
    [ContextmenuDivider.name]: ContextmenuDivider,
    [ContextmenuSubmenu.name]: ContextmenuSubmenu,
    [ContextmenuGroup.name]: ContextmenuGroup
  }
})

export default Example
</script>
