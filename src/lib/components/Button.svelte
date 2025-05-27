<script lang="ts">

	export let buttonFunction
  export let variable


</script>

<button on:click={buttonFunction} class={`flex items-center justify-center hover:cursor-pointer`}>
  <div  class={`flex items-center justify-center bg-[#F8A128] w-[156px] h-[48px] p-4 rounded-full px-4 ${variable ? variable : ''}`}>
    <slot />
  </div>
</button>