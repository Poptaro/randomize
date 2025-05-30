<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
  export let form

  let error = null



</script>

<div class="flex flex-col w-[600px]">
  <div class="pb-8">
    Sign into your account
  </div>
  <form method="POST" use:enhance={() => {
    error = null

    return async ({ result, update }) => {
      await update()
      if(result.type === "success") {
        goto('/')
      } else {
        // @ts-ignore
        result.data.message ? error = result.data.message : error = null
      }
    }
  }} class="flex flex-col">
  <div class="flex flex-col gap-8 pb-8">
    <input 
      name='username' 
      class="outline-none w-full border-b-2 px-2" 
      placeholder="Username" 
      required>
    <input 
      name='password' 
      class="outline-none w-full border-b-2 px-2" 
      placeholder="Password"
      required>
  </div>
  <div class="text-red-400 underline">
    forgoto passwordo???
  </div>
  <button>
    <a href="/signup" class="text-blue-300">Don't have na account? Register for an account</a>
  </button>
  <Button buttonFunction={null} variable={"w-[400px]"}>Sign In</Button>
  </form>
</div>
<div class="text-red-400">
  {#if form?.message}
  <p>{form.message}</p>
  {/if}
</div>