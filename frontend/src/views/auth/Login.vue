<template>
  <v-container
      fluid
  >
    <v-row
        align="center"
        justify="center"
    >
      <v-col
          cols="12"
          sm="8"
          md="4"
      >
        <v-card class="elevation-12">
          <v-card-header
              color="primary"
              dark
              flat
          >
            <v-card-title>login</v-card-title>
          </v-card-header>
          <v-card-text>
            <v-form>
              <div>
                <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-email"
                    type="email"
                    v-model="email"
                    :error="errors.email"
                    :error-messages="errors.email"
                ></v-text-field>

                <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    :error="errors.password"
                ></v-text-field>
              </div>
            </v-form>
            <div v-show="isLoading">
              <v-progress-circular
                  :size="70"
                  :width="7"
                  color="purple"
                  indeterminate
              ></v-progress-circular>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="sendLoginRequest">login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>

<script>
import {checkAuth, loginRequest} from "@/requests/Auth";

export default {
  name: "Login",
  data: () => ({
    isLoading: false,
    email: null,
    password: null,
    errors: {
      email: null,
      password: null
    },
  }),
  methods: {
    sendLoginRequest() {
      this.isLoading = true;
      loginRequest({email: this.email, password: this.password}).then(res => {
        this.isLoading = false;
        localStorage.setItem('isAuth','true');
        this.$router.push('/');

      }).catch(err => {
        if (err.status === 422) {
          this.errors = err.response.data.errors;
          this.isLoading = false;
        }
      });

    }
  }
}
</script>