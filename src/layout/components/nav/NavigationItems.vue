<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem class="space-x-10">
        <NavigationMenuLink asChild>
          <a href="https://tdcloud.cc" target="_blank" rel="noopener noreferrer">论坛</a>
        </NavigationMenuLink>
        <NavigationMenuLink>
          <a href="https://docs.tdcloud.cc" target="_blank" rel="noopener noreferrer">文档</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
