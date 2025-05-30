<script lang="ts">
  import { Search, Plus, CircleUser } from "@lucide/svelte";
  import strawberry from "$lib/assets/img/strawberry.png"
  import Button from "$lib/components/Button.svelte"
  import { goto, invalidateAll } from "$app/navigation";
  export let data: {
    user?: {
      id: number,
      username: string
    },
    lists?: {
      id: number,
      name: string,
      description: string
    }
  }

  // const lists=[]

  //profile selection modal
  let modal = false

  async function logout() {
    try {
      await fetch(`http://localhost:5173/api/authentication/logout`, {
        method: "POST"
      })
      invalidateAll()
      return { message: "Sucessfully logged out"}
    } catch(err) {
      return { message: "Failed to logout"}
    }
  }

  

</script>

<div class="flex flex-col gap-4 items-center justify-center w-[600px]">
  {#if data.user}
    <div class="flex justify-between items-center w-full pb-[40px]">

      <button onclick={() => goto('/')} class="flex justify-between items-center hover:cursor-pointer">
        <img src={strawberry} alt="strawberry logo" class="h-[36px] w-[29px]"/>
        <p class="text-2xl pt-3">Randomize</p>
      </button>

      <div class="relative">
        <button onclick={() => {modal = !modal}} class="hover:cursor-pointer">
          <CircleUser size=32/>
        </button>
        {#if modal}
          <div class="absolute right-0 flex flex-col items-center justify-center p-2 bg-white text-[14px] border-2 rounded-md w-[98px] h-[62px]">
            <button disabled class="text-gray-400 pt-1">
              My Profile
            </button>
            <button onclick={() => logout()} class="text-red-400 pt-1 cursor-pointer">
              Sign out
            </button>
          </div>
        {:else}
          {null}
        {/if}
      </div>

    </div>
    <div class="flex justify-between w-full">
        <div>
          
        </div>
        <Button buttonFunction={() => goto('/createList')} variable={null}>
          <Plus size=18/>
          <div class="pt-1">Create List</div>
        </Button>
      </div>
    <div class="flex items-center justify-center gap-2 w-full border-b-3 p-2">
      <Search size=24/>
      <input 
        class=" w-full mt-1 outline-none"
        placeholder="Search lists by keyword..."
      />
    </div>
    {#if data.lists}
    
      {#each data.lists as list: { id: number, name: string, description: string }}
        <div class="border-2 w-full">
          <div>z
            {list.name}
          </div>
          <div>
            {list.description}
          </div>
        </div>
      {/each}
    {:else}
      <div class="flex items-center justify-center border-2 border-dashed rounded-md h-[92px] w-full">
        <p class="text-offBlack">Start by creating a list above</p>
      </div>
    {/if}

  {:else}
      No User. Log in to create a list
  {/if}
  <!-- <div class="">
    <a href='/signup' class="border-2">SIGNUP</a>
    <a href='/login' class="border-2">LOGIN</a>
    <button onclick={() => logout()}>LOGOUT</button>

  </div> -->
</div>
