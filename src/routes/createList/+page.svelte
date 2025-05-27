<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
  import strawberry from '$lib/assets/img/strawberry.png'
  import { CircleAlert } from '@lucide/svelte';

  let listName = ''

</script>


<div class="flex flex-col gap-4 items-center justify-center w-[600px] border-2">
   <img on:click={() => goto('/')} src={strawberry} alt="strawberry logo" class="h-[54px] w-[44px]"/>
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
<div class="flex flex-row-reverse">
  <Button buttonFunction={null} variable={null}>
    Create
  </Button>
  <Button buttonFunction={() => goto('/')} variable="bg-white border-black">
    Cancel
  </Button>
</div>