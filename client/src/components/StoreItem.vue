<template>
    <div>
        <p>The {{store.name}} is close to {{store.city}}</p>
    </div>
</template>

<script>

export default {
  name: 'storeItem',
  props: ['store']
}
</script>

<style></style>
