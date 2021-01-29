<template>
  <i-ding-empty status="403" full-page />
</template>

<script>
import DingEmpty from '@scf/ding-empty';

export default {
  name: 'NotInPrivilege',
  components: {
    'i-ding-empty': DingEmpty,
  },
};
</script>
