<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'HomeBookkeeping'|localize}}</span>
     <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{'invalid': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
         class="helper-text invalid"
         v-if="($v.email.$dirty && !$v.email.required)"
         >{{'Message_EnterEmail'|localize}}</small>
         <small
         class="helper-text invalid"
         v-else-if="($v.email.$dirty && !$v.email.email)"
         >{{'Message_EnterCorrectEmail'|localize}}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{'invalid': ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{'Password'|localize}}</label>
        <small v-if="($v.password.$dirty && !$v.password.required)" class="helper-text invalid">{{'Message_EnterPassword'|localize}}</small>
        <small v-else-if="($v.password.$dirty && !$v.password.minLength)" class="helper-text invalid">{{'Message_MinPasswordLength'|localize}}: {{$v.password.$params.minLength.min}}</small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{'invalid': ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
        >
        <label for="name">{{'Name'|localize}}</label>
        <small
         class="helper-text invalid"
         v-if="($v.name.$dirty && !$v.name.required)"
         >{{'Message_EnterName'|localize}}</small>
         <small
         class="helper-text invalid"
         v-else-if="($v.name.$dirty && !$v.name.minLength)"
         >{{'Message_MinNameLength'|localize}}: {{$v.name.$params.minLength.min}}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>{{'RulesAgree'|localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
            :class="{'disabled':!agree}"
        >
          {{'Register'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'HaveAnAccount'|localize}}?
        <router-link to='/login'>{{'Login'|localize}}!</router-link>
      </p>
      <div class="switch center">
        <label>
          English
          <input type="checkbox" v-model="localeEmpty" :key="localeEmpty">
          <span class="lever"></span>
          Русский
        </label>
      </div>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
export default {
  name: 'register',
  metaInfo() {
    return {
      title: this.$title('Register')
    }
  },
  data: ()=>({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
    name: {required, minLength: minLength(2)},
    agree: {checked: value => value}
  },
  computed: {
    localeEmpty:{
      get() {
        this.$store.state.localeEmpty
      },
      set(value) {
        value? this.$store.commit('setLocaleEmpty', 'ru-RU') : this.$store.commit('setLocaleEmpty', 'en-US')
      }
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/')
      } catch (e) {

      }
    }
  }
}
</script>
