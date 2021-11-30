<template>
  <div>
    <Loader v-if="loading "/>
    <div v-else class="app-main-layout">
      
      <Navbar @openClose="isOpen = !isOpen"/>
      <Sidebar v-model="isOpen"/>

      <main class="app-content" :class="{'full': !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn" v-if="this.$route.path != `/record`">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons" data-position="left" v-tooltip="`Создать новую запись`">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';
import Loader from '../components/app/Loader.vue';
import messages from '@/utils/messages'

export default {
  name: 'main-layout',
  data: ()=> ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }   

    this.loading = false
  },
  components: {
    Navbar, Sidebar, Loader
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      console.log(fbError)
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>
