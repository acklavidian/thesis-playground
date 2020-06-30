<template>
  <div class="quiz-close" @click="dismiss">
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.0625 16L24.5 9.625L25.8125 8.3125C26 8.125 26 7.8125 25.8125 7.5625L24.4375 6.1875C24.1875 6 23.875 6 23.6875 6.1875L16 13.9375L8.25 6.1875C8.0625 6 7.75 6 7.5 6.1875L6.125 7.5625C5.9375 7.8125 5.9375 8.125 6.125 8.3125L13.875 16L6.125 23.75C5.9375 23.9375 5.9375 24.25 6.125 24.5L7.5 25.875C7.75 26.0625 8.0625 26.0625 8.25 25.875L16 18.125L22.375 24.5625L23.6875 25.875C23.875 26.0625 24.1875 26.0625 24.4375 25.875L25.8125 24.5C26 24.25 26 23.9375 25.8125 23.75L18.0625 16Z"
        fill="#111111"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    current_step: {
      type: Number,
      default: 0
    }
  },
  methods: {
    dismiss() {
      if (typeof thix !== 'undefined') {
        thix('event', `quiz.q${this.current_step}.exit`)
      }
      if (typeof ga !== 'undefined') {
        ga('send', {
          hitType: 'event',
          eventCategory: 'quiz',
          eventAction: `quiz.q${this.current_step}.exit`,
        })
      }
      parent.__thesisPopupToggle();
    },
  },
};
</script>
