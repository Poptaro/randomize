<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
  import strawberry from '$lib/assets/img/strawberry.png'
  import { CircleAlert } from '@lucide/svelte';

  let listName = ''

</script>


<div class="flex flex-col gap-4 items-center justify-center w-[600px]">
    <div class="flex items-center justify-center gap-2 w-full border-b-3 p-2">
      <input 
        class=" w-full mt-1 outline-none"
        placeholder="Name of list..."
        bind:value={listName}
        minlength=3
        maxlength=60
      />
    </div>
    <div class="flex justify-between items-center w-full text-offBlack">
      <div class="flex justify-center items-center gap-2">
        <CircleAlert size=18/> <p class="">{listName.length} / 60 Character(s)</p>
      </div>
      <div>

      </div>
    </div>
</div>
<div class="flex flex-row-reverse gap-2">
  <Button buttonFunction={null} variable={null}>
    Create
  </Button>
  <Button buttonFunction={() => goto('/')} variable="bg-white border-black border-2">
    Cancel
  </Button>
</div>