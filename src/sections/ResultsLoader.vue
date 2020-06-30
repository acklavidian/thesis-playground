<template>
  <div class="loader-wrapper">
    <div class="loading-icon" />
    <p>
      Building your
      <br />personalized wardrobe...
    </p>
    <iframe name="thesis-salesforce-submit-container" src="about:blank" style="display:none" />
    <form
      ref="form"
      action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
      method="POST"
      target="thesis-salesforce-submit-container"
      @submit.prevent="handleSubmit"
    >
      <input type="hidden" name="oid" value="00Df4000000lSYY" />
      <input v-model="redirect_url" type="hidden" name="retURL" />

      <input
        id="first_name"
        v-model="answers.first_name"
        maxlength="40"
        name="first_name"
        size="20"
        type="hidden"
      />
      <input
        id="last_name"
        v-model="answers.last_name"
        maxlength="40"
        name="last_name"
        size="20"
        type="hidden"
      />
      <input id="email" v-model="answers.email" maxlength="80" name="email" size="20" type="hidden" />
      <input
        id="00Nf400000UuVrC"
        v-model="answers.dob"
        name="00Nf400000UuVrC"
        size="12"
        type="hidden"
      />
      <!-- Typical Style: -->
      <input
        id="00Nf400000UuVsF"
        v-model="answers.style"
        maxlength="20"
        name="00Nf400000UuVsF"
        size="20"
        type="hidden"
      />
      <!-- Shirt Size: -->
      <input
        id="00Nf400000UuVsK"
        v-model="answers.shirt_size"
        name="00Nf400000UuVsK"
        size="20"
        type="hidden"
      />
      <!-- Pant Size: -->
      <input
        id="00Nf400000UuVsP"
        v-model="answers.pant_size"
        name="00Nf400000UuVsP"
        size="20"
        type="hidden"
      />
      <!-- Body Type: -->
      <input
        id="00Nf400000UuVsU"
        v-model="answers.body"
        maxlength="20"
        name="00Nf400000UuVsU"
        size="20"
        type="hidden"
      />
      <!-- Height: -->
      <input
        id="00Nf400000UuVsZ"
        v-model="answers.height"
        maxlength="20"
        name="00Nf400000UuVsZ"
        size="20"
        type="hidden"
      />
      <!-- Top 4483923640425: -->
      <input
        id="00Nf400000UuWgF"
        v-model="answers['4483923640425']"
        maxlength="20"
        name="00Nf400000UuWgF"
        size="20"
        type="hidden"
      />
      <!-- Bottom 4451430170729: -->
      <input
        id="00Nf400000UuWgZ"
        v-model="answers['4451430170729']"
        maxlength="20"
        name="00Nf400000UuWgZ"
        size="20"
        type="hidden"
      />
      <!-- Top 4483715530857: -->
      <input
        id="00Nf400000UuWgK"
        v-model="answers['4483715530857']"
        maxlength="20"
        name="00Nf400000UuWgK"
        size="20"
        type="hidden"
      />
      <!-- Bottom 4451429515369: -->
      <input
        id="00Nf400000UuWge"
        v-model="answers['4451429515369']"
        maxlength="20"
        name="00Nf400000UuWge"
        size="20"
        type="hidden"
      />
      <!-- Dress 4483941138537: -->
      <input
        id="00Nf400000UuWgt"
        v-model="answers['4483941138537']"
        maxlength="20"
        name="00Nf400000UuWgt"
        size="20"
        type="hidden"
      />
      <!-- Top 4549553487977: -->
      <input
        id="00Nf400000UuWgU"
        v-model="answers['4549553487977']"
        maxlength="20"
        name="00Nf400000UuWgU"
        size="20"
        type="hidden"
      />
      <!-- Bottom 4451428958313: -->
      <input
        id="00Nf400000UuWgo"
        v-model="answers['4451428958313']"
        maxlength="20"
        name="00Nf400000UuWgo"
        size="20"
        type="hidden"
      />
      <!-- Shopify Customer ID -->
      <input
        id="00Nf400000UuY0k"
        v-model="shopify_customer_id"
        maxlength="40"
        name="00Nf400000UuY0k"
        size="20"
        type="hidden"
      />
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: {
    answers: {
      type: Object,
      default: () => {}
    },
    redirect_delay: {
      type: Number,
      default: 20000
    },
    redirect_url: {
      type: String,
      default: "https://ruti.com"
    }
  },
  computed: {
    shopify_customer_id() {
      const params = new URLSearchParams(window.location.search);
      return params.get("shopify_customer_id")
        ? params.get("shopify_customer_id")
        : "";
    }
  },
  mounted() {
    this.formatDOB();
    this.triggerRedirect();
    this.grabShopifyCustomerId();
  },
  methods: {
    formatDOB() {
      const { dob } = this.answers;
      if (dob.length > 0) {
        const splitDOB = dob.split("-");
        splitDOB.push(splitDOB.shift());
        this.answers.dob = splitDOB.join("/");
      }
    },
    triggerRedirect() {
      this.zapierSubmit();
      this.salesforceSubmit();
      if (typeof thix !== 'undefined') {
        thix('event', 'quiz.complete');
      }
      if (typeof ga !== 'undefined') {
        ga('send', {
          hitType: 'event',
          eventCategory: 'quiz',
          eventAction: 'quiz.complete',
          nonInteraction: 1,
        })
      }
      setTimeout(() => {
        window.top.location = this.redirect_url;
      }, this.redirect_delay);
    },
    salesforceSubmit() {
      console.log(this.$refs.form.entries);
      this.$refs.form.submit();
    },
    zapierSubmit() {
      const body = JSON.stringify(this.answers);
      const config = {
        headers: {
          "Content-Type": "text/plain"
        }
      };
      axios
        .post(
          "https://hooks.zapier.com/hooks/catch/2837249/orj8oec",
          body,
          config
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
