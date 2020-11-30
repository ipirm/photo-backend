<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="isPageShown" :key="1">
        <Header />
        <div class="text-page">
          <div class="text-page_title">
            <h1>{{ h1 }}</h1>
            <span> Добавлено 21.06.2020 • Обновлено 08.11.2020 </span>
          </div>
          <h2>Заголовок H1</h2>
          <p>
            Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt,
            explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut
            odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione
            voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum,
            quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam
            eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat
            voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
            corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
            Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse,
            quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo
            voluptas nulla pariatur? At vero eos et accusamus et iusto odio
            dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti
            atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati
            cupiditate non provident, similique sunt in culpa, qui officia deserunt
            mollitia animi, id est laborum et dolorum fuga.
          </p>
          <img class="text-page_image" src="@/static/images/90.png" />
          <span class="text-page_image_span"> Подпись фотографии </span>
          <h2>Заголовок H1</h2>
          <p>
            Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt,
            explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut
            odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione
            voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum,
            quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam
            eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat
            voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
            corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
            Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse,
            quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo
            voluptas nulla pariatur? At vero eos et accusamus et iusto odio
            dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti
            atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati
            cupiditate non provident, similique sunt in culpa, qui officia deserunt
            mollitia animi, id est laborum et dolorum fuga.
          </p>
        </div>
        <Footer />
      </div>
    </transition>
  </div>
</template>

<script>
import Header from "@/components/default/Header.vue";
import Footer from "@/components/default/Footer.vue";
export default {
  components: {
    Header,
    Footer
  },

  name: 'TextPage',

  data() {
    return {
      isPageShown: true
    }
  },

  watch: {
    '$route.params.name'() {
      this.isPageShown = false;

      setTimeout(() => {
        this.isPageShown = true;
      }, 500);
    }
  },

  computed: {
    h1() {
      if (this.$route.params.name === 'rules') return 'Правила';
      if (this.$route.params.name === 'about') return 'О нас';
      return '';
    }
  }
};
</script>
