<script lang="ts">
  import { formatDate } from '@/lib/helper';
  import Prompt from './Prompt.svelte';
  import ChevronRight from '../icons/ChevronRight.svelte';
  import { slide } from 'svelte/transition';
  import terminalStore from '@/stores/terminal.store';

  const { snapshot } = $terminalStore;
</script>

{#if !!$snapshot.context.commandHistory?.length}
  <div class="flex flex-col gap-y-2">
    {#each $snapshot.context.commandHistory as { text, timestamp, output }}
      <div transition:slide={{ duration: 300 }} class="flex flex-col">
        <div class="flex justify-between gap-x-2">
          <Prompt />
          <div class="w-fit flex-1 flex-wrap break-words">
            {text}
          </div>
          <span class="text-xs text-green-300">
            {formatDate(timestamp)}
          </span>
        </div>

        <p class="flex text-sm">
          <ChevronRight class="pt-1 text-green-300" />
          <span class="whitespace-pre-line">
            {output}
          </span>
        </p>
      </div>
    {/each}
  </div>
{/if}
