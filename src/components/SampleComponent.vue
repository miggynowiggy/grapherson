<template>
  <h1>{{ greeting }}</h1>
</template>
<script>
export default {
  name: 'SampleComponent',
  data: () => ({
    greeting: 'this is a greeting!'
  })
}
</script>