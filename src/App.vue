<template>
  <div
   :data-ga="typeofGa"
   :data-gtag="typeofGtag"
  >
    <CloseQuiz :current_step="results.length"/>
    <ThesisForm>
      <template #loaderView>
        <EmailForm 
          :current_step="results.length"
          :answers="tagAnswers()" 
        />
      </template>
      <template #resultsView>
        <ResultsLoader
          :redirect_url="redirectURL()"
          :redirect_delay="quizData.results.redirect_delay"
          :answers="results[results.length - 1]"
        />
      </template>
    </ThesisForm>
  </div>
</template>

<script>
import EmailForm from "./components/inputs/EmailForm.vue";
import CloseQuiz from "./components/CloseQuiz.vue";
import ResultsLoader from "./sections/ResultsLoader.vue";

export default {
  components: {
    EmailForm,
    ResultsLoader,
    CloseQuiz,
  },
  data() {
    return {
      taggedAnswers: {},
      typeofGa: typeof ga,
      typeofGtag: typeof gtag,
    };
  },
  computed: {
    quizData() {
      return this.$store.getters.QUIZDATA;
    },
    results() {
      return this.$store.getters.RESULTS;
    },
    advanceQuizData() {
      return this.$store.getters.ADVANCE_QUIZ_DATA
    },
  },
  created() {
    this.$store.dispatch("INITIALIZE_STORE", this.$quizData);
  },
  methods: {
    // Creates an array of objects containing question ids and their corresponding answers.
    // Also stores any additionalData associated with choices if hasAdditionalData is set to true.
    tagAnswers() {
      const { sequences } = this.quizData;
      // eslint-disable-next-line no-return-assign
      this.taggedAnswers = sequences.reduce(
        (obj, q, i) => ((obj[q.id] = this.results[i].content), obj),
        {}
      );
      return this.taggedAnswers;
    },

    // Given a question from sequences array and an answer index from the results array,
    // return the data value of selected answer if hasAdditionalData is set to true for that question
    getData(q, i) {
      return this.taggedAnswers
        ? this.quizData.sequences.find((sequence) => sequence.id === q.id)
            .questions[0].choices[i].data
        : null;
    },

    // Builds the redirect url based on quiz answers and data from corresponding data from the redirectURL object.
    redirectURL() {
      const baseURL = this.quizData.redirectURL.style[this.taggedAnswers.style];
      const outfitParams = ["outfit1", "outfit2", "outfit3", "outfit4"]
        .map((outfit) => this.checkParam(outfit))
        .flat()
        .map((outfit) => outfit.name)
        .join(",");
      return `${baseURL}${
        outfitParams.length > 0 ? "?items=" : ""
      }${outfitParams}`;
    },

    checkParam(outfit) {
      return this.taggedAnswers[outfit] !== "No"
        ? this.quizData.redirectURL[outfit]
        : [];
    },
  },
};
</script>
