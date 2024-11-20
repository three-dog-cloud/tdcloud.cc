<script setup lang="ts" generic="T">
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandSeparator
} from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib'
import type { PaginationSearchItemOption } from '@/types'

interface DataTableFacetedFilter {
  title?: string
  options: PaginationSearchItemOption[]
  selected: string[] | number[]
}

const props = defineProps<DataTableFacetedFilter>()

const emits = defineEmits<{
  'update:setSelected': [string | number]
}>()

const filterFunction = (list: PaginationSearchItemOption[], term: string) => {
  return list.filter((item) => item.label.toLowerCase()?.includes(term.toLowerCase()))
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" size="sm" class="h-8 border-dashed w-full md:w-auto">
        <icon-radix-icons:plus-circled class="mr-2 h-4 w-4" />
        {{ title }}
        <template v-if="props.selected.length > 0">
          <Separator orientation="vertical" class="mx-2 h-4" />
          <Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
            {{ props.selected.length }} 已选择
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Badge
              v-if="selected.length > 2"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ selected.length }} selected
            </Badge>

            <template v-else>
              <Badge
                v-for="option in options.filter((option) =>
                  props.selected.some((v) => v == option.value)
                )"
                :key="option.value"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                {{ option.label }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0" align="start">
      <Command
        :modelValue="props.selected"
        :filter-function="
          (list: any[], term: string) => {
            list = filterFunction(list, term)
            return list
          }
        "
      >
        <CommandInput :placeholder="title" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in props.options"
              :key="option.value"
              :value="option"
              @select="
                () => {
                  emits('update:setSelected', option.value)
                }
              "
            >
              <div
                :class="
                  cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                    props.selected.some((v) => v === option.value)
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible'
                  )
                "
              >
                <icon-radix-icons-check :class="cn('h-4 w-4')" />
              </div>
              <span>{{ option.label }}</span>
            </CommandItem>
          </CommandGroup>

          <template v-if="props.selected.length > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                :value="{ label: 'Clear Filters' }"
                class="justify-center text-center"
                @select="emits('update:setSelected', 0)"
              >
                Clear Filters
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
