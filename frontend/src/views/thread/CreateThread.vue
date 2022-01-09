<template>
  <v-container>
    <v-row justify="center" content="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Create New Thread</v-card-title>
          <v-card-text>
            <v-form>
              <v-col cols="12">
                <v-text-field v-model="formData.title"
                              label="Title"
                              name="title"
                              type="text"
                              outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="formData.content"
                            name="Content"
                            label="content"
                            value=""
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-radio-group v-model="formData.channel_id">
                  <v-radio
                      v-for="channel in channels"
                      :label="`${channel.name}`"
                      :value="channel.id"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn ripple color="green" class="text-white" @click="createThread()">
              submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {channelsListRequest} from "@/requests/Channel";
import {createNewThreadRequest} from "@/requests/Threads";

export default {
  name: "CreateThread",
  data: () => ({
    channels: null,
    formData: {
      title: null,
      content: null,
      channel_id: null
    }
  }),
  methods: {
    fetchChannelsList() {
      channelsListRequest().then(res => {
        this.channels = res.data
      })
    },
    createThread() {
      createNewThreadRequest(this.formData).then(res => {
        this.$router.push('/');
      })
    }
  },
  mounted() {
    this.fetchChannelsList();
  }
}
</script>

<style scoped>

</style>