<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  export let form

  let error = null


</script>

<div>
  <form method="POST" use:enhance={() => {
    error = null

    return async ({ result, update }) => {
      await update()
      console.log(result)
      if(result.type === "success") {
        goto('/')
      } else {
        result.data.message ? error = result.data.message : error = null
      }
    }
  }}>
    <label class="border-2">
      Username
      <input name='username' class="border-2" required>
    </label>
    <label class="border-2">
      Password
      <input name='password' class="border-2" required>
    </label>
    <button>Submit</button>
  </form>
</div>
<div class="text-red-400">
  {#if form?.message}
  <p>{form.message}</p>
  {/if}
</div>