<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  export let form
</script>

<div>
  <form method="POST" use:enhance={() => {
    return async ({ update }) => {
      await update()
      goto('/')
    }
  }}>
    <label class="border-2">
      Username
      <input name='username' class="border-2">
    </label>
    <label class="border-2">
      Password
      <input name='password' class="border-2">
    </label>
    <button>Submit </button>
  </form>
</div>
<div class="text-red-400">
  {#if form?.message}
  <p>{form.message}</p>
  {/if}
</div>