<template>
  <div class="email-form question">
    <div class="question-content">
      <h3 class="tf-title">Just one more step to receive $50 off your order.</h3>
      <p class="tf-lead">Please share the following so we can update your profile's preferences:</p>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="first_name">First Name</label>
          <input
            id="first_name"
            v-model="user.first_name"
            maxlength="40"
            name="first_name"
            size="20"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.first_name.$error }"
          />
          <div
            v-visible="submitted && !$v.user.first_name.$required"
            class="invalid-feedback"
          >Please enter your first name</div>
        </div>

        <div class="form-group">
          <label for="last_name">Last Name</label>
          <input
            id="last_name"
            v-model="user.last_name"
            maxlength="40"
            name="last_name"
            size="20"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.last_name.$error }"
          />
          <div
            v-visible="submitted && !$v.user.last_name.$required"
            class="invalid-feedback"
          >Please enter your last name</div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="user.email"
            maxlength="80"
            name="email"
            size="20"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.email.$error }"
          />
          <div v-visible="submitted && $v.user.email.$error" class="invalid-feedback">
            <span v-if="!$v.user.email.required">Please enter your email address</span>
            <span v-if="!$v.user.email.email">Please enter a valid email address</span>
          </div>
        </div>

        <div class="form-group">
          <label for="00Nf400000UuVrC">Birthday (Optional)</label>
          <span class="dateInput dateOnlyInput">
            <input
              id="00Nf400000UuVrC"
              v-model="user.dob"
              class="dob"
              name="00Nf400000UuVrC"
              size="12"
              type="date"
            />
          </span>
        </div>

        <div class="form-group">
          <button class="tf-btn custom-submit">See Results</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  props: {
    answers: {
      type: Object,
      default: () => {}
    },
    current_step: {
      type: Number,
      default: 0
    }
  },
  data() {
    const {
      style,
      size,
      body,
      height,
      outfit1,
      outfit2,
      outfit3,
      outfit4
    } = this.answers;
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        dob: "",
        shirt_size: size[0].selection,
        pant_size: size[1].selection,
        4483923640425: outfit1,
        4451430170729: outfit1,
        4483941138537: outfit2,
        4483715530857: outfit3,
        4451429515369: outfit3,
        4549553487977: outfit4,
        4451428958313: outfit4,
        style,
        body,
        height
      },
      submitted: false,
      error: false
    };
  },
  mounted() {
    if (typeof thix !== 'undefined') {
      thix('event', 'quiz.form.load')
    }
    if (typeof ga !== 'undefined') {
      ga('send', {
        hitType: 'event',
        eventCategory: 'quiz',
        eventAction: 'quiz.form.load',
        nonInteraction: 1,
      })
    }
  },
  validations: {
    user: {
      first_name: { required },
      last_name: { required },
      email: { required, email }
    }
  },

  methods: {
    formData(field) {
      return this.answers[field].a.content;
    },

    handleSubmit() {
      this.submitted = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (typeof thix !== 'undefined') {
          thix('event', 'quiz.form.submit');
        }
        if (typeof ga !== 'undefined') {
          ga('send', {
            hitType: 'event',
            eventCategory: 'quiz',
            eventAction: 'quiz.form.submit',
          })
        }
        if (typeof fbq !== 'undefined') {
          fbq('trackCustom', 'quiz.form.submit', {
            event_category: 'quiz'
          })
        }

        // append form data to quiz results
        this.$store.dispatch("/results/APPEND_TO_RESULTS", this.user);
        // set quiz status to loaded and completed to get to the results page
        this.$store.dispatch("SET_LOADED");
        this.$store.dispatch("QUIZ_COMPLETED");
      } else {
        this.error = true;
      }
    }
  }
};
</script>
