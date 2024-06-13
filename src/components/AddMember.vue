<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Nome:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <div>
        <video ref="video" width="320" height="240" autoplay></video>
        <button type="button" @click="capturePhoto">Tirar Foto</button>
      </div>
      <canvas ref="canvas" width="320" height="240" style="display: none;"></canvas>
      <div v-if="photoData">
        <img :src="photoData" alt="Captura da webcam" />
      </div>
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      photoData: null,
    };
  },
  mounted() {
    this.setupWebcam();
  },
  methods: {
    setupWebcam() {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        })
        .catch((err) => {
          console.error("Erro ao acessar a webcam: ", err);
        });
    },
    capturePhoto() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      context.drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height);
      const imageDataURL = canvas.toDataURL('image/jpeg');
      
      // Remover o prefixo 'data:image/jpeg;base64,' antes de atribuir ao photoData
      this.photoData = imageDataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    },
    async handleSubmit() {
      const nomeDoGrupo = this.$route.params.nomeDoGrupo;

      if (!this.name) {
        alert('Por favor, preencha o nome.');
        return;
      }

      if (!this.photoData) {
        alert('Por favor, tire uma foto.');
        return;
      }

      const payload = {
        name: this.name,
        face: this.photoData,
      };

      // Imprimir os dados antes de enviar a requisição
      console.log('Dados a serem enviados:', payload);

      try {
        const response = await axios.post(
          `grupos/${nomeDoGrupo}/detalhes/adicionar`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true // Assegura que os cookies serão enviados
          }
        );
        console.log('Sucesso:', response.data);
      } catch (error) {
        console.error('Erro:', error.response ? error.response.data : error.message);
      }
    },
  },
};
</script>