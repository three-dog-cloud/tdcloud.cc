<script setup lang="ts">
import { Discourse } from '@/api/personal'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { h, ref } from 'vue'
import { toast } from 'vue-sonner'
import { Icon } from '@iconify/vue'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { cn } from '@/lib'

const data = ref<Discourse.IDiscourseResponse>({
  time_period: 0,
  requirements_met: false,
  requirements_lost: false,
  trust_level_locked: false,
  on_grace_period: false,
  days_visited: 0,
  min_days_visited: 0,
  num_topics_replied_to: 0,
  min_topics_replied_to: 0,
  topics_viewed: 0,
  min_topics_viewed: 0,
  posts_read: 0,
  min_posts_read: 0,
  topics_viewed_all_time: 0,
  min_topics_viewed_all_time: 0,
  posts_read_all_time: 0,
  min_posts_read_all_time: 0,
  num_flagged_posts: 0,
  max_flagged_posts: 0,
  num_flagged_by_users: 0,
  max_flagged_by_users: 0,
  num_likes_given: 0,
  min_likes_given: 0,
  num_likes_received: 0,
  min_likes_received: 0,
  num_likes_received_days: 0,
  min_likes_received_days: 0,
  num_likes_received_users: 0,
  min_likes_received_users: 0,
  penalty_counts: {
    silenced: 0,
    suspended: 0,
    total: 0
  },
  trust_level: 0,
  name: '',
  username: ''
})

const init = () => {
  Discourse.getDiscourse()
    .then((res) => {
      data.value = res
    })
    .catch((err) => {
      toast.error(err.error)
    })
}

init()

const isRequirementMet = (val: boolean) => {
  return val
    ? h(Icon, { icon: 'material-symbols:check-rounded', class: 'text-green-500' })
    : h(Icon, { icon: 'material-symbols:close-rounded', class: 'text-red-500' })
}
</script>

<template>
  <Card>
    <CardHeader :class="cn('dark:bg-gray-900 bg-gray-100 rounded-t-lg')">
      <CardTitle>{{ data.name }} - 信任级别 3 的要求</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="mt-4">在过去 100 天内：</div>
      <Table>
        <TableCaption>
          <div class="flex items-center justify-center space-x-2">
            <component :is="isRequirementMet(data.requirements_met)" />
            <div>{{ data.requirements_met ? '符合' : '不符合' }} 信任级别 3 的要求.</div>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead> </TableHead>
            <TableHead> </TableHead>
            <TableHead>值</TableHead>
            <TableHead>要求</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell :class="cn('font-medium')">
              <n-ellipsis class="max-w-[100px] min-w-[30px]">回复的话题</n-ellipsis>
            </TableCell>
            <TableCell :class="cn('w-[10px]')">
              <component
                :is="isRequirementMet(data.num_topics_replied_to >= data.min_topics_replied_to)"
              />
            </TableCell>
            <TableCell>{{ data.num_topics_replied_to }}</TableCell>
            <TableCell>{{ data.min_topics_replied_to }}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell :class="cn('font-medium')">
              <n-ellipsis class="max-w-[100px] min-w-[30px]">浏览的话题</n-ellipsis>
            </TableCell>
            <TableCell :class="cn('w-[10px]')">
              <component :is="isRequirementMet(data.topics_viewed >= data.min_topics_viewed)" />
            </TableCell>
            <TableCell>{{ data.topics_viewed }}</TableCell>
            <TableCell>{{ data.min_topics_viewed }}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell :class="cn('font-medium')">
              <n-ellipsis class="max-w-[100px] min-w-[30px]">浏览的话题（所有时间）</n-ellipsis>
            </TableCell>
            <TableCell :class="cn('w-[10px]')">
              <component
                :is="
                  isRequirementMet(data.topics_viewed_all_time >= data.min_topics_viewed_all_time)
                "
              />
            </TableCell>
            <TableCell>{{ data.topics_viewed_all_time }}</TableCell>
            <TableCell>{{ data.min_topics_viewed_all_time }}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell :class="cn('font-medium')">
              <n-ellipsis class="max-w-[100px] min-w-[30px]">已读帖子</n-ellipsis>
            </TableCell>
            <TableCell :class="cn('w-[10px]')">
              <component :is="isRequirementMet(data.posts_read >= data.min_posts_read)" />
            </TableCell>
            <TableCell>{{ data.posts_read }}</TableCell>
            <TableCell>{{ data.min_posts_read }}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell :class="cn('font-medium')">
              <n-ellipsis class="max-w-[100px] min-w-[30px]">帖子阅读：唯一日期</n-ellipsis>
            </TableCell>
            <TableCell :class="cn('w-[10px]')">
              <component :is="isRequirementMet(data.days_visited >= data.min_days_visited)" />
            </TableCell>
            <TableCell>{{ data.days_visited }}%({{ data.days_visited }} / 100 天数)</TableCell>
            <TableCell>{{ data.min_days_visited }}%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell :class="cn('font-medium')">
              <n-ellipsis class="max-w-[100px] min-w-[30px]">已读帖子（所有时间）</n-ellipsis>
            </TableCell>
            <TableCell :class="cn('w-[10px]')">
              <component
                :is="isRequirementMet(data.posts_read_all_time >= data.min_posts_read_all_time)"
              />
            </TableCell>
            <TableCell>{{ data.posts_read_all_time }}</TableCell>
            <TableCell>{{ data.min_posts_read_all_time }}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell :class="cn('font-medium')">
              <n-ellipsis class="max-w-[100px] min-w-[30px]">被举报的帖子</n-ellipsis>
            </TableCell>
            <TableCell :class="cn('w-[10px]')">
              <component :is="isRequirementMet(data.num_flagged_posts <= data.max_flagged_posts)" />
            </TableCell>
            <TableCell>{{ data.num_flagged_posts }}</TableCell>
            <TableCell> ≤ {{ data.max_flagged_posts }}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell :class="cn('font-medium')">
              <n-ellipsis class="max-w-[100px] min-w-[30px]">发起举报的用户</n-ellipsis>
            </TableCell>
            <TableCell :class="cn('w-[10px]')">
              <component
                :is="isRequirementMet(data.num_flagged_by_users <= data.max_flagged_by_users)"
              />
            </TableCell>
            <TableCell>{{ data.num_flagged_by_users }}</TableCell>
            <TableCell> ≤ {{ data.max_flagged_by_users }}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell :class="cn('font-medium')">
              <n-ellipsis class="max-w-[100px] min-w-[30px]">点赞</n-ellipsis>
            </TableCell>
            <TableCell :class="cn('w-[10px]')">
              <component :is="isRequirementMet(data.num_likes_given >= data.min_likes_given)" />
            </TableCell>
            <TableCell>{{ data.num_likes_given }}</TableCell>
            <TableCell>{{ data.min_likes_given }}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell :class="cn('font-medium')">
              <n-ellipsis class="max-w-[100px] min-w-[30px]">获赞</n-ellipsis>
            </TableCell>
            <TableCell :class="cn('w-[10px]')">
              <component
                :is="isRequirementMet(data.num_likes_received >= data.min_likes_received)"
              />
            </TableCell>
            <TableCell>{{ data.num_likes_received }}</TableCell>
            <TableCell>{{ data.min_likes_received }}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell :class="cn('font-medium')">
              <n-ellipsis class="max-w-[100px] min-w-[30px]">获赞：单日最高数量</n-ellipsis>
            </TableCell>
            <TableCell :class="cn('w-[10px]')">
              <component
                :is="isRequirementMet(data.num_likes_received_days >= data.min_likes_received_days)"
              />
            </TableCell>
            <TableCell>{{ data.num_likes_received_days }}</TableCell>
            <TableCell>{{ data.min_likes_received_days }}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell :class="cn('font-medium')">
              <n-ellipsis class="max-w-[100px] min-w-[30px]">获赞：点赞用户数量</n-ellipsis>
            </TableCell>
            <TableCell :class="cn('w-[10px]')">
              <component
                :is="
                  isRequirementMet(data.num_likes_received_users >= data.min_likes_received_users)
                "
              />
            </TableCell>
            <TableCell>{{ data.num_likes_received_users }}</TableCell>
            <TableCell>{{ data.min_likes_received_users }}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell :class="cn('font-medium')">
              <n-ellipsis class="max-w-[100px] min-w-[30px]">被禁言（过去 6 个月）</n-ellipsis>
            </TableCell>
            <TableCell :class="cn('w-[10px]')">
              <component :is="isRequirementMet(data.penalty_counts.silenced >= 0)" />
            </TableCell>
            <TableCell>{{ data.penalty_counts.silenced }}</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell :class="cn('font-medium')">
              <n-ellipsis class="max-w-[100px] min-w-[30px]">被封禁（过去 6 个月）</n-ellipsis>
            </TableCell>
            <TableCell :class="cn('w-[10px]')">
              <component :is="isRequirementMet(data.penalty_counts.suspended >= 0)" />
            </TableCell>
            <TableCell>{{ data.penalty_counts.suspended }}</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
