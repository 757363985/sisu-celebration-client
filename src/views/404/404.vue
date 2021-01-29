<template>
  <i-ding-empty class="page-404" status="404" back-link="/" full-page />
</template>

<script>
import DingEmpty from '@scf/ding-empty';

export default {
  name: 'Page404',
  components: {
    'i-ding-empty': DingEmpty,
  },
};
</script>
